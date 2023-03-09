// do something!
import renderNews from "./renderNews.js";

function Nav($container) {
    // REQ1. Render a navigation bar
    // <nav class="category-list">
    //     <ul>
    //         <li id="all" class="category-item active">전체보기</li>
    //         <li id="business" class="category-item">비즈니스</li>
    //         <li id="entertainment" class="category-item">엔터테인먼트</li>
    //         <li id="health" class="category-item">건강</li>
    //         <li id="science" class="category-item">과학</li>
    //         <li id="sports" class="category-item">스포츠</li>
    //         <li id="technology" class="category-item">기술</li>
    //     </ul>
    // </nav>

    let $nav = document.createElement("nav");
    $nav.classList.add("category-list");
    let $ul = document.createElement("ul");
    const categories = {"all": "전체보기", "business": "비즈니스", "entertainment": "엔터테인먼트", "health": "건강", "science": "과학", "sports": "스포츠", "technology": "기술"};
    for (let i = 0; i < 7; i++) {
        let $li = document.createElement("li");
        $li.classList.add("category-item");
        $li.id = Object.keys(categories)[i];
        $li.innerText = Object.values(categories)[i];

        // Dev. - Do not use this code for observer pattern.
        $li.addEventListener("click", async (e) => {
            const $category = e.target.id;
            await renderNews($category, 2, 20)
                .then(function (newsSectionsArr) {
                    let $newsListContainer = document.querySelector(".news-list");
                    for (let i = 0; i < newsSectionsArr.length; i++) {
                        $newsListContainer.appendChild(newsSectionsArr[i]);
                    }
                });
        });

        $ul.appendChild($li);
    }
    $nav.appendChild($ul);
    $container.appendChild($nav);
}

export default Nav;