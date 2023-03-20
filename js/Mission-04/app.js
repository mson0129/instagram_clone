import calendar from './calendar/calendar.js';
import date_picker from './calendar/date_picker.js';

// REQ1. Dynamically create a calendar
const $calendars = document.querySelectorAll('.calendar');

$calendars.forEach($container => {
    calendar($container);
});

const $date_pickers = document.querySelectorAll('.date-picker');

$date_pickers.forEach($container => {
    date_picker($container);
});
