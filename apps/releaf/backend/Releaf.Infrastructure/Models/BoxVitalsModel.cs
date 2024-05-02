using Releaf.Domain.Boxes;

namespace Releaf.Infrastructure.Models;

public class BoxVitalsModel
{
  public BoxVitalValueModel Temperature { get; set; } = new BoxVitalValueModel();
  public BoxVitalValueModel SoilMoisturePercent { get; set; } = new BoxVitalValueModel();
  public BoxVitalValueModel LuminosityPercent { get; set; } = new BoxVitalValueModel();

  public static BoxVitalsModel From(BoxVitals vitals)
  {
    return new BoxVitalsModel
    {
      Temperature = BoxVitalValueModel.From(vitals.Temperature),
      SoilMoisturePercent = BoxVitalValueModel.From(vitals.SoilMoisturePercent),
      LuminosityPercent = BoxVitalValueModel.From(vitals.LuminosityPercent),
    };
  }

  internal BoxVitals ToBoxVitals()
  {
    return new BoxVitals(
      temperature: new BoxVitalValue(Temperature.Value, Temperature.LastUpdate, Temperature.BatteryLevel, Temperature.BatteryLastUpdate),
      soilMoisturePercent: new BoxVitalValue(SoilMoisturePercent.Value, SoilMoisturePercent.LastUpdate, SoilMoisturePercent.BatteryLevel, SoilMoisturePercent.BatteryLastUpdate),
      luminosityPercent: new BoxVitalValue(LuminosityPercent.Value, LuminosityPercent.LastUpdate, LuminosityPercent.BatteryLevel, LuminosityPercent.BatteryLastUpdate)
    );
  }
}
