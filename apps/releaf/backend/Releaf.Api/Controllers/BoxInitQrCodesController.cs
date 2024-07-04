using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Releaf.Application.Commands;
using Releaf.Auth;
using Releaf.Domain.Repo;

namespace Releaf.Backend.Controllers;

[ApiController]
[Authorize]
[Route("BoxQrCodes")]
public class BoxQrCodesController : ControllerBase
{
  private readonly ILogger<TreesController> _logger;
  private readonly IMediator mediator;
  private readonly IBoxRepo boxRepo;
  private readonly ICurrentUser currentUser;

  public BoxQrCodesController(
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

  [HttpPost("Generate")]
  public async Task GenerateNewQrCodes(string treeDefinitionId, int count)
  {
    // Maybe use this library to generate QR codes
    // https://github.com/codebude/QRCoder
  }
}
