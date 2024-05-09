using GenParker.Application.BackgroundServices;
using GenParker.Domain.Repo;
using GenParker.Infrastructure.Repo;
using GenParker.Infrastructure.Settings;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace GenParker.Application.DI;

public static class AddGenParkerExtension
{
  public static void AddGenParker(this IServiceCollection services, IConfiguration configuration)
  {
    services.AddScoped<ISensorDataRepo, SensorDataRepo>();
    services.AddScoped<ISensorPositionCacheRepo, SensorPositionCacheRepo>();

    services.AddMediatR(conf => conf.RegisterServicesFromAssembly(typeof(AddGenParkerExtension).Assembly));
    services.AddHostedService<SensorLogsBackgroundService>();
    services.Configure<KafkaMongoDbSettings>(s => configuration.GetSection("GenParker:KafkaMongoDbSettings").Bind(s));
    services.Configure<GenParkerMongoDbSettings>(s => configuration.GetSection("GenParker:GenParkerMongoDbSettings").Bind(s));
    services.Configure<SensorDataSettings>(s => configuration.GetSection("GenParker:SensorDataSettings").Bind(s));
  }
}
