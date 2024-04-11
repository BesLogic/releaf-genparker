using Releaf.Shared;

namespace Releaf.Auth;

public interface ICurrentUser
{
  UserId Id { get; }
}
