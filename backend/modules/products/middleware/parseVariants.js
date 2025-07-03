// middlewares/parseVariants.js
export function parseVariants(req, res, next) {
  try {
    // Parseo de variants
    if (Array.isArray(req.body.variants)) {
      req.body.variants = req.body.variants.map(item => {
        if (typeof item === 'string') {
          item = JSON.parse(item);
        }
        item.weight_value = Number(item.weight_value);
        item.price = Number(item.price);
        item.stock = Number(item.stock);
        return item;
      });
    } else if (typeof req.body.variants === 'string') {
      try {
        const parsed = JSON.parse(req.body.variants);
        req.body.variants = parsed.map(item => {
          item.weight_value = Number(item.weight_value);
          item.price = Number(item.price);
          item.stock = Number(item.stock);
          return item;
        });
      } catch (e) {
        e.status = 400;
        e.message = 'Error al parsear variants: el JSON es inválido.';
        return next(e);
      }
    }

    // Parseo de breed_size_ids
    if (typeof req.body.breed_size_ids === 'string') {
      try {
        req.body.breed_size_ids = JSON.parse(req.body.breed_size_ids);
      } catch (e) {
        e.status = 400;
        e.message = 'Error al parsear breed_size_ids: el JSON es inválido.';
        return next(e);
      }
    }

    // Parseo de composition
    if (typeof req.body.composition === 'string') {
      try {
        req.body.composition = JSON.parse(req.body.composition);
      } catch (e) {
        e.status = 400;
        e.message = 'Error al parsear composition: el JSON es inválido.';
        return next(e);
      }
    }

    next();
  } catch (err) {
    err.status = 400;
    err.message = 'Error inesperado al parsear los datos del producto.';
    next(err);
  }
}
