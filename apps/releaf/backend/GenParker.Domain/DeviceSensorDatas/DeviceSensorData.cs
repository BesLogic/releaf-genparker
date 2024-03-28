namespace GenParker.Domain.DeviceSensorDatas;

public class DeviceSensorData
{
  public DeviceSensorData(
    string id,
    string deviceKey,
    string macAddress,
    DateTime timeStamp,
    SensorTypes sensorType,
    double value)
  {
    Id = id;
    DeviceKey = deviceKey;
    MacAddress = macAddress;
    TimeStamp = timeStamp;
    SensorType = sensorType;
    Value = value;
  }

  public string Id { get; }
  public string DeviceKey { get; }
  public string MacAddress { get; }
  public DateTime TimeStamp { get; }
  public SensorTypes SensorType { get; }
  public double Value { get; }

  public string UniqueDeviceSensorKey()
  {
    return $"{DeviceKey}{SensorType}";
  }
}

public enum SensorTypes : int
{
  None = 0,
  AirTemperatureC = 1,
  AirHumidityPercent = 2,
  COppm = 3,
  PropanePpm = 4,
  WaterLevelMm = 5,
  WaterLevelPh = 6,
  SoilMoisturePercent = 7,
  TemperatureC = 8,
  UniversalRawData = 9,
  DistanceCm = 10,
  TemperatureLiquidF = 11,
  AlertBool = 12,
  BatteryChargePercent = 13,
  LuminosityLux = 14
}
