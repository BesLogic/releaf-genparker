using Releaf.Shared;

namespace GenParker.Events;

public class DeviceSensorLogUpdated : DomainEvent
{
  public DeviceSensorLogUpdated(string deviceId, DateTime timeStamp, double temperature, double airHumidity, double soilMoisture, double luminosity)
  {
    DeviceId = deviceId;
    TimeStamp = timeStamp;
    Temperature = temperature;
    AirHumidity = airHumidity;
    SoilMoisture = soilMoisture;
    Luminosity = luminosity;
  }

  public string DeviceId { get; }
  public DateTime TimeStamp { get; }
  public double Temperature { get; }
  public double AirHumidity { get; }
  public double SoilMoisture { get; }
  public double Luminosity { get; }
}
