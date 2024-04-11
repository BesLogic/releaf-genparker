using Releaf.Domain.Trees;

namespace Releaf.Domain.Repo;

public interface ITreeRepo
{
  IEnumerable<TreeDefinitionAggregate> GetAll(int page, int pageSize);
  TreeDefinitionAggregate GetOne(TreeDefinitionId id);
  bool Exists(TreeDefinitionId id);
  TreeDefinitionId Create(TreeDefinitionAggregate treeDefinition);
  long Count();
}
