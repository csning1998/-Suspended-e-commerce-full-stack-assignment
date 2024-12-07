/*
import { User } from "./src/postgres-models/user";
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
