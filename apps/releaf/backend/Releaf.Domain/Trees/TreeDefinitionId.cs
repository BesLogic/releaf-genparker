using Releaf.Shared;

namespace Releaf.Domain.Trees;

public class TreeDefinitionId : ValueObject
{
  public TreeDefinitionId(Guid value)
  {
    Value = value;
  }

  public Guid Value { get; }

  public static TreeDefinitionId New() => new TreeDefinitionId(Guid.NewGuid());

  protected override IEnumerable<object> GetEqualityComponents()
  {
    yield return Value;
  }
}
