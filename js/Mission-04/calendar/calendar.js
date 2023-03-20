function calendar($container, $input = null) {
    const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    // Dynamically inject CSS
    function inject_stylesheet() {
        let $posToInsert = document.querySelector("head").lastElementChild;
        let $linkElems = document.querySelectorAll("head > link");
        if ($linkElems.length > 0) {
            $posToInsert = $linkElems[$linkElems.length - 1];
        }
        if (!document.querySelector("head > link[href='calendar/theme.css']")) {
            const $link = document.createElement("link");
            $link.rel = "stylesheet";
            $link.href = "calendar/theme.css";
            $posToInsert.after($link);
        }
    }
    if (!document.querySelector("head > link[href='calendar/theme.css']")) {
        inject_stylesheet();
    }

    function init($container) {
        // get Today date
        const today = new Date();
        let year = today.getFullYear();
        let month = today.getMonth();

        if ("year" in $container.dataset && "month" in $container.dataset) {
            // If the year of dataset is valid
            if ("year" in $container.dataset && !isNaN($container.dataset.year) && $container.dataset.year >= 0) {
                // invalid year
                year = $container.dataset.year;
            }
            // If the month of dataset is valid
            if ("month" in $container.dataset && isNaN($container.dataset.month) && $container.dataset.month.length >= 3) {
                // month is not a number
                const month_name = $container.dataset.month.slice(0, 1).toUpperCase() + $container.dataset.month.slice(1).toLowerCase();
                if (MONTH_NAMES.indexOf(month_name) >= 0) {
                    month = MONTH_NAMES.indexOf(month_name);
                }
            } else if ($container.dataset.month >= 0 || $container.dataset.month > 11) {
                month = $container.dataset.month;
            }
        }

        $container.dataset.year = year;
        $container.dataset.month = month;
    }

    function render_template($container, $input = null) {
        $container.innerHTML = "";

        // nav
        const $nav = document.createElement("div");
        $nav.classList.add("calendar-nav");

        // nav - prev
        const $nav_prev = document.createElement("button");
        $nav_prev.classList.add("calendar-nav-prev");
        $nav_prev.setAttribute("aria-label", "전월");
        $nav_prev.innerHTML = "&#9664;";
        // REQ2. Clicking the prev month button should show the prev month
        $nav_prev.addEventListener("click", (e) => {
            e.stopPropagation();
            // recalculate the month
            const d = new Date(parseInt($container.dataset.year), parseInt($container.dataset.month) - 1, 1);
            $container.dataset.year = d.getFullYear();
            $container.dataset.month = d.getMonth();
            render($container, $input);
        });
        $nav.appendChild($nav_prev);

        // nav - year & month
        const $nav_year_month = document.createElement("div");
        $nav_year_month.classList.add("calendar-nav-month-year");

        // nav - month
        const $nav_month = document.createElement("span");
        $nav_month.classList.add("calendar-nav-month");
        $nav_year_month.appendChild($nav_month);

        // nav - year
        const $nav_year = document.createElement("span");
        $nav_year.classList.add("calendar-nav-year");
        $nav_year_month.appendChild($nav_year);

        $nav.appendChild($nav_year_month);

        // nav - next
        const $nav_next = document.createElement("button");
        $nav_next.classList.add("calendar-nav-next");
        $nav_next.setAttribute("aria-label", "익월");
        $nav_next.innerHTML = "&#9654;";
        $nav.appendChild($nav_next);
        // REQ2. Clicking the next month button should show the next month
        $nav_next.addEventListener("click", (e) => {
            e.stopPropagation();
            // recalculate the month
            const d = new Date(parseInt($container.dataset.year), parseInt($container.dataset.month) + 1, 1);
            $container.dataset.year = d.getFullYear();
            $container.dataset.month = d.getMonth();
            render($container, $input);
        });
        $container.appendChild($nav);
        
        // grid
        const $grid = document.createElement("div");
        $grid.classList.add("calendar-grid");
        $container.appendChild($grid);

        // handle
        const $resize_handle = document.createElement("div");
        $resize_handle.classList.add("calendar-resize-handle");
        $container.appendChild($resize_handle);
        resize_handler($container);

        // REQ6. The calendar should be able to be resized
        let calendar_size = parseInt($container.style.getPropertyValue("--calendar-size")) || 480;
        $container.style.setProperty("font-size", (calendar_size / 480) + "em");
    }

    function resize_handler(app) {
        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        if (app.querySelectorAll(".calendar-resize-handle").length > 0) {
            // if present, the header is where you move the DIV from:
            app.querySelectorAll(".calendar-resize-handle").forEach(header => {
                header.onmousedown = dragMouseDown;
            });
        }

        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            // get the mouse cursor position at startup:
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeResizeElement;
            // call a function whenever the cursor moves:
            document.onmousemove = resize;
        }

        function resize(e) {
            e = e || window.event;
            e.preventDefault();
            // calculate the new cursor position:
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            // set the element's new size:
            let calendar_size = Math.min(Math.max(app.offsetWidth - pos1, 0), Math.max(app.offsetHeight - pos2, 0));
            app.style.setProperty("--calendar-size", calendar_size + "px");
            app.style.setProperty("font-size", (calendar_size / 480) + "em");
        }

        function closeResizeElement() {
            // stop moving when mouse button is released:
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }

    function render($container, $input = null) {
        const WEEKDAY_NAMES = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

        // change month and year
        const month = $container.dataset.month;
        const year = $container.dataset.year;

        const $nav = $container.querySelector(".calendar-nav");
        const $nav_year = $nav.querySelector(".calendar-nav-year");
        const $nav_month = $nav.querySelector(".calendar-nav-month");
        $nav_month.innerHTML = MONTH_NAMES[month];
        $nav_year.innerHTML = year;

        // change grid
        const $grid = $container.querySelector(".calendar-grid");
        $grid.innerHTML = "";

        // get the first date of the first week of month
        let start_day = new Date(year, parseInt(month), 1);
        start_day.setDate(start_day.getDate() - start_day.getDay());

        // get the last date of the last week of month
        let end_day = new Date(year, parseInt(month) + 1, 0);
        end_day.setDate(end_day.getDate() + (6 - end_day.getDay()));

        // render weekday names
        for (let i = 0; i < WEEKDAY_NAMES.length; i++) {
            const $weekday = document.createElement("span");
            $weekday.classList.add("calendar-grid-weekday");
            $weekday.innerHTML = WEEKDAY_NAMES[i];
            $grid.appendChild($weekday);
        }

        // REQ3. Fill in the all cells of the calendar
        for (let i = 0; i < 42; i++) {
            const $day = document.createElement("span");
            $day.classList.add("calendar-grid-day");
            // Not this month
            if (start_day.getMonth() === parseInt(month)) {
                $day.classList.add("this-month");
            } else {
                $day.classList.add("not-this-month");
            }
            // REQ4. Today
            const today = new Date();
            if (start_day.getMonth() === today.getMonth() && start_day.getDate() === today.getDate()) {
                $day.classList.add("today");
            }
            // Set Data
            $day.dataset.day = start_day.getFullYear() + "-" + ("00" + (parseInt(start_day.getMonth()) + 1)).slice(-2) + "-" + ("00" + start_day.getDate()).slice(-2);
            $day.innerHTML = start_day.getDate();

            if ($input) {
                // DatePicker - REQ3. Click Event
                $day.addEventListener("click", (e) => {
                    // set value
                    $input.setAttribute("value", e.target.dataset.day);
                    // remove calendar
                    $container.remove();
                });
            } else {
                // REQ7. Print the date on the console when the user clicks on a day
                $day.addEventListener("click", (e) => {
                    console.log(e.target.dataset.day);
                });
            }

            $grid.appendChild($day);

            start_day.setDate(start_day.getDate() + 1);
        }
    }

    init($container);
    render_template($container, $input);
    render($container, $input);
}

export default calendar;