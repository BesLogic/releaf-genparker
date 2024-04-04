namespace Releaf.Domain.Trees;

public class TreeDefinitionAggregate
{
  public TreeDefinitionAggregate(string name, int estimatedGerminationDurationDays)
  {
    Name = name;
    EstimatedGerminationDurationDays = estimatedGerminationDurationDays;
  }

  public TreeDefinitionAggregate(string name, int estimatedGerminationDurationDays, IEnumerable<TreeInstruction> instructions)
  {
    Name = name;
    EstimatedGerminationDurationDays = estimatedGerminationDurationDays;
    Instructions = instructions;
  }

  public TreeDefinitionAggregate(TreeDefinitionId id, string name, int estimatedGerminationDurationDays)
  {
    Id = id;
    Name = name;
    EstimatedGerminationDurationDays = estimatedGerminationDurationDays;
  }

  public TreeDefinitionAggregate(TreeDefinitionId id, string name, int estimatedGerminationDurationDays, IEnumerable<TreeInstruction> instructions)
  {
    Id = id;
    Name = name;
    EstimatedGerminationDurationDays = estimatedGerminationDurationDays;
    Instructions = instructions;
  }

  public string Name { get; } = string.Empty;

  public TreeDefinitionId Id { get; } = TreeDefinitionId.Empty();

  public IEnumerable<TreeInstruction> Instructions { get; } = Enumerable.Empty<TreeInstruction>();
  public int EstimatedGerminationDurationDays { get; }
}
