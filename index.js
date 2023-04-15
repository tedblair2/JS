const paragraph=document.querySelector("p")
const searchInput=document.querySelector("input")

searchInput.oninput=()=>{
    let texttoSeacrh=searchInput.value.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");
    let pattern=new RegExp(`${texttoSeacrh}`,"gi")
    paragraph.innerHTML=paragraph.textContent.replace(pattern,match=>`<mark>${match}</mark>`)
}