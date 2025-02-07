import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/postgres';
import Sale from './Sale';

interface CustomerAttributes {
  id?: number;
  name: string;
  phone?: string  | null;
  email?: string | null;
  created_at?: Date;
}

class Customer extends Model<CustomerAttributes> implements CustomerAttributes {
  public id!: number;
  public name!: string;
  public phone!: string | null;
  public email!: string | null;
  public readonly created_at!: Date;
}

Customer.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(75),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(15),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: true,
      validate: {
        isEmail: true,
      },
    },
  },
  {
    sequelize,
    tableName: 'customers',
    timestamps: true,
    updatedAt: false,
    underscored: true
  }
);


export default Customer;