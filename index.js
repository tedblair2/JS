const tabheaders=document.querySelectorAll(".tabs h3")
const tabcontents=document.querySelectorAll(".tab-contents div")

tabheaders.forEach((item,index)=>{
    item.onclick=()=>{
        tabheaders.forEach(tab=> tab.classList.remove("active"))
        tabcontents.forEach(content=> content.classList.remove("active"))

        tabheaders[index].classList.add("active")
        tabcontents[index].classList.add("active")
    }
})