export class BaseError extends Error {
    public statusCode?: number;
    public isOperational?: boolean;

    constructor(message?: string, statusCode?: number, isOperational?: boolean) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.isOperational = isOperational;
        this.statusCode = statusCode;
        Error.captreStackTrace(this);
    }
}