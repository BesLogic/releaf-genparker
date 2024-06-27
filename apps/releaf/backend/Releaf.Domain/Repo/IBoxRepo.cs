using Releaf.Domain.Boxes;
using Releaf.Shared;

namespace Releaf.Domain.Repo;

public interface IBoxRepo
{
  BoxAggregate GetBox(UserId ownerId, BoxId boxId);
  IEnumerable<BoxAggregate> GetBoxesForUser(UserId ownerId);
  void Update(UserId ownerId, BoxAggregate box);
  BoxId Create(UserId ownerId, BoxAggregate box);

  /// <summary>
  /// No authentication required for those methods ??
  /// </summary>
  bool BoxAlreadyPaired(BoxPairingKey pairingKey);
  BoxAggregate GetBoxWithPairingKey(BoxPairingKey pairingKey);
  void UpdateBoxWithPairingKey(BoxPairingKey pairingKey, BoxAggregate box);
}
