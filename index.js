const textarea=document.querySelector("textarea")

textarea.oninput=()=>{
    let count=(textarea.value).replace(/\s/g,'').length
    const total=document.querySelector("p")
    total.textContent=`Total characters: ${count}`
}