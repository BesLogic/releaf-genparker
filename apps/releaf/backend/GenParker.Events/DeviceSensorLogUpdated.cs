using Releaf.Shared;

namespace GenParker.Events;

public class DeviceSensorLogUpdated : DomainEvent
{
  public static class ValueTypes
  {
    public const string Temperature = "temperature";
    public const string TemperatureBatteryCharge = "temperature_battery_charge";
    public const string AirHumidity = "air_humidity";
    public const string AirHumidityBatteryCharge = "air_humidity_battery_charge";
    public const string SoilMoisture = "soil_moisture";
    public const string SoilMoistureBatteryCharge = "soil_moisture_battery_charge";
    public const string Luminosity = "luminosity";
    public const string LuminosityBatteryCharge = "luminosity_battery_charge";
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
      case ValueTypes.TemperatureBatteryCharge:
      case ValueTypes.AirHumidity:
      case ValueTypes.AirHumidityBatteryCharge:
      case ValueTypes.SoilMoisture:
      case ValueTypes.SoilMoistureBatteryCharge:
      case ValueTypes.Luminosity:
      case ValueTypes.LuminosityBatteryCharge:
        return;
      default:
        throw new ArgumentException($"Device Sensor type should be one of: {ValueTypes.Temperature}, {ValueTypes.TemperatureBatteryCharge}, {ValueTypes.AirHumidity}, {ValueTypes.AirHumidityBatteryCharge}, {ValueTypes.SoilMoisture}, {ValueTypes.SoilMoistureBatteryCharge}, {ValueTypes.Luminosity} or {ValueTypes.LuminosityBatteryCharge}", nameof(valueType));
    }
  }

  public string PairingKey { get; }
  public DateTime TimeStamp { get; }
  public double Value { get; }
  public string ValueType { get; } = string.Empty;
}
