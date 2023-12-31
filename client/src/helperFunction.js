export function metersToKMAndM(meters) {
  const km = Math.floor(meters / 1000);
  const m = meters % 1000;
  if (km) {
    return `${km}km ${m}m`;
  } else {
    return `${m}m`;
  }
}

export function secondsToHMS(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  return `${hours}시간 ${minutes}분`;
}

export function parseDateString(dateString) {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const formattedDate = `${year}-${month}-${day}`;
  const formattedTime = `${hours}시 ${minutes}분`;

  return { date: formattedDate, time: formattedTime };
}
