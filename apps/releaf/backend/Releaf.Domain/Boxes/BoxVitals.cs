namespace Releaf.Domain.Boxes;

public class BoxVitals
{
  public static BoxVitals Default { get; } = new BoxVitals(BoxVitalValue.Default, BoxVitalValue.Default, BoxVitalValue.Default, BoxVitalValue.Default);

  public BoxVitalValue Temperature { get; private set; } = new BoxVitalValue(default, default);

  public BoxVitalValue AirHumidityPercent { get; private set; } = new BoxVitalValue(default, default);

  public BoxVitalValue SoilMoisturePercent { get; private set; } = new BoxVitalValue(default, default);

  public BoxVitalValue LuminosityPercent { get; private set; } = new BoxVitalValue(default, default);

  public BoxVitals(
    BoxVitalValue temperature,
    BoxVitalValue airHumidityPercent,
    BoxVitalValue soilMoisturePercent,
    BoxVitalValue luminosityPercent)
  {
    Temperature = temperature;
    AirHumidityPercent = airHumidityPercent;
    SoilMoisturePercent = soilMoisturePercent;
    LuminosityPercent = luminosityPercent;
  }

  internal void UpdateTemperature(double temperature, DateTime timeStamp)
  {
    Temperature = new BoxVitalValue(temperature, timeStamp);
  }
  internal void UpdateAirHumidityPercent(double airHumidityPercent, DateTime timeStamp)
  {
    AirHumidityPercent = new BoxVitalValue(airHumidityPercent, timeStamp);
  }

  internal void UpdateSoilMoisturePercent(double soilMoisturePercent, DateTime timeStamp)
  {
    SoilMoisturePercent = new BoxVitalValue(soilMoisturePercent, timeStamp);
  }

  internal void UpdateLuminosityPercent(double luminosityPercent, DateTime timeStamp)
  {
    LuminosityPercent = new BoxVitalValue(luminosityPercent, timeStamp);
  }
}

public class BoxVitalValue
{
  public static BoxVitalValue Default { get; } = new BoxVitalValue(0, DateTime.MinValue);

  public BoxVitalValue(double value, DateTime lastUpdate)
  {
    Value = value;
    LastUpdate = lastUpdate;
  }

  public double Value { get; }
  public DateTime LastUpdate { get; }

  public static BoxVitalValue Empty() => new BoxVitalValue(0, DateTime.MinValue);
}
