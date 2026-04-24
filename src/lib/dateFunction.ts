export const getDaysBetween = (startDate: string, endDate: string): number => {
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();
  
  return Math.floor((end - start) / (1000 * 60 * 60 * 24));
};