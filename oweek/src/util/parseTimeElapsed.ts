/**
 * function to display time of the last message in conversation list
 */
const parseTimeElapsed = (
  utcTime: string,
): { parsedTime: string; readableTime: string } => {
  const actionTime = new Date(utcTime).getTime();
  const timeNow = new Date().getTime();

  let difference = timeNow - actionTime;

  if (difference < 1000)
    return { readableTime: 'just now', parsedTime: 'just now' };

  const secondsInMs = 1000;
  const minutesInMs = secondsInMs * 60;
  const hoursInMs = minutesInMs * 60;
  const daysInMs = hoursInMs * 24;
  const weekInMs = daysInMs * 7;

  const elapsedWeeks = parseInt(String(difference / weekInMs), 10);
  difference %= weekInMs;

  const elapsedDays = parseInt(String(difference / daysInMs), 10);
  difference %= daysInMs;

  const elapsedHours = parseInt(String(difference / hoursInMs), 10);
  difference %= hoursInMs;

  const elapsedMinutes = parseInt(String(difference / minutesInMs), 10);

  let parsedTime = '...';

  if (elapsedWeeks >= 1) {
    if (elapsedWeeks === 1) {
      parsedTime = `${elapsedWeeks} week`;
    } else {
      parsedTime = `${elapsedWeeks} weeks`;
    }
  } else if (elapsedDays >= 1) {
    if (elapsedDays === 1) {
      parsedTime = `${elapsedDays} day`;
    } else {
      parsedTime = `${elapsedDays} days`;
    }
  } else if (elapsedHours >= 1) {
    if (elapsedHours === 1) {
      parsedTime = `${elapsedHours} hr`;
    } else {
      parsedTime = `${elapsedHours} hrs`;
    }
  } else if (elapsedMinutes >= 1) {
    if (elapsedMinutes === 1) {
      parsedTime = `${elapsedMinutes} min`;
    } else {
      parsedTime = `${elapsedMinutes} mins`;
    }
  } else if (elapsedMinutes < 1) parsedTime = 'just now';

  const readableTime =
    parsedTime === 'just now' ? `${parsedTime}` : `${parsedTime} ago`;

  return {
    parsedTime,
    readableTime,
  };
};

export default parseTimeElapsed;
