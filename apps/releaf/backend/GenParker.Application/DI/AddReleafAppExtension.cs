using GenParker.Application.BackgroundServices;
using GenParker.Domain.Repo;
using GenParker.Infrastructure.Repo;
using Microsoft.Extensions.DependencyInjection;

namespace GenParker.Application.DI;

public static class AddGenParkerExtension
{
  public static void AddGenParker(this IServiceCollection services)
  {
    services.AddScoped<ISensorLogsRepo, SensorLogsRepo>();
    services.AddMediatR(conf => conf.RegisterServicesFromAssembly(typeof(AddGenParkerExtension).Assembly));
    services.AddHostedService<SensorLogsBackgroundService>();
  }
}
