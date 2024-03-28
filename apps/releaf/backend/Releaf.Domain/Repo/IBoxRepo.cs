using Releaf.Domain.Boxes;
using Releaf.Domain.Devices;
using Releaf.Shared;

namespace Releaf.Domain.Repo;

public interface IBoxRepo
{
  BoxAggregate GetBox(UserId ownerId, BoxId boxId);
  IEnumerable<BoxAggregate> GetBoxesForUser(UserId ownerId);
  BoxAggregate GetBoxPairedWithDevice(DeviceId deviceId);
  void Update(BoxAggregate box);
}
