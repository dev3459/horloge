/**Horloge ci-dessous TIC TAC TIC TAC TIC TAC.....**/
let date, hr, min, sec, tic, activeCloche, ancienHr;
let countCoup = 0;


//Fonction qui joue l'audio tic tac chaque seconde
function ticTac(){
    if(tic){
        new Audio("./audio/tic.mp3").play();
        tic = false;
    }else{
        new Audio("./audio/tac.mp3").play();
        tic = true;
    }
}

//Fonction qui récupère l'heure les minutes et les secondes dans des variables
function recupHourMinSec(){
    date = new Date();
    hr = date.getHours();
    min = date.getMinutes();
    sec = date.getSeconds();
}

//Fonction qui actualise la rotations des aiguilles à chaque seconde
function aiguilles(){
    document.querySelector("#hour").style.transform = `translate(-50%, -100%) rotate(${hr * 360 / 12 + min * 30 / 60}deg)`;

    document.querySelector("#minute").style.transform = `translate(-50%, -100%) rotate(${min * 360 / 60}deg)`;

    document.querySelector("#second").style.transform = `translate(-50%, -100%) rotate(${sec * 360 / 60}deg)`;
}

//Fonction qui fait retentir un coup de cloche à chaque fois que les minutes sont égales à 30
function clockDemiHourCloche(){
    if(min === 30 && sec === 0){
        new Audio("./audio/demiHeure.mp3").play();
    }
}

//Fonction qui fait retentir une cloche avec le nombre d'heure à chaque heure
function clockHourCloche(){
    if(!activeCloche){
        let soundCloche = new Audio("./audio/clocheCentre.mp3")
            if(countCoup !== hr && min === 0){
                soundCloche.play();
                countCoup++;
            }else{
                soundCloche.pause();
                ancienHr = hr;
                activeCloche = true;
            }
    }else if(hr !== ancienHr){
        ancienHr = hr;
        activeCloche = false;
        countCoup = 0;
    }
}

//Fonction générale qui appelle les fonction ticTac, recupHourMinSec, clock DemiHourCloche et aiguilles
function clock(){
    ticTac();
    recupHourMinSec();
    clockDemiHourCloche();
    clockHourCloche();
    aiguilles();
}

//Appel des fonctions principale et initialisation des timer setInterval
clock();
window.setInterval(clock, 1000);


/**Alarme ci-dessous !**/


let hours = document.getElementById('hours');
let minutes = document.getElementById('minutes');
let seconds = document.getElementById('seconds');
let startStop = document.getElementById('startStop');

let currentTime;
let alarmElement;
let activeAlarm = false;

//Son de l'alarme
let sound = new Audio("./audio/alarmeBox.mp3");
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

//appel des fonctions
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