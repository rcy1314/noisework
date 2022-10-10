const toggleTheme = document.getElementById("theme-toggle");

const storedTheme = localStorage.getItem('favicon') && localStorage.getItem('theme') || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
if (storedTheme)
    document.documentElement.setAttribute('data-theme', storedTheme) && changeFavicon.setAttribute("href", "images/light.svg");
toggleTheme.onclick = function () {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const currentIcon = changeFavicon.getAttribute("href");
    let targetTheme = "light";
    let targetIcon = "images/light.svg";
    if (currentTheme === "light" && (currentIcon === 'images/light.svg' || currentIcon === 'images/favicon.svg')) {
        targetTheme = "dark";
        targetIcon = "images/dark.svg"
    }
    document.documentElement.setAttribute('data-theme', targetTheme)
    localStorage.setItem('theme', targetTheme);
    changeFavicon.setAttribute("href", targetIcon)
    localStorage.setItem('favicon', targetIcon);
};


// Change the favicon based on theme switch :)
const toggleIcon = document.getElementById("icon-toggle")
const changeFavicon = document.querySelector("link[type='image/svg+xml");
