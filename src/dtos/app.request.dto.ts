import { ApiProperty } from "@nestjs/swagger";

export class RequestDto {
    @ApiProperty()
    targetUrl: string;
}