using MongoDB.Bson;
using Releaf.Domain.Boxes;
using Releaf.Domain.Trees;

namespace Releaf.Infrastructure.Models;

public class BoxModel
{
  public ObjectId Id { get; set; }
  public ObjectId TreeDefinitionId { get; set; } = ObjectId.Empty;
  public string OwnerId { get; set; } = string.Empty;
  public SeedModel[] Seeds { get; set; } = Array.Empty<SeedModel>();
  public string PairingKey { get; set; } = string.Empty;
  public DateTime GerminationDay { get; set; }
  public double SeedsAverageInchHeight { get; set; }
  public BoxVitalsModel Vitals { get; set; } = new BoxVitalsModel();

  public static BoxModel From(BoxAggregate b)
  {
    var objId = new ObjectId(b.Id.Value);
    return FromInternal(objId, b);
  }

  public static BoxModel FromNew(BoxAggregate b)
  {
    var objId = GetIdOrNew(b.Id);
    return FromInternal(objId, b);
  }

  private static BoxModel FromInternal(ObjectId id, BoxAggregate b)
  {
    return new BoxModel
    {
      Id = id,
      TreeDefinitionId = new ObjectId(b.TreeDefinitionId.Value),
      OwnerId = b.OwnerId.Value,
      Seeds = b.Seeds.Select(SeedModel.From).ToArray(),
      PairingKey = b.PairingKey.Value,
      GerminationDay = b.GerminationDay,
      SeedsAverageInchHeight = b.SeedsAverageInchHeight,
      Vitals = BoxVitalsModel.From(b.Vitals),
    };
  }

  private static ObjectId GetIdOrNew(BoxId boxId)
  {
    if (!string.IsNullOrEmpty(boxId.Value))
    {
      return new ObjectId(boxId.Value);
    }
    return ObjectId.GenerateNewId();
  }

  public BoxAggregate ToBox()
  {
    return new BoxAggregate(
      new BoxId(Id.ToString()),
      new Shared.UserId(OwnerId),
      new TreeDefinitionId(TreeDefinitionId.ToString()),
      new BoxPairingKey(PairingKey),
      GerminationDay,
      Seeds.Select(s => s.ToSeed()).ToList(),
      SeedsAverageInchHeight,
      Vitals.ToBoxVitals()
    );
  }
}
