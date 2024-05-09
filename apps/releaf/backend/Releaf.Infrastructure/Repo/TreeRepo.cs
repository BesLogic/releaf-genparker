using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Driver;
using Releaf.Domain.Repo;
using Releaf.Domain.Trees;
using Releaf.Infrastructure.Exceptions;
using Releaf.Infrastructure.Models;
using Releaf.Infrastructure.Settings;

namespace Releaf.Infrastructure.Repo;

public class TreeRepo : ITreeRepo
{
  public static void InitClassMap()
  {
    BsonClassMap.RegisterClassMap<TreeDefinitionModel>(cm =>
    {
      cm.AutoMap();
      cm.MapCreator(t => new TreeDefinitionModel(t.Name, t.Id, t.EstimatedGerminationDurationDays, t.Instructions));
    });
  }

  private IOptions<MongoDbSettings> Options { get; }

  public TreeRepo(IOptions<MongoDbSettings> options)
  {
    Options = options;
  }

  public IEnumerable<TreeDefinitionAggregate> GetAll(int page, int pageSize)
  {
    if (page < 1 || pageSize < 1)
    {
      throw new InvalidPagingException();
    }

    var filter = Builders<TreeDefinitionModel>.Filter.Empty;
    var treeDefinitionsModels =
      GetCollection()
        .Find(filter)
          .Skip((page - 1) * pageSize)
          .Limit(pageSize)
        .ToList();

    return treeDefinitionsModels.Select(m => m.ToTreeDefinitionAggregate()).ToList();
  }

  public TreeDefinitionAggregate GetOne(TreeDefinitionId id)
  {
    var filter = Builders<TreeDefinitionModel>.Filter.Eq(m => m.Id, new MongoDB.Bson.ObjectId(id.Value));
    var treeDefinitionModel = GetCollection().Find(filter).Limit(1).FirstOrDefault();
    return treeDefinitionModel.ToTreeDefinitionAggregate();
  }

  public TreeDefinitionId Create(TreeDefinitionAggregate treeDefinition)
  {
    var model = TreeDefinitionModel.FromNew(treeDefinition);
    GetCollection().InsertOne(model);
    return new TreeDefinitionId(model.Id.ToString());
  }

  public long Count()
  {
    var filter = Builders<TreeDefinitionModel>.Filter.Empty;
    return GetCollection().Find(filter).CountDocuments();
  }

  public bool Exists(TreeDefinitionId id)
  {
    if (ObjectId.TryParse(id.Value, out ObjectId objId))
    {
      var filter = Builders<TreeDefinitionModel>.Filter.Eq(t => t.Id, objId);
      return GetCollection().Find(filter).CountDocuments() > 0;
    }

    return false;
  }

  private IMongoCollection<TreeDefinitionModel> GetCollection()
  {
    var client = new MongoClient(Options.Value.ConnectionString);
    return client.GetDatabase(Options.Value.DbName).GetCollection<TreeDefinitionModel>("tree_definitions");
  }
}
