const infoSongname = document.querySelector('.main')
const togglePlay = document.querySelector('.toggle-play')
const main = document.querySelector('.main')
const headerImg = document.querySelector('.header-img')
const imgWidth = document.querySelector('.header-img').offsetWidth
const headerName = document.querySelector('.header-namesong')
const imgheader = document.querySelector('.header-img-chance')
var audioApp = document.querySelector('.audioapp')
const progressApp = document.querySelector('.progress')
const durationSong = document.querySelector('.durationsong')
const currentTime = document.querySelector('.currenttime')
const headerProgress = document.querySelector('.header-progress')
const nextSongs = document.querySelector('.nextSongs')
const backSongs = document.querySelector('.backSongs')
const loopSongs = document.querySelector('.loop')
const randomSongs = document.querySelector('.randomsong')
var currentIndex = 0;
var isPlaying = false
var isRandom = false;
fetch('./songs.json')
    .then((response) => response.json())
    .then((json) => {
        var html = json.map(function(data){
          return `<div class="song" data-set="${data.id}">
                    <div class="song-img">
                        <img src="${data.links.images[0].url}" alt="" srcset="">
                    </div>
                    <div class="song-info">
                        <div class="song-info-name">${data.name}</div>
                        <div class="song-info-singer">${data.author}</div>
                    </div>
                    <div class="song-menu">
                        <i class="fa-solid fa-bars"></i>
                    </div>
                    <audio  class="audio" src="${data.url}"></audio>
                </div>`
        })
        var htmls = html.join('')
        infoSongname.innerHTML = htmls
        const songs = document.querySelectorAll('.song')
        songs.forEach(function(e){
            e.onclick = function(i){
                
               const song = i.target.closest('.song')
               headerName.innerHTML = song.children[1].children[0].innerHTML
               imgheader.src = song.children[0].children[0].src
                audioApp.src = song.children[3].src
                function durationSongs(){
                    const minutesend = Math.floor(song.children[3].duration / 60);
                    const secondsend = Math.floor(song.children[3].duration % 60);
                    function padTo2Digits(num) {
                    return num.toString().padStart(2, '0');}
                    durationSong.innerHTML = `${padTo2Digits(minutesend)}:${padTo2Digits(secondsend)}`;
                }
                durationSongs()
                currentIndex = song.dataset.set
                if(isPlaying){
                    audioApp.play()
                }
                
            }
            
        })
        function loadCurrent(json){
            imgheader.src = json[currentIndex].links.images[0].url
            headerName.innerHTML = json[currentIndex].name
            audioApp.src = json[currentIndex].url

        }
        loadCurrent(json)
        nextSongs.onclick = function(e){
            const minutesend = Math.floor(audioApp.duration / 60);
            const secondsend = Math.floor(audioApp.duration % 60);
            function padTo2Digits(num) {
            return num.toString().padStart(2, '0');}
            durationSong.innerHTML = `${padTo2Digits(minutesend)}:${padTo2Digits(secondsend)}`;
            if(currentIndex > songs.length){
                currentIndex = 0
            }else{
                currentIndex++
            loadCurrent(json)
            if(isPlaying){
                audioApp.play()
            }
            }
            
        }
        backSongs.onclick = function(e){
            const minutesend = Math.floor(audioApp.duration / 60);
            const secondsend = Math.floor(audioApp.duration % 60);
            function padTo2Digits(num) {
            return num.toString().padStart(2, '0');}
            durationSong.innerHTML = `${padTo2Digits(minutesend)}:${padTo2Digits(secondsend)}`;
            currentIndex--
            loadCurrent(json)
            if(isPlaying){
                audioApp.play()
            }
        }
        loopSongs.onclick = function(){
            if(audioApp.loop){
                audioApp.loop = false
                loopSongs.classList.remove('red')
                
                
            }else{
                audioApp.loop = true
                loopSongs.classList.add('red')
            }
        }
        randomSongs.onclick = function(e){
            if(isRandom){
                isRandom = false
                randomSongs.classList.remove('red')
                audioApp.onended = function(){
                    togglePlay.classList.remove('playing')
        headerImg.classList.remove('spin')
        audioApp.pause()
                }

            }else{
               isRandom = true
               randomSongs.classList.add('red')
               audioApp.onended = function(){
                console.log(123)
                currentIndex = Math.floor(Math.random()*songs.length)
                loadCurrent(json)
                audioApp.play()
              }
            }
           
         }
        
    
    }
    )

    togglePlay.addEventListener("click",function(){
    if(isPlaying){
        isPlaying = false
        togglePlay.classList.remove('playing')
        headerImg.classList.remove('spin')
        audioApp.pause()
    }else{
        isPlaying = true
        togglePlay.classList.add('playing')
        headerImg.classList.add('spin')
        audioApp.play()
       
    }
    })
    window.onscroll = function (){
    const windowScroll = window.scrollY
    const newWidth = imgWidth - windowScroll
    headerImg.style.width =  newWidth > 0 ? newWidth  + 'px' : 0
    }
    audioApp.ontimeupdate = function(){
    progressApp.value = audioApp.currentTime /audioApp.duration * 100
    const minutesStart = Math.floor(audioApp.currentTime / 60);
    const secondsStart = Math.floor(audioApp.currentTime % 60);
    function padTo2Digits(num) {
    return num.toString().padStart(2, '0');}
    currentTime.innerHTML = `${padTo2Digits(minutesStart)}:${padTo2Digits(secondsStart)}`;
    };
    progressApp.onchange = function(e){
    audioApp.currentTime = audioApp.duration / 100 * e.target.value
    }
    audioApp.onended = function(){
                    togglePlay.classList.remove('playing')
        headerImg.classList.remove('spin')
        audioApp.pause()
}