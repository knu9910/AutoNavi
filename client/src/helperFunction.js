export function metersToKMAndM(meters) {
  const km = Math.floor(meters / 1000);
  const m = meters % 1000;

  return `${km}km ${m}m`;
}

export function secondsToHMS(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return `${hours}시간 ${minutes}분 ${remainingSeconds}초`;
}
