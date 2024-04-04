using Releaf.Domain.Boxes;
using Releaf.Shared;

namespace Releaf.Domain.Repo;

public interface IBoxRepo
{
  BoxAggregate GetBox(UserId ownerId, BoxId boxId);
  IEnumerable<BoxAggregate> GetBoxesForUser(UserId ownerId);
  bool BoxAlreadyPaired(BoxPairingKey pairingKey);
  BoxAggregate GetBoxWithPairingKey(BoxPairingKey pairingKey);
  void Update(BoxAggregate box);
  BoxId Create(BoxAggregate box);
}
