export const formatTime = (seconds: number) => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds - hrs * 3600) / 60);
  const secs = seconds - hrs * 3600 - mins * 60;

  let timeString = '';
  if (hrs > 0) {
    timeString += hrs.toString().padStart(2, '0') + ':';
  }
  timeString += mins.toString().padStart(2, '0') + ':' + secs.toString().padStart(2, '0');

  return timeString;
};
