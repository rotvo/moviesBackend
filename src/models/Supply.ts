import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/postgres';

interface SupplyAttributes {
  id?: number;
  name: string;
  package_cost: number | null;
  unit_per_package: number | null;
  unit_cost: number | null;
  stock: number;
  createdAt?: Date;
}

class Supply extends Model<SupplyAttributes> implements SupplyAttributes {
  public id!: number;
  public name!: string;
  public package_cost!: number | null;
  public unit_per_package!: number | null;
  public unit_cost!: number | null;
  public stock!: number;
  public readonly createdAt!: Date;
}

Supply.init(
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
    package_cost: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    unit_per_package: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    unit_cost: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
      },
    }
   
  },
  {
    sequelize,
    tableName: 'supplies',
    timestamps: true,
    updatedAt: false,
    underscored: true
  }
);

export default Supply;