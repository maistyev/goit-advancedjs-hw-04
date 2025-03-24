import{a as u,S as f,i as c}from"./assets/vendor-BH9GyP-n.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&l(n)}).observe(document,{childList:!0,subtree:!0});function o(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function l(e){if(e.ep)return;e.ep=!0;const s=o(e);fetch(e.href,s)}})();u.defaults.baseURL="https://pixabay.com";const y="api/",h="49481602-fd69c907e71567b02dc237fda";async function d(a,t=1,o=15){const{data:l}=await u.get(y,{params:{key:h,q:encodeURIComponent(a),image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:o}});return l}function v(a){const o=a.split(",").map(e=>e.trim());return[...new Set(o)]}const m=({webformatURL:a,largeImageURL:t,likes:o,views:l,comments:e,downloads:s,tags:n})=>`
<li class="gallery-item">
  <a class="gallery-link" href="${t}">
    <img class="gallery-image" src="${a}" title="${v(n).join(", ")}"/>
  </a>
  <div class="stats">
    <div class="stat">
      <p class="stat-title">Likes</p>
      <p class="stat-value">${o}</p>
    </div>
    <div class="stat">
      <p class="stat-title">Views</p>
      <p class="stat-value">${l}</p>
    </div>
    <div class="stat">
      <p class="stat-title">Comments</p>
      <p class="stat-value">${e}</p>
    </div>
    <div class="stat">
      <p class="stat-title">Downloads</p>
      <p class="stat-value">${s}</p>
    </div>
  </div>
</li>
`,r={form:document.querySelector(".js-search-form"),input:document.querySelector(".js-search-input"),submitButton:document.querySelector(".js-search-button"),gallery:document.querySelector(".js-gallery"),loader:document.querySelector(".js-loader"),loadMoreButton:document.querySelector(".js-load-more-button")};let i={inputValue:"",page:1},p=new f(".gallery-link",{captionDelay:250});function L(a){if(a.preventDefault(),r.gallery.innerHTML="",r.loadMoreButton.classList.remove("active"),i.inputValue=r.input.value,i.page=1,i.inputValue.trim()===""){c.error({title:"Error",message:"Please enter the search query!"});return}r.loader.classList.add("active"),d(i.inputValue).then(t=>{if(t.hits.length===0){c.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!"});return}r.gallery.innerHTML=t.hits.map(o=>m(o)).join(""),p.refresh(),t.totalHits>t.hits.length&&r.loadMoreButton.classList.add("active")}).catch(t=>{c.error({title:"Error",message:"Something went wrong. Please try again!"})}).finally(()=>{r.loader.classList.remove("active")}),r.form.reset()}async function g(){i.page+=1,r.loader.classList.add("active"),window.scrollBy({top:window.innerHeight,left:0,behavior:"smooth"}),r.loadMoreButton.classList.remove("active");try{const a=await d(i.inputValue,i.page);r.gallery.insertAdjacentHTML("beforeend",a.hits.map(o=>m(o)).join("")),p.refresh(),a.totalHits<i.page*15?(c.info({title:"Info",message:"We're sorry, but you've reached the end of search results."}),r.loadMoreButton.removeEventListener("click",g)):r.loadMoreButton.classList.add("active");const{height:t}=document.querySelector(".gallery-item").getBoundingClientRect();window.scrollBy({top:t*2,left:0,behavior:"smooth"})}catch{c.error({title:"Error",message:"Something went wrong. Please try again!"})}finally{r.loader.classList.remove("active")}}r.form.addEventListener("submit",L);r.loadMoreButton.addEventListener("click",g);
//# sourceMappingURL=index.js.map
