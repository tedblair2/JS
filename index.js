const digits=document.querySelectorAll(".number")
const output=document.querySelector(".input input")
const clear=document.querySelector(".clear")
const deleteDigit=document.querySelector(".delete")
const equalBtn=document.querySelector(".equals")
let hasResult=false

clear.onclick=()=>{
    output.value=""
    hasResult=false
}
deleteDigit.onclick=()=>{
    let old=output.value
    let newStr=old.slice(0,-1)
    output.value=newStr
}
digits.forEach(item=>{
    item.onclick=()=>{
        let first=output.value
        let second=item.value
        if(hasResult){
            output.value=second
            hasResult=false
        }else{
            output.value=first.concat(second)
        }
    }
})
equalBtn.onclick = () => {
    let input = output.value;
    if(input.length==0){
        alert("Enter value first!")
    }else{
        let result = eval(input);
        output.value = result;
        hasResult=true
    }
}