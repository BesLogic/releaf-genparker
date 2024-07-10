using Microsoft.AspNetCore.Http;
using Releaf.Shared;
using System.Security.Claims;

namespace Releaf.Auth.Impl;

internal class MockCurrentUser : ICurrentUser
{
  public IHttpContextAccessor HttpContextAccessor { get; }

  public MockCurrentUser(IHttpContextAccessor httpContextAccessor)
  {
    HttpContextAccessor = httpContextAccessor;
  }

  private UserId _id;
  public UserId Id
  {
    get
    {
      if (_id != null)
      {
        return _id;
      }

      InitUserId();
      return _id;
    }
  }

  private void InitUserId()
  {
    var claim = HttpContextAccessor?.HttpContext?.User?.Claims?.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);
    var username = claim?.Value;
    if (username == null)
    {
      throw new Exception("Woah ! You're not authenticated");
    }

    _id = new UserId(username);
  }
}
