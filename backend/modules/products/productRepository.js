// productRepository.js
import { Product, Image, PetType, BreedSize, Variant, Composition, OrderItem, Order} from '../../models/index.js';
import { Op } from 'sequelize';

export const createProduct = (data, transaction = null) => {
  return Product.create(data, { transaction });
};

export const updateProductById = async (id, data, transaction = null) => {
  const product = await Product.findByPk(id);
  if (!product) throw new Error('Producto no encontrado');
  await product.update(data, { transaction });
  return product;
};



export const saveImages = (images, transaction = null) => {
  return Image.bulkCreate(images, { transaction });
};
export const deleteImagesByProductId = async (productId, transaction = null) => {
  return await Image.destroy({ where: { product_id: productId }, transaction });
};

export const getImagesByProductId = async (productId, transaction) => {
  return await Image.findAll({
    where: { product_id: productId },
    attributes: ['filename'],
    order: [['order', 'ASC']],
    transaction
  });
};

export const getProductBySlug = (slug) => {
  return Product.findOne({ where: { slug } });
};


export const checkPetTypeExists = async (petTypeId) => {
  return await PetType.findByPk(petTypeId);
};

export const checkBreedSizesExist = async (breedSizeIds) => {  
  const count = await BreedSize.count({
    where: { id: breedSizeIds }
  });
  
  if (count !== breedSizeIds.length) {
    return false;
  }
  
  return true; 

};

// Asociar tamaños de raza, Sequelize automáticamente crea varios métodos mágicos (helpers) en tu modelo Product
// esto es gracias a la relacion que hice en el index.js de models
//Agrega nuevas filas en la tabla intermedia con los product_id y cada breed_size_id
export const associateBreedSizes = async(productInstance, breedSizeIds, transaction)  =>{
  return await productInstance.setBreed_sizes(breedSizeIds, { transaction });
}

export const createCompositions = (compositions, transaction = null) => {
  return Composition.bulkCreate(compositions, {transaction})
} 

export const deleteCompositionsByProductId = async (productId, transaction = null) => {
  return await Composition.destroy({ where: { product_id: productId }, transaction });
}

export const createVariants = (variants, transaction = null) => {
  return Variant.bulkCreate(variants, { transaction });
};

export const deleteVariantsByProductId = async (productId, transaction = null) => {
  return await Variant.destroy({ where: { product_id: productId }, transaction });
};

export const findPetTypeByName = async (name) => {
  return await PetType.findOne({ where: { name } });
};


export const findAllWithFilters = async ({ search, categoryId, breedSizes,minPrice, maxPrice,  sort, limit, offset, user }) => {
  
  const isAdmin = user?.role === 'admin';
   // Construyo el where solo con operadores de Sequelize
  const where = {};

  // Si no es admin, filtrar solo activos
  if (!isAdmin) {
    where.is_active = true;
  }

  if(search){
    where.title = {
      [Op.like]: `%${search}%`
    };
  }

  if (categoryId) {
    where.pet_type_id = categoryId;
  }

  if (minPrice !== undefined) {
    where.min_price = { [Op.gte]: parseFloat(minPrice) };
  }
  if (maxPrice !== undefined) {
    where.max_price = { [Op.lte]: parseFloat(maxPrice) };
  }
  // Filtro por BreedSizes (muchos a muchos)
  let breedSizesFilter = null;
  if (breedSizes) {
    // breedSizes puede venir como "small,medium"
    // genera un array tipo ['small', 'medium']
    const breedSizesArray = breedSizes.split(',').map(bs => bs.trim());
    breedSizesFilter = {
      model: BreedSize,
      where: {
        name: {
          [Op.in]: breedSizesArray,
        },
      },
      through: { attributes: [] }, // para no traer datos de la tabla intermedia
      required: true,// INNER JOIN para filtrar productos que tengan esos breedSizes
      // solo se traen productos que tengan al menos un BreedSize que este en el array de filtros
    };
  }

  // Orden
    let order = [];
    switch (sort) {
      case 'priceLow':
        order = [['min_price', 'ASC']];
        break;
      case 'priceHigh':
        order = [['min_price', 'DESC']];
        break;
      case 'popular':
        order = [['average_rating', 'DESC']];
        break;
      default:
        order = [['title', 'ASC']];
    }

  const { rows: products, count: total } = await Product.findAndCountAll({
    where, //  where:{usuarioId: id }, como ahcer esto
    attributes: { exclude: ['createdAt', 'updatedAt', 'pet_type_id'] },
    include: [
      { model: PetType, attributes: ['name'] },
      breedSizesFilter,
      { model: Image, attributes: ['filename'], separate: true, order: [['order', 'ASC']] },
      { model: Variant, attributes: ['price', 'stock'] },
      // Si quieres incluir reviews u otro modelo, se puede agregar aquí
    ].filter(Boolean), // filtra el null en caso de que breedSizesFilter sea null
    // Este .filter(Boolean) elimina elementos null del array.
    // Es útil porque `breedSizesFilter` solo se define si el usuario envía filtros de tamaño de raza.
    // Si no se envía, queda como null, y Sequelize lanza error si se lo pasamos.
    // Por eso, esto asegura que solo se incluyan relaciones activas.
    order: [
      ...order,                               // orden para productos, ej: [['min_price', 'ASC']]
    ],
    limit,
    offset,
    distinct: true,
    // distinct: true se usa para que el count (total de productos) sea correcto cuando hay relaciones muchos a muchos.
    // Por ejemplo, si un producto tiene varias razas asociadas (JOIN con BreedSize), Sequelize podría contar el mismo producto varias veces.
    // Con distinct: true, Sequelize cuenta productos únicos basados en su ID.
  });

  return { products, total };
};


export const getProductById = async (id) => {
  return await Product.findOne({
    where: { id },
    attributes: { exclude: ['createdAt', 'updatedAt', 'pet_type_id'] },
    include: [
      { model: Variant, attributes: ['id', 'price', 'weight_value', 'weight_unit_id', 'stock'] },
      { model: Image, attributes: ['filename'], separate: true, order: [['order', 'ASC']]},
      { model: PetType, attributes: ['id', 'name']},
      { model: BreedSize, attributes: ['id', 'name'], through: { attributes: [] } }, // through es para ocultar valores de la tabla intermedia
      { model: Composition, attributes: ['ingredient']},
    ]
  });
}

export const deleteProduct = async (product, transaction = null) => {
  return product.destroy({transaction})
}

export const getVariantsByProductId = async (productId, transaction) => {
  return await Variant.findAll({
    where: { product_id: productId },
    transaction
  });
};

export const getOrdersByVariantIds = async (variantIds, transaction) => {
  return await OrderItem.findOne({
    where: {
      variant_id: variantIds
    },
    transaction
  });
};


export const checkProductVariantsInOrders = async (productId, excludeStatusId) => {
  const result = await OrderItem.findOne({
    include: [
      {
        model: Variant,
        where: { product_id: productId },
        attributes: []
      },
      {
        model: Order,
        where: {
          status_id: { [Op.ne]: excludeStatusId }
        },
        attributes: []
      }
    ]
  });

  return !!result; // devuelve true si encontró al menos un OrderItem que cumpla
};


export const getVariantById = async(id, transaction) =>{
  return await Variant.findByPk(id, {transaction})
}

export const deleteVariantById = async (id, transaction=null) =>{

  await Variant.destroy({where: {id}, transaction})
}