using GenParker.Domain.DeviceSensorDatas;

namespace GenParker.Domain.Repo;

public interface ISensorPositionCacheRepo
{
  string GetCachedTypeForPosition(string pairingKey, string position, UniquePosition exceptFor);
  void SetCachedTypeForUniquePosition(string pairingKey, UniquePosition uniquePosition, string valueType);
}
