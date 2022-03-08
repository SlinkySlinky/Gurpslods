
import { skills } from "./objects/skills.js";
import { characters, createChar } from "./objects/characters.js";
import { statistic }from "./objects/statistic.js";
import {offHands, weapons} from './objects/weapons.js';
import {cloneChar, Initialisation,getStorage,removeInStorage, getProcent,getMax,getMin,getMiddle} from './functions/gameFunctions.js';


// Cunstruction
//sdfsdfsdf





//Initialisation

const battleNumber = 1000;
getStorage();
Initialisation(characters);
Initialisation(offHands);
Initialisation(weapons);


cloneChar(characters.buffer1,characters.void1)
cloneChar(characters.buffer2,characters.void2)


// Char Functions
function charSelection() {

        document.querySelectorAll(`.char__select`).forEach( select => {

            select.onchange = function() {

            let num = getNum(select);
            let charId = getObjId(select);
            let buffer = getBuffer(num);
            let lastChar = select.getAttribute('value')

            // Remove Disabled
            if (document.getElementById(lastChar+(3-num)) !== null) document.getElementById(lastChar+(3-num)).removeAttribute('disabled');

            select.setAttribute('value', charId);

            cloneChar(buffer, characters[charId])
                charUpdate(num,buffer);

            // Disabling
            select.setAttribute('value', buffer.id)
            document.getElementById(charId+(3-num)).setAttribute('disabled','')
        }
    })
};
function getNum(obj) {
    if (obj.id.includes('__1')) {return 1 }
    else return 2;
};
function getBuffer(num) {
    if (num == 1) {return characters.buffer1 } else return characters.buffer2;
};
function getObjId(obj) {
    //from select
   return obj.options[obj.selectedIndex].id.slice(0, obj.options[obj.selectedIndex].id.length -1)
};
function changeImg(num,img) {
    document.getElementById(`char__img__conteiner__${num}`).innerHTML = `<img class = "char__img" src="/img/${img}"></img>`;

};
function changeStats(num,obj) {
    for( let stat in obj.stats) {
        document.getElementById(`${stat}number__${num}`).innerHTML = obj.stats[stat]
    }
};
function charUpdate(num,obj) {


    document.getElementById(`char__select__${num}`).value = obj.name;

    changeImg(num,obj.img)
    changeWeapon(num,obj,'mainWeapon')
    changeWeapon(num,obj,'offHand')
    changeStats(num,obj)


};
function changeWeapon(num,obj,select) {
    document.getElementById(`${select}__select__${num}`).value = `${obj[select].name}`
    document.getElementById(`${select}__select__${num}`).setAttribute('value', obj[select].id)
    if ( obj[select].type !== 'void' && obj[select].type !== 'shield') {
    showWeaponInfo()
    } else  document.getElementById(`${select}__info__${num}`).innerHTML = '' ;

    function showWeaponInfo() {
        let item = obj[select];

        document.getElementById(`${select}__info__${num}`).innerHTML =
        `<div class="item__info" style="background-color:rgb(116, 52, 146); flex-grow: ${item.critChance-2}">${item.critChance}</div>
        <div class="item__info" style="background-color:rgb(69, 87, 189); flex-grow: ${item.fullChance-item.critChance}">${item.critChance + 1} - ${item.fullChance}</div>
        <div class="item__info" style="background-color:rgb(123, 160, 216); flex-grow: ${item.halfChance-item.fullChance}">${item.fullChance + 1} - ${item.halfChance}</div>
        <div class="item__info" style="background-color:rgb(212, 97, 62); flex-grow: ${item.anticritChance-item.halfChance}">${item.halfChance + 1} - ${item.anticritChance - 1}</div>
        <div class="item__info" style="background-color:rgb(177, 49, 49); flex-grow:${20-item.anticritChance + 1}">${item.anticritChance}</div>`

    };
};

function weaponSelection() {

    document.querySelectorAll(`select.mainWeapon__select, select.offHand__select`).forEach ( select => {
        select.onchange = function() {
            let num = getNum(select);
            let buffer = getBuffer(num);
            let itemId = getObjId(select);
            let item;
            if (select.className.includes('mainWeapon')) {
                item = weapons[itemId];
                buffer.mainWeapon = item;
            } else {

                item = offHands[itemId];
                if (item == undefined) {item = weapons[itemId]};
                buffer.offHand = item;
            }

            changeWeapon(num,buffer,select.className.replace('__select',''))
        }

    });

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



// SubFunction
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
function cancel() {}

//Handlers

function buttonHandler() {

    document.querySelectorAll('button').forEach ( button => {

        button.onclick = function(e) {
            switch(button.className) {
                case 'stat__button':
                    editStat(button,e)
                    break;
                case 'del':
                    delChar(button)
                    break;
                case 'save':
                    saveChar(button)
                    break;
                case 'copy':
                    copyChar(button)
                    break;
                case 'new':
                    newChar(button)
                    break;
                case 'fight__button':
                      statistic.clearAll();
                         doFight()
                      statistic.roundString += `</p>`;
                      statistic.say(statistic.roundString)
                      break;
                case 'battle__button':
                      statistic.clearAll();
                         doBattle(battleNumber)
                      break;
                case 'statistic__button':
                        showStatistic();
                        break;
                case 'refresh__button':
                      refresh()
                      break;
            }

        }


    });
    function editStat(button,e) {

        let statbox = button.closest('.statbox').querySelector('.stat__number');
        let statId = statbox.id;
        let num = getNum(statbox);
        let buffer = getBuffer(num);
        let stat = statId.slice(0,statId.length - 1).replace('number__', '');

        if (statbox.innerHTML == "-") buffer.stats[stat] = 0;

         if (button.innerHTML == '+') {buffer.stats[stat] += getValueofChange()
         } else {buffer.stats[stat] -= getValueofChange() }

         if (buffer.stats[stat]<=1){
              if (stat == "HP") { buffer.stats[stat] = 2;
              } else  buffer.stats[stat] = 1;
         }

     statbox.innerHTML = buffer.stats[stat];
     buffer.calculateStats();
     function getValueofChange() {
     if( e.ctrlKey ) {
          switch(stat) {
             case 'HP': return 10
             case 'speed': return 1
             default: return 5

         }
     } else {
          switch(stat) {
              case 'HP': return 2
              case 'speed': return 0.25
              default: return 1

          }
      }
     };
    };
    function delChar(button) {

        ask('Удалить персонажа?',deleteChar, cancel)

       function deleteChar() {
           let num = getNum(button);
           let buffer = getBuffer(num);
           let char = document.getElementById(`char__select__${num}`).getAttribute('value');
           for (let i = 1; i <=2; i++) {
               document.getElementById(char + i).remove();
               delete characters[char];
               removeInStorage(char);

              (num == 1) ? buffer = characters.void1 : buffer = characters.void2
               charUpdate(num,buffer)
           }

       }


    };
    function saveChar(button) {

        ask('Сохранить изменения?', savingChar, cancel)

    function savingChar() {
        let num = getNum(button);
        let char = document.getElementById(`char__select__${num}`).getAttribute('value');
        let buffer = getBuffer(num);
        cloneChar (characters[char], buffer);

        localStorage.setItem(char, JSON.stringify(characters[char]));
    }



    };
    function copyChar(button){
        let num = getNum(button)
        let buffer = getBuffer(num)
        let target = getBuffer(3-num)

        cloneChar(target,buffer)
        charUpdate(3-num,buffer)


    };
    function newChar(button) {
        let num = getNum(button)
        hideCharSelect(num,true);
        hideCharInput(num,false);
        listenCharInput(num);
    };
};

charSelection();
weaponSelection();
buttonHandler();



//Fight functions

function doFight(){
    let char1 = getBuffer(1);
    let char2 = getBuffer(2);
    let timeOut = 100;
    statistic.round = 1;
    function doRound() {
        statistic.roundString +=(`Раунд ${statistic.round}`)
        char1.setProtection(char1.skills.normalDodge);
        char2.setProtection(char2.skills.normalDodge);
        char1.makeAttack(char2,char1.skills.normalPunch,char1.mainWeapon);
        char2.makeAttack(char1,char2.skills.normalPunch,char2.mainWeapon);

        statistic.round++;
    };

    function isEnd(){
    if (char1.curHP <= 0 || char2.curHP <= 0 || statistic.round == timeOut) {return true} else {return false};
    };
    function getWinner () {
    if (statistic.round == timeOut) {
        statistic.winner = 'таймаут'
        statistic.timeouts++
    } else if (char1.curHP <= 0 && char2.curHP <= 0) {
        statistic.winner = 'ничья'
        statistic.draws++
    } else if (char1.curHP <= 0) {
        statistic.winner = char2.name
        statistic.winsSecond++
    } else if (char2.curHP <= 0) {
        statistic.winner = char1.name
        statistic.winsOne++
     }
    else return undefined;
    };
    function refreshStats() {
    char1.curHP = char1.stats.HP;
    char2.curHP = char2.stats.HP;
    };

    refreshStats();
        while (!isEnd()) {
            doRound()

            statistic.roundString +=('<p>---------------------------------</p>')
        }

    getWinner();
    statistic.roundString += (`<p>Победитель: ${statistic.winner}</p>`);
    statistic.roundString += ('<p>---------------------------------</p>')
};



function doBattle(num) {
    statistic.fights = 0;
    while (statistic.fights < num) {
        statistic.fights++;
        doFight();
        getMax(statistic.round,statistic.maxRound);
        getMin(statistic.round,statistic.minRound);
        statistic.allRounds += statistic.round;

    }
    getMiddle(statistic.allRounds,statistic.fights,statistic.middleRound)
    getMiddle(statistic.allDmg1,statistic.attaks1,statistic.dps1)
    getMiddle(statistic.allDmg2,statistic.attaks2,statistic.dps2)
    statistic.say(`<p>Сражений: ${statistic.fights }</p>`)
    statistic.say(`<p> Победы ${getProcent(statistic.winsOne,statistic.fights)} / ${getProcent(statistic.winsSecond,statistic.fights)} </p>`)
    statistic.say(`<p> Ничьи ${getProcent(statistic.draws,statistic.fights)} / (${getProcent(statistic.timeouts,statistic.fights)})</p>`)
    statistic.say(`<p>Средний раунд: ${statistic.middleRound}</p>`)
    statistic.say(`<p>Максимальный раунд: ${statistic.maxRound}</p>`)
    statistic.say(`<p>Минимальный раунд: ${statistic.minRound}</p>`)
    statistic.say ('<p>---------------------------------</p>')

};

function showStatistic() {
    statistic.say(`Попадания: <span class='crithit'>${getProcent(statistic.crithit,statistic.attaks)}</span> / <span class='fullhit'>${getProcent(statistic.hit,statistic.attaks)}</span> / <span class='halfhit'>${getProcent(statistic.halfhit,statistic.attaks)}</span> / <span class='misshit'>${getProcent(statistic.misshit,statistic.attaks)}</span> / <span class='critmisshit'>${getProcent(statistic.anticrithit,statistic.attaks)}</span>`);
    statistic.say(`Защита: ${getProcent(statistic.dodge,statistic.protects)}У / ${getProcent(statistic.parry,statistic.protects)}П / ${getProcent(statistic.block,statistic.protects)}Б`)
    statistic.say(`Макс. урон: ${statistic.maxDmg}, Мин. урон: ${statistic.minDmg}`)
    statistic.say(`ДПС  ${statistic.dps1} / ${statistic.dps2}`)
    statistic.say ('<p>---------------------------------</p>')
}
function refresh() {

    document.getElementById('log').innerHTML ='';

}









 window.call = characters
window.statistic = statistic