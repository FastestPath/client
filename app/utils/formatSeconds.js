export default function formatSeconds(totalSeconds){
  const hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const hourString = hours > 0 ? `${hours} hour ,` : "";
  const minutesString = minutes > 0 ? `${minutes} minute and ` : "";
  const secondsString = seconds > 0 ? `${seconds} second ` : "";

  return hourString + minutesString + secondsString;
}