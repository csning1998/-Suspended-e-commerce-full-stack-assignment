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
    //   // Model,
    //   // ModelDefined,
    //   // Optional,
    Sequelize,
    //   // InferAttributes,
    //   // InferCreationAttributes,
    //   // CreationOptional,
    //   // NonAttribute,
    //   // ForeignKey,
} from "sequelize";
//
import sequelize from "../db";
import User from './user'

const Address = sequelize.define("Address",
    {
        userId: {
            type: DataTypes.STRING,
            allowNull: false,
            // unique: true,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        schema: 'user_management',
    }
);

// Address.belongsTo(User, {
//   foreignKey: 'userId',
// });


export default Address