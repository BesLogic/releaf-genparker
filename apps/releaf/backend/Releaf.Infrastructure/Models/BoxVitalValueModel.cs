using Releaf.Domain.Boxes;

namespace Releaf.Infrastructure.Models;

public class BoxVitalValueModel
{
  public double Value { get; set; }
  public DateTime LastUpdate { get; set; }

  public static BoxVitalValueModel From(BoxVitalValue value)
  {
    return new BoxVitalValueModel
    {
      Value = value.Value,
      LastUpdate = value.LastUpdate,
    };
  }
}
