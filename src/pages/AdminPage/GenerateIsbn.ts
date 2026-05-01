export const generateISBN13 = () => {
  const prefix = Math.random() < 0.5 ? [9, 7, 8] : [9, 7, 9];

  const body = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10));
  
  const isbnDigits = [...prefix, ...body];

  const sum = isbnDigits.reduce((acc, digit, index) => {
    const weight = index % 2 === 0 ? 1 : 3;
    return acc + (digit * weight);
  }, 0);

  const checkDigit = (10 - (sum % 10)) % 10;
  
  return [...isbnDigits, checkDigit].join('');
};