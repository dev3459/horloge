//Horloge ci-dessous TIC TAC TIC TAC TIC TAC.....
let date, hr, min, sec;
const monAudio = document.querySelectorAll('audio');
let tic = false;

//Function qui joue l'audio tic tac
function ticTac(){
    if(tic){
        monAudio[0].play();
        tic = false;
    }else{
        monAudio[1].play();
        tic = true;
    }
}


//Fonction qui gère les aiguilles de l'horloge avec l'heure du poste client
function clock(){
    ticTac();
    date = new Date();
    hr = date.getHours();
    min = date.getMinutes();
    sec = date.getSeconds();
    
    document.querySelector("#hour").style.transform = `translate(-50%, -100%) rotate(${hr * 360 / 12 + min * 30 / 60}deg)`;

    document.querySelector("#minute").style.transform = `translate(-50%, -100%) rotate(${min * 360 / 60}deg)`;

    document.querySelector("#second").style.transform = `translate(-50%, -100%) rotate(${sec * 360 / 60}deg)`;
}

clock();
window.setInterval(clock, 1000);

//Alarme ci-dessous !
let hours = document.getElementById('hours');
let minutes = document.getElementById('minutes');
let seconds = document.getElementById('seconds');
let startStop = document.getElementById('startStop');

let currentTime;
let alarmElement;
let activeAlarm = false;
let sound = new Audio("./audio/alarme.mp3");
sound.loop = true;

//Fonction qui joue le son de l'alarme si l'heure enregistré et la même que celle du poste client
function showTime(){
    var now = new Date();
    currentTime = now.toLocaleTimeString();
    if(currentTime === alarmElement){
        sound.play();
    }

    setTimeout(showTime, 1000);
}
showTime();

//Fonction qui ajoute les minutes et secondes dans l'élément HTML select 
function addMinSec(id){
    let select = id;
    let min = 60;

    for(i = 0; i < min; i++){
        select.options[select.options.length] = new Option(i < 10 ? "0" + i : i);
    }
}

//Fonction qui ajoute l'heure dans l'élément HTML select
function addHour(id){
    let select = id;
    let min = 24;

    for(i = 0; i < min; i++){
        select.options[select.options.length] = new Option(i < 10 ? "0" + i : i);
    }
}

addHour(hours);
addMinSec(minutes);
addMinSec(seconds);


//Évènement du boutton lors de l'ajout ou arrêt de l'alarme
startStop.addEventListener('click', function() {
    if(!activeAlarm){
        disabledElement();
        alarmElement = hours.value + ":" + minutes.value + ":" + seconds.value;
        this.innerHTML = "Effacer l'alarme";
        activeAlarm = true;
    }else{
        enableElement();
        sound.pause();
        this.innerHTML = "Ajouté l'alarme";
        activeAlarm = false;
    }
});

//Fonction qui désactive les élément HTML une fois l'alarme activer
function disabledElement(){
    hours.disabled = true;
    minutes.disabled = true;
    seconds.disabled = true;
}

//Fonction qui ré-active les élément HTML une fois l'alarme activer
function enableElement(){
    hours.disabled = false;
    minutes.disabled = false;
    seconds.disabled = false;
}