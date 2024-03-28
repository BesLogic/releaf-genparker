using Releaf.Domain.Boxes;
using Releaf.Domain.Devices;
using Releaf.Domain.Repo;
using Releaf.Shared;

namespace Releaf.Infrastructure.Repo;

public class BoxRepo : IBoxRepo
{
  private static readonly UserId User1 = new UserId("mrbamboo");
  private static readonly BoxId User1Box1 = new BoxId(new Guid("64391FCC-DE19-4141-A688-9A72874C3D8E"));
  private static readonly BoxId User1Box2 = new BoxId(new Guid("9ED98717-C14E-4E5A-A64B-4C226E1F51AC"));

  public static Dictionary<BoxId, BoxVitals> UpdatedBoxVitals { get; private set; } = new Dictionary<BoxId, BoxVitals>();

  public IEnumerable<BoxAggregate> GetBoxesForUser(UserId ownerId)
  {
    return GetBoxes().Where(b => b.OwnerId == ownerId).ToList();
  }

  public BoxAggregate GetBox(UserId ownerId, BoxId boxId)
  {
    return GetBoxesForUser(ownerId).Where(b => b.Id.Value == boxId.Value).First();
  }

  private BoxAggregate[] GetBoxes()
  {
    BoxAggregate[] boxes = [
      new BoxAggregate(User1Box2, User1, TreeRepo.HuckleberryId, DeviceRepo.DeviceId2, new DateTime(2024, 02, 29), GetSeeds(20), 2.3),
      new BoxAggregate(User1Box1, User1, TreeRepo.PinCherryId, DeviceRepo.DeviceId1, new DateTime(2024, 03, 01), GetSeeds(20), 1.3),
    ];

    KeepSavedVitals(boxes);

    return boxes;
  }

  // TODO: REMOVE THAT WHEN PERSISTANCE IMPLEMENTED
  private void KeepSavedVitals(BoxAggregate[] boxes)
  {
    foreach (var box in boxes)
    {
      if (UpdatedBoxVitals.ContainsKey(box.Id))
      {
        var v = UpdatedBoxVitals[box.Id];
        box.UpdateLuminosityPercentVitals(v.LuminosityPercent.LastUpdate, v.LuminosityPercent.Value);
        box.UpdateAirHumidityPercentVitals(v.AirHumidityPercent.LastUpdate, v.AirHumidityPercent.Value);
        box.UpdateSoilMoisturePercentVitals(v.SoilMoisturePercent.LastUpdate, v.SoilMoisturePercent.Value);
        box.UpdateTemperatureVitals(v.Temperature.LastUpdate, v.Temperature.Value);
      }
    }
  }

  private IEnumerable<Seed> GetSeeds(int count)
  {
    return Enumerable.Range(0, count).Select(i => new Seed(Seed.NewName()));
  }

  public BoxAggregate GetBoxPairedWithDevice(DeviceId deviceId)
  {
    return GetBoxes().Where(b => b.DeviceId == deviceId).First();
  }

  public void Update(BoxAggregate box)
  {
    UpdatedBoxVitals[box.Id] = box.Vitals;
  }
}
