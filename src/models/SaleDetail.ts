// models/SaleDetail.ts
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/postgres';
import Sale from './Sale';
import Product from './product';

interface SaleDetailAttributes {
  id?: number;
  sale_id: number;
  product_id: number;
  quantity: number;
  unit_price: number;
  subtotal: number;
  created_at?: Date;
}

class SaleDetail extends Model<SaleDetailAttributes> implements SaleDetailAttributes {
  public id!: number;
  public sale_id!: number;
  public product_id!: number;
  public quantity!: number;
  public unit_price!: number;
  public subtotal!: number;
  public readonly created_at!: Date;
}

SaleDetail.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    sale_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Sale,
        key: 'id',
      },
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Product,
        key: 'id',
      },
    },
    quantity: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    unit_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    subtotal: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'sale_details',
    timestamps: true,
    updatedAt: false,
    underscored: true
  }
);

// Definir las relaciones
Sale.hasMany(SaleDetail, { foreignKey: 'sale_id' });
SaleDetail.belongsTo(Sale, { foreignKey: 'sale_id' });
SaleDetail.belongsTo(Product, { foreignKey: 'product_id' });

export default SaleDetail;