import { DataTypes, Model } from "sequelize";
import sequelize from "../db";
import User from "./user";

class CartItems extends Model {
    productId = 'product'
    price = 0;
    amount = 0
    userId = null;
}

CartItems.init(
    {   
        productId: {
            type: DataTypes.STRING,
            allowNull: false,
            // primaryKey: true,
            // autoIncrement: true,
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            // primaryKey: true,
            // autoIncrement: true,
        },
        userId: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: User,
                key: "userId",
            },
        },
    },
    {
        sequelize,
        schema: "user_management",
        modelName: "CartItem",
        tableName: "CartItems",
        timestamps: true,
    },
);

User.hasMany(CartItems, {
    foreignKey: "userId",
    as: "CartItems",
});
CartItems.belongsTo(User, {
    foreignKey: "userId",
    as: "User",
});

export default CartItems;
