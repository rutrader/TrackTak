const truncateDecimal = (value, digits) => {
  const power = Math.pow(10, digits)
  return Math.trunc(value * power) / power
}

export default truncateDecimal
