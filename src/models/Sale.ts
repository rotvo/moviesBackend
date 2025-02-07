import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/postgres';
import Customer from './Customer';

interface SaleAttributes {
  id?: number;
  customer_id?: number | null;
  total: number;
  payment_method: string;
  payment_status: string;
  notes?: string;
  created_at?: Date;
}

class Sale extends Model<SaleAttributes> implements SaleAttributes {
  public id!: number;
  public customer_id!: number | null;
  public total!: number;
  public payment_method!: string;
  public payment_status!: string;
  public notes?: string;
  public readonly created_at!: Date;
}

Sale.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Customer,
        key: 'id',
      },
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
    payment_method: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    payment_status: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: 'paid',
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'sales',
    timestamps: true,
    updatedAt: false,
    underscored: true
  }
);

export default Sale;

