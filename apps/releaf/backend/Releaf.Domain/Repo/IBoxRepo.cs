using Releaf.Domain.Boxes;
using Releaf.Shared;

namespace Releaf.Domain.Repo;

public interface IBoxRepo
{
  BoxAggregate GetBox(UserId ownerId, BoxId boxId);
  IEnumerable<BoxAggregate> GetBoxesForUser(UserId ownerId);
  bool BoxAlreadyPaired(UserId ownerId, BoxPairingKey pairingKey);
  BoxAggregate GetBoxWithPairingKey(UserId ownerId, BoxPairingKey pairingKey);
  void Update(UserId ownerId, BoxAggregate box);
  BoxId Create(UserId ownerId,BoxAggregate box);
}
