import { BaseError } from "./BaseError";
import { HttpStatusCodes, Messages } from "./HttpsConstants";

export class BadRequestError extends BaseError {
    constructor(message = Messages.BAD_REQUEST) {
        super(message, HttpStatusCodes.BAD_REQUEST, true);
    }
}

export class NotFoundError extends BaseError {
    constructor(message = Messages.NOT_FOUND) {
        super(message, HttpStatusCodes.NOT_FOUND, true);
    }
}

export class ValidationError extends BaseError {
    constructor(message = Messages.VALIDATION_FAILED) {
        super(message, HttpStatusCodes.VALIDATION_FAILED, true);
    }
}

export class InternalServerError extends BaseError {
    constructor(message = Messages.INTERNAL_SERVER_ERROR) {
        super(message, HttpStatusCodes.INTERNAL_SERVER_ERROR, false);
    }
}

export class ConflictError extends BaseError {
    constructor(message = "Resource conflict occurred.") {
        super(message, HttpStatusCodes.CONFLICT, true);
    }
}
