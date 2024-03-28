using Releaf.Domain.Devices;
using Releaf.Domain.Trees;
using Releaf.Shared;

namespace Releaf.Domain.Boxes;

public class BoxAggregate
{
  public BoxAggregate(
    BoxId id,
    UserId ownerId,
    TreeDefinitionId treeDefinitionId,
    DeviceId deviceId,
    DateTime germinationDay,
    IEnumerable<Seed> seeds,
    double averageInchHeight,
    BoxVitals boxVitals)
  {
    Id = id;
    OwnerId = ownerId;
    TreeDefinitionId = treeDefinitionId;
    DeviceId = deviceId;
    GerminationDay = germinationDay;
    Seeds = seeds;
    SeedsAverageInchHeight = averageInchHeight;
    Vitals = boxVitals ?? new BoxVitals(BoxVitalValue.Empty(), BoxVitalValue.Empty(), BoxVitalValue.Empty(), BoxVitalValue.Empty());
  }

  public BoxId Id { get; }
  public UserId OwnerId { get; }
  public TreeDefinitionId TreeDefinitionId { get; }
  public DeviceId DeviceId { get; }
  public DateTime GerminationDay { get; }
  public IEnumerable<Seed> Seeds { get; }
  public double SeedsAverageInchHeight { get; }
  public BoxVitals Vitals { get; }

  public void UpdateTemperatureVitals(DateTime timeStamp, double temperature)
  {
    Vitals.UpdateTemperature(Round4digits(temperature), timeStamp);
  }

  public void UpdateAirHumidityPercentVitals(DateTime timeStamp, double airHumidityPercent)
  {
    Vitals.UpdateAirHumidityPercent(Round4digits(airHumidityPercent), timeStamp);
  }

  public void UpdateSoilMoisturePercentVitals(DateTime timeStamp, double soilMoisturePercent)
  {
    Vitals.UpdateSoilMoisturePercent(Round4digits(soilMoisturePercent), timeStamp);
  }

  public void UpdateLuminosityPercentVitals(DateTime timeStamp, double luminosityPercent)
  {
    Vitals.UpdateLuminosityPercent(Round4digits(luminosityPercent), timeStamp);
  }

  private double Round4digits(double value)
  {
    return Math.Round(value, 4);
  }

}
