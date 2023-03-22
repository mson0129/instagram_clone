// do something!

function StarRating ($container) {
    // REQ3. Insert the stylesheet into the head of the document (AFTER the last link element)
    let $posToInsert = document.querySelector("head").lastElementChild;
    let $linkElems = document.querySelectorAll("head > link");
    if ($linkElems.length > 0) {
        $posToInsert = $linkElems[$linkElems.length - 1];
    }
    if (!document.querySelector("head > link[href='star-rating/theme.css']")) {
        const $link = document.createElement("link");
        $link.rel = "stylesheet";
        $link.href = "star-rating/theme.css";
        $posToInsert.after($link);
    }

    // Add the class 'star-rating-container' to the star-rating container
    $container.classList.add("star-rating-container");
    // REQ7. Remove the 'hovered' class from the star element when the mouse leaves it
    $container.addEventListener("mouseleave", (e) => {
        const $targets = e.target.querySelectorAll(".hovered");
        $targets.forEach(($target) => {
            $target.classList.remove("hovered");
        });
    });

    // REQ1. Create the star elements
    // REQ4. Make the number of stars configurable by setting a data-max-rating attribute on the star-rating container
    for (let i = 0; i < $container.dataset.maxRating; i++) {
        const $star = document.createElement("i");
        $star.classList.add("star", "bx", "bxs-star");
        // REQ6. Add the class 'hovered' to the star element when the mouse enters it
        $star.addEventListener("mouseenter", (e) => {
            let $target = e.target;
            while ($target) {
                $target.classList.add("hovered");
                $target = $target.previousElementSibling;
            }
        });
        $star.addEventListener("click", (e) => {
            let $target = e.target;
            let rating = 0;
            while ($target) {
                rating++;
                $target.classList.add("selected");
                $target = $target.previousElementSibling;
            }
            $target = e.target.nextElementSibling;
            while ($target) {
                $target.classList.remove("selected");
                $target = $target.nextElementSibling;
            }
            // REQ9. Dispatch the 'rating-change' event on the star-rating container when a star is clicked
            $container.dispatchEvent(new CustomEvent("rating-change", { detail: rating }));
        });
        $container.appendChild($star);
    }
}

export default StarRating;