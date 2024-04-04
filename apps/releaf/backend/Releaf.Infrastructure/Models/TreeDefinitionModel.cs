using MongoDB.Bson;
using Releaf.Domain.Trees;

namespace Releaf.Infrastructure.Models;

public class TreeDefinitionModel
{
  public TreeDefinitionModel(
    string name,
    ObjectId id,
    int estimatedGerminationDurationDays,
    TreeInstruction[] instructions)
  {
    Name = name;
    Id = id;
    EstimatedGerminationDurationDays = estimatedGerminationDurationDays;
    Instructions = instructions;
  }

  public string Name { get; } = string.Empty;

  public ObjectId Id { get; }
  public int EstimatedGerminationDurationDays { get; }
  public TreeInstruction[] Instructions { get; } = Array.Empty<TreeInstruction>();

  public static TreeDefinitionModel From(TreeDefinitionAggregate treeDefinition)
  {
    var id = new ObjectId(treeDefinition.Id.Value);
    return FromInternal(treeDefinition, id);
  }

  public static TreeDefinitionModel FromNew(TreeDefinitionAggregate treeDefinition)
  {
    var id = GetIdOrNew(treeDefinition);
    return FromInternal(treeDefinition, id);
  }

  private static TreeDefinitionModel FromInternal(TreeDefinitionAggregate treeDefinition, ObjectId id)
  {
    return
      new TreeDefinitionModel(
        treeDefinition.Name,
        id,
        treeDefinition.EstimatedGerminationDurationDays,
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
        EstimatedGerminationDurationDays,
        Instructions);
  }
}
