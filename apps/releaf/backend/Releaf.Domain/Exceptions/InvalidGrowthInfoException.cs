using Releaf.Shared;

namespace Releaf.Domain.Exceptions;

public class InvalidGrowthInfoException : DomainException
{
  public InvalidGrowthInfoException()
    : base($"Growth info should have SeedsAverageInchHeight > 0 and GerminationDay date defined")
  {
  }
}
