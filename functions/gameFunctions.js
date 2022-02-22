
import { skills } from "../objects/skills.js";
import {weapons} from "../objects/weapons.js";
import { characters } from "../objects/characters.js";


function rollDie() {
    return Math.floor(Math.random()*19 +2)
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
    }
};
function charIni(item) {
    document.getElementById(`char__select__1`).innerHTML += `<option id='${item.id +1}'> ${item.name}</option>`
    document.getElementById(`char__select__2`).innerHTML += `<option id='${item.id +2}'> ${item.name}</option>`
};
function mainItemIni(item) {
    document.getElementById(`mainitem__select__1`).innerHTML += `<option id='${item.id +1}'> ${item.name}</option>`
    document.getElementById(`mainitem__select__2`).innerHTML += `<option id='${item.id +2}'> ${item.name}</option>`
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






export {rollDie, getStats,createOwnSkill, increaseSkillLvl, cloneChar, Initialisation, charIni, mainItemIni,getStorage,removeInStorage}