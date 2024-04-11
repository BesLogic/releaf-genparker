using Releaf.Domain.Trees;
using Releaf.Shared;

namespace Releaf.Domain.Exceptions;

public class TreeWithIdNotFoundException : DomainException
{
  public TreeWithIdNotFoundException(TreeDefinitionId treeDefinitionId) : base($"Tree with Id: {treeDefinitionId?.Value} not found")
  {
  }
}
