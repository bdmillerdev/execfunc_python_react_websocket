// dd/mm/yyyy, hh:mm:ss
export const formatDateFromTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleString();
};
