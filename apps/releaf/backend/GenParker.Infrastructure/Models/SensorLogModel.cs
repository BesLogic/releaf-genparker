using GenParker.Domain.SensorLogs;

namespace GenParker.Infrastructure.Models;

public class SensorLogModel
{
  public DateTime TimeStamp { get; set; }
  public string DeviceId { get; set; }
  public double A1 { get; set; }
  public double A2 { get; set; }
  public double B7 { get; set; }
  public double C14 { get; set; }

  public SensorLog ToSensorLog()
  {
    return new SensorLog(TimeStamp, DeviceId, A1, A2, B7, C14);
  }
}
