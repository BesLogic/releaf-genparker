using Releaf.Shared;

namespace Releaf.Domain.Trees;

public class TreeDefinitionId : ValueObject
{
  public TreeDefinitionId(string value)
  {
    Value = value;
  }

  public string Value { get; }

  public static TreeDefinitionId Empty() => new TreeDefinitionId(string.Empty);

  protected override IEnumerable<object> GetEqualityComponents()
  {
    yield return Value;
  }
}
