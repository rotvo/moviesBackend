import Product from '../models/product';

const insertProduct = async (product: any) => {
  try {
    const createdProduct = await Product.create(product);
    return createdProduct;
  } catch (error) {
    console.error('Error creating product:', error);
    throw new Error('Error creating product');
  }
};

const updateProduct = async (id: number, product: any) => {
  try {
    const [updatedRows] = await Product.update(product, { where: { id } });
    if (updatedRows === 0) {
      throw new Error('Product not found');
    }
    return await Product.findByPk(id);
  } catch (error) {
    console.error('Error updating product:', error);
    throw new Error('Error updating product');
  }
};

const deleteProduct = async (id: number) => {
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      throw new Error('Product not found');
    }
    await product.update({ active: false });
    return product;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw new Error('Error deleting product');
  }
};

const getProduct = async (id: number | string) => {
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  } catch (error) {
    console.error('Error getting product:', error);
    throw new Error('Error getting product');
  }
};

const getProducts = async () => {
  try {
    const products = await Product.findAll({ where: { active: true } });
    return products;
  } catch (error) {
    console.error('Error getting products:', error);
    throw new Error('Error getting products');
  }
};

export { insertProduct, updateProduct, deleteProduct, getProduct, getProducts };