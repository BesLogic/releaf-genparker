using MongoDB.Bson;
using Releaf.Domain.Trees;

namespace Releaf.Infrastructure.Models;

public class TreeDefinitionModel
{
  public TreeDefinitionModel(
    string name,
    ObjectId id,
    TreeInstruction[] instructions)
  {
    Name = name;
    Id = id;
    Instructions = instructions;
  }

  public string Name { get; } = string.Empty;

  public ObjectId Id { get; }

  public TreeInstruction[] Instructions { get; } = Array.Empty<TreeInstruction>();

  public static TreeDefinitionModel From(TreeDefinitionAggregate treeDefinition)
  {
    var id = GetIdOrNew(treeDefinition);
    return new TreeDefinitionModel(
      treeDefinition.Name,
      id,
      treeDefinition.Instructions.ToArray()
    );
  }

  private static ObjectId GetIdOrNew(TreeDefinitionAggregate treeDefinition)
  {
    if (!string.IsNullOrEmpty(treeDefinition.Id.Value))
    {
      return new ObjectId(treeDefinition.Id.Value);
    }
    return ObjectId.GenerateNewId();
  }

  internal TreeDefinitionAggregate ToTreeDefinitionAggregate()
  {
    var id = new TreeDefinitionId(Id.ToString());
    return
      new TreeDefinitionAggregate(
        id,
        Name,
        Instructions);
  }
}
