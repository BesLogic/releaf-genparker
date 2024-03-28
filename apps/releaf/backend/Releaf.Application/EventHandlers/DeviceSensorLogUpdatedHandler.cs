using GenParker.Events;
using MediatR;
using Releaf.Domain.Boxes;
using Releaf.Domain.Devices;
using Releaf.Domain.Repo;

namespace Releaf.Application.EventHandlers;

public class DeviceSensorLogUpdatedHandler : INotificationHandler<DeviceSensorLogUpdated>
{
  public double Temperature { get; }
  public double AirHumidity { get; }
  public double SoilMoisture { get; }
  public double Luminosity { get; }

  public DeviceSensorLogUpdatedHandler(IBoxRepo boxRepo)
  {
    BoxRepo = boxRepo;
  }

  public IBoxRepo BoxRepo { get; }

  public Task Handle(DeviceSensorLogUpdated notification, CancellationToken cancellationToken)
  {
    var deviceId = new DeviceId(notification.DeviceId);
    var box = BoxRepo.GetBoxPairedWithDevice(deviceId);

    CheckIfUpdateTemperature(box, notification);
    CheckIfUpdateAirHumidity(box, notification);
    CheckIfUpdateMoisture(box, notification);
    UpdateLuminosity(box, notification);

    BoxRepo.Update(box);

    return Task.CompletedTask;
  }

  // NOT TESTED YET
  // Error on sensor reading will return -99 or the temperature value in celcius
  private void CheckIfUpdateTemperature(BoxAggregate box, DeviceSensorLogUpdated notification)
  {
    if (notification.Temperature <= -99)
    {
      return;
    }

    box.UpdateTemperatureVitals(notification.TimeStamp, notification.Temperature);
  }

  // NOT TESTED YET
  // https://www.circuitbasics.com/how-to-set-up-the-dht11-humidity-sensor-on-an-arduino/
  // value is between 0 and 100
  private void CheckIfUpdateAirHumidity(BoxAggregate box, DeviceSensorLogUpdated notification)
  {
    if (notification.AirHumidity < 0 || notification.AirHumidity > 100)
    {
      return;
    }

    box.UpdateAirHumidityPercentVitals(notification.TimeStamp, notification.AirHumidity / 100d);
  }

  // NOT TESTED YET
  // https://www.instructables.com/Soil-Moisture-Measurement-With-Arduino/
  // - Value over 1000 = device disconnected or not in soil
  // - SoilMoisture is Dry between 600 and 1000
  // - SoilMoisture is Humid between 370 and 600
  // - SoilMoisture is Water under 370
  private void CheckIfUpdateMoisture(BoxAggregate box, DeviceSensorLogUpdated notification)
  {
    // Disconnected
    if (SoilMoistureDisconnected(notification))
    {
      return;
    }

    var perthousand = 1000d - notification.SoilMoisture;
    var soilMoisturePercent = perthousand / 1000d;

    box.UpdateSoilMoisturePercentVitals(notification.TimeStamp, soilMoisturePercent);
  }

  // NOT TESTED YET
  // - Value over 1000 = device disconnected or not in soil
  private static bool SoilMoistureDisconnected(DeviceSensorLogUpdated notification)
  {
    return notification.SoilMoisture > 1000;
  }

  // NOT TESTED YET
  // https://sensorkit.arduino.cc/sensorkit/module/lessons/lesson/05-the-light-sensor
  // - Value between 0 and 1023
  private void UpdateLuminosity(BoxAggregate box, DeviceSensorLogUpdated notification)
  {
    var luminosityPercent = notification.Luminosity / 1023d;
    box.UpdateLuminosityPercentVitals(notification.TimeStamp, luminosityPercent);
  }
}
