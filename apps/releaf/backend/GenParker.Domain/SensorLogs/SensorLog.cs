
namespace GenParker.Domain.SensorLogs;

public class SensorLog
{
  public SensorLog(DateTime timeStamp, string deviceId, double temperature, double airHumidity, double soilMoisture, double luminosity)
  {
    TimeStamp = timeStamp;
    DeviceId = deviceId;
    Temperature = temperature;
    AirHumidity = airHumidity;
    SoilMoisture = soilMoisture;
    Luminosity = luminosity;
  }

  public DateTime TimeStamp { get; }
  public string DeviceId { get; }
  public double Temperature { get; }
  public double AirHumidity { get; }
  public double SoilMoisture { get; }
  public double Luminosity { get; }
}
