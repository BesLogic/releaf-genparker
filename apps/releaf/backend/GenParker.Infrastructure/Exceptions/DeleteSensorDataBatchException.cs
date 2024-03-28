namespace GenParker.Infrastructure.Exceptions;

public class DeleteSensorDataBatchException : Exception
{
  public DeleteSensorDataBatchException(long expectedDeletedCount, long deletedCount)
    : base($"Deleting SensorDataBatch fail. Should delete {expectedDeletedCount} elements and deleted only {deletedCount} elements")
  {
  }
}
