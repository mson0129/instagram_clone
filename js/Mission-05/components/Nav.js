// do something!
function Nav($container) {
    // REQ4. Observer Pattern
    class State {
        constructor() {
            this._category = "all";
            this.observers = [];
        }

        get category() {
            return this._category;
        }

        set category(category) {
            this._category = category;
            this.notify(category);
        }

        subscribe(observer) {
            this.observers.push(observer);
        }

        unsubscribe(observer) {
            this.observers = this.observers.filter(subscriber => subscriber !== observer);
        }

        notify(data) {
            this.observers.forEach(subscriber => subscriber(data));
        }
    }
    window.state = new State();


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
        if (window.state.category === Object.keys(categories)[i]) {
            $li.classList.add("active");
        }
        $li.id = Object.keys(categories)[i];
        $li.innerText = Object.values(categories)[i];

        // Observer Pattern
        $li.addEventListener("click", async (e) => {
            window.state.category = e.target.id;
        });

        window.state.subscribe((category) => {
            if (category === $li.id) {
                $li.classList.add("active");
            } else {
                $li.classList.remove("active");
            }
        });

        $ul.appendChild($li);
    }
    $nav.appendChild($ul); 
    $container.appendChild($nav);
}

export default Nav;