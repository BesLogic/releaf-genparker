using Releaf.Domain.Boxes;

namespace Releaf.Infrastructure.Models;

public class BoxVitalsModel
{
  public BoxVitalValueModel Temperature { get; set; } = new BoxVitalValueModel();
  public BoxVitalValueModel SoilMoisturePercent { get; set; } = new BoxVitalValueModel();
  public BoxVitalValueModel LuminosityPercent { get; set; } = new BoxVitalValueModel();
  public BoxVitalValueModel AirHumidityPercent { get; set; } = new BoxVitalValueModel();

  public static BoxVitalsModel From(BoxVitals vitals)
  {
    return new BoxVitalsModel
    {
      Temperature = BoxVitalValueModel.From(vitals.Temperature),
      SoilMoisturePercent = BoxVitalValueModel.From(vitals.SoilMoisturePercent),
      LuminosityPercent = BoxVitalValueModel.From(vitals.LuminosityPercent),
      AirHumidityPercent = BoxVitalValueModel.From(vitals.AirHumidityPercent),
    };
  }

  internal BoxVitals ToBoxVitals()
  {
    return new BoxVitals(
      temperature: new BoxVitalValue(Temperature.Value, Temperature.LastUpdate),
      airHumidityPercent: new BoxVitalValue(AirHumidityPercent.Value, AirHumidityPercent.LastUpdate),
      soilMoisturePercent: new BoxVitalValue(SoilMoisturePercent.Value, SoilMoisturePercent.LastUpdate),
      luminosityPercent: new BoxVitalValue(LuminosityPercent.Value, LuminosityPercent.LastUpdate)
    );
  }
}
