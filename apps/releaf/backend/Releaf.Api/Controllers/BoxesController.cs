using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Releaf.Application.Commands;
using Releaf.Application.Query;
using Releaf.Auth;
using Releaf.Domain.Boxes;
using Releaf.Domain.Repo;
using Releaf.Domain.Trees;

namespace Releaf.Backend.Controllers;

[ApiController]
[Authorize]
[Route("[controller]")]
public class BoxesController : ControllerBase
{
  private readonly ILogger<TreesController> _logger;
  private readonly IMediator mediator;
  private readonly IBoxRepo boxRepo;
  private readonly ICurrentUser currentUser;

  public BoxesController(
    ILogger<TreesController> logger,
    IMediator mediator,
    IBoxRepo boxRepo,
    ICurrentUser currentUser)
  {
    _logger = logger;
    this.mediator = mediator;
    this.boxRepo = boxRepo;
    this.currentUser = currentUser;
  }

  [HttpPost("Initialize")]
  public async Task<InitializeBoxCmdResult> Initialize(string treeDefinitionId, string uniquePairingKey)
  {
    var cmd = new InitializeBoxCommand(currentUser.Id, new TreeDefinitionId(treeDefinitionId), new BoxPairingKey(uniquePairingKey));
    var result = await mediator.Send(cmd);

    return result;
  }

  [HttpGet]
  public async Task<IEnumerable<BoxAggregate>> GetAll()
  {
    var cmd = new GetBoxesQuery(currentUser.Id);
    var result = await mediator.Send(cmd);

    return result;
  }

  [HttpGet("{id}")]
  public BoxAggregate GetBoxDetails(string id)
  {
    return boxRepo.GetBox(currentUser.Id, new BoxId(id));
  }

  [HttpPatch("{boxId}/GrowthInfo")]
  public BoxAggregate UpdateGrowthInfo(string boxId, GrowthInfo growthInfo)
  {
    var box = boxRepo.GetBox(currentUser.Id, new BoxId(boxId));
    box.ChangeGrowthInfo(growthInfo);
    boxRepo.Update(currentUser.Id, box);
    return box;
  }
}
