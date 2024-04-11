
namespace Releaf.Shared;

public class UserId : ValueObject
{
  public UserId(string value)
  {
    Value = value;
  }

  public string Value { get; }

  protected override IEnumerable<object> GetEqualityComponents()
  {
    yield return Value;
  }
}
