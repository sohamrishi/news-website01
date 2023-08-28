const API_KEY="08aa8e63fe374544b6a03c48bff038b4"
const url="https://newsapi.org/v2/everything?q="
window.addEventListener('load' , ()=>  fetchNews("india"))
    async function fetchNews (query){
        const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
        const data =await res.json();
        bindData(data);
    }
    function reload(){
        window.location.reload();
    }
    function bindData(articles){
        const cardsCointaner=document.getElementById('cards_container');
        const newsCardTemplates =document.getElementById('template_news_card');
        cardsCointaner.innerHTML='';
    
articles.articles.forEach(article => {
    if(!article.urlToImage) return;
    const cardclone= newsCardTemplates.content.cloneNode(true);
    fillDataInCard(cardclone,article)
    cardsCointaner.appendChild(cardclone)
    });
}
function fillDataInCard(cardclone, article){
    const newsimg=cardclone.querySelector('#news_img');
    const newssrc=cardclone.querySelector('#news_src');
    const newsdesp=cardclone.querySelector('#news_desp');
    const newstitle=cardclone.querySelector('#news_title');
    newsimg.src=article.urlToImage;
    newstitle.innerHTML= article.title;
    newsdesp.innerHTML=article.description;
    const date = new Date(article.publishedAt).toLocaleString("en-US",
    {
        timeZone : "Asia/Jakarta"
    });
    newssrc.innerHTML=`${article.source.name} . ${date}`;
    cardclone.firstElementChild.addEventListener("click", ()=>{
        window.open(article.url,"_blank")
    })
}
let currSeletedNav=null;
function onNavItemClick(id){
    fetchNews(id);
    const navItem= document.getElementById(id);
    if(currSeletedNav !== null) {
        currSeletedNav.classList.remove('active');
    }
    currSeletedNav = navItem;
    currSeletedNav.classList.add('active');;

}
const searchButton= document.getElementById('search_button');
const searchtext=document.getElementById('search_text');
searchButton.addEventListener( 'click',()=>{
    const query1= searchtext.value;
    if(!query1) return;
    fetchNews(query1);
currSeletedNav?.classList.remove('active');
currSeletedNav=null;
    
})

