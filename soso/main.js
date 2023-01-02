function getScroll() {
    return {
        x: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0,
        y: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
    };
}


window.onscroll = function () {
    let toTop = document.querySelector(".toTop");
    console.log(getScroll().y);
    if (getScroll().y > 10) {
        toTop.style = "display:flex";
        toTop.onclick = function () {
            window.scrollTo(0, 0);
        }
    } else {
        toTop.style = "display:none";
    }
}



function onkeydownEnter() {
    switch (event.keyCode) {
        case 13:
            ssGo();
            break;
    }
}

let deleteAll = document.querySelector(".deleteAll");
let ssInput = document.querySelector("#ssInput");

function clickDelete() {
    let deleteContent = document.querySelector("#content");
    deleteContent.parentNode.removeChild(deleteContent);

    let newContent = document.createElement("div");
    document.querySelector("body").appendChild(newContent);
    newContent.setAttribute("id", "content");

    deleteAll.style = "display:none";

    document.querySelector(".header").className = "header";
    ssInput.className = "";
    ssInput.value = "";
}


function ssGo() {
    document.querySelector(".header").className += ' issearch';
    document.querySelector("#ssInput").className += ' issearch';

    deleteAll.style = "display:flex";


    let content = document.querySelector("#content");
    content.innerHTML = "";


    var ssValue = ssInput.value;

    // var iterm = document.createElement("div");
    // iterm.className = "iterm-box";
    // iterm.className += " iterm-box-delete";
    // content.appendChild(iterm);
    // iterm.innerHTML =
    //     `正在搜索，请稍等......`;

    let website = [
        "fsylr.com",
        "www.vfx123.com",
        "www.iapps.me",
        "www.macdo.cn",
        "xxxxx520.com",
        "www.flysheep6.com",
        "www.6a6z.com",
        "www.waodown.com",
        "www.kn21.xyz",
        "texhocean.com",
        "www.cgzyw.com",
        "",
       
    ];

    website.forEach(function (element) {
        myAjax("GET",
            "https://" + element + "/wp-json/wp/v2/posts?search=" + ssValue +
            "&orderby=relevance&_fields=author,id,excerpt,title,link,modified&per_page=100",
            function (xhr) {

                let sj = JSON.parse(xhr.responseText);
                for (let i = 0; i < sj.length; i++) {
                    let strArticle = sj[i];

                    let checkTitle = new RegExp(ssValue, "i");
                    if (checkTitle.test(strArticle.title.rendered)) {

                        let matchTitle = strArticle.title.rendered.match(checkTitle);
                        let replaceTitle = strArticle.title.rendered.replace(checkTitle,
                            `<span class="highlight";>${matchTitle}</span>`);
                        let dateReg = /\d{4}-\d{1,2}-\d{1,2}/;


                        let iterm = document.createElement("div");
                        iterm.className = "iterm-box";
                        content.appendChild(iterm);

                        iterm.innerHTML =
                            `<a href = ${strArticle.link} target="_blank">
                                <div class="iterm-content">
                                    <div class="iterm-title">${replaceTitle}</div>
                                    <div class="iterm-info">
                                        <span class="date">${strArticle.modified.match(dateReg)}</span>
                                        <span class="website">${element}</span>
                                    </div>
                                </div>
                            </a>`;

                    } else if (element == "blog.ruancang.net") {
                        let matchTitle = strArticle.title.rendered.match(checkTitle);
                        let replaceTitle = strArticle.title.rendered.replace(checkTitle,
                            `<span class="highlight";>${matchTitle}</span>`);

                        let dateReg = /\d{4}-\d{1,2}-\d{1,2}/;

                        let iterm = document.createElement("div");
                        iterm.className = "iterm-box";
                        content.appendChild(iterm);

                        iterm.innerHTML =
                            `<a href = ${strArticle.link} target="_blank">
                                <div class="iterm-content">
                                    <div class="iterm-title">${replaceTitle}</div>
                                    <div class="iterm-info">
                                        <span class="date">${strArticle.modified.match(dateReg)}</span>
                                        <span class="website">${element}</span>
                                        </div>
                                </div>
                            </a>`;


                    } else {
                        break;
                    }
                }


            },
            function (xhr) {
                console.error("请求失败");
                xhr.abort();
            }
        );







    })

}

//封装ajax请求
function myAjax(type, url, success, error) {

    var xmlhttp = new XMLHttpRequest();

    xmlhttp.open(type, url, true)

    xmlhttp.send();

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4) {
            if (xmlhttp.status >= 200 && xmlhttp.status < 300 || xmlhttp.status === 304) {
                success(xmlhttp);
            } else {
                error(xmlhttp);
            }
        }

    }
}
