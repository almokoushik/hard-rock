const showError=(error)=>{
    document.getElementById("errorMessage").innerText=""
    let errorPlace = document.getElementById("errorMessage")
    errorPlace.innerText="Something Went Wrong! Please Try Again Later"
}
const showLyric=lyric=>{
    document.getElementById("singleLyric").innerText=""
    const lyricArea = document.getElementById("singleLyric")
    lyricArea.innerText=lyric
    if(lyric.length==0){
        showError(1)
    }
}
const showMusicDetail=(title,artist)=>{ 
    document.getElementById("errorMessage").innerText = ""  
    url =`https://api.lyrics.ovh/v1/${artist}/${title}`
    fetch(url)
    .then(response=>response.json())
    .then(data => showLyric(data.lyrics))
    .catch(error => showError(error))

}
const resultShow = (data) => {
    const songArea = document.getElementById("resultShow")
    data.forEach(song => {
        const singleSong = document.createElement("div")
        singleSong.className = "single-result row align-items-center my-3 p-3"
        singleSong.innerHTML = `
                    <div class="col-md-9">
                    <h3 class="lyrics-name">${song.title}</h3>
                        <p class="author lead">Album by <span>${song.artist.name}</span></p>
                    </div>
                    <div class="col-md-3 text-md-right text-center">
                        <button onclick="showMusicDetail('${song.title}','${song.artist.name}')" class="btn btn-success">Get Lyrics</button>
                    </div>
                    <audio controls>
                        <source src="${song.preview}" type="audio/mpeg">
                    </audio>
                    `
        songArea.appendChild(singleSong)
    });
}
const clearAll=()=>{
    document.getElementById("errorMessage").innerText = ""
    document.getElementById("singleLyric").innerText = ""
    document.getElementById("resultShow").innerHTML = ""
}
const searchSong = () => {
    clearAll()    
    const key = document.getElementById("search-area").value;
    url = `https://api.lyrics.ovh/suggest/${key}`
    fetch(url)
        .then(response => response.json())
        .then(data => resultShow(data.data))
        .catch(error => showError(error))
    document.getElementById("search-area").value = " "
}