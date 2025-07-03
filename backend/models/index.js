import Product from "./Product.js";
import Image from "./Image.js";
import PetType from "./PetType.js";
import BreedSize from "./BreedSize.js";
import ProductBreedSize from "./ProductBreedSize.js";
import Composition from "./Composition.js";
import Variant from "./Variant.js";
import Review from "./Review.js";
import Order from "./Order.js";
import OrderItem from "./OrderItem.js";
import OrderStatus from "./OrderStatus.js";
import User from "./User.js";
import Favorite from "./Favorite.js";
// Relaciones Productos <-> Imágenes

Product.hasMany(Image, { foreignKey: 'product_id' });
Image.belongsTo(Product, { foreignKey: 'product_id' });

// Productos <-> Tipos de mascota
PetType.hasMany(Product, { foreignKey: 'pet_type_id' });
Product.belongsTo(PetType, { foreignKey: 'pet_type_id' });

// Productos <-> Tamaños de raza (muchos a muchos)
Product.belongsToMany(BreedSize, {
  through: ProductBreedSize,
  foreignKey: 'product_id',
  otherKey: 'breed_size_id',
});
BreedSize.belongsToMany(Product, {
  through: ProductBreedSize,
  foreignKey: 'breed_size_id',
  otherKey: 'product_id',
});

// Productos <-> Composición
Product.hasMany(Composition, { foreignKey: 'product_id' });
Composition.belongsTo(Product, { foreignKey: 'product_id' });

// Productos <-> Variantes
Product.hasMany(Variant, { foreignKey: 'product_id' });
Variant.belongsTo(Product, { foreignKey: 'product_id' });

// Productos <-> Reseñas
Product.hasMany(Review, { foreignKey: 'product_id' });
Review.belongsTo(Product, { foreignKey: 'product_id' });

// Usuarios <-> Órdenes
User.hasMany(Order, { foreignKey: 'user_id' });
Order.belongsTo(User, { foreignKey: 'user_id' });

// Órdenes <-> Estados
OrderStatus.hasMany(Order, { foreignKey: 'status_id' });
Order.belongsTo(OrderStatus, { foreignKey: 'status_id' });


// OrderItem es una entidad que representa un ítem específico dentro de una orden,
// con datos adicionales como cantidad y subtotal. 
// Por eso NO es una relación muchos a muchos pura, 
// sino dos relaciones uno a muchos: 
// cada Order tiene muchos OrderItems y cada Variant puede estar en muchos OrderItems.
// Por eso usamos hasMany/belongsTo en lugar de belongsToMany con tabla intermedia.

// Órdenes <-> Ítems de orden
Order.hasMany(OrderItem, { foreignKey: 'order_id'});
OrderItem.belongsTo(Order, { foreignKey: 'order_id' });

// Variantes <-> Ítems de orden
Variant.hasMany(OrderItem, { foreignKey: 'variant_id', onDelete: 'RESTRICT'} );
OrderItem.belongsTo(Variant, { foreignKey: 'variant_id', onDelete: 'RESTRICT' });

// Usuarios <-> Reseñas
User.hasMany(Review, { foreignKey: 'user_id' });
Review.belongsTo(User, { foreignKey: 'user_id' });

// Usuarios <-> Productos favoritos (muchos a muchos)
User.belongsToMany(Product, {
  through: Favorite,
  foreignKey: 'user_id',
  otherKey: 'product_id',
  as: 'favoriteProducts'
});

Product.belongsToMany(User, {
  through: Favorite,
  foreignKey: 'product_id',
  otherKey: 'user_id',
  as: 'favoritedByUsers'
});


export {
  Product,
  Image,
  PetType,
  BreedSize,
  ProductBreedSize,
  Composition,
  Variant,
  Review,
  Order,
  OrderItem,
  OrderStatus,
  User,
  Favorite

};