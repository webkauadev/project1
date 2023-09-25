const playPauseButton = document.getElementById("playPause");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const volumeControl = document.getElementById("volume");
const expandButton = document.getElementById("expand");
const playlist = document.getElementById("playlist");
const shuffleButton = document.getElementById("shuffle");
const repeatButton = document.getElementById("repeat");

let isPlaying = false;
let isExpanded = false;
let isVolumeVisible = false;
// Variáveis para controlar o estado do player
let currentTrack = 0; // Índice da música atual na lista de reprodução
let isShuffled = false; // Indica se a fila de músicas está embaralhada
let isRepeating = false; // Indica se a música atual está em repetição

// Array de músicas de exemplo (substitua com suas próprias músicas)
const playlistItems = [
    "msc/By The Way.mp3",
    "msc/Californication.mp3",
    "msc/Can't Stop.mp3",
    "msc/Dani California.mp3",
    "msc/Eddie.mp3",
    "msc/Give it Away.mp3",
    "msc/Otherside.mp3",
    "msc/Scar Tissue.mp3",
    "msc/Snow (Hey Oh).mp3",
    "msc/Under The Bridge.mp3",
];

// Função para reproduzir ou pausar a música
function togglePlayPause() {
    const audio = document.getElementById("audio");

    if (isPlaying) {
        audio.pause();
        playPauseButton.textContent = "Play";
    } else {
        audio.play();
        playPauseButton.textContent = "Pause";
    }

    isPlaying = !isPlaying;
}

// Função para tocar a música anterior
function playPrevious() {
    if (isShuffled) {
        currentTrack = getRandomTrackIndex();
    } else {
        currentTrack = (currentTrack - 1 + playlistItems.length) % playlistItems.length;
    }

    playTrack(currentTrack);
}

function updateProgressBar() {
    const audio = document.getElementById("audio");
    const progressBar = document.querySelector(".progress");

    const currentTime = audio.currentTime;
    const duration = audio.duration;

    if (!isNaN(duration)) {
        const progressPercent = (currentTime / duration) * 100;
        progressBar.style.width = progressPercent + "%";
    }
}

// Atualize a barra de progresso a cada segundo
setInterval(updateProgressBar, 1000);

// Função para tocar a próxima música
function playNext() {
    if (isShuffled) {
        currentTrack = getRandomTrackIndex();
    } else {
        currentTrack = (currentTrack + 1) % playlistItems.length;
    }

    playTrack(currentTrack);
}

// Função para definir o volume
function setVolume() {
    const audio = document.getElementById("audio");
    audio.volume = volumeControl.value;
}

// Função para alternar entre o modo de repetição
function toggleRepeat() {
    isRepeating = !isRepeating;
    const repeatIcon = isRepeating ? "🔁" : "🔂";
    repeatButton.textContent = repeatIcon;
}

// Função para embaralhar a fila de músicas
function shufflePlaylist() {
    isShuffled = !isShuffled;
    const shuffleIcon = isShuffled ? "🔀" : "➡️";
    shuffleButton.textContent = shuffleIcon;
    
    // Se estiver embaralhando, reordene a lista de reprodução aleatoriamente
    if (isShuffled) {
        playlistItems.sort(() => Math.random() - 0.5);
        currentTrack = 0;
    }
}

// Função para tocar uma música com base no índice
function playTrack(trackIndex) {
    const audio = document.getElementById("audio");
    audio.src = playlistItems[trackIndex]; // Substitua pelo caminho da sua música
    audio.load();
    audio.play();
    playPauseButton.textContent = "Pause";
    isPlaying = true;
    const currentSongElement = document.getElementById("current-song");
    currentSongElement.textContent = playlistItems[trackIndex];
}

// Função para obter um índice de faixa aleatório
function getRandomTrackIndex() {
    return Math.floor(Math.random() * playlistItems.length);
}

// Inicialização do player de áudio
const audio = document.createElement("audio");
audio.id = "audio";
document.body.appendChild(audio);

// Event listeners
audio.addEventListener("ended", () => {
    if (isRepeating) {
        playTrack(currentTrack);
    } else {
        playNext();
    }
});

playPauseButton.addEventListener("click", togglePlayPause);
prevButton.addEventListener("click", playPrevious);
nextButton.addEventListener("click", playNext);
volumeControl.addEventListener("input", setVolume);
expandButton.addEventListener("click", toggleExpand);
shuffleButton.addEventListener("click", shufflePlaylist);
repeatButton.addEventListener("click", toggleRepeat);



