
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/postgres';


interface User{
     id?: number;
     email: string;
     password_hash: string;
     created_at?: Date;
}

class UserModel extends Model<User> implements User {
    public id!: number;
    public email!: string;
    public password_hash!: string;
    public created_at!: Date;
}

UserModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        },
        password_hash: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        }
    },
    {
        sequelize,
        tableName: 'users',
        timestamps: false,
    }
);

export default UserModel;