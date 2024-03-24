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

  public TreeDefinitionId Id { get; } = TreeDefinitionId.New();

  public IEnumerable<TreeInstruction> Instructions { get; } = Enumerable.Empty<TreeInstruction>();
}

public record TreeDefinitionId(Guid Value)
{
  public static TreeDefinitionId New() => new TreeDefinitionId(Guid.NewGuid());
}
