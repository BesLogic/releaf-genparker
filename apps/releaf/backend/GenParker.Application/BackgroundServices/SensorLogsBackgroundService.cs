using Amazon.Runtime.Internal.Util;
using GenParker.Application.Commands;
using GenParker.Infrastructure.Settings;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace GenParker.Application.BackgroundServices;

public class SensorLogsBackgroundService : BackgroundService
{
  public SensorLogsBackgroundService(
    ILogger<SensorLogsBackgroundService> logger,
    IServiceProvider serviceProvider,
    IOptions<SensorDataSettings> sensorDataSettingsOptions)
  {
    Logger = logger;
    ServiceProvider = serviceProvider;
    SensorDataSettingsOptions = sensorDataSettingsOptions;
  }

  private ILogger<SensorLogsBackgroundService> Logger { get; }
  private IServiceProvider ServiceProvider { get; }
  private IOptions<SensorDataSettings> SensorDataSettingsOptions { get; }

  protected override async Task ExecuteAsync(CancellationToken stoppingToken)
  {
    while (!stoppingToken.IsCancellationRequested)
    {
      try
      {
        DoTaskEach15mins();
      }
      catch (Exception e)
      {
        Logger.LogError(e, $"Error while sending command: {nameof(ReduceNewSensorLogsCmd)}");
      }
      finally
      {
        var settings = SensorDataSettingsOptions.Value;
        await Task.Delay((int)TimeSpan.FromSeconds(settings.SyncSpeedInSecs).TotalMilliseconds);
      }
    }
  }

  private void DoTaskEach15mins()
  {
    // Because dependencied needed are ScopedService
    // BackgroundService should create a new scope every 15 mins when running
    using var scope = ServiceProvider.CreateScope();
    var mediator = scope.ServiceProvider.GetRequiredService<IMediator>();

    Logger.LogInformation("SyncSensorData (cmd: ReduceNewSensorLogsCmd)");
    mediator.Send(new ReduceNewSensorLogsCmd());
  }
}
