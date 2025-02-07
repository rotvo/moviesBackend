
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/postgres';


// Definir la interfaz del modelo
interface ItemAttributes {
  id?: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  created_at?: Date;
  updatedAt?: Date;
}

// Definir el modelo de Item usando Sequelize
class Item extends Model<ItemAttributes> implements ItemAttributes {
  public id!: number;
  public name!: string;
  public description!: string;
  public price!: number;
  public quantity!: number;
  public readonly created_at!: Date;
  public readonly updatedAt!: Date;
}

Item.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize, // instancia de Sequelize
    tableName: 'items',
    timestamps: true, // created_at y updatedAt automáticamente
  }
);

export default Item;
