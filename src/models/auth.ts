
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/postgres';
import { User } from '../Interfaces/user.interface';



class UserModel extends Model<User> implements User {
    public id!: number;
    public email!: string;
    public password!: string;  
    public name! : string;
    public phone! : string;
    public address!: string;
    public description!: string;
  }

  UserModel.init(
    {
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        address : {
            type: DataTypes.STRING,
            allowNull: true,
        },
        description : {
            type: DataTypes.STRING,
            allowNull: true,
        }
    },
    {
        sequelize,
        tableName: 'User',
        timestamps: true,
    }
);

export default UserModel ;