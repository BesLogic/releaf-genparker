using Microsoft.AspNetCore.Mvc;
using Releaf.Auth;
using Releaf.Domain.Boxes;
using Releaf.Domain.Repo;

namespace Releaf.Backend.Controllers;

[ApiController]
[Route("[controller]")]
public class BoxsController : ControllerBase
{
  private readonly ILogger<TreesController> _logger;
  private readonly IBoxRepo boxRepo;
  private readonly ICurrentUser currentUser;

  public BoxsController(
    ILogger<TreesController> logger,
    IBoxRepo boxRepo,
    ICurrentUser currentUser)
  {
    _logger = logger;
    this.boxRepo = boxRepo;
    this.currentUser = currentUser;
  }

  [HttpGet]
  public IEnumerable<Guid> GetAll()
  {
    IEnumerable<BoxAggregate> boxes = boxRepo.GetBoxesForUser(currentUser.Id);
    return boxes.Select(t => t.Id.Value);
  }

  [HttpGet("{id}")]
  public BoxAggregate GetBoxDetails(Guid id)
  {
    return boxRepo.GetBox(currentUser.Id, new BoxId(id));
  }
}
