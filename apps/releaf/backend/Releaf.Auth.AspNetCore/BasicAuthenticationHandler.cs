using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Primitives;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Text;
using System.Text.Encodings.Web;

namespace Releaf.Auth.AspNetCore;

public class BasicAuthenticationHandler : AuthenticationHandler<AuthenticationSchemeOptions>
{
  public BasicAuthenticationHandler(
    IOptionsMonitor<AuthenticationSchemeOptions> options,
    ILoggerFactory logger,
    UrlEncoder encoder,
    ISystemClock clock)
    : base(options, logger, encoder, clock) { }

  protected override Task<AuthenticateResult> HandleAuthenticateAsync()
  {
    try
    {
      return Task.FromResult(TryBasicAuth());
    }
    catch
    {
      return Task.FromResult(AuthenticateResult.Fail("Auth failed"));
    }
  }

  private AuthenticateResult TryBasicAuth()
  {
    if (!Request.Headers.TryGetValue("Authorization", out var authHeaderValue))
    {
      return AuthenticateResult.Fail("Authorization header not found");
    }

    if (!IsCredentialsValid(authHeaderValue))
    {
      return AuthenticateResult.Fail("Invalid username or password");
    }

    var username = GetUsername(authHeaderValue);
    return CreateAuthTicket(username);
  }

  private static bool IsCredentialsValid(StringValues authHeaderValue)
  {
    string[] basicAuthParts = GetBasicAuthParts(authHeaderValue);

    var username = basicAuthParts.FirstOrDefault();
    var password = basicAuthParts.LastOrDefault();

    return username != null && username == password;
  }

  private string GetUsername(StringValues authHeaderValue)
  {
    string[] basicAuthParts = GetBasicAuthParts(authHeaderValue);
    return basicAuthParts.FirstOrDefault();
  }

  private static string[] GetBasicAuthParts(StringValues authHeaderValue)
  {
    var authHeader = AuthenticationHeaderValue.Parse(authHeaderValue);
    var rawCreds = Encoding.UTF8.GetString(Convert.FromBase64String(authHeader.Parameter));
    var parts = rawCreds.Split(':');
    return parts;
  }

  private AuthenticateResult CreateAuthTicket(string username)
  {
    var claims = new[]
    {
      new Claim(ClaimTypes.NameIdentifier, username)
    };

    var identity = new ClaimsIdentity(claims, Scheme.Name);
    var principal = new ClaimsPrincipal(identity);
    var ticket = new AuthenticationTicket(principal, Scheme.Name);
    return AuthenticateResult.Success(ticket);
  }
}
