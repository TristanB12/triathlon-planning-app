import { Controller, Get, Param, Query, Res, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { IntegrationsService } from "./integrations.service";
import { User } from "@prisma/client";
import { GetUser } from "../auth/decorators/get-user-decorator";
import { CallbackQueryParamsDto } from "./dtos";
import { Response } from "express";

@Controller("integrations")
export class IntegrationsController {
  constructor(
    private  integrationsService: IntegrationsService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get(':provider/connect')
  async connectIntegration(
    @Param('provider') provider: string,
    @GetUser() user: User
  ) {
    return this.integrationsService.connect(provider, user);
  }

  @Get(':provider/callback')
  async callbackIntegration(
    @Param('provider') provider: string,
    @Query() query: CallbackQueryParamsDto,
    @Res() res: Response
  ) {
    const url = await this.integrationsService.callback(provider, query);
    res.redirect(url);
  }
}
