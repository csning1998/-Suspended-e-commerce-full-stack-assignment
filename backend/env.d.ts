/*

import { Model } from "sequelize";

declare global {
    namespace Express {
        interface Request {
            currentUser?: User;
        }
    }
}

export interface UserAttributes {
    userId: string;
    toJSON: () => object;
    set: (values: Partial<UserAttributes>) => void;
    save: () => Promise<void>;
}

export class User extends Model<UserAttributes> implements UserAttributes {
    userId!: string;
    toJSON!: () => object;
    set!: (values: Partial<UserAttributes>) => void;
    save!: () => Promise<void>;
}

 */


// declare global {
//     namespace Express {
//         interface FuckUpRequest {
//             currentUser?: User;
//         }
//     }
// }

// declare namespace Express {
//     export interface Request {
//         currentUser?: User
//     }
//  }
// import { User } from "./src/postgres-models/user";

interface User {
    userId: string;
}

// interface AuthenticatedRequest extends Express.Request {
//     currentUser: User;
// }

interface AuthenticatedRequest{
    currentUser: User;
}