import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { PromptVariables } from './types';
import { TrainingPlanSchema } from './schemas/training-plan.schema';
import { zodTextFormat } from "openai/helpers/zod";

@Injectable()
export class OpenaiService {
  private readonly client: OpenAI;
  private readonly model = 'gpt-5-nano';
  private readonly mainPromptID = 'pmpt_68a8c5357e2c819592703cd2793f80fb069bfebfc6d3e22b';

  constructor() {
    this.client = new OpenAI();
  }

  async createResponse(mainPromptVariables: PromptVariables, input: string | OpenAI.Responses.ResponseInput = null) {
    const response = await this.client.responses.parse({
      model: this.model,
      reasoning: null,
      text: {
        format: zodTextFormat(TrainingPlanSchema, "training_plan")
      },
      prompt: {
        id: this.mainPromptID,
        variables: mainPromptVariables,
      },
      input
    });

    return response;
  }
}

