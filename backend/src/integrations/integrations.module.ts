import { Module } from "@nestjs/common";
import { IntegrationsController } from "./integrations.controller";
import { IntegrationsService } from "./integrations.service";
import { ProvidersRegistry } from "../providers/providers.registry";

@Module({
  controllers: [IntegrationsController],
  providers: [IntegrationsService, ProvidersRegistry],
})
export class IntegrationsModule {}
