
using Microsoft.Extensions.DependencyInjection;
using Releaf.Application.EventHandlers;
using Releaf.Domain.Repo;
using Releaf.Infrastructure.Repo;

namespace Releaf.Application.DI;

public static class AddReleafAppExtension
{
  public static void AddReleafApp(this IServiceCollection services)
  {
    services.AddScoped<ITreeRepo, TreeRepo>();
    services.AddScoped<IBoxRepo, BoxRepo>();
    services.AddMediatR(m => m.RegisterServicesFromAssembly(typeof(AddReleafAppExtension).Assembly));
  }
}
