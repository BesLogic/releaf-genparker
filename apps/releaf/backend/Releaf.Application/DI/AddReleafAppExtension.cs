
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Releaf.Application.Seeds;
using Releaf.Domain.Repo;
using Releaf.Infrastructure.Repo;
using Releaf.Infrastructure.Settings;

namespace Releaf.Application.DI;

public static class AddReleafAppExtension
{
  public static void AddReleafApp(this IServiceCollection services, IConfiguration configuration)
  {
    services.AddScoped<ITreeRepo, TreeRepo>();
    TreeRepo.InitClassMap();

    services.AddScoped<IBoxRepo, BoxRepo>();
    services.AddMediatR(m => m.RegisterServicesFromAssembly(typeof(AddReleafAppExtension).Assembly));
    services.Configure<MongoDbSettings>(s => configuration.GetSection("Releaf:MongoDbSettings").Bind(s));

    SeedReleafDB(services);
  }

  private static void SeedReleafDB(IServiceCollection services)
  {
    var sp = services.BuildServiceProvider();
    using var scope = sp.CreateScope();
    var treeRepo = scope.ServiceProvider.GetRequiredService<ITreeRepo>();
    if (ShouldSeedTreeDefs(treeRepo))
    {
      SeedTreeDefs(treeRepo);
    }
  }

  private static bool ShouldSeedTreeDefs(ITreeRepo treeRepo) => treeRepo.Count() == 0;

  private static void SeedTreeDefs(ITreeRepo treeRepo)
  {
    var treesDefs = ReleafDbSeeds.GetTreeDefinitionsSeed();
    foreach (var treeDef in treesDefs)
    {
      treeRepo.Create(treeDef);
    }
  }
}
