// do something!
import renderNews from "./renderNews.js";

function NewsList($container) {
    // <div class="news-list-container">
    //     <article class="news-list">
    //         <section class="news-item">
    //             <div class="thumbnail">
    //                 <a href="https://www.ajunews.com/view/20220220180410403" target="_blank"
    //                     rel="noopener noreferrer">
    //                     <img src="https://image.ajunews.com/content/image/2022/02/20/20220220180523846963.jpg"
    //                         alt="thumbnail" />
    //                 </a>
    //             </div>
    //             <div class="contents">
    //                 <h2>
    //                     <a href="https://www.ajunews.com/view/20220220180410403" target="_blank"
    //                         rel="noopener noreferrer">
    //                         ​[뉴욕증시 주간전망] 러시아-우크라이나 긴장 속 변동성 지속 - 아주경제
    //                     </a>
    //                 </h2>
    //                 <p>
    //                     이번 주(21일~25일·현지시간) 뉴욕 증시는 러시아와 우크라이나 간 지정학적 긴장과 우크라이나 간 미국
    //                     연방준비제도(Fed·연준)의 긴축 우려에 계속해서...
    //                 </p>
    //             </div>
    //         </section>
    //     </article>
    //     <div class="scroll-observer">
    //         <img src="img/ball-triangle.svg" alt="Loading..." />
    //     </div>
    // </div>

    // news-list-container
    let $newsListContainer = document.createElement("div");
    $newsListContainer.classList.add("news-list-container");

    // news-list
    let $newsList = document.createElement("article");
    $newsList.classList.add("news-list");
    $newsListContainer.appendChild($newsList);

    // scroll-observer
    let $scrollObserver = document.createElement("div");
    $scrollObserver.classList.add("scroll-observer");
    let $scrollObserverImg = document.createElement("img");
    $scrollObserverImg.src = "img/ball-triangle.svg";
    $scrollObserverImg.alt = "Loading...";
    $scrollObserver.appendChild($scrollObserverImg);
    $newsListContainer.appendChild($scrollObserver);

    $container.appendChild($newsListContainer);
}

export default NewsList;