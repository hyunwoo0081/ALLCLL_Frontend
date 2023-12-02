export function getDateString(date: string) {
  const [day, time] = date.split('T');
  const dateString = day.split('-').join('/');
  const [hour, minute] = time.split(':');

  return `${dateString} ${hour}:${minute}`;
}

export function getTimerString(time: string) {
  // eslint-disable-next-line prefer-const
  let [timeString, millisecond] = time.split('.');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, minute, second] = timeString.split(':');


  if (millisecond === undefined)
    millisecond = '00';
  else if (millisecond.length >= 2)
    millisecond = millisecond.substring(0, 2);
  else
    millisecond = millisecond.padEnd(2, '0');

  const milli = isNaN(Number(millisecond)) ? '00' : millisecond;
  const sec = isNaN(Number(second)) ? '00' : second;
  const min = isNaN(Number(minute)) ? 0 : Number(minute);

  return `${min}:${sec}.${milli}`;
}