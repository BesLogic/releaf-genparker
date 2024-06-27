using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using Releaf.Domain.Boxes;
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
    var boxesCollection = GetCollection();

    var ownerIdEq = Builders<BoxModel>.Filter.Eq(b => b.OwnerId, ownerId.Value);
    var boxes = boxesCollection.Find(ownerIdEq).ToList();

    return boxes.Select(b => b.ToBox()).ToList();
  }

  public BoxAggregate GetBox(UserId ownerId, BoxId boxId)
  {
    var boxesCollection = GetCollection();

    var boxIdEq = Builders<BoxModel>.Filter.Eq(b => b.Id, new ObjectId(boxId.Value));
    var boxes = boxesCollection.Find(boxIdEq).Limit(1).ToList().Where(b => b.OwnerId == ownerId.Value).ToList();

    return boxes.First().ToBox();
  }

  private IMongoCollection<BoxModel> GetCollection()
  {
    var client = new MongoClient(Options.Value.ConnectionString);
    var boxesCollection = client.GetDatabase(Options.Value.DbName).GetCollection<BoxModel>("boxes");
    return boxesCollection;
  }

  public BoxAggregate GetBoxWithPairingKey(BoxPairingKey pairingKey)
  {
    var filter = Builders<BoxModel>.Filter.Eq(b => b.PairingKey, pairingKey.Value);
    var box = GetCollection().Find(filter).Limit(1).First();

    return box.ToBox();
  }

  public bool BoxAlreadyPaired(BoxPairingKey pairingKey)
  {
    var filter = Builders<BoxModel>.Filter.Eq(b => b.PairingKey, pairingKey.Value);
    return GetCollection().Find(filter).Limit(1).CountDocuments() > 0;
  }

  public void Update(UserId ownerId, BoxAggregate box)
  {
    if (box.OwnerId != ownerId)
    {
      throw new Exception("You can't update a box that doesn't belong to you");
    }

    InternalUpdate(box);
  }

  public void UpdateBoxWithPairingKey(BoxPairingKey pairingKey, BoxAggregate box)
  {
    var ogBox = GetBoxWithPairingKey(pairingKey);
    if(ogBox.OwnerId == box.OwnerId)
    {
      throw new Exception("You can't update a box that doesn't belong to the pairingKey's owner");
    }

    InternalUpdate(box);
  }

  private void InternalUpdate(BoxAggregate box)
  {
    var model = BoxModel.From(box);

    var filter = Builders<BoxModel>.Filter.Eq(b => b.Id, model.Id);

    var result = GetCollection().ReplaceOne(filter, model);
    if (result.MatchedCount != 1)
    {
      throw new BoxUpdateException(1, result.ModifiedCount);
    }
  }

  public BoxId Create(UserId ownerId, BoxAggregate box)
  {
    if (box.OwnerId != ownerId)
    {
      throw new Exception("You can't create a box that doesn't belong to you");
    }

    var model = BoxModel.FromNew(box);
    GetCollection().InsertOne(model);
    return new BoxId(model.Id.ToString());
  }
}
