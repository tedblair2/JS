const musicParent=document.querySelector(".music")
const listParent=document.querySelector(".list")
const minimize=document.querySelector(".close")
const musicImg=document.querySelector(".music-details img")
const musicName=document.querySelector(".music-details h3")
const musicArtist=document.querySelector(".music-details span")
const shuffle=document.querySelector(".shuffle")
const prev=document.querySelector(".prev")
const play=document.querySelector(".play")
const pause=document.querySelector(".pause")
const next=document.querySelector(".next")
const repeat=document.querySelector(".repeat")
const audio=document.querySelector("audio")
const progresBar=document.querySelector(".progress-bar")
const currentProgress=document.querySelector(".current-progress")
const currentTime=document.querySelector(".current")
const maxDuration=document.querySelector(".total-time")
const closeBtn=document.querySelector(".list button")
const musicList=document.querySelector(".music-list")
let index;
let loop=true

minimize.onclick=()=>{
    musicParent.classList.add("hide")
    listParent.classList.remove("hide")
}
closeBtn.onclick=()=>{
    musicParent.classList.remove("hide")
    listParent.classList.add("hide")
}

const songs=[
    {
        name:"Do Re Mi",
        artists:"Breeder LW,Benzema",
        image:"doremi.jpeg",
        link:"Do Re Mi - Breeder LW X Benzema [Ochungulo Family] (hearthis.at).mp3"
    },
    {
        name:"Bad Things",
        artists:"Machine Gun Kelly,Camilla Cabelo",
        image:"badthings.jpeg",
        link:"Machine_Gun_Kelly_-_Bad_Things.mp3"
    },
    {
        name:"Chapa Chapa",
        artists:"Ethic",
        image:"chapa.jpeg",
        link:"Ethic Chapa-Chapa.mp3"
    },
    {
        name:"Pandana",
        artists:"Ethic",
        image:"pandana.jpeg",
        link:"Ethic_-_Pandana.mp3"
    }
]
const loadSongs=()=>{
    let songhtml=""
    songs.forEach((item)=>{
        songhtml += `<div class="song">
                    <img src=${item.image} alt="">
                    <div class="other">
                        <span class="song-title">${item.name}</span>
                        <span class="song-artist">${item.artists}</span>
                    </div>
                </div>`
    })
    musicList.innerHTML=songhtml
    const songlist=document.querySelectorAll(".song")
    songlist.forEach((item,index)=>{
        item.onclick=()=>{
            setSong(index)
            playSong()
        }
    })
}
const events={
    mouse:{
        click:"click"
    },
    touch:{
        click:"touchstart"
    }
}
let deviceType=""
const isTouchDevice=()=>{
    try{
        document.createEvent("TouchEvent")
        deviceType="touch"
        return true
    }catch(err){
        deviceType="mouse"
        return false
    }
}
const timeFormater=(timeInput)=>{
    let minute=Math.floor(timeInput/60)
    minute=minute<10 ? "0"+minute : minute
    let second=Math.floor(timeInput % 60)
    second=second <10 ? "0"+second : second
    return `${minute}:${second}`
}
const setSong=(index)=>{
    let {name,artists,image,link}=songs[index]
    audio.src=link
    musicImg.src=image
    musicArtist.innerHTML=artists
    musicName.innerHTML=name
    audio.onloadedmetadata=()=>{
        maxDuration.innerHTML=timeFormater(audio.duration)
    }
}
const playSong=()=>{
    audio.play()
    play.classList.add("hide")
    pause.classList.remove("hide")
    if(musicParent.classList.contains("hide")){
        musicParent.classList.remove("hide")
        listParent.classList.add("hide")
    }
}
play.onclick=playSong
pause.onclick=()=>{
    play.classList.remove("hide")
    pause.classList.add("hide")
    audio.pause()
}
repeat.onclick=()=>{
    if(repeat.classList.contains("active")){
        repeat.classList.remove("active")
        audio.loop=false
    }else{
        repeat.classList.add("active")
        audio.loop=true
    }
}
shuffle.onclick=()=>{
    if(shuffle.classList.contains("active")){
        shuffle.classList.remove("active")
        loop=true
    }else{
        shuffle.classList.add("active")
        loop=false
    }
}
const nextSong=()=>{
    if(loop){
        if(index==songs.length -1){
            index=0
        }else{
            index += 1
        }
        setSong(index)
        playSong()
    }else{
        let randindex=Math.floor(Math.random() *songs.length)
        setSong(randindex)
        playSong()
    }
}
const prevSong=()=>{
    if(loop){
        if(index===0){
            index=songs.length -1
        }else{
            index -=1
        }
        setSong(index)
        playSong()
    }else{
        let randindex=Math.floor(Math.random() *songs.length)
        setSong(randindex)
        playSong()
    }
}
next.onclick=nextSong
prev.onclick=prevSong

audio.onended=nextSong
isTouchDevice()

progresBar.addEventListener(events[deviceType].click,(e)=>{
    let coordStart=progresBar.getBoundingClientRect().left
    let coordEnd=!isTouchDevice() ? e.clientX :e.touches[0].clientX

    let progressLen=(coordEnd -coordStart)/progresBar.offsetWidth

    currentProgress.style.width=progressLen * 100 +"%"

    audio.currentTime=progressLen*audio.duration
    playSong()
})
setInterval(()=>{
    currentTime.innerHTML=timeFormater(audio.currentTime)
    currentProgress.style.width=(audio.currentTime / audio.duration.toFixed(3))*100 + "%"
})
audio.ontimeupdate=()=>{
    currentTime.innerHTML=timeFormater(audio.currentTime)
}
window.onload=()=>{
    loadSongs()
    index=0
    setSong(index)
    playSong()
}