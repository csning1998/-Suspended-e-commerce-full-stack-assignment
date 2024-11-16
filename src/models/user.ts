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

export default sequelize.define(
  "User",
  {
    // Model attributes are defined here
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
  },
  {
    // Other model options go here
  }
);

// var TrackingModel = {
// }


// (function getTrackingData(user_id = 1){
//   // var user_id = 1

//   const user = User.findAll({id: user_id})
//   const trackingData = TrackingModel.find({user_id: user.id})

//   return trackingData

// })


// (function setTrackingData(user_id = 1, current_url = ''){
//   // // var user_id = 1

//   // const user = User.findAll({id: user_id})
//   TrackingModel.create({user_id: user_id, current_url: current_url})

// })

// export default User[
//   ({
//     id: 1,
//     firstName: "firstName",
//     lastName: null,
//     createdAt: "2024-11-16T15:52:47.324Z",
//     updatedAt: "2024-11-16T15:52:47.324Z",
//   },
//   {
//     id: 2,
//     firstName: "firstName",
//     lastName: null,
//     createdAt: "2024-11-16T15:52:47.505Z",
//     updatedAt: "2024-11-16T15:52:47.505Z",
//   },
//   {
//     id: 3,
//     firstName: "firstName",
//     lastName: null,
//     createdAt: "2024-11-16T15:53:47.762Z",
//     updatedAt: "2024-11-16T15:53:47.762Z",
//   },
//   {
//     id: 4,
//     firstName: "firstName",
//     lastName: null,
//     createdAt: "2024-11-16T15:53:52.489Z",
//     updatedAt: "2024-11-16T15:53:52.489Z",
//   },
//   {
//     id: 5,
//     firstName: "firstName",
//     lastName: null,
//     createdAt: "2024-11-16T15:53:52.701Z",
//     updatedAt: "2024-11-16T15:53:52.701Z",
//   },
//   {
//     id: 6,
//     firstName: "firstName",
//     lastName: null,
//     createdAt: "2024-11-16T15:53:53.255Z",
//     updatedAt: "2024-11-16T15:53:53.255Z",
//   },
//   {
//     id: 7,
//     firstName: "firstName",
//     lastName: null,
//     createdAt: "2024-11-16T15:53:53.616Z",
//     updatedAt: "2024-11-16T15:53:53.616Z",
//   },
//   {
//     id: 8,
//     firstName: "firstName",
//     lastName: null,
//     createdAt: "2024-11-16T15:53:55.132Z",
//     updatedAt: "2024-11-16T15:53:55.132Z",
//   })
// ];
