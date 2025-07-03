


function getFormattedWeight(variant) {
    const weight = parseFloat(variant.weight_value);
    return `${Number.isInteger(weight) ? weight : weight.toFixed(2)} ${variant.weight_unit_id}`;
}


export default getFormattedWeight