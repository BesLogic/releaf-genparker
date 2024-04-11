namespace Releaf.Domain.Boxes;

public class BoxVitals
{
  public static BoxVitals Default { get; } = new BoxVitals(BoxVitalValue.Default, BoxVitalValue.Default, BoxVitalValue.Default, BoxVitalValue.Default);

  public BoxVitalValue Temperature { get; private set; } = BoxVitalValue.Default;

  public BoxVitalValue AirHumidityPercent { get; private set; } = BoxVitalValue.Default;

  public BoxVitalValue SoilMoisturePercent { get; private set; } = BoxVitalValue.Default;

  public BoxVitalValue LuminosityPercent { get; private set; } = BoxVitalValue.Default;

  public BoxVitals(
    BoxVitalValue temperature,
    BoxVitalValue airHumidityPercent,
    BoxVitalValue soilMoisturePercent,
    BoxVitalValue luminosityPercent)
  {
    Temperature = temperature ?? BoxVitalValue.Default;
    AirHumidityPercent = airHumidityPercent ?? BoxVitalValue.Default;
    SoilMoisturePercent = soilMoisturePercent ?? BoxVitalValue.Default;
    LuminosityPercent = luminosityPercent ?? BoxVitalValue.Default;
  }

  internal void UpdateTemperature(double temperature, DateTime timeStamp)
  {
    Temperature = Temperature.ChangeValue(temperature, timeStamp);
  }

  internal void UpdateTemperatureBattery(double batteryLevel, DateTime timeStamp)
  {
    Temperature = Temperature.ChangeBatteryLevel(batteryLevel, timeStamp);
  }

  internal void UpdateAirHumidityPercent(double airHumidityPercent, DateTime timeStamp)
  {
    AirHumidityPercent = AirHumidityPercent.ChangeValue(airHumidityPercent, timeStamp);
  }

  internal void UpdateAirHumidityBattery(double batteryLevel, DateTime timeStamp)
  {
    AirHumidityPercent = AirHumidityPercent.ChangeBatteryLevel(batteryLevel, timeStamp);
  }

  internal void UpdateSoilMoisturePercent(double soilMoisturePercent, DateTime timeStamp)
  {
    SoilMoisturePercent = SoilMoisturePercent.ChangeValue(soilMoisturePercent, timeStamp);
  }

  internal void UpdateSoilMoistureBattery(double batteryLevel, DateTime timeStamp)
  {
    SoilMoisturePercent = SoilMoisturePercent.ChangeBatteryLevel(batteryLevel, timeStamp);
  }

  internal void UpdateLuminosityPercent(double luminosityPercent, DateTime timeStamp)
  {
    LuminosityPercent = LuminosityPercent.ChangeValue(luminosityPercent, timeStamp);
  }

  internal void UpdateLuminosityBattery(double batteryLevel, DateTime timeStamp)
  {
    LuminosityPercent = LuminosityPercent.ChangeBatteryLevel(batteryLevel, timeStamp);
  }
}

public class BoxVitalValue
{
  public static BoxVitalValue Default { get; } = new BoxVitalValue(0, DateTime.MinValue, 0, DateTime.MinValue);

  public BoxVitalValue(double value, DateTime lastUpdate, double batteryLevel, DateTime batteryLastUpdate)
  {
    Value = value;
    LastUpdate = lastUpdate;
    BatteryLevel = batteryLevel;
    BatteryLastUpdate = batteryLastUpdate;
  }

  public double Value { get; }
  public DateTime LastUpdate { get; }
  public double BatteryLevel { get; }
  public DateTime BatteryLastUpdate { get; }

  internal BoxVitalValue ChangeValue(double value, DateTime lastUpdate)
  {
    return new BoxVitalValue(value, lastUpdate, BatteryLevel, BatteryLastUpdate);
  }

  internal BoxVitalValue ChangeBatteryLevel(double batteryLevel, DateTime lastUpdate)
  {
    return new BoxVitalValue(Value, LastUpdate, batteryLevel, lastUpdate);
  }
}
