using Releaf.Shared;

namespace GenParker.Events;

public class DeviceSensorLogUpdated : DomainEvent
{
  public static class ValueTypes
  {
    public const string Temperature = "temperature";
    public const string AirHumidity = "air_humidity";
    public const string SoilMoisture = "soil_moisture";
    public const string Luminosity = "luminosity";
    public const string BatteryCharge = "battery_charge";
  }

  public DeviceSensorLogUpdated(string pairingKey, DateTime timeStamp, double value, string valueType)
  {
    PairingKey = pairingKey;
    TimeStamp = timeStamp;
    Value = value;

    ValidateArg(valueType);
    ValueType = valueType;
  }

  private void ValidateArg(string valueType)
  {
    switch (valueType)
    {
      case ValueTypes.Temperature:
      case ValueTypes.AirHumidity:
      case ValueTypes.SoilMoisture:
      case ValueTypes.Luminosity:
      case ValueTypes.BatteryCharge:
        return;
      default:
        throw new ArgumentException($"Device Sensor type should be one of: {ValueTypes.Temperature}, {ValueTypes.AirHumidity}, {ValueTypes.SoilMoisture}, {ValueTypes.Luminosity} or {ValueTypes.BatteryCharge}", "valueType");
    }
  }

  public string PairingKey { get; }
  public DateTime TimeStamp { get; }
  public double Value { get; }
  public string ValueType { get; } = string.Empty;
}
