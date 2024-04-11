using Releaf.Domain.Exceptions;
using Releaf.Domain.Repo;
using Releaf.Domain.Trees;
using Releaf.Shared;

namespace Releaf.Domain.Boxes;

public class BoxAggregate
{
  public const int BoxCount = 20;

  public BoxAggregate(
    BoxId id,
    UserId ownerId,
    TreeDefinitionId treeDefinitionId,
    BoxPairingKey pairingKey,
    DateTime germinationDay,
    IEnumerable<Seed> seeds,
    double averageInchHeight,
    BoxVitals boxVitals)
  {
    Id = id;
    OwnerId = ownerId;
    TreeDefinitionId = treeDefinitionId;
    PairingKey = pairingKey;
    GerminationDay = germinationDay;
    Seeds = seeds;
    SeedsAverageInchHeight = averageInchHeight;
    Vitals = boxVitals ?? new BoxVitals(BoxVitalValue.Default, BoxVitalValue.Default, BoxVitalValue.Default, BoxVitalValue.Default);
  }

  public BoxId Id { get; }
  public UserId OwnerId { get; }
  public TreeDefinitionId TreeDefinitionId { get; }
  public BoxPairingKey PairingKey { get; }
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

  public static BoxAggregate Initialize(ITreeRepo treeRepo, IBoxRepo boxRepo, string ownerId, TreeDefinitionId treeDefinitionId, BoxPairingKey pairingKey)
  {
    EnsureTreeExists(treeRepo, treeDefinitionId);
    EnsureBoxNotAlreadyPaired(boxRepo, pairingKey);

    var treeDef = treeRepo.GetOne(treeDefinitionId);
    var germinationDay = DateTime.Now.AddDays(treeDef.EstimatedGerminationDurationDays);

    var seeds = Enumerable.Range(0, BoxCount).Select(i => new Seed(Seed.NewName())).ToList();

    return new BoxAggregate(BoxId.Empty, new UserId(ownerId), treeDefinitionId, pairingKey, germinationDay, seeds, 0, BoxVitals.Default);

  }

  private static void EnsureBoxNotAlreadyPaired(IBoxRepo boxRepo, BoxPairingKey pairingKey)
  {
    if (boxRepo.BoxAlreadyPaired(pairingKey))
    {
      throw new BoxAlreadyPairedException(pairingKey);
    }
  }

  private static void EnsureTreeExists(ITreeRepo treeRepo, TreeDefinitionId treeDefinitionId)
  {
    if (!treeRepo.Exists(treeDefinitionId))
    {
      throw new TreeWithIdNotFoundException(treeDefinitionId);
    }
  }
}
