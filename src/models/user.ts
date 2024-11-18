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
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    userPassword: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userEmail:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    }
  },
  {
    schema: 'user_management',
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
