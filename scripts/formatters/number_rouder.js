export function roundNumber(number, numberDecimalPlaces) {
  return number.toLocaleString(
    "en-GB",
    {
      maximumFractionDigits: numberDecimalPlaces,
      minimumFractionDigits: numberDecimalPlaces
    }
  )
}