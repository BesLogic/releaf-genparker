namespace GenParker.Domain.DeviceSensorDatas;

public class DeviceSensorData
{
  public DeviceSensorData(
    string id,
    string pairingKey,
    string macAddress,
    DateTime timeStamp,
    SensorTypes sensorType,
    string position,
    double value)
  {
    Id = id;
    PairingKey = pairingKey;
    MacAddress = macAddress;
    TimeStamp = timeStamp;
    SensorType = sensorType;
    Position = position;
    Value = value;
  }

  public string Id { get; }
  public string PairingKey { get; }
  public string MacAddress { get; }
  public DateTime TimeStamp { get; }
  public SensorTypes SensorType { get; }
  public string Position { get; }
  public double Value { get; }

  public string UniqueDeviceSensorKey()
  {
    return $"{PairingKey}-{Position}-{SensorType}";
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
