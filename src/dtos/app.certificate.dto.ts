export class CertificateDto {
    public subject: string;
    public issuer: string;
    public isValid: boolean = false;

    public constructor(init?: Partial<CertificateDto>) {
        Object.assign(this, init);
    }
}