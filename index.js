const galleryItems=document.querySelectorAll(".item")
const prev=document.querySelector(".prev");
const next=document.querySelector(".next")
const paginationDiv=document.querySelector(".container .actions .page")

const maxItems=8
let page=1
let noOfPages=Math.ceil(galleryItems.length/maxItems)

const paginate=()=>{
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
    const buttons=document.querySelectorAll(".number")
    buttons.forEach(item=>{
        item.classList.remove("active")
    })
    const currentButton = document.querySelector(`.number:nth-child(${page})`);
    currentButton.classList.add("active");
}
const createPaginationButtons=()=>{
   for(let i=1;i<=noOfPages;i++){
        const button=document.createElement("button")
        button.classList.add("number")
        button.textContent=i;
        paginationDiv.appendChild(button)
        button.onclick=()=>{
            const buttons=document.querySelectorAll(".number")
            buttons.forEach(item=>{
                item.classList.remove("active")
            })
            button.classList.add("active")
            page=i
            paginate()
        }
    }
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
window.onload=()=>{
    createPaginationButtons()
    paginate()
}

