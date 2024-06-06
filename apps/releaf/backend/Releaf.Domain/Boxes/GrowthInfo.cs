
namespace Releaf.Domain.Boxes;

public class GrowthInfo
{
  public GrowthInfo(double seedsAverageInchHeight, DateTime germinationDay)
  {
    SeedsAverageInchHeight = seedsAverageInchHeight;
    GerminationDay = germinationDay;
  }

  public double SeedsAverageInchHeight { get; }
  public DateTime GerminationDay { get; }
}
