export const convertTimestampToDate = (timestamp: number) => {
  if (!timestamp) return;
  const date = new Date(timestamp * 1000);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = '0' + date.getMinutes();
  const seconds = '0' + date.getSeconds();
  const formattedTime = `${day}/${month}/${year} ${hours}:${minutes.substr(-2)}:${seconds.substr(
    -2,
  )}`;
  return formattedTime;
};
