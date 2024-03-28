using GenParker.Domain.Repo;
using GenParker.Domain.SensorLogs;
using GenParker.Infrastructure.Models;
using Newtonsoft.Json;

namespace GenParker.Infrastructure.Repo;

public class SensorLogsRepo : ISensorLogsRepo
{
  private const string FakeDataFilename = @"C:\projects\perso\releaf-genparker\apps\releaf\backend\GenParker.Infrastructure\fake-sendor-data.txt";

  private static readonly string[] RandomDeviceIds =
  {
    "00-B0-D0-63-C2-26",
    "A1-B0-A0-B1-26-C2"
  };

  private static IEnumerable<SensorLogModel> SensorLogModels = null;

  public SensorLogsRepo()
  {
    if (SensorLogModels == null)
    {
      var lines = File.ReadAllLines(FakeDataFilename);

      var dateTime = new DateTime(2024, 01, 01);
      var rand = new Random(dateTime.Millisecond);

      List<SensorLogModel> sensorLogModels = new List<SensorLogModel>(lines.Length);
      for (int i = 0; i < lines.Length; i++)
      {
        var line = lines[i];
        var sensorLog = JsonConvert.DeserializeObject<SensorLogModel>(line);
        sensorLog.TimeStamp = dateTime;
        sensorLog.DeviceId = RandomDeviceIds[rand.NextInt64(RandomDeviceIds.Length)];
        dateTime = dateTime.AddMinutes(50);
        sensorLogModels.Add(sensorLog);
      }

      SensorLogModels = sensorLogModels;
    }
  }

  public IEnumerable<SensorLog> GetLogsBatch()
  {
    return SensorLogModels.Select(m => m.ToSensorLog()).ToList();
  }
}
