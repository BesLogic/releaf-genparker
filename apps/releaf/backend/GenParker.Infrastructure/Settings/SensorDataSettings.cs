namespace GenParker.Infrastructure.Settings;

public class SensorDataSettings
{
  public int SyncBatchSize { get; set; } = 1000;
  public int SyncSpeedInSecs { get; set; } = 60;
}
