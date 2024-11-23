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
import Address from './address'

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
        userEmail: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        userFamilyName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
        },
        userGivenName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
        },
        userPassword: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // userAddress: {
        //     type: DataTypes.STRING,
        //     allowNull: true,
        // },
        userPhoneNumber: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        userProfilePicture: {
            // https://stackoverflow.com/questions/47701640/saving-images-with-sequelize
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
    },
    {
        schema: "user_management",
        sequelize,
    }
);
// https://stackoverflow.com/questions/34258938/sequelize-classmethods-vs-instancemethods

User.hasMany(Address)
export default User