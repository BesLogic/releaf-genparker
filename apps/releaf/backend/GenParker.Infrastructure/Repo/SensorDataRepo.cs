using GenParker.Domain.DeviceSensorDatas;
using GenParker.Domain.Repo;
using GenParker.Infrastructure.Exceptions;
using GenParker.Infrastructure.Models;
using GenParker.Infrastructure.Settings;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;

namespace GenParker.Infrastructure.Repo;

public class SensorDataRepo : ISensorDataRepo
{
  public SensorDataRepo(IOptions<KafkaMongoDbSettings> mongoDbSettings, IOptions<SensorDataSettings> sensorDataSettings)
  {
    MongoDbSettings = mongoDbSettings.Value;
    SensorDataSettings = sensorDataSettings.Value;
  }

  private KafkaMongoDbSettings MongoDbSettings { get; }
  private SensorDataSettings SensorDataSettings { get; }

  public IEnumerable<DeviceSensorData> GetNextBatch()
  {
    var dataCollection = GetDataCollection();
    var page = dataCollection
      .Find(Builders<Data>.Filter.Empty)
      .SortBy(d => d.date)
      .Limit(SensorDataSettings.SyncBatchSize)
      .ToList();

    return page.Select(d => d.ToSensorLog()).ToList();
  }

  public void DeleteBatchById(IEnumerable<string> ids)
  {
    var dataCollection = GetDataCollection();

    var objectIds = ids.Select(i => new ObjectId(i));

    var filter = Builders<Data>
      .Filter
      .In(b => b.Id, objectIds);

    var result = dataCollection.DeleteMany(filter);

    var expectedCount = ids.Count();
    if (result.DeletedCount != expectedCount)
    {
      throw new DeleteSensorDataBatchException(expectedCount, result.DeletedCount);
    }
  }

  private IMongoCollection<Data> GetDataCollection()
  {
    var client = new MongoClient(MongoDbSettings.ConnectionString);
    return client.GetDatabase(MongoDbSettings.DbName).GetCollection<Data>("data");
  }
}
