using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using Releaf.Domain.Boxes;
using Releaf.Domain.Devices;
using Releaf.Domain.Repo;
using Releaf.Infrastructure.Exceptions;
using Releaf.Infrastructure.Models;
using Releaf.Infrastructure.Settings;
using Releaf.Shared;

namespace Releaf.Infrastructure.Repo;

public class BoxRepo : IBoxRepo
{
  private IOptions<MongoDbSettings> Options { get; }

  public BoxRepo(IOptions<MongoDbSettings> options)
  {
    Options = options;
  }

  public IEnumerable<BoxAggregate> GetBoxesForUser(UserId ownerId)
  {
    var boxesCollection = GetBoxCollection();

    var ownerIdEq = Builders<BoxModel>.Filter.Eq(b => b.OwnerId, ownerId.Value);
    var boxes = boxesCollection.Find(ownerIdEq).ToList();

    return boxes.Select(b => b.ToBox()).ToList();
  }

  public BoxAggregate GetBox(UserId ownerId, BoxId boxId)
  {
    var boxesCollection = GetBoxCollection();

    var boxIdEq = Builders<BoxModel>.Filter.Eq(b => b.Id, new ObjectId(boxId.Value));
    var boxes = boxesCollection.Find(boxIdEq).Limit(1).ToList().Where(b => b.OwnerId == ownerId.Value).ToList();

    return boxes.First().ToBox();
  }

  private IMongoCollection<BoxModel> GetBoxCollection()
  {
    var client = new MongoClient(Options.Value.ConnectionString);
    var boxesCollection = client.GetDatabase(Options.Value.DbName).GetCollection<BoxModel>("boxes");
    return boxesCollection;
  }

  public BoxAggregate GetBoxPairedWithDevice(DeviceId deviceId)
  {
    var boxesCollection = GetBoxCollection();

    var deviceEq = Builders<BoxModel>.Filter.Eq(b => b.DeviceId, deviceId.Value);
    var box = boxesCollection.Find(deviceEq).Limit(1).First();

    return box.ToBox();
  }

  public void Update(BoxAggregate box)
  {
    var model = BoxModel.From(box);

    var boxesCollection = GetBoxCollection();

    var filter = Builders<BoxModel>.Filter.Eq(b => b.Id, model.Id);

    var result = boxesCollection.ReplaceOne(filter, model);
    if (result.ModifiedCount != 1)
    {
      throw new BoxUpdateException(1, result.ModifiedCount);
    }
  }
}
