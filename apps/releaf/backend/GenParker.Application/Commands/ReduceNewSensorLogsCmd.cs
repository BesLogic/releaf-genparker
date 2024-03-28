
using GenParker.Domain.Repo;
using GenParker.Domain.SensorLogs;
using GenParker.Events;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace GenParker.Application.Commands;

public class ReduceNewSensorLogsCmd : IRequest<string>
{
}

public class ReduceNewSensorLogsCmdHandler : IRequestHandler<ReduceNewSensorLogsCmd, string>
{
  public ReduceNewSensorLogsCmdHandler(IMediator mediator, ISensorLogsRepo sensorLogsRepo)
  {
    Mediator = mediator;
    SensorLogsRepo = sensorLogsRepo;
  }

  public IMediator Mediator { get; }
  public ISensorLogsRepo SensorLogsRepo { get; }

  public Task<string> Handle(ReduceNewSensorLogsCmd request, CancellationToken cancellationToken)
  {
    var sensorLogBatch = SensorLogsRepo.GetLogsBatch();
    var lastLogPerDevice = LastLogByDevice(sensorLogBatch);

    foreach (var log in lastLogPerDevice)
    {
      var logVal = log.Value;
      var deviceSensorLogUpdated = new DeviceSensorLogUpdated(log.Key, logVal.TimeStamp, logVal.Temperature, logVal.AirHumidity, logVal.SoilMoisture, logVal.Luminosity);
      Mediator.Publish(deviceSensorLogUpdated);
    }

    return Task.FromResult(string.Empty);
  }

  private static Dictionary<string, SensorLog> LastLogByDevice(IEnumerable<SensorLog> sensorLogBatch)
  {
    var byDeviceLogs = sensorLogBatch.GroupBy(l => l.DeviceId);
    return byDeviceLogs
      .Select(g => g.OrderByDescending(s => s.TimeStamp).First())
      .ToDictionary(l => l.DeviceId, l => l);
  }
}
