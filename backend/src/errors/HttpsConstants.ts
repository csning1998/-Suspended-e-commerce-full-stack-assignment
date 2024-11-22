export enum HttpStatusCodes {
    BAD_REQUEST = 400,
    NOT_FOUND = 404,
    VALIDATION_FAILED = 422,
    INTERNAL_SERVER_ERROR = 500,
    CONFLICT = 409,
}

export class Messages {
    public static readonly BAD_REQUEST = "Bad Request";
    public static readonly NOT_FOUND = "Resource Not Found";
    public static readonly VALIDATION_FAILED = "Validation Failed";
    public static readonly INTERNAL_SERVER_ERROR = "Internal Server Error";
}