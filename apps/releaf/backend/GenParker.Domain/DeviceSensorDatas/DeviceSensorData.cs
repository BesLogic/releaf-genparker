namespace GenParker.Domain.DeviceSensorDatas;

public class DeviceSensorData
{
  public DeviceSensorData(
    string id,
    string pairingKey,
    string macAddress,
    DateTime timeStamp,
    SensorTypes sensorType,
    UniquePosition uniquePosition,
    double value)
  {
    Id = id;
    PairingKey = pairingKey;
    MacAddress = macAddress;
    TimeStamp = timeStamp;
    SensorType = sensorType;
    UniquePosition = uniquePosition;
    Value = value;
  }

  public string Id { get; }
  public string PairingKey { get; }
  public string MacAddress { get; }
  public DateTime TimeStamp { get; }
  public SensorTypes SensorType { get; }
  public UniquePosition UniquePosition { get; }
  public double Value { get; }

  public string UniqueDeviceSensorKey()
  {
    return $"{PairingKey}-{UniquePosition}-{SensorType}";
  }
}

public enum SensorTypes : int
{
  None = 0,
  AirTemperatureC = 1,//o
  AirHumidityPercent = 2,//2
  COppm = 3,
  PropanePpm = 4,
  WaterLevelMm = 5,
  WaterLevelPh = 6,
  SoilMoisturePercent = 7,//o
  TemperatureC = 8,
  UniversalRawData = 9,
  DistanceCm = 10,
  TemperatureLiquidF = 11,
  AlertBool = 12,
  BatteryChargePercent = 13,
  LuminosityLux = 14 //o
}
