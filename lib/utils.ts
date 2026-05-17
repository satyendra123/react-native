export function formatPrice(price: number) {
  if (!Number.isFinite(price)) {
    return "₹0";
  }

  if (price >= 10000000) {
    const value = price / 10000000;
    return `₹${Number.isInteger(value) ? value : value.toFixed(1)}Cr`;
  }

  if (price >= 100000) {
    const value = price / 100000;
    return `₹${Number.isInteger(value) ? value : value.toFixed(1)}L`;
  }

  return `₹${new Intl.NumberFormat("en-IN").format(price)}`;
}
