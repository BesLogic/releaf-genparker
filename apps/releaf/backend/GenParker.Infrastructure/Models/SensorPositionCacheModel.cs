using GenParker.Domain.DeviceSensorDatas;
using MongoDB.Bson;

namespace GenParker.Infrastructure.Models;

public class SensorPositionCacheModel
{

  public SensorPositionCacheModel()
    : this(string.Empty)
  {
  }

  public SensorPositionCacheModel(string pairingKey)
    : this(ObjectId.Empty, pairingKey, new Dictionary<string, string>())
  {
  }

  public SensorPositionCacheModel(ObjectId id, string pairingKey, Dictionary<string, string> positionToValueTypeMap)
  {
    Id = id;
    PairingKey = pairingKey;
    UniquePositionsToValueTypeMap = positionToValueTypeMap;
  }

  public ObjectId Id { get; set; }

  public string PairingKey { get; set; } = string.Empty;

  public Dictionary<string, string> UniquePositionsToValueTypeMap { get; set; }

  public string GetValueTypeAt(string position, UniquePosition exceptFor)
  {
    var candidates = UniquePositionsToValueTypeMap.Keys.Where(k => k.Split('|').First() == position);
    var filteredCandidates = candidates.Where(c => c != exceptFor.ToString());
    var candidateKey = filteredCandidates.Order().FirstOrDefault() ?? string.Empty;

    if (UniquePositionsToValueTypeMap.ContainsKey(candidateKey))
    {
      return UniquePositionsToValueTypeMap[candidateKey];
    }
    return string.Empty;
  }

  public void SetValueTypeAt(UniquePosition uniquePosition, string valueType)
  {
    UniquePositionsToValueTypeMap[uniquePosition.ToString()] = valueType;
  }
}
