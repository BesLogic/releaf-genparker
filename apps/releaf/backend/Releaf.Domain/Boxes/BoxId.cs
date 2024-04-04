using Releaf.Shared;

namespace Releaf.Domain.Boxes;

public class BoxId : ValueObject
{
  internal static BoxId Empty { get; } = new BoxId(string.Empty);

  public BoxId(string value)
  {
    Value = value;
  }

  public string Value { get; }


  protected override IEnumerable<object> GetEqualityComponents()
  {
    yield return Value;
  }
}
