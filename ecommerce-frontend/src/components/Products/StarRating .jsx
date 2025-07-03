import React from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';

const StarRating = ({ rating, onRate = () => {}, disabled = false }) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((value) => (
        <button
          key={value}
          onClick={() => !disabled && onRate(value)}
          className="text-yellow-400 cursor-pointer"
        >
          {value <= rating ? <FaStar /> : <FaRegStar />}
        </button>
      ))}
    </div>
  );
};

export default StarRating;
