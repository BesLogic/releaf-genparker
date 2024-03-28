
using Releaf.Domain.Boxes;

namespace Releaf.Infrastructure.Models;

public class SeedModel
{
  public string Name { get; set; } = string.Empty;

  internal static SeedModel From(Seed s)
  {
    return new SeedModel
    {
      Name = s.Name
    };
  }

  public Seed ToSeed()
  {
    return new Seed(Name);
  }
}
