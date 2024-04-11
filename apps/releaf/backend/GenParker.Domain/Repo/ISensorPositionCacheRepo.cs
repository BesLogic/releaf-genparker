namespace GenParker.Domain.Repo;

public interface ISensorPositionCacheRepo
{
  string GetCachedTypeForPosition(string pairingKey, string position);
  void SetCachedTypeForPosition(string pairingKey, string position, string valueType);
}
