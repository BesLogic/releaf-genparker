using Releaf.Shared;

namespace Releaf.Auth.Impl;

internal class MockCurrentUser : ICurrentUser
{
  public UserId Id => new UserId("mrbamboo");
}
