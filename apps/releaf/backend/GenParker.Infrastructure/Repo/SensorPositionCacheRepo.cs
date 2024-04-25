using GenParker.Domain.DeviceSensorDatas;
using GenParker.Domain.Repo;
using GenParker.Infrastructure.Exceptions;
using GenParker.Infrastructure.Models;
using GenParker.Infrastructure.Settings;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;

namespace GenParker.Infrastructure.Repo;

public class SensorPositionCacheRepo : ISensorPositionCacheRepo
{
  public SensorPositionCacheRepo(IOptions<GenParkerMongoDbSettings> options)
  {
    GenParkerMongoDbSettings = options.Value;
  }

  private GenParkerMongoDbSettings GenParkerMongoDbSettings { get; }

  public string GetCachedTypeForPosition(string pairingKey, string position, UniquePosition exceptFor)
  {
    var collection = GetCollection();

    var filter = Builders<SensorPositionCacheModel>.Filter.Eq(c => c.PairingKey, pairingKey);
    var sensorPositionCache = collection
      .Find(filter)
      .FirstOrDefault();

    if (sensorPositionCache != null)
    {
      return sensorPositionCache.GetValueTypeAt(position, exceptFor);
    }

    return string.Empty;
  }

  public void SetCachedTypeForUniquePosition(string pairingKey, UniquePosition uniquePosition, string valueType)
  {
    var collection = GetCollection();

    var filter = Builders<SensorPositionCacheModel>.Filter.Eq(c => c.PairingKey, pairingKey);
    var sensorPositionCache = collection
      .Find(filter)
      .FirstOrDefault();

    Upsert(pairingKey, uniquePosition, valueType, sensorPositionCache);
  }

  private SensorPositionCacheModel Upsert(string pairingKey, UniquePosition uniquePosition, string valueType, SensorPositionCacheModel? sensorPositionCache)
  {
    if (sensorPositionCache != null)
    {
      sensorPositionCache.SetValueTypeAt(uniquePosition, valueType);
      Update(sensorPositionCache);
    }
    else
    {
      sensorPositionCache = new SensorPositionCacheModel(pairingKey);
      sensorPositionCache.SetValueTypeAt(uniquePosition, valueType);
      Create(sensorPositionCache);
    }

    return sensorPositionCache;
  }

  private ObjectId Create(SensorPositionCacheModel sensorPositionCache)
  {
    GetCollection().InsertOne(sensorPositionCache);
    return sensorPositionCache.Id;
  }

  private void Update(SensorPositionCacheModel sensorPositionCache)
  {
    var filter = Builders<SensorPositionCacheModel>.Filter.Eq(b => b.Id, sensorPositionCache.Id);

    var result = GetCollection().ReplaceOne(filter, sensorPositionCache);
    if (result.MatchedCount != 1)
    {
      throw new SensorPositionCacheUpdateException(1, result.ModifiedCount);
    }
  }

  private IMongoCollection<SensorPositionCacheModel> GetCollection()
  {
    var client = new MongoClient(GenParkerMongoDbSettings.ConnectionString);
    return client.GetDatabase(GenParkerMongoDbSettings.DbName).GetCollection<SensorPositionCacheModel>("sensor_position_cache");
  }
}
