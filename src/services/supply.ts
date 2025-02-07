import Supply from '../models/supply';

const insertSupply = async (supply: any) => {
  try {
    const createdSupply = await Supply.create(supply);
    return createdSupply;
  } catch (error) {
    console.error('Error creating supply:', error);
    throw new Error('Error creating supply');
  }
};

const updateSupply = async (id: number | string, supply: any) => {
  try {
    const [updatedRows] = await Supply.update(supply, { where: { id } });
    if (updatedRows === 0) {
      throw new Error('Supply not found');
    }
    return await Supply.findByPk(id);
  } catch (error) {
    console.error('Error updating supply:', error);
    throw new Error('Error updating supply');
  }
};

const deleteSupply = async (id: number | string) => {
  try {
    const deletedSupply = await Supply.destroy({ where: { id } });
    if (deletedSupply === 0) {
      throw new Error('Supply not found');
    }
    return deletedSupply;
  } catch (error) {
    console.error('Error deleting supply:', error);
    throw new Error('Error deleting supply');
  }
};

const getSupply = async (id: number | string) => {
  try {
    const supply = await Supply.findByPk(id);
    if (!supply) {
      throw new Error('Supply not found');
    }
    return supply;
  } catch (error) {
    console.error('Error getting supply:', error);
    throw new Error('Error getting supply');
  }
};

const getSupplies = async () => {
  try {
    const supplies = await Supply.findAll();
    return supplies;
  } catch (error) {
    console.error('Error getting supplies:', error);
    throw new Error('Error getting supplies');
  }
};

export { insertSupply, updateSupply, deleteSupply, getSupply, getSupplies };