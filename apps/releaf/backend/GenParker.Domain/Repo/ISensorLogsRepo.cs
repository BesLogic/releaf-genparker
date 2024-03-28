using GenParker.Domain.SensorLogs;

namespace GenParker.Domain.Repo;

public interface ISensorLogsRepo
{
  IEnumerable<SensorLog> GetLogsBatch();
}
