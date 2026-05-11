export function formatScientific(value, precision = 2) {
  if (value === null || value === undefined || Number.isNaN(value) || !Number.isFinite(value)) {
    return 'N/A';
  }
  if (value === 0) return '0';

  const absVal = Math.abs(value);
  if (absVal >= 1e4 || absVal <= 1e-3) {
    const expStr = value.toExponential(precision);
    const [coeff, exp] = expStr.split('e');
    const cleanExp = exp.replace('+', '');
    return `${coeff}×10^${cleanExp}`;
  }
  
  return Number.isInteger(value) ? value.toString() : parseFloat(value.toFixed(precision + 1)).toString();
}
