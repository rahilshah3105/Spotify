// console.log("Java Script Loaded");
let currentSong = new Audio();
let songs;
let currFolder;

async function getSongs(folder, pause = false) {
    currFolder = folder;
    let a = await fetch(`/${folder}/`);
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
    // console.log(as);

    songs = [];
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            const songTitle = element.href.split(/\/([^/]*)\.mp3/)[1];
            songs.push(songTitle.replace(".mp3", ""));
        }
    }
    // console.log(songs);
    // return songs;

    // Show all the songs in the playlist
    let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0];
    songUL.innerHTML = "";

    // Show Folder Name
    let from = document.querySelector(".from");
    from.innerHTML = `Songs From: ${folder.split("/")[1].replaceAll("%20", " ")} Playlist`;

    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `<li class="leftPlay">
        <img src="Images/music.svg" alt="Music" class="invert">
        <div class="info">
            <div>${song.replaceAll("%20", " ")}</div>
            <div>Song Artist</div>
        </div>
        <div class="playNow">
            <span class="play-pause">
            </span>
            <img class="invert" id="playSong" src="Images/play.svg" alt="play" height="22px" width="22px">
            </div>
        </li>`;
    }

    // Play the first song
    // var audio = new Audio(songs[0]);
    // audio.play();

    // audio.addEventListener("loadeddata", () => {
    //     console.log(audio.duration, audio.currentSrc, audio.currentTime);
    // })

    // Attach an event listener to each song
    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
            let play = e.querySelector(".info").firstElementChild.innerHTML;
            // console.log(songPlay);
            // console.log(play);
            playMusic(play);
        });
    });;
    return songs;
}

const playMusic = (track, pause = false) => {
    // let audio = new Audio("/Songs/" + track + ".mp3");
    // audio.paly();
    currentSong.src = `/${currFolder}/` + track + ".mp3";
    // let pauseSong= document.querySelector("#playSong");
    if (!pause) {
        currentSong.play();
        play.src = "Images/pause.svg";
        document.getElementById("playSong").src = "Images/pause.svg";
    } else {
        currentSong.pause();
        play.src = "Images/play.svg";
        document.getElementById("playSong").src = "Images/play.svg";
    }

    document.querySelector(".songInfo").innerHTML = decodeURI(track);
    document.querySelector(".songTime").innerHTML = "00:00 / 00:00";
}

async function displayAlbums() {
    let a = await fetch(`/Songs/`);
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
    let cardContainer = document.querySelector(".cardContainer");
    let arr = Array.from(as);
    for (let index = 0; index < arr.length; index++) {
        const e = arr[index];
        if (e.href.includes("/Songs/")) {
            let folder = e.href.split("/").slice(-2)[0].replaceAll("%20", " ");

            // Get the data from the folder
            let a = await fetch(`/Songs/${folder}/info.json`);
            let response = await a.json();
            cardContainer.innerHTML += `
                <div class="card" data-folder="${folder}">
                    <div class="play">
                        <img src="/Images/play.svg" alt="Play" height="22px" width="22px">
                    </div>
                    <img src="/Songs/${folder}/cover.jpg" alt="Pritam">
                    <h3>${response.title}</h3>
                    <p>${response.description}</p>
                </div>
            `
        }
    }

    // Load the Songs whenever playlist is changed
    Array.from(document.getElementsByClassName("card")).forEach(e => {
        // console.log(e);
        e.addEventListener("click", async item => {
            // console.log(item.currentTarget.dataset);
            // console.log("Fetching Songs");
            songs = await getSongs(`Songs/${item.currentTarget.dataset.folder}`);
            playMusic(songs[0]);
            // console.log(play);
            // playMusic(play);
        });
    });
}


async function main() {
    //  Get the list of all the songs
    // let songs = await getSongs.replace(" ", "%20")("Songs/Second Album");
    const folderPath = "Songs/First Album".replace(" ", "%20");
    await getSongs(folderPath);
    // nsole.log(songs);
    playMusic(songs[0], true);

    // Display Albums
    displayAlbums();

    // Play Song
    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play();
            play.src = "Images/pause.svg";
            document.querySelector(".play-pause>img").style.height = "25px";
            document.querySelector(".play-pause>img").style.width = "25px";
            document.querySelector("#playSong").src = "Images/pause.svg";
        } else {
            currentSong.pause();
            play.src = "Images/play.svg";
            document.querySelector(".play-pause>img").style.height = "0px";
            document.querySelector(".play-pause>img").style.width = "0px";
            document.querySelector("#playSong").src = "Images/play.svg";
        }
        document.querySelector(".playNow").addEventListener("click", () => {
            if (currentSong.paused) {
                currentSong.play();
                document.getElementById("playSong").src = "Images/pause.svg";
            } else {
                currentSong.pause();
                document.getElementById("playSong").src = "Images/play.svg";
            }
        });
    });

    // Update Song Details in left side
    let playSong = document.getElementById("playSong");
    let span = document.createElement("span");
    span.innerHTML = "Playing";
    document.querySelector(".play-pause").appendChild(span);

    let img = document.createElement("img");
    img.src = "Images/playing.gif";
    document.querySelector(".play-pause").appendChild(img);
    document.querySelector(".play-pause>img").style.height = "0px";
    document.querySelector(".play-pause>img").style.width = "0px";

    playSong.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play();
            playSong.src = "Images/pause.svg";
            document.querySelector(".play-pause>img").style.height = "25px";
            document.querySelector(".play-pause>img").style.width = "25px";
            document.querySelector("#playSong").src = "Images/pause.svg";
        } else {
            currentSong.pause();
            play.src = "Images/play.svg";
            document.querySelector(".play-pause>img").style.height = "0px";
            document.querySelector(".play-pause>img").style.width = "0px";
            document.querySelector("#playSong").src = "Images/play.svg";
        }
    });

    // Update Time
    currentSong.addEventListener("timeupdate", () => {

        let t = currentSong.currentTime;
        let m = Math.floor(t / 60);
        let s = Math.floor(t % 60);
        // document.querySelector(".songTime").innerHTML = `${m}:${s} / ${Math.floor(currentSong.duration / 60)}:${Math.floor(currentSong.duration % 60)}`;

        let dm = Math.floor(currentSong.duration / 60);
        let ds = Math.floor(currentSong.duration % 60);

        if (isNaN(ds) || ds < 0) {
            return "00:00";
        }

        // Function to add leading zero if needed
        const formatTime = (time) => time < 10 ? `0${time}` : time;
        m = formatTime(m);
        s = formatTime(s);
        dm = formatTime(dm);


        ds = formatTime(ds);
        document.querySelector(".songTime").innerHTML = `${m}:${s} / ${dm}:${ds}`;

        // Seekbar Updatation
        document.querySelector(".seekBar .circle").style.left = `${currentSong.currentTime / currentSong.duration * 100}%`;

    });

    currentSong.addEventListener("ended", () => {
        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0].replace(".mp3", ""));
        index++;
        if (index >= songs.length) {
            index = 0;
        }
        playMusic(songs[index]);
    });


    // Make Functionalities on the circle and seekBar
    document.querySelector(".seekBar").addEventListener("click", e => {
        document.querySelector(".circle").style.left = `${e.offsetX / document.querySelector(".seekBar").clientWidth * 100}%`;

        currentSong.currentTime = e.offsetX / document.querySelector(".seekBar").clientWidth * currentSong.duration;
    });

    // Display menu
    document.querySelector(".menu").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0";
    });

    // Close menu
    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-100vw";
    });

    // Previous Song
    previous.addEventListener("click", () => {
        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0].replace(".mp3", ""));
        index--;
        if (index < 0) {
            index = songs.length - 1;
        }
        playMusic(songs[index]);
    });

    // Next Song
    next.addEventListener("click", () => {
        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0].replace(".mp3", ""));
        index++;
        if (index >= songs.length) {
            index = 0;
        }
        playMusic(songs[index]);
    });

    // Volume Control
    let curVolume = currentSong.volume;
    volume.addEventListener("change", () => {
        curVolume = currentSong.volume = volume.value / 100;
        // console.log(curVolume * 100);
        document.innerHTML = curVolume * 100;
    });

    // Mute Control
    document.querySelector(".playBarRight>img").addEventListener("click", e => {
        // console.log(e.target);
        if (e.target.src.includes("Images/volume.svg")) {
            e.target.src = e.target.src.replace("Images/volume.svg", "Images/mute.svg");
            currentSong.volume = 0;
            document.getElementsByTagName("input")[0].value = 0;
        }

        else {
            e.target.src = e.target.src.replace("Images/mute.svg", "Images/volume.svg");
            currentSong.volume = curVolume * 1;
            document.getElementsByTagName("input")[0].value = curVolume * 100;
        }
    });
}

main()
