using Releaf.Shared;

namespace Releaf.Domain.Devices;

public class DeviceId : ValueObject
{
  public DeviceId(string value)
  {
    Value = value;
  }

  public string Value { get; }

  protected override IEnumerable<object> GetEqualityComponents()
  {
    yield return Value;
  }
}
