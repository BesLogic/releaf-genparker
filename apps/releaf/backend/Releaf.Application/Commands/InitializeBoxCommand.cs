using MediatR;
using Releaf.Domain.Boxes;
using Releaf.Domain.Repo;
using Releaf.Domain.Trees;

namespace Releaf.Application.Commands;

public class InitializeBoxCommand : IRequest<InitializeBoxCmdResult>
{
  public InitializeBoxCommand(string ownerId, TreeDefinitionId treeDefinitionId, BoxPairingKey uniquePairingKey)
  {
    OwnerId = ownerId;
    TreeDefinitionId = treeDefinitionId;
    PairingKey = uniquePairingKey;
  }

  public string OwnerId { get; }
  public TreeDefinitionId TreeDefinitionId { get; }
  public BoxPairingKey PairingKey { get; }
}

public class InitializeBoxCommandHandler : IRequestHandler<InitializeBoxCommand, InitializeBoxCmdResult>
{
  public InitializeBoxCommandHandler(IBoxRepo boxRepo, ITreeRepo treeRepo)
  {
    BoxRepo = boxRepo;
    TreeRepo = treeRepo;
  }

  public IBoxRepo BoxRepo { get; }
  public ITreeRepo TreeRepo { get; }

  public Task<InitializeBoxCmdResult> Handle(InitializeBoxCommand request, CancellationToken cancellationToken)
  {
    var box = BoxAggregate.Initialize(TreeRepo, BoxRepo, request.OwnerId, request.TreeDefinitionId, request.PairingKey);
    var boxId = BoxRepo.Create(box);
    return Task.FromResult(new InitializeBoxCmdResult(boxId));
  }
}

public class InitializeBoxCmdResult
{
  public InitializeBoxCmdResult(BoxId boxId)
  {
    BoxId = boxId.Value;
  }

  public string BoxId { get; }
}
