
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Releaf.Domain.Repo;
using Releaf.Infrastructure.Repo;
using Releaf.Infrastructure.Settings;

namespace Releaf.Application.DI;

public static class AddReleafAppExtension
{
  public static void AddReleafApp(this IServiceCollection services, IConfiguration configuration)
  {
    services.AddScoped<ITreeRepo, TreeRepo>();
    services.AddScoped<IBoxRepo, BoxRepo>();
    services.AddMediatR(m => m.RegisterServicesFromAssembly(typeof(AddReleafAppExtension).Assembly));
    services.Configure<MongoDbSettings>(s => configuration.GetSection("Releaf:MongoDbSettings").Bind(s));
  }
}
