// import {
//     //   // Association,
//     DataTypes,
//     //   // HasManyAddAssociationMixin,
//     //   // HasManyCountAssociationsMixin,
//     //   // HasManyCreateAssociationMixin,
//     //   // HasManyGetAssociationsMixin,
//     //   // HasManyHasAssociationMixin,
//     //   // HasManySetAssociationsMixin,
//     //   // HasManyAddAssociationsMixin,
//     //   // HasManyHasAssociationsMixin,
//     //   // HasManyRemoveAssociationMixin,
//     //   // HasManyRemoveAssociationsMixin,
//     //   // Model,
//     //   // ModelDefined,
//     //   // Optional,
//     //   Sequelize,
//     //   // InferAttributes,
//     //   // InferCreationAttributes,
//     //   // CreationOptional,
//     //   // NonAttribute,
//     //   // ForeignKey,
// } from "sequelize";
//
// import sequelize from "../db";
//
// export default sequelize.define("UserInformation",
//     {
//         userName: {
//             type: DataTypes.STRING,
//             allowNull: false,
//             unique: true,
//         },
//         userAddress: {
//             type: DataTypes.STRING,
//             allowNull: true,
//         },
//         userPhoneNumber: {
//             type: DataTypes.INTEGER,
//             allowNull: true,
//         },
//         userProfilePicture: {
//             // https://stackoverflow.com/questions/47701640/saving-images-with-sequelize
//             type: DataTypes.BLOB('long'),
//             allowNull: true,
//         },
//         userGender: {
//             type: DataTypes.BOOLEAN,
//             allowNull: true,
//         },
//         userBirthday: {
//             type: DataTypes.DATE,
//             allowNull: true,
//         },
//         userCurrency: {
//             type: DataTypes.STRING,
//             allowNull: true,
//         },
//     },
//     {
//         schema: 'user_management',
//     }
// );
//
//
