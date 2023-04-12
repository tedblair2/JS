const galleryItems=document.querySelectorAll(".item")
const prev=document.querySelector(".prev");
const next=document.querySelector(".next"),
pageNumber=document.querySelector(".container .actions .page span")
const maxItems=8
let page=1
let noOfPages=Math.ceil(galleryItems.length/maxItems)

const paginate=()=>{
    pageNumber.innerHTML=page
    const start=(page - 1)*maxItems
    const end=start + maxItems
    galleryItems.forEach(item=>{
        if(item.classList.contains("show")){
            item.classList.remove("show")
            item.classList.add("hide")
        }
    })
    const itemlist=Array.from(galleryItems).slice(start,end)
    itemlist.forEach(item=>{
        if (item.classList.contains("hide")) {
            item.classList.remove("hide");
            item.classList.add("show");
        }
    })
}
prev.onclick=()=>{
    if(page>1){
        page--
        paginate()
    }
}
next.onclick=()=>{
    if(page<noOfPages){
        page++
        paginate()
    }

}
window.onload=paginate

