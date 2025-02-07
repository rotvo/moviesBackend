import Item from '../models/item';

const insertItem = async (item: Item) => {
  try {
    const createdItem = await Item.create(item);
    return createdItem;
  } catch (error) {
    console.error('Error creating item:', error);
    throw new Error('Error creating item');
  }
};

const updateItem = async (id: number, item: Item) => {
  try {
    const updatedItem = await Item.update(item, { where: { id } });
    return updatedItem;
  } catch (error) {
    console.error('Error updating item:', error);
    throw new Error('Error updating item');
  }
};

const deleteItem = async (id: number) => {
  try {
    const deletedItem = await Item.destroy({ where: { id } });
    return deletedItem;
  } catch (error) {
    console.error('Error deleting item:', error);
    throw new Error('Error deleting item');
  }
};

const getItem = async (id: number | string) => {
  try {
    const item = await Item.findByPk(id);
    return item;
  } catch (error) {
    console.error('Error getting item:', error);
    throw new Error('Error getting item');
  }
};

const getItems = async () => {
  try {
    const items = await Item.findAll();
    return items;
  } catch (error) {
    console.error('Error getting items:', error);
    throw new Error('Error getting items');
  }
};

export { insertItem, updateItem, deleteItem, getItem, getItems };