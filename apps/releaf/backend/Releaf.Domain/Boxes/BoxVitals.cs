namespace Releaf.Domain.Boxes;

public class BoxVitals
{
  public BoxVitalValue Temperature { get; private set; } = new BoxVitalValue(default, default);

  public BoxVitalValue AirHumidityPercent { get; private set; } = new BoxVitalValue(default, default);

  public BoxVitalValue SoilMoisturePercent { get; private set; } = new BoxVitalValue(default, default);

  public BoxVitalValue LuminosityPercent { get; private set; } = new BoxVitalValue(default, default);

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
  public BoxVitalValue(double value, DateTime lastUpdate)
  {
    Value = value;
    LastUpdate = lastUpdate;
  }

  public double Value { get; }
  public DateTime LastUpdate { get; }
}
