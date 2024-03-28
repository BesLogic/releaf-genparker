namespace Releaf.Domain.Trees;

public class TreeDefinitionAggregate
{
  public TreeDefinitionAggregate(string name)
  {
    Name = name;
  }

  public TreeDefinitionAggregate(TreeDefinitionId id, string name)
  {
    Id = id;
    Name = name;
  }

  public TreeDefinitionAggregate(TreeDefinitionId id, string name, IEnumerable<TreeInstruction> instructions)
  {
    Id = id;
    Name = name;
    Instructions = instructions;
  }

  public string Name { get; } = string.Empty;

  public TreeDefinitionId Id { get; } = TreeDefinitionId.Empty();

  public IEnumerable<TreeInstruction> Instructions { get; } = Enumerable.Empty<TreeInstruction>();
}
