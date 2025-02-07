import Sale from '../models/Sale';
import SaleDetail from '../models/SaleDetail';

const insertSale = async (saleData: any) => {
  try {
    const { details, ...sale } = saleData;
    const createdSale = await Sale.create(sale);
    
    if (details && details.length) {
      await SaleDetail.bulkCreate(
        details.map((detail: any) => ({
          ...detail,
          sale_id: createdSale.id
        }))
      );
    }

    return await Sale.findByPk(createdSale.id, {
      include: [SaleDetail]
    });
  } catch (error) {
    console.error('Error creating sale:', error);
    throw new Error('Error creating sale');
  }
};

const getSale = async (id: number | string) => {
  try {
    const sale = await Sale.findByPk(id, {
      include: [SaleDetail]
    });
    if (!sale) {
      throw new Error('Sale not found');
    }
    return sale;
  } catch (error) {
    console.error('Error getting sale:', error);
    throw new Error('Error getting sale');
  }
};

const getSales = async () => {
  try {
    const sales = await Sale.findAll({
      include: [SaleDetail]
    });
    return sales;
  } catch (error) {
    console.error('Error getting sales:', error);
    throw new Error('Error getting sales');
  }
};

export { insertSale, getSale, getSales };