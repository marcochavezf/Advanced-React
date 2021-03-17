export default function formatMoney(amount = 0) {
  const options = {
    style: 'currency',
    currency: 'USD',
    minimunFractionDigits: 2,
  };

  // check if its a clean dollar amount
  if (amount % 100 === 0) {
    options.minimunFractionDigits = 0;
  }

  const formatter = new Intl.NumberFormat('es-US', options);
  return formatter.format(amount / 100);
}
