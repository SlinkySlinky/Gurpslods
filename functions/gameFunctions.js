
import { skills } from "../objects/skills.js";
import {weapons} from "../objects/weapons.js";
import {offHands} from "../objects/weapons.js";
import { characters } from "../objects/characters.js";
import { statistic } from "../objects/statistic.js";


function rollDie(number,type) {
    let roll=0;
        for (let i=0; i<number; i++) {
            roll += Math.floor(Math.random()*type+1)
        }
    return roll;
};
// Initialisation

function Initialisation(object) {

    switch(object) {
    case (characters):
        for (let key in object) {
            charIni(object[key])
        }
    break;
    case (weapons):
        for (let key in object) {
            mainItemIni(object[key])
        }
    break;
    case (offHands):
        for (let key in object) {
            offHandsIni(object[key])
        }
    break;
    }
};
function charIni(item) {
    document.getElementById(`char__select__1`).innerHTML += `<option id='${item.id +1}'> ${item.name}</option>`
    document.getElementById(`char__select__2`).innerHTML += `<option id='${item.id +2}'> ${item.name}</option>`
};
function mainItemIni(item) {
    document.getElementById(`mainWeapon__select__1`).innerHTML += `<option id='${item.id +1}'> ${item.name}</option>`
    document.getElementById(`mainWeapon__select__2`).innerHTML += `<option id='${item.id +2}'> ${item.name}</option>`
    if (item.hand == "oneHand") {
    document.getElementById(`offHand__select__1`).innerHTML += `<option id='${item.id +1}'> ${item.name}</option>`
    document.getElementById(`offHand__select__2`).innerHTML += `<option id='${item.id +2}'> ${item.name}</option>`
    };
};
function offHandsIni(item) {
    document.getElementById(`offHand__select__1`).innerHTML += `<option id='${item.id +1}'> ${item.name}</option>`
    document.getElementById(`offHand__select__2`).innerHTML += `<option id='${item.id +2}'> ${item.name}</option>`
};

function getStorage() {
   let keys = Object.keys(localStorage);
    for (let key in keys) {
        if (localStorage.key(key).includes('war')) {
            takeFromStorage(localStorage.key(key),characters)
        }

    }
function takeFromStorage(key,object) {
    object[key] = JSON.parse(localStorage.getItem(key))
}
};

function removeInStorage(key) {
    localStorage.removeItem(key)
}
////////////////////////




// Stats Changing

function getStats(character) {
    for (let key in character) console.log(`${key} = ${character[key]}`)
};

// Creation
function createOwnSkill (character,skillName) {
    character.skills[skillName] = {};
    Object.assign(character.skills[skillName], skills[skillName]);
}

function increaseSkillLvl (character,skillName) {
    character.skills[skillName].lvl ++;
}

function log () {


}
function cloneChar (target,source) {

for (let key in source) {
    if (typeof source[key] == 'object') {
        target[key] = {};
        cloneChar(target[key],source[key])
    } else if (typeof source[key] !== 'undefined') target[key] = source[key]
}



}

function getProcent (number,denominator) {
    return Math.floor(100*number/denominator) +'%'
}
function getMax (number,maxNumber) {
        if (number > maxNumber) {return number }
        else return maxNumber;
}
function getMin(number,minNumber){
    if (number < minNumber) {return number }
        else return minNumber;
}
function getMiddle(number,denominator) {
    return Math.floor(number/denominator);
}


export {rollDie, getStats,createOwnSkill, increaseSkillLvl, cloneChar, Initialisation, charIni, mainItemIni,getStorage,removeInStorage,getProcent,getMax,getMiddle,getMin}