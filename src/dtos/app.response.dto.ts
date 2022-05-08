export class ResponseDto {
    public subject: string;
    public issuer: string;
    public isValid: boolean;

    public constructor(init?: Partial<ResponseDto>) {
        Object.assign(this, init);
    }
}