using Releaf.Domain.Devices;
using Releaf.Domain.Repo;

namespace Releaf.Infrastructure.Repo;

public class DeviceRepo : IDeviceRepo
{
  public static readonly DeviceId DeviceId1 = new DeviceId("00-B0-D0-63-C2-26");
  public static readonly DeviceId DeviceId2 = new DeviceId("A1-B0-A0-B1-26-C2");
}
