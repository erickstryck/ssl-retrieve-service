import { ApiProperty } from "@nestjs/swagger";

export class CertificateDto {
    @ApiProperty()
    public subject: string;
    @ApiProperty()
    public issuer: string;
    @ApiProperty()
    public isValid: boolean = false;

    public constructor(init?: Partial<CertificateDto>) {
        Object.assign(this, init);
    }
}