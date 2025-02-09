import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/postgres';

interface ProductAttributes {
  id?: number;
  name: string;
  active?: boolean;
  sell_price: number;
  profit_margin?: number;
  created_at?: Date;
}

class Product extends Model<ProductAttributes> implements ProductAttributes {
  public id!: number;
  public name!: string;
  public active!: boolean;
  public sell_price!: number;
  public profit_margin!: number;
  public readonly created_att!: Date;
}

Product.init(
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
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    sell_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    profit_margin: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'products',
    timestamps: true,
    updatedAt: false,
    underscored: true
  }
);

export default Product;