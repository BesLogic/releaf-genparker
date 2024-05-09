using Releaf.Shared;

namespace GenParker.Domain.DeviceSensorDatas;

public class UniquePosition : ValueObject
{
  public UniquePosition(string position, int sensor)
  {
    Position = position;
    Sensor = sensor;
  }

  public string Position { get; }
  public int Sensor { get; }

  protected override IEnumerable<object> GetEqualityComponents()
  {
    yield return Position;
    yield return Sensor;
  }

  public override string ToString()
  {
    return $"{Position}|{Sensor}";
  }
}
