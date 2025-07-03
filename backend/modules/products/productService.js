import * as productRepository from './productRepository.js';
import db from '../../config/db.js'
import slugify from 'slugify';
import { cleanupUploadsByFilenames } from '../../middleware/uploadImagen.js';
import * as orderRepository from '../orders/orderRepository.js'

export const createProduct = async (body, files) => {
  const { title, description, pet_type_id, breed_size_ids, variants, composition } = body;
  // Generar slug con slugify
  let slug = slugify(title, { lower: true, strict: true });

   // ===== Validaciones de Negocio =====
   
  // 1. Validar pet_type_id 
  const petTypeExists = await productRepository.checkPetTypeExists(pet_type_id);
  if (!petTypeExists) {
    throw new Error('El tipo de mascota no existe');
  }

  // 2. Validar breed_size_ids 
  if (breed_size_ids?.length) {
    const sizesExist = await productRepository.checkBreedSizesExist(breed_size_ids);
    if (!sizesExist) {
      throw new Error('Uno o más tamaños de raza no existen');
    }
  }

  // 3. Validar unicidad del slug y modificar si ya existe
  
  let slugExists = await productRepository.getProductBySlug(slug);
  let suffix = 1;
  while (slugExists) {
    slug = slugify(title, { lower: true, strict: true }) + '-' + suffix;
    slugExists = await productRepository.getProductBySlug(slug);
    suffix++;
  }


  // Inicia una transacción
  const transaction = await db.transaction();
  try {
    const product = await productRepository.createProduct({
      title,
      slug,
      description,
      pet_type_id
    }, transaction);


    if (breed_size_ids && breed_size_ids.length > 0) {
      await productRepository.associateBreedSizes(product, breed_size_ids, transaction);
    }

    if (files && files.length > 0) {
      const images = files.map((file, index) => ({
        filename: file.filename,
        product_id: product.id,
        order: index
      }));
      await productRepository.saveImages(images, transaction);
    }


    if(composition && composition.length > 0){
      const compositionsToCreate = composition.map(comp => ({
        product_id: product.id,
        ingredient: comp
      }))
      await productRepository.createCompositions(compositionsToCreate, transaction);
    }

    

    // --- Creacion de variatnes ---
    if (variants && variants.length > 0) {
      // Se agrega el product_id a ca da variante para vincularlas al producto
      const variantsToCreate = variants.map(variant => ({
        weight_value: variant.weight_value,
        weight_unit_id: variant.weight_unit_id,
        price: variant.price,
        stock: variant.stock,
        product_id: product.id
      }));

      await productRepository.createVariants(variantsToCreate, transaction);

      // Calcular min_price y max_price de las variantes
      const prices = variantsToCreate.map(v => v.price);
      const min_price = Math.min(...prices);
      const max_price = Math.max(...prices);

      // Actualizar producto con min_price y max_price
      await product.update({ min_price, max_price }, { transaction });
    }


    // Si todo sale bien, confirma la transacción
    await transaction.commit();
    return product;

  } catch (error) {
    // Si hay error, revierte todo
    await transaction.rollback();
    // Aca borro las imagenes del servidor en caso de que la creación del producto falle y me quede con imagenes huerfanas
    if (files && files.length > 0) {
      await cleanupUploadsByFilenames(files.map(file => file.filename));

    }
    

    throw error; // Re-lanza el error para que lo maneje el controller
  }
};


export const updateProduct = async (body, files, idProducto) => {
  const { title, description, pet_type_id, breed_size_ids, variants, composition, is_active} = body;
  const productExists = await productRepository.getProductById(idProducto);
  if(!productExists){
    throw new Error('El producto no existe')
  }
  

   // ===== Validaciones de Negocio =====
   
  // 1. Validar pet_type_id 
  const petTypeExists = await productRepository.checkPetTypeExists(pet_type_id);
  if (!petTypeExists) {
    throw new Error('El tipo de mascota no existe');
  }

  // 2. Validar breed_size_ids 
  if (breed_size_ids?.length) {
    const sizesExist = await productRepository.checkBreedSizesExist(breed_size_ids);
    if (!sizesExist) {
      throw new Error('Uno o más tamaños de raza no existen');
    }
  }
  let slug = productExists.slug;
  // 3. Crea un nuevo Slug si el titulo cambia
  if (title !== productExists.title) {
    slug = slugify(title, { lower: true, strict: true });
    let slugExists = await productRepository.getProductBySlug(slug);
    let suffix = 1;
    while (slugExists) {
      slug = slugify(title, { lower: true, strict: true }) + '-' + suffix;
      slugExists = await productRepository.getProductBySlug(slug); // probar que devuelve
      console.log('Veficiar Slug Exists si esta vacio', slugExists)
      suffix++;
    } 
  }
  
  // Inicia una transacción
  const transaction = await db.transaction();
  try {
    const product = await productRepository.updateProductById(idProducto, {
      title,
      slug,
      description,
      pet_type_id,
      is_active: is_active !== undefined ? is_active : productExists.is_active

    }, transaction);

    const oldImages = await productRepository.getImagesByProductId(product.id);

    if (breed_size_ids && breed_size_ids.length > 0) {
      await productRepository.associateBreedSizes(product, breed_size_ids, transaction);
    }

    if (files && files.length > 0) {
      const images = files.map((file, index) => ({
        filename: file.filename,
        product_id: product.id,
        order: index
      }));
      await productRepository.deleteImagesByProductId(product.id, transaction);
      await productRepository.saveImages(images, transaction);
    }

    if(composition && composition.length > 0){
      const compositionsToCreate = composition.map(comp => ({
        product_id: product.id,
        ingredient: comp
      }))
      await productRepository.deleteCompositionsByProductId(product.id, transaction)
      await productRepository.createCompositions(compositionsToCreate, transaction);
    }

    if (variants && variants.length > 0) {
      const currentVariants = await productRepository.getVariantsByProductId(product.id, transaction)

      // Separo las variantes en dos tipos, las que se van a actualizar y las nuevas que se crean

      const variantsToUpdate = [];
      const variantsToCreate = [];

      variants.forEach(variant => {
        
        if(variant.id){
          // Es una variante existente (actualizar)
          variantsToUpdate.push(variant)
        } else {
            variantsToCreate.push({
            weight_value: variant.weight_value,
            weight_unit_id: variant.weight_unit_id,
            price: variant.price,
            stock: variant.stock,
            product_id: product.id
          });
        }
      });
      for (const updateData of variantsToUpdate) {
        const variant = currentVariants.find(v => v.id === updateData.id);
        if (variant) {
          await variant.update({
            weight_value: updateData.weight_value,
            weight_unit_id: updateData.weight_unit_id,
            price: updateData.price,
            stock: updateData.stock
          }, { transaction });
        }
      }

      await productRepository.createVariants(variantsToCreate, transaction);
      // Recalcular precios
      const updatedVariants = await productRepository.getVariantsByProductId(product.id, transaction)

      const prices = updatedVariants.map(v => v.price);
      const min_price = Math.min(...prices);
      const max_price = Math.max(...prices);

      await productRepository.updateProductById(product.id, { min_price, max_price }, transaction)
    }

    // Si todo sale bien, confirma la transacción
    await transaction.commit();
    
     // Limpiar archivos antiguos solo si se subieron nuevos
    if (files && files.length > 0) {
      await cleanupUploadsByFilenames(oldImages.map(img => img.filename));
    }
    
    return product;


  } catch (error) {
    // Si hay error, revierte todo
    await transaction.rollback();
    throw error; // Re-lanza el error para que lo maneje el controller
  }


};

export const getProducts = async (filters, user) =>{
  const { search, category, breedSizes, minPrice, maxPrice, sort, limit, offset, page } = filters

  // Validaciones y lógica de negocio pura:
  // — Validar categoría (existencia) devolviendo resultados vacíos si no existe
  let categoryId = null;
  if (category) {
    const petType = await productRepository.findPetTypeByName(category);
    if (!petType) {
      // Si la categoría no existe, simplemente no hay productos
      return { data: [], total: 0, page, totalPages: 0 };
    }
    categoryId = petType.id;
  }
  return await productRepository.findAllWithFilters({ search, categoryId, breedSizes, minPrice, maxPrice,  sort, limit, offset, user});

}


export const getProduct = async (id) =>{

  const product = await productRepository.getProductById(id);
  if (!product) {
    const error = new Error('Producto no encontrado');
    error.status = 404;
    throw error; 
  }

  return product;

}



export const deleteProduct = async (id) => {
  const product = await productRepository.getProductById(id);
  if (!product) {
    const error = new Error('Producto no encontrado');
    error.status = 400;
    throw error;
  }

  // Verificar si el producto tiene variantes en órdenes
  const cartState = await orderRepository.getStatusByName('cart')
  // Verifica que el producto no este en ordernes ya confirmadas es decir las que no estan en estado Cart
  const hasVariantsInOrders = await productRepository.checkProductVariantsInOrders(id, cartState.id);
  const transaction = await db.transaction();

  try {
    if (hasVariantsInOrders) {
      // Si tiene variantes en órdenes, desactivamos el producto en lugar de borrarlo
      product.is_active = false;
      await product.save({ transaction });
      
      await transaction.commit();
      
      return {
        message: 'El producto tiene variantes en órdenes existentes. Se ha desactivado en lugar de borrar.',
        product,
        wasDeactivated: true
      };
    } else {
      // Proceder con el borrado físico si no hay órdenes
      const oldImages = await productRepository.getImagesByProductId(id, transaction);
      const result = await productRepository.deleteProduct(product, transaction);
      
      await transaction.commit();
      
      await cleanupUploadsByFilenames(oldImages.map(img => img.filename));
      return {
        ...result,
        wasDeactivated: false
      };
    }
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};



export const deleteProductVariant = async (id) =>{

  const transaction = await db.transaction()
  try {

    const variantExists = await productRepository.getVariantById(id, transaction)

    if(!variantExists){
      const error = new Error('La variante no existe');
      error.status = 404;
      throw error;
    }

    const hasOrders = await productRepository.getOrdersByVariantIds(id, transaction)

    if(hasOrders){
      const error = new Error('La variante tiene pedidos asociados');
      error.status = 400; 
      throw error;
    }

    await productRepository.deleteVariantById(id, transaction)

    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error
  }
}