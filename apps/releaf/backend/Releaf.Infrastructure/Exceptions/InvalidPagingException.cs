using Releaf.Shared;

namespace Releaf.Infrastructure.Exceptions;

public class InvalidPagingException : DomainException
{
  public InvalidPagingException() : base("The page index and pageSize should be more than zero")
  {
  }
}
