
using Microsoft.Extensions.DependencyInjection;
using Releaf.Domain.Repo;
using Releaf.Infrastructure.Repo;

namespace Releaf.Application.DI;

public static class AddReleafAppExtension
{
  public static void AddReleafApp(this IServiceCollection services)
  {
    services.AddScoped<ITreeRepo, TreeRepo>();
  }
}
