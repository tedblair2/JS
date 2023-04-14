const savedform=document.querySelector(".saved-form"),
savedDiv=savedform.querySelector(".saved-div")
const queuedform=document.querySelector(".queued-form"),
queuedDiv=queuedform.querySelector(".queued-div")
const inputDiv=document.querySelector(".input-div")
const input=document.querySelector(".input-div input")

let queuedImages=[]
let deletedimages=[]

inputDiv.onclick=()=>{
    input.click()
}
input.onchange=()=>{
    const files=input.files
    for (let index = 0; index < files.length; index++) {
        queuedImages.push(files[index])
    }
    queuedform.reset()
    displayQueuedImages()
}
inputDiv.addEventListener("dragover", (e) => {
    e.preventDefault();
});
inputDiv.addEventListener("drop",(e)=>{
    e.preventDefault()
    const files=e.dataTransfer.files
    console.log(files)
    for(let i=0;i<files.length;i++){
        if(!files[i].type.match("image")) continue

        if(queuedImages.every(image=>image.name !== files[i].name)){
            queuedImages.push(files[i])
        }
    }
    displayQueuedImages()
})
const displayQueuedImages=()=>{
    let images=""
    queuedImages.forEach((item,index)=>{
        images +=`<div class="image">
                    <img src="${URL.createObjectURL(item)}" alt="image" height="100px" style="object-fit: cover;">
                    <span onclick="deleteImage(${index})">&times;</span>
                </div>`
    })
    queuedDiv.innerHTML=images
}
const deleteImage=(index)=>{
    queuedImages.splice(index,1)
    displayQueuedImages()
}