const AnalogClock = $container => {
    // Create a clock hands
    for (const v of ["hour", "minute", "second"]) {
        const $hand = document.createElement("div");
        $hand.classList.add("hand", v);
        $container.appendChild($hand);
    }
    // Create a clock face
    for (let i = 0; i < 12; i++) {
        const $time = document.createElement("div");
        $time.classList.add("time", "time" + i);
        $time.innerHTML = "|";
        $container.appendChild($time);
    }

    // Update the clock hands
    const update = () => {
        const now = new Date();
        const seconds = now.getSeconds();
        const minutes = now.getMinutes();
        const hours = now.getHours();
        $container.querySelector(".second").style.setProperty("--deg", seconds * 6);
        $container.querySelector(".minute").style.setProperty("--deg", minutes * 6);
        $container.querySelector(".hour").style.setProperty("--deg", hours * 30);
    }

    update(); // Initial update
    setInterval(update, 1000);
};

export default AnalogClock;
