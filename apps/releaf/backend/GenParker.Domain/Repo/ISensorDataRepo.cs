using GenParker.Domain.DeviceSensorDatas;

namespace GenParker.Domain.Repo;

public interface ISensorDataRepo
{
  void DeleteBatchById(IEnumerable<string> ids);
  IEnumerable<DeviceSensorData> GetNextBatch();
}
