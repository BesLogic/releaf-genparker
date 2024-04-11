
using Microsoft.Extensions.DependencyInjection;
using Releaf.Auth;
using Releaf.Auth.Impl;

namespace Releaf.Application.DI;

public static class AddAuthExtension
{
  public static void AddReleafAuth(this IServiceCollection services)
  {
    services.AddScoped<ICurrentUser, MockCurrentUser>();
  }
}
