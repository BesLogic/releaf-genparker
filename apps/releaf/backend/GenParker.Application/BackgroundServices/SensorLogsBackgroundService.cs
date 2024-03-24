using GenParker.Application.Commands;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace GenParker.Application.BackgroundServices;

public class SensorLogsBackgroundService : BackgroundService
{
  public SensorLogsBackgroundService(ILogger<SensorLogsBackgroundService> logger, IServiceProvider serviceProvider)
  {
    Logger = logger;
    ServiceProvider = serviceProvider;
  }

  public ILogger<SensorLogsBackgroundService> Logger { get; }
  public IServiceProvider ServiceProvider { get; }

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
        await Task.Delay((int)TimeSpan.FromMinutes(15).TotalMilliseconds);
      }
    }
  }

  private void DoTaskEach15mins()
  {
    // Because dependencied needed are ScopedService
    // BackgroundService should create a new scope every 15 mins when running
    using var scope = ServiceProvider.CreateScope();
    var mediator = scope.ServiceProvider.GetRequiredService<IMediator>();
    mediator.Send(new ReduceNewSensorLogsCmd());
  }
}
