export const statusCodes = {
    LOGIN: {
        SUCCESS: {
            code: 200,
            status: 'success',
            message: "(200) Successfully logged in"
        },
        INVALID_CREDENTIALS: {
            code: 401,
            status: 'error',
            message: "(401) Invalid username or password."
        },
        USER_NOT_FOUND: {
            code: 404,
            status: 'error',
            message: "(404) User not found."
        },
        USERNAME_OR_PASSWORD_NULL: {
            code: 409,
            status: 'error',
            message: "(409) Either username or password cannot be null."
        },
        SERVER_CONFIGURATION_ERROR: {
            code: 500,
            status: 'error',
            message: "(500) Server configuration error."
        },
        LOGIN_FAILED: {
            code: 500,
            status: 'error',
            message: "(500) Login failed."
        },
    },
    REGISTRATION: {
        SUCCESS: {
            code: 200,
            status: 'success',
            message: "(200) Successfully registered"
        },
        PASSWORD_MISMATCH: {
            code: 400,
            status: 'error',
            message: "(400) Mismatched confirm password."
        },
        EMAIL_ALREADY_REGISTERED: {
            code: 409,
            status: 'error',
            message: "(409) Email has already been registered."
        },
        REGISTRATION_FAILED: {
            code: 500,
            status: 'error',
            message: "(500) Registration failed."
        }
    },
    SESSION: {
        RETRIEVED_SESSION: {
            code: 200,
            status: 'success',
            message: "(200) Successfully retrieved session data."
        },
        INQUIRY_FAILED: {
            code: 500,
            status: 'error',
            message: "(500) Failed to process inquiry."
        }
    },
    USER_UPDATE: {
        SUCCESS: {
            code: 200,
            status: 'success',
            message: "(200) User information has successfully updated."
        },
        FAILED: {
            code: 400,
            status: 'error',
            message: "(400) User update failed."
        }
    },
    AUTHENTICATION: {
        NO_TOKEN_PROVIDED: {
            code: 401,
            status: 'error',
            message: "(401) No token provided."
        },
        INVALID_TOKEN: {
            code: 401,
            status: 'error',
            message: "(401) Invalid token."
        },
        USER_NOT_FOUND: {
            code: 404,
            status: 'error',
            message: "(404) User not found for token."
        },
        JWT_SECRET_NOT_DEFINED: {
            code: 500,
            status: 'error',
            message: "(500) Server configuration error: JWT_SECRET is not defined."
        },
        JWT_VERIFICATION_FAILED: {
            code: 500,
            status: 'error',
            message: "(500) Failed to process JWT verification."
        }
    },
    BACKEND_LOGIC: {
        code: 401,
        status: 'error',
        message: "(401) Internal server error."
    }
};
