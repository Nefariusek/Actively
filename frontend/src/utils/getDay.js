export default (locale = 'en-US', date = new Date()) => date.toLocaleDateString(locale, { weekday: 'long' });

// examples:
// getDay() - returns current day name
// getDay('pl_PL') - returns current day name in polish
// getDay(undefined, new Date('2019-12-20')) - returns 'Friday'
