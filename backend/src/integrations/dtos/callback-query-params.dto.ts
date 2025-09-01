import { IsNotEmpty } from "class-validator";

export class CallbackQueryParamsDto {
  @IsNotEmpty()
  state: string;

  @IsNotEmpty()
  code: string;

  @IsNotEmpty()
  scope: string;
}