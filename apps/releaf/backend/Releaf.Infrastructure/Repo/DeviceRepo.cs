using Releaf.Domain.Devices;
using Releaf.Domain.Repo;

namespace Releaf.Infrastructure.Repo;

public class DeviceRepo : IDeviceRepo
{
  public static readonly DeviceId DeviceId = new DeviceId("123456789012345678901234567890123456789012345678901234567890AAA3");
}
