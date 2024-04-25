namespace Releaf.Infrastructure.Exceptions;

public class BoxUpdateException : Exception
{
  public BoxUpdateException(long expectedUpdateCount, long updatedCount)
    : base($"Expected to update {expectedUpdateCount} boxes but update {updatedCount} boxes")
  {
  }
}
