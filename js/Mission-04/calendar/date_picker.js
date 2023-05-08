import calendar from "./calendar.js";

function date_picker($container) {
    // $container = "<input type="text" class="date_picker">

    function init($container) {
        // REQ1. Remove value attribute
        if ($container.hasAttribute("value")) {
            $container.removeAttribute("value");
        }
        $container.setAttribute("placeholder", "Select date");
        
        // REQ2. readonly
        $container.setAttribute("readonly", true);

        $container.addEventListener("click", (e) => {
            e.stopPropagation();
            // remove calendar if it exists
            if ($container.nextElementSibling) {
                if ($container.nextElementSibling.classList.contains("calendar")) {
                    $container.nextElementSibling.remove();
                }
            }

            // Inject calendar
            const $calendar = document.createElement("div");
            $calendar.classList.add("calendar");
            // REQ5. if there is a value in the container, set the value to the calendar
            if ($container.hasAttribute("value")) {
                // check if the value is valid
                const value = $container.getAttribute("value");
                const date = new Date(value);
                if (date instanceof Date && !isNaN(date)) {
                    // if the value is valid
                    $calendar.dataset.year = date.getFullYear();
                    $calendar.dataset.month = date.getMonth();
                } else {
                    // remove value
                    $container.removeAttribute("value");
                }
            }
            calendar($calendar, $container);

            // REQ4. If a user click outside of calendar, remove calendar
            function remove_calendar(e) {
                if (e.target !== $calendar) {
                    $calendar.remove();
                    document.removeEventListener("click", remove_calendar);
                }
            }
            document.addEventListener("click", remove_calendar);

            $container.after($calendar);
        });
    }

    init($container);
}

export default date_picker;