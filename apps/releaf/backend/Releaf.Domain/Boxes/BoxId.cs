using Releaf.Shared;

namespace Releaf.Domain.Boxes;

public class BoxId : ValueObject
{
  public BoxId(Guid value)
  {
    Value = value;
  }

  public Guid Value { get; }

  public static BoxId New() => new BoxId(Guid.NewGuid());

  protected override IEnumerable<object> GetEqualityComponents()
  {
    yield return Value;
  }
}
