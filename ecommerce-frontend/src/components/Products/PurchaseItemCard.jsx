import React, { useEffect, useState } from 'react';
import clienteAxios from '../../config/axios';
import StarRating from './StarRating ';
const PurchaseItemCard = ({ item }) => {
  const [rating, setRating] = useState(null);
  const [hasRated, setHasRated] = useState(false);

  const productId = item.variant.product_id;

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const res = await clienteAxios.get(`/reviews/${productId}`, { withCredentials: true });
        if (!res.data.rating) {
          setHasRated(false);
          setRating(null);
        } else {
          setRating(res.data.rating);
          setHasRated(true);
        }
      } catch (error) {
        setHasRated(false);
        setRating(null);
      }
    };
    fetchReview();
  }, [productId]);

  const handleRating = async (value) => {
    try {
      await clienteAxios.post(
        `/reviews/${productId}`,
        { rating: value },
        { withCredentials: true }
      );
      setRating(value);
      setHasRated(true);
    } catch (error) {
      console.error('Error al enviar rating:', error);
    }
  };

  return (
    <div className="flex justify-between items-center p-3 border rounded-md bg-gray-50">
      <div>
        <h3 className="text-md font-semibold text-gray-800">{item.product_title}</h3>
        <p className="text-sm text-gray-600">Tamaño: {item.variant_weight}</p>
        <p className="text-sm text-gray-600">Tipo de mascota: {item.pet_type_name}</p>
        <p className="text-sm text-gray-600">Cantidad: {item.quantity}</p>
        <p className="text-sm text-gray-600">Precio unitario: ${item.unit_price}</p>

        <div className="mt-2">
          <span className="text-sm text-gray-700">Tu calificación:</span>
          <StarRating
            rating={rating || 0}
            onRate={handleRating}
            disabled={hasRated}
          />
          {hasRated && <p className="text-xs text-gray-500">Ya calificaste este producto</p>}
        </div>
      </div>

      <div className="text-right">
        <p className="text-md font-bold text-[#2fd7c3]">${item.subtotal}</p>
      </div>
    </div>
  );
};

export default PurchaseItemCard;
