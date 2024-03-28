
using GenParker.Domain.DeviceSensorDatas;
using GenParker.Domain.Repo;
using GenParker.Events;
using MediatR;

namespace GenParker.Application.Commands;

public class ReduceNewSensorLogsCmd : IRequest<string>
{
}

public class ReduceNewSensorLogsCmdHandler : IRequestHandler<ReduceNewSensorLogsCmd, string>
{
  public ReduceNewSensorLogsCmdHandler(IMediator mediator, ISensorDataRepo sensorLogsRepo)
  {
    Mediator = mediator;
    SensorDataRepo = sensorLogsRepo;
  }

  public IMediator Mediator { get; }
  public ISensorDataRepo SensorDataRepo { get; }

  public Task<string> Handle(ReduceNewSensorLogsCmd request, CancellationToken cancellationToken)
  {
    var sensorDataBatch = SensorDataRepo.GetNextBatch();
    var lastLogPerDevice = LastLogByDeviceSensor(sensorDataBatch);
    RaiseEventPerDeviceSensor(lastLogPerDevice, sensorDataBatch);

    return Task.FromResult(string.Empty);
  }

  private static Dictionary<string, DeviceSensorData> LastLogByDeviceSensor(IEnumerable<DeviceSensorData> sensorLogBatch)
  {
    var byDeviceLogs = sensorLogBatch.GroupBy(l => l.UniqueDeviceSensorKey());
    return byDeviceLogs
      .Select(g => g.OrderByDescending(s => s.TimeStamp).First())
      .ToDictionary(l => l.UniqueDeviceSensorKey(), l => l);
  }

  private void RaiseEventPerDeviceSensor(Dictionary<string, DeviceSensorData> lastLogPerDevice, IEnumerable<DeviceSensorData> sensorDataBatch)
  {
    var batch = sensorDataBatch.ToList();
    foreach (var log in lastLogPerDevice)
    {
      var logVal = log.Value;
      var valueType = GetValueTypeOrEmpty(logVal);
      if (IsKnowType(valueType))
      {
        var deviceSensorLogUpdated = new DeviceSensorLogUpdated(logVal.DeviceKey, logVal.TimeStamp, logVal.Value, valueType);
        Mediator.Publish(deviceSensorLogUpdated);

        CleanBatchByDeviceKey(batch, logVal.DeviceKey);
      }
    }
  }

  private void CleanBatchByDeviceKey(List<DeviceSensorData> sensorDataBatch, string deviceKey)
  {
    var allDataToClean = sensorDataBatch.Where(d => d.DeviceKey == deviceKey);
    var idsToClean = allDataToClean.Select(d => d.Id).ToList();

    if (idsToClean.Any())
    {
      SensorDataRepo.DeleteBatchById(idsToClean);
      sensorDataBatch.RemoveAll(s => idsToClean.Contains(s.Id));
    }
  }

  private static bool IsKnowType(string valueType)
  {
    return !string.IsNullOrEmpty(valueType);
  }

  private string GetValueTypeOrEmpty(DeviceSensorData logVal)
  {
    switch (logVal.SensorType)
    {
      case SensorTypes.AirTemperatureC:
        return DeviceSensorLogUpdated.ValueTypes.Temperature;
      case SensorTypes.AirHumidityPercent:
        return DeviceSensorLogUpdated.ValueTypes.AirHumidity;
      case SensorTypes.SoilMoisturePercent:
        return DeviceSensorLogUpdated.ValueTypes.SoilMoisture;
      case SensorTypes.BatteryChargePercent:
        return DeviceSensorLogUpdated.ValueTypes.BatteryCharge;
      case SensorTypes.LuminosityLux:
        return DeviceSensorLogUpdated.ValueTypes.Luminosity;
      default:
        return string.Empty;
    }
  }
}
