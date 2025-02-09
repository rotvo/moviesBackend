import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/postgres';
import Supply from './supply';
import Product from './Product';

interface SupplyProductAttributes {
  id?: number;
  supply_id: number;
  product_id: number;
  quantity: number;
  created_at?: Date;
}

class SupplyProduct extends Model<SupplyProductAttributes> implements SupplyProductAttributes {
  public id!: number;
  public supply_id!: number;
  public product_id!: number;
  public quantity!: number;
  public readonly created_at!: Date;
}

SupplyProduct.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    supply_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Supply,
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
    },
  },
  {
    sequelize,
    tableName: 'supplies_x_products',
    timestamps: true,
    updatedAt: false,
    indexes: [
      {
        unique: true,
        fields: ['supply_id', 'product_id'],
      },
    ],
  }
);

// Definir las relaciones
Supply.belongsToMany(Product, { 
  through: SupplyProduct,
  foreignKey: 'supply_id',
});

Product.belongsToMany(Supply, { 
  through: SupplyProduct,
  foreignKey: 'product_id',
});

export default SupplyProduct;