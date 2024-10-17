using MediatR;
using Releaf.Domain.Boxes;
using Releaf.Domain.Repo;
using Releaf.Shared;

namespace Releaf.Application.Query;

public class GetBoxesQuery : IRequest<IEnumerable<BoxAggregate>>
{
  public GetBoxesQuery(UserId ownerId)
  {
    OwnerId = ownerId;
  }

  public UserId OwnerId { get; }
}

public class GetBoxesQueryHandler : IRequestHandler<GetBoxesQuery, IEnumerable<BoxAggregate>>
{
  public GetBoxesQueryHandler(IBoxRepo boxRepo, ITreeRepo treeRepo)
  {
    BoxRepo = boxRepo;
    TreeRepo = treeRepo;
  }

  public IBoxRepo BoxRepo { get; }
  public ITreeRepo TreeRepo { get; }

  public Task<IEnumerable<BoxAggregate>> Handle(GetBoxesQuery request, CancellationToken cancellationToken)
  {
    var boxAggregate = BoxRepo.GetBoxesForUser(request.OwnerId);
    
    foreach (var item in boxAggregate)
    {
      var treeDefinition = TreeRepo.GetOne(item.TreeDefinitionId);
      item.ChangeTreeDefinition(treeDefinition);
    }

    return Task.FromResult(boxAggregate);
  }
}
