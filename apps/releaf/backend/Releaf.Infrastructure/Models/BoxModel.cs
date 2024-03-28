using MongoDB.Bson;
using Releaf.Domain.Boxes;

namespace Releaf.Infrastructure.Models;

public class BoxModel
{
  public ObjectId Id { get; set; }
  public string TreeDefinitionId { get; set; } = string.Empty;
  public string OwnerId { get; set; } = string.Empty;
  public SeedModel[] Seeds { get; set; } = Array.Empty<SeedModel>();
  public string DeviceId { get; set; } = string.Empty;
  public DateTime GerminationDay { get; set; }
  public double SeedsAverageInchHeight { get; set; }
  public BoxVitalsModel Vitals { get; set; } = new BoxVitalsModel();

  public static BoxModel From(BoxAggregate b)
  {
    return new BoxModel
    {
      Id = new ObjectId(b.Id.Value),
      TreeDefinitionId = b.TreeDefinitionId.Value.ToString(),
      OwnerId = b.OwnerId.Value,
      Seeds = b.Seeds.Select(SeedModel.From).ToArray(),
      DeviceId = b.DeviceId.Value,
      GerminationDay = b.GerminationDay,
      SeedsAverageInchHeight = b.SeedsAverageInchHeight,
      Vitals = BoxVitalsModel.From(b.Vitals),
    };
  }

  public BoxAggregate ToBox()
  {
    return new BoxAggregate(
      new BoxId(Id.ToString()),
      new Shared.UserId(OwnerId),
      new Domain.Trees.TreeDefinitionId(TreeDefinitionId),
      new Domain.Devices.DeviceId(DeviceId),
      GerminationDay,
      Seeds.Select(s => s.ToSeed()).ToList(),
      SeedsAverageInchHeight,
      Vitals.ToBoxVitals()
    );
  }
}
