import{p as r}from"./Footer.astro_astro_type_script_index_0_lang.f52594d3.js";fetch(`https://api.github.com/users/${r.github_name}/repos?per_page=10`).then(t=>t.json()).then(t=>{o(t)});function o(t){t.sort((e,i)=>i.stargazers_count-e.stargazers_count),t=t.filter(e=>!(e.fork||e.name.trim().toUpperCase()===r.github_name.trim().toUpperCase()));const a=document.getElementById("projects"),s=t.map(e=>`
        <a class="github-card" href="${e.html_url}">
            <div class="name">${e.name}</div>
            <div class="desc">${e.description||""}</div>
            <div class="info">
                <span class="language">${e.language||""}</span>
                <span class="star">⭐${e.stargazers_count}</span>
            </div>
        </a>
    `).join("");a.innerHTML=s}const c=document.querySelectorAll(".icon-link[draggable]");c.forEach(t=>{t.addEventListener("dragstart",l),t.addEventListener("dragend",d),t.addEventListener("drag",g)});const n=[0,0];function l(t){n[0]=t.clientX,n[1]=t.clientY}function g(t){t.clientX===0||t.clientY===0||(t.target.style.transitionProperty="background,border",t.target.style.top=t.clientY-n[1]+"px",t.target.style.left=t.clientX-n[0]+"px")}function d(t){t.target.style.top="0px",t.target.style.left="0px",t.target.style.transitionProperty="all"}
