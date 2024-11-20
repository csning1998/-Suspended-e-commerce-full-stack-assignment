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
  //   Sequelize,
  //   // InferAttributes,
  //   // InferCreationAttributes,
  //   // CreationOptional,
  //   // NonAttribute,
  //   // ForeignKey,
} from "sequelize";

import sequelize from "../db";

export default sequelize.define("User", {
    userEmail:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    userPassword: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    schema: 'user_management',
  }
);


