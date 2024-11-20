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

export default class User extends Model {
  // https://stackoverflow.com/questions/27972271/sequelize-dont-return-password
  toJSON() {
    let values = Object.assign({}, this.get());
    delete values.userPassword;
    return values;
  }
}

User.init(
  {
    userEmail: {
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
    userAddress: {
      type: DataTypes.STRING,
      allowNull: true,
    },
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
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    userBirthday: {
      type: DataTypes.DATE,
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

// export default sequelize.define("User", {
//     userEmail:{
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true,
//     },
//     userName: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true,
//     },
//     userPassword: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     userAddress: {
//         type: DataTypes.STRING,
//             allowNull: true,
//     },
//     userPhoneNumber: {
//         type: DataTypes.INTEGER,
//             allowNull: true,
//     },
//     userProfilePicture: {
//         // https://stackoverflow.com/questions/47701640/saving-images-with-sequelize
//         type: DataTypes.BLOB('long'),
//             allowNull: true,
//     },
//     userGender: {
//         type: DataTypes.BOOLEAN,
//             allowNull: true,
//     },
//     userBirthday: {
//         type: DataTypes.DATE,
//             allowNull: true,
//     },
//     userCurrency: {
//         type: DataTypes.STRING,
//             allowNull: true,
//     },
//   },
//   {
//     schema: 'user_management',
//     // instanceMethods: {}
//   },

// );
// https://stackoverflow.com/questions/34258938/sequelize-classmethods-vs-instancemethods
