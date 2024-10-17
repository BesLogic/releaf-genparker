using Microsoft.AspNetCore.Mvc;
using Releaf.Domain.Repo;
using Releaf.Domain.Trees;

namespace Releaf.Backend.Controllers;

[ApiController]
[Route("[controller]")]
public class TreesController : ControllerBase
{
  private readonly ILogger<TreesController> _logger;
  private readonly ITreeRepo treeRepo;

  public TreesController(ILogger<TreesController> logger, ITreeRepo treeRepo)
  {
    _logger = logger;
    this.treeRepo = treeRepo;
  }

  [HttpGet]
  public IEnumerable<TreeDefinitionAggregate> GetAll(int page, int size)
  {
    return treeRepo.GetAll(page, size);
  }

  [HttpGet("{id}")]
  public TreeDefinitionAggregate GetTreeDefinition(string id)
  {
    return treeRepo.GetOne(new TreeDefinitionId(id));
  }
}
