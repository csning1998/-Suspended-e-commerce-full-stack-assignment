import { DataTypes, Model } from "sequelize";
import sequelize from "../db";
import User from "./user";

class CartItems extends Model {
    public id!: number;
    public productId!: string;
    public userId!: string;
    public amount!: number;
    public price!: number;
    public color!: string;
    public size!: string;
}

CartItems.init(
    {
        // id
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
        size: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        color: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
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
