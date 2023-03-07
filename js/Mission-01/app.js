// do something!

// 요구사항 1. 페이지 상단 토글 버튼(i.toggle)이 클릭되면 사이드 내비게이션이 토글(open ⇔ close)되도록 한다.
document.querySelector("main > i.bx-right-arrow-circle").addEventListener("click", (e) => {
    const nav = document.querySelector("nav");
    if (nav.classList.contains("active")) {
        nav.classList.remove("active");
        localStorage.removeItem("active");
    } else {
        nav.classList.add("active");
        localStorage.setItem("active", "true");
    }
});

// 요구사항 2. 사이드 내비게이션 상태 관리
document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("active") === "true")
        document.querySelector("nav").classList.add("active");
});

// 요구사항 3. 사용성 1 - 위치 이동
// 요구사항 4. 사용성 2 - 트랜지션
window.addEventListener("load", () => {
    document.body.classList.remove("preload");
    document.body.style.visibility = "visible";
});