import {
    //   // Association,
    DataTypes,
    //   // HasManyAddAssociationMixin,
    //   // HasManyCountAssociationsMixin,
    //   // HasManyCreateAssociationMixin,
    //   // HasManyGetAssociationsMixin,
    //   // HasManyHasAssociationMixin,
    //   // HasManySetAssociationsMixin,
    //   // HasManyAddAssociationsMixin,
    //   // HasManyHasAssociationsMixin,
    //   // HasManyRemoveAssociationMixin,
    //   // HasManyRemoveAssociationsMixin,
    Model,
    //   // ModelDefined,
    //   // Optional,
    //   Sequelize,
    //   // InferAttributes,
    //   // InferCreationAttributes,
    //   // CreationOptional,
    //   // NonAttribute,
    //   // ForeignKey,
} from "sequelize";

import sequelize from "../db";
import Address from "./address";

class User extends Model {
    // https://stackoverflow.com/questions/27972271/sequelize-dont-return-password
    toJSON(): Object {
        let values = Object.assign({}, this.get());
        delete values.userPassword;
        return values;
    }
}

User.init(
    {
        userId: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        userOAuthToken: {
            type: DataTypes.STRING,
        },
        userOAuthProvider: {
            type: DataTypes.STRING,
        },
        userPassword: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userEmail: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        userFamilyName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userGivenName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userPhoneNumber: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        userProfilePicture: {
            type: DataTypes.BLOB("long"),
            allowNull: true,
        },
        userGender: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        userBirthday: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        userCurrency: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        userPermission: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        schema: "user_management",
        sequelize,
        modelName: "User",
        tableName: "Users",
        timestamps: true,
    },
);
// https://stackoverflow.com/questions/34258938/sequelize-classmethods-vs-instancemethods

export default User;
