namespace GenParker.Infrastructure.Exceptions;

public class SensorPositionCacheUpdateException : Exception
{
  public SensorPositionCacheUpdateException(long expectedUpdateCount, long updatedCount)
  : base($"Expected to update {expectedUpdateCount} sensorPositionCache but update {updatedCount} sensorPositionCache")
  {
  }
}
