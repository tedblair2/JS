const container=document.querySelector('.container'),
mainVideo=container.querySelector('video'),
playpause=container.querySelector('.play-pause i'),
progressBar=container.querySelector('.progress-bar'),
skipForward=container.querySelector('.skip-forward'),
rewind=container.querySelector('.skip-backwards'),
volumeBtn=container.querySelector('.volume i'),
volumeSlider=container.querySelector('.left input'),
playbackOption=container.querySelector('.playback-speed span'),
speedOption=container.querySelector('.speed-options'),
picinPicBtn=container.querySelector('.pic-in-pic span'),
fullscreenBtn=container.querySelector('.fullscreen i'),
videoTimeline=container.querySelector('.video-timeline'),
currentVidTIme=container.querySelector('.current-time'),
vidDuration=container.querySelector('.video-duration')
let timer;


const convertTime=(time)=>{
    let seconds=Math.floor(time%60)
    let minutes=Math.floor(time/60)%60
    let hours=Math.floor(time/3600)

    seconds=seconds<10 ? `0${seconds}` : seconds
    minutes=minutes<10 ? `0${minutes}` : minutes
    hours=hours<10 ? `0${hours}` : hours

    if(hours==0){
        return `${minutes}:${seconds}`
    }else{
        return `${hours}:${minutes}:${seconds}`
    }
}
mainVideo.onloadeddata=(e)=>{
    vidDuration.innerText=convertTime(e.target.duration)
}
mainVideo.ontimeupdate=(e)=>{
    let {currentTime,duration}=e.target
    let percent=(currentTime/duration)*100
    progressBar.style.width=`${percent}%`
    currentVidTIme.innerText=convertTime(currentTime)
}
videoTimeline.onclick=(e)=>{
    let timeline=videoTimeline.clientWidth
    mainVideo.currentTime=(e.offsetX/timeline) * mainVideo.duration
}
const draggableProgressbar=(e)=>{
    let timeline=videoTimeline.clientWidth
    progressBar.style.width=`${e.offsetX}px`
    mainVideo.currentTime=(e.offsetX/timeline) * mainVideo.duration
    currentVidTIme.innerText=convertTime(mainVideo.currentTime)
}
videoTimeline.onmousedown=()=>{
    videoTimeline.onmousemove=draggableProgressbar
}
container.onmouseup=()=>{
    videoTimeline.removeEventListener("mousemove",draggableProgressbar)
}
videoTimeline.onmousemove=(e)=>{
    const progresstime=videoTimeline.querySelector('span')
    let offsetX=e.offsetX
    progresstime.style.left=`${offsetX}px`
    let timeline=videoTimeline.clientWidth
    let percent=(e.offsetX/timeline) * mainVideo.duration
    progresstime.innerText=convertTime(percent)
}
volumeBtn.onclick=()=>{
    if(!volumeBtn.classList.contains("fa-volume-up")){
        mainVideo.volume=0.5
        volumeBtn.classList.replace("fa-volume-off","fa-volume-up")
    }else{
        mainVideo.volume=0.0
        volumeBtn.classList.replace("fa-volume-up","fa-volume-off")
    }
    volumeSlider.value=mainVideo.volume *100
}
picinPicBtn.onclick=()=>{
    mainVideo.requestPictureInPicture()
}
playbackOption.onclick=()=>{
    speedOption.classList.toggle("show")
}
document.onclick=(e)=>{
    if(e.target.tagName !== "SPAN" || e.target.className !== "material-symbols-outlined"){
        speedOption.classList.remove("show")
    }
}
speedOption.querySelectorAll('li').forEach(option=>{
    option.onclick=()=>{
        mainVideo.playbackRate = option.dataset.speed
        speedOption.querySelector('.active').classList.remove("active")
        option.classList.add("active")
    }
})
fullscreenBtn.onclick=()=>{
    container.classList.toggle("fullscreen")
    if(document.fullscreenElement){
        fullscreenBtn.classList.replace("fa-compress","fa-arrows-alt")
        return document.exitFullscreen
    }
    fullscreenBtn.classList.replace("fa-arrows-alt","fa-compress")
    container.requestFullscreen
}
volumeSlider.oninput=(e)=>{
    let val=e.target.value/100
    mainVideo.volume=val
    if(val === 0){
        volumeBtn.classList.replace("fa-volume-up","fa-volume-off")
    }else{
        volumeBtn.classList.replace("fa-volume-off","fa-volume-up")
    }
}
rewind.onclick=()=>{
    mainVideo.currentTime -= 10
}
skipForward.onclick=()=>{
    mainVideo.currentTime += 10
}

playpause.onclick=()=>{
    mainVideo.paused ? mainVideo.play() : mainVideo.pause()
}
mainVideo.onplay=()=>{
    playpause.classList.replace("fa-play","fa-pause")
}
mainVideo.onpause=()=>{
    playpause.classList.replace("fa-pause","fa-play")
}
const hideControls=()=>{
    if(mainVideo.paused) return;
    timer=setTimeout(()=>{
        container.classList.remove("show-controls")
    }, 2500)
}
hideControls()

container.onmousemove=()=>{
    container.classList.add("show-controls")
    clearTimeout(timer)
    hideControls()
}
