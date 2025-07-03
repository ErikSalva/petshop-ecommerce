import React from 'react'

const FilterTag  = ({ label, onRemove }) => {
  return (
     <div className="flex items-center bg-[#e2f6f4] text-[#2fd7c3] px-3 py-1 rounded-full text-sm">
        <span>{label}</span>
        <button onClick={onRemove} className="ml-2 text-[#0d9488] hover:text-red-500">
        ✕
        </button>
    </div>
  )
}

export default FilterTag 