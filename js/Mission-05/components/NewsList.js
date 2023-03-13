// do something!
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

    // REQ2. Get news from News API and render it on the page
    const renderNews = async (category, page, pageSize) => {
        let news = await getNews(category, page, pageSize);
        return news.map((article) => renderArticle(article));
    }

    const getNews = async (category, page, pageSize) => {
        const apiKey = "4b3128891f014278bfa3701eb7130721";
        const url = `https://newsapi.org/v2/top-headlines?country=kr&category=${category === "all" ? "" : category}&page=${page}&pageSize=${pageSize}&apiKey=${apiKey}`
        let news = await axios.get(url);
        return news.data.articles;
    }

    const renderArticle = (article) => {
        let $section = document.createElement("section");
        $section.classList.add("news-item");
    
        // Thumbnail
        let $thumbnail = document.createElement("div");
        $thumbnail.classList.add("thumbnail");
        let $thumbnailLink = document.createElement("a");
        $thumbnailLink.setAttribute("href", article.url);
        $thumbnailLink.setAttribute("target", "_blank");
        $thumbnailLink.setAttribute("rel", "noopener noreferrer");
        let $thumbnailImg = document.createElement("img");
        $thumbnailImg.setAttribute("src", article.urlToImage ? article.urlToImage : "data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==");
        $thumbnailImg.setAttribute("alt", "thumbnail");
        $thumbnailLink.appendChild($thumbnailImg);
        $thumbnail.appendChild($thumbnailLink);
        $section.appendChild($thumbnail);
    
        // Contents
        let $contents = document.createElement("div");
        $contents.classList.add("contents");
    
        // Title
        let $title = document.createElement("h2");
        let $titleLink = document.createElement("a");
        $titleLink.setAttribute("href", article.url);
        $titleLink.setAttribute("target", "_blank");
        $titleLink.setAttribute("rel", "noopener noreferrer");
        $titleLink.textContent = article.title;
        $title.appendChild($titleLink);
        $contents.appendChild($title);
    
        // Content
        let $content = document.createElement("p");
        $content.textContent = article.content ? article.content : "";
        $contents.appendChild($content);
        
        $section.appendChild($contents);
    
        return $section;
    }

    // REQ3. Infinite scroll
    let page = 1;
    let intersectionObserver = new IntersectionObserver(async ([e], observer) => {
        if (e.isIntersecting) {
            observer.unobserve(e.target);
            let newsItems = await renderNews(window.state.category, page++, 10);
            newsItems.forEach((newsItem) => {
                $newsList.appendChild(newsItem);
            });
            observer.observe(e.target);
        }
    });
    intersectionObserver.observe($scrollObserverImg);

    // REQ4. Subscribe chaning category
    window.state.subscribe(() => {
        page = 1;
        $newsList.innerHTML = "";
    });
}

export default NewsList;