
import { skills } from "./objects/skills.js";
import { characters, createChar } from "./objects/characters.js";
import { statistic }from "./objects/statistic.js";
import {offHands, weapons} from './objects/weapons.js';
import {cloneChar, Initialisation} from './functions/gameFunctions.js';


// Cunstruction


statistic.createParametr("dodge");
statistic.createParametr("hit");
statistic.createParametr("misshit");




//Fight functions

function doFight(character1,character2){
    let timeOut = 100;
    let round = 0;
    function doRound() {
        character1.setProtection(character1.skills.normalDodge);
        character2.setProtection(character2.skills.normalDodge);
        character1.makeAttack(character2,skills.normalPunch,character2.mainWeapon);
        character2.makeAttack(character1,skills.normalPunch,character2.mainWeapon);

        round++;
    };

    function isEnd(){
    if (character1.curHP <= 0 || character2.curHP <= 0 || round == timeOut) {return true} else {return false};
    };
    function getWinner () {
    if (round == timeOut) {statistic.setParamet('winner','таймаут') }
    else if (character1.curHP <= 0 && character2.curHP <= 0) {statistic.setParamet('winner','ничья')}
    else if (character1.curHP <= 0) {statistic.setParamet('winner',character2.name) }
    else if (character2.curHP <= 0) {statistic.setParamet('winner',character1.name) }
    else return undefined;
    };
    function refreshStats() {
    character1.curHP = character1.stats.HP;
    character2.curHP = character2.stats.HP;
    };

    refreshStats(); {
        while (!isEnd())
            doRound()
        }
    getWinner();
    statistic.sayLog('winner');
};


//Initialisation



Initialisation(characters);
Initialisation(weapons);
cloneChar(characters.buffer1,characters.void1)


// Char Functions
function charSelection(num) {
    let lastChar=0;
        document.getElementById(`char__select__${num}`).onchange = function() {
           if (document.getElementById(lastChar) !== null)  document.getElementById(lastChar).removeAttribute('disabled');

            let charId = this.options[this.selectedIndex].id;
            charId = charId.slice(0, charId.length - 1)
            let character = characters[charId];


            // Img Set
            document.getElementById(`char__img__conteiner__${num}`).innerHTML = `<img class = "char__img" src="/img/${character.img}"></img>`;
            let buffer;
            (num == 1) ? buffer = characters.buffer1 : buffer = characters.buffer2;


            cloneChar(buffer, character)
            //Weapon
            changeWeapon(num,buffer)


            // Stats Set
            for( let stat in buffer.stats) {

                document.getElementById(`${stat}number__${num}`).innerHTML = buffer.stats[stat]
            }

            // Disabling
            document.getElementById(`char__select__${num}`).setAttribute('value', buffer.id)
            document.getElementById(`char__select__${3-num}`).options[this.selectedIndex].setAttribute('disabled','')
            lastChar = buffer.id + (3-num);
        }

};
function charUpdate(num) {

    let buffer;
    (num == 1) ? buffer = characters.buffer1 : buffer = characters.buffer2;
    document.getElementById(`char__select__${num}`).value = buffer.name;
    // Img Set
    document.getElementById(`char__img__conteiner__${num}`).innerHTML = `<img class = "char__img" src="/img/${buffer.img}"></img>`;


    //Weapon
    changeWeapon(num,buffer)


    // Stats Set
    for( let stat in buffer.stats) {

        document.getElementById(`${stat}number__${num}`).innerHTML = buffer.stats[stat]
    }


}
function changeWeapon(num,buffer) {
    document.getElementById(`mainitem__select__${num}`).value = `${buffer.mainWeapon.name}`
    document.getElementById(`mainitem__select__${num}`).setAttribute('value', buffer.mainWeapon.id)
    if ( buffer.mainWeapon.id !== weapons.void.id) {
    showWeaponInfo()
    } else  document.getElementById(`mainitem__info__${num}`).innerHTML = '' ;

    function showWeaponInfo() {
        let item = buffer.mainWeapon;

        document.getElementById(`mainitem__info__${num}`).innerHTML =`<div class="item__info" style="background-color:rgb(116, 52, 146); flex-grow: ${item.critChance-2}">${item.critChance}</div>
        <div class="item__info" style="background-color:rgb(69, 87, 189); flex-grow: ${item.fullChance-item.critChance}">${item.fullChance}</div>
        <div class="item__info" style="background-color:rgb(123, 160, 216); flex-grow: ${item.halfChance-item.fullChance}">${item.halfChance}</div>
        <div class="item__info" style="background-color:rgb(212, 97, 62); flex-grow: ${item.anticritChance-item.halfChance}"></div>
        <div class="item__info" style="background-color:rgb(177, 49, 49); flex-grow:${20-item.halfChance}">${item.anticritChance}</div>`

    };
};

function weaponSelection(num) {

    let buffer;
    (num == 1) ? buffer = characters.buffer1 : buffer = characters.buffer2;
        document.getElementById(`mainitem__select__${num}`).onchange = function() {

            let itemId = this.options[this.selectedIndex].id
                itemId = itemId.slice(0,itemId.length - 1)
            let item = weapons[itemId];
            buffer.mainWeapon = item;
            changeWeapon(num,buffer)

        }
};


function changeStat() {

    document.querySelectorAll('.stat__button').forEach(button => {

         button.onclick = function() {

           let stat = button.closest('.statbox').querySelector('.stat__number');

           let param = stat.getAttribute('id');
           let number = param.slice(param.length -1,param.length);


           param = param.slice(0,param.length - 1).replace('number__', '');

        //    let charSelect = stat.closest('.mainbox').querySelector('.char__select');
        //    let charId = charSelect.getAttribute('value');

           let buffer;
           (number == 1) ? buffer = characters.buffer1 : buffer = characters.buffer2;





            if (button.innerHTML == '+') {buffer.stats[param] += getValueofChange()
             } else if(stat.innerHTML >1) {buffer.stats[param] -= getValueofChange() }


         stat.innerHTML = buffer.stats[param]


         function getValueofChange() {
             switch(param) {
                 case 'HP': return 2
                 case 'speed': return 0.25
                 default: return 1
             }
         }
         }

    });

};
function newChar(num) {
    document.getElementById(`new__${num}`).onclick = function() {
      hideCharSelect(num,true);
        hideCharInput(num,false);
        listenCharInput(num);


    }

};
function hideCharSelect(num, hide) {
    let charSelect = document.getElementById(`char__select__${num}`);

    (hide === false) ? charSelect.style = "display: flex" : charSelect.style = "display: none";
};

function hideCharInput(num,hide) {
    let charInput =  document.getElementById(`char__input__${num}`);
     (hide === false) ?  charInput.style = "display: flex": charInput.style = "display: none"
     charInput.value  = '';

};

function listenCharInput(num) {
   document.onkeydown = function(e) {

       if(e.key == 'Escape') {

            hideCharInput(num,true);
            hideCharSelect(num,false);
        }
    }
    document.getElementById(`char__input__${num}`).onkeydown = function(e) {
        if (e.key == 'Enter') {
            if (this.value == '') this.value = 'Неизвестный'
            createChar(num);
            hideCharInput(num,true);
            hideCharSelect(num,false);


        }
    }
};
function delChar(num) {
    document.getElementById(`del__${num}`).onclick = function() {
        ask('Удалить персонажа?',deleteChar, cancel)
    }
    function deleteChar() {
        let char = document.getElementById(`char__select__${num}`).getAttribute('value');
        for (let i = 1; i <=2; i++) {
            document.getElementById(char + i).remove();
            delete characters[char];
        }
    }


};
function copyChar(num){
    document.getElementById(`copy__${num}`).onclick = function() {
        let buffer;
        let targer;
    (num == 1) ? buffer = characters.buffer1 : buffer = characters.buffer2;
    (num == 1) ? targer = characters.buffer2 : buffer = characters.buffer1;
        cloneChar(targer,buffer)
        charUpdate(3-num)
    }

}

function ask(question, yes, no) {
    let askBlock = document.getElementById('ask');
    askBlock.style = 'display: block';
    document.getElementById('ask__question').innerText = question;
    document.getElementById('answer__yes').onclick = function() {
        yes()
        askBlock.style = 'display: none';

    }
    document.getElementById('answer__no').onclick = function() {
        no()
        askBlock.style = 'display: none';

    }


};
function saveChar(num) {
    document.getElementById(`save__${num}`).onclick = function() {
        ask('Сохранить изменения?', savingChar, cancel)

    function savingChar() {
        let char =  document.getElementById(`char__select__${num}`).getAttribute('value');
        let buffer;
        (num == 1 ) ? buffer = characters.buffer1 : buffer = characters.buffer2;
        cloneChar (characters[char], buffer);
    }

    }

};
function cancel() {}

//Handlers

charSelection(1);
charSelection(2);
weaponSelection(1);
weaponSelection(2);
changeStat();
newChar(1);
delChar(1);
saveChar(1);
copyChar(1);
// Process

let start = document.getElementById('start__button').onclick = function(){

    let char1 = characters[document.getElementById('char__select__1').getAttribute('value')];
    let char2 = characters[document.getElementById('char__select__2').getAttribute('value')];

    for (let i = 0; i < 1; i++) {
        doFight(char1,char2);
    }

    statistic.sayLog("dodge")
    statistic.sayLog("hit")
    statistic.sayLog("misshit")


    statistic.createParametr("dodge");
    statistic.createParametr("hit");
    statistic.createParametr("misshit");

};



let refresh = document.getElementById('refresh__button').onclick = function() {

    document.getElementById('log').innerHTML ='';

}



 window.call = characters
