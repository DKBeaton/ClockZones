const hands = document.querySelectorAll('.hand');
const clocks = document.querySelectorAll('.clock-container');

function setDate() {

  // Get date
  const now = new Date();
  const utcOffset = now.getTimezoneOffset() / 60;

  // Get seconds, minutes and hours
  const seconds = now.getSeconds();
  const minutes = now.getMinutes();
  const hours = now.getHours();

  clocks.forEach(clock => {
    const secondHand = clock.querySelector('.hand.second')
    const minuteHand = clock.querySelector('.hand.minute')
    const hourHand = clock.querySelector('.hand.hour')

    let city = clock.querySelector('.country').innerHTML.toLowerCase();

    // Get city hours and minutes
    const cityHours = toCityHours(city, hours, utcOffset); 
    const cityMinutes = toCityMinutes(city, minutes, utcOffset);

    // Calculate degrees
    const secondsDeg = timeToDeg(seconds, 90); 
    const hoursDeg = ((cityHours / 12) * 360) + 90;
    const minutesDeg = timeToDeg(cityMinutes, 90);

    // Fix for rotating 360 when seconds equals 0
    if (seconds === 0) hands.forEach(hand => hand.style.transitionDuration = '0s');
    else hands.forEach(hand => hand.style.transitionDuration = '80ms');

    // Set styles
    secondHand.style.transform = `rotate(${secondsDeg}deg)`;
    minuteHand.style.transform = `rotate(${minutesDeg}deg)`;
    hourHand.style.transform = `rotate(${hoursDeg}deg)`;
  })
}

// Repeat every 1s
setInterval(setDate, 1000);

// Functions

function toCityMinutes(place, minutes, offset) {
  return ((minutes + ((offset * 60) % 60)) % 60) + (timeZoneOffset(place) - Math.floor(timeZoneOffset(place)));
}

function toCityHours(place, hours, offset) {
  return ((hours + Math.ceil(offset)) + timeZoneOffset(place)) % 24;
}

function timeZoneOffset(timezone) {
  switch(timezone) {
    case 'new york':
      return -4;
      break;
    case 'sydney':
      return 11;
      break;
    case 'brasilia':
      return -3;
      break;
    case 'cape town':
      return 2;
      break;
    case 'beijing':
      return 8;
      break;
   default:
     return 0;
  }
}

function timeToDeg(time, offset) {
  return ((time / 60) * 360) + offset;
}
