
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
  public ReduceNewSensorLogsCmdHandler(IMediator mediator, ISensorDataRepo sensorLogsRepo, ISensorPositionCacheRepo sensorPositionCacheRepo)
  {
    Mediator = mediator;
    SensorDataRepo = sensorLogsRepo;
    SensorPositionCacheRepo = sensorPositionCacheRepo;
  }

  private IMediator Mediator { get; }
  private ISensorDataRepo SensorDataRepo { get; }
  private ISensorPositionCacheRepo SensorPositionCacheRepo { get; }

  public Task<string> Handle(ReduceNewSensorLogsCmd request, CancellationToken cancellationToken)
  {
    var sensorDataBatch = SensorDataRepo.GetNextBatch();
    var lastLogPerDevice = LastLogByDeviceSensor(sensorDataBatch);
    RaiseEventForAllDeviceSensors(lastLogPerDevice, sensorDataBatch);

    return Task.FromResult(string.Empty);
  }

  private static Dictionary<string, DeviceSensorData> LastLogByDeviceSensor(IEnumerable<DeviceSensorData> sensorLogBatch)
  {
    var byDeviceLogs = sensorLogBatch.GroupBy(l => l.UniqueDeviceSensorKey());
    return byDeviceLogs
      .Select(g => g.OrderByDescending(s => s.TimeStamp).First())
      .ToDictionary(l => l.UniqueDeviceSensorKey(), l => l);
  }

  private void RaiseEventForAllDeviceSensors(Dictionary<string, DeviceSensorData> lastLogPerDevice, IEnumerable<DeviceSensorData> sensorDataBatch)
  {
    var batch = sensorDataBatch.ToList();
    foreach (var log in lastLogPerDevice)
    {
      var logVal = log.Value;
      CheckToRaiseEventForDeviceSensor(logVal);
      CleanBatchByDeviceKey(batch, logVal.PairingKey);
    }
  }

  private void CheckToRaiseEventForDeviceSensor(DeviceSensorData data)
  {
    if (ShouldRaiseEvent(data))
    {
      RaiseEventForDeviceSensor(data);
    }
  }

  private bool ShouldRaiseEvent(DeviceSensorData data)
  {
    var valueType = GetValueTypeOrEmpty(data);
    return IsKnowType(valueType);
  }

  private void RaiseEventForDeviceSensor(DeviceSensorData data)
  {
    var valueType = GetValueTypeOrEmpty(data);
    if (!string.IsNullOrEmpty(valueType))
    {
      var deviceSensorLogUpdated = new DeviceSensorLogUpdated(data.PairingKey, data.TimeStamp, data.Value, valueType);
      Mediator.Publish(deviceSensorLogUpdated);
      UpdateCache(data, valueType);
    }
  }

  private void UpdateCache(DeviceSensorData data, string valueType)
  {
    if (data.SensorType != SensorTypes.BatteryChargePercent)
    {
      SensorPositionCacheRepo.SetCachedTypeForUniquePosition(data.PairingKey, data.UniquePosition, valueType);
    }
  }

  private void CleanBatchByDeviceKey(List<DeviceSensorData> sensorDataBatch, string deviceKey)
  {
    var allDataToClean = sensorDataBatch.Where(d => d.PairingKey == deviceKey);
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
        return SelectBatteryChargeType(logVal.PairingKey, logVal.UniquePosition);
      case SensorTypes.LuminosityLux:
        return DeviceSensorLogUpdated.ValueTypes.Luminosity;
      default:
        return string.Empty;
    }
  }

  private string SelectBatteryChargeType(string pairingKey, UniquePosition uniquePosition)
  {
    var lastType = SensorPositionCacheRepo.GetCachedTypeForPosition(pairingKey, uniquePosition.Position, uniquePosition);
    switch (lastType)
    {
      case DeviceSensorLogUpdated.ValueTypes.Luminosity:
        return DeviceSensorLogUpdated.ValueTypes.LuminosityBatteryCharge;
      case DeviceSensorLogUpdated.ValueTypes.AirHumidity:
        return DeviceSensorLogUpdated.ValueTypes.AirHumidityBatteryCharge;
      case DeviceSensorLogUpdated.ValueTypes.SoilMoisture:
        return DeviceSensorLogUpdated.ValueTypes.SoilMoistureBatteryCharge;
      case DeviceSensorLogUpdated.ValueTypes.Temperature:
        return DeviceSensorLogUpdated.ValueTypes.TemperatureBatteryCharge;
      default:
        return string.Empty;
    }
  }
}
