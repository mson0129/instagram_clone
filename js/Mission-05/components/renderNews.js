async function getNews(category, page, pageSize) {
    const apiKey = "4b3128891f014278bfa3701eb7130721";
    const url = `https://newsapi.org/v2/top-headlines?country=kr&category=${category === "all" ? "" : category}&page=${page}&pageSize=${pageSize}&apiKey=${apiKey}`
    
    return axios.get(url)
        .then(function (response) {
            // handle success
            if (response.status === 200) {
                console.log(response);
                return response.data.articles;
            } else {
                console.log("API Error!");
            }
        })
        .catch(function (error) {
            console.log(error);
            return false;
        })
        .finally(function () {
            console.log("getNews() finished.")
        });
}

async function renderNews(category, page, pageSize) {
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

    return getNews(category, page, pageSize)
        .then(function (news) {
            console.log(news);
            return news.map((news) => render(news));
        });
}

function render(news) {
    let $section = document.createElement("section");
    $section.classList.add("news-item");

    // Thumbnail
    if (news.urlToImage) {
        let $thumbnail = document.createElement("div");
        $thumbnail.classList("thumbnail");
        let $thumbnailLink = document.createElement("a");
        $thumbnailLink.setAttribute("href", news.url);
        $thumbnailLink.setAttribute("target", "_blank");
        $thumbnailLink.setAttribute("rel", "noopener noreferrer");
        let $thumbnailImg = document.createElement("img");
        $thumbnailImg.setAttribute("src", news.urlToImage);
        $thumbnailImg.setAttribute("alt", "thumbnail");
        $thumbnailLink.appendChild($thumbnailImg);
        $thumbnail.appendChild($thumbnailLink);
        $section.appendChild($thumbnail);
    }

    // Contents
    let $contents = document.createElement("div");
    $contents.classList.add("contents");

    // Title
    let $title = document.createElement("h2");
    let $titleLink = document.createElement("a");
    $titleLink.setAttribute("href", news.url);
    $titleLink.setAttribute("target", "_blank");
    $titleLink.setAttribute("rel", "noopener noreferrer");
    $titleLink.textContent = news.title;
    $title.appendChild($titleLink);
    $contents.appendChild($title);

    // Content
    if (news.content) {
        let $content = document.createElement("p");
        $content.textContent = news.content;
        $contents.appendChild($content);
    }
    
    $section.appendChild($contents);

    return $section;
}

export default renderNews;