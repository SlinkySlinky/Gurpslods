import {rollDie, createOwnSkill,increaseSkillLvl, cloneChar, charIni, getMax, getMin} from '../functions/gameFunctions.js';
import { skills } from "../objects/skills.js";
import {offHands, weapons} from "../objects/weapons.js";
import {statistic}from "../objects/statistic.js";



class Character{
    constructor(name,type,id,img,ST,AG,IN,W,HP,speed,percep,WP) {
    // Stats
        this.name = name,
        this.type = type,
        this.id = id,
        this.img = img,

        this.stats = {},
        this.stats.ST = ST,
        this.stats.AG = AG,
        this.stats.IN = IN,
        this.stats.W = W,
        this.stats.HP = HP,
        this.stats.speed = speed,
        this.stats.percep = percep,
        this.stats.WP = WP,

        this.mainWeapon = undefined,
        this.offHand = undefined,
        this.protection = undefined,
        this.skills = {},

        this.buffs ={},
        this.debuffs = {};


    };

    // Methods
    calculateStats = function() {
        this.might = Math.trunc(this.stats.ST-10);
        this.evoid = this.stats.AG-6;
        this.mind = Math.trunc(this.stats.IN - 10)



    };

    makeAttack = function(enemy, attackSkill, weapon) {

        // let character = this;
        // let hit = makeHit();
        // let realDmg = getDmg();
        // makeDmg();

    // Process
        let char = this;
        let roll = rollDie(2,10);
        statistic.roundString += `<p><span class = 'big'>${char.name}</span> атакует <span class = 'big'>${enemy.name}</span>`;
        let hitType = checkHit()
        let hitValue = getHitValue()

        if( char == characters.buffer1) {statistic.attaks1++
        } else statistic.attaks2++;

        if (hitType == 'miss' || hitType == 'critmiss') {
        } else {
            if (checkProtect() == 'yes') {
                statistic.protects++;
               switch (doProtect()) {
                   case 'protected': break;
                   case 'offended':
                        makeDmg(getDmg('half'));
                        break;
                   case 'hitted':
                        makeDmg(getDmg(hitType));
                        break;
               }
            } else {
            makeDmg(getDmg(hitType));
            }
        }


    // Functions


        function checkHit() {
            if (roll <= weapon.critChance) {
                statistic.crithit++;
                statistic.roundString += ` и <span class='crithit'>критически попадает (${roll})</span> `
                return 'crit';
            } else if (roll <= weapon.fullChance + attackSkill.lvl) {
                statistic.hit++;
                statistic.roundString += ` и <span class='fullhit'>попадает (${roll})</span> `
                return 'full';
            } else if (roll<= weapon.halfChance + char.stats.percep) {
                statistic.halfhit++;
                statistic.roundString += ` и <span class='halfhit'>задевает (${roll})</span> `
                return 'half';
             } else if (roll < weapon.anticritChance) {
                statistic.misshit++;
                statistic.roundString += ` и <span class='misshit'>промахивается (${roll})</span> `
                return 'miss';
            } else {
                statistic.anticrithit++;
                statistic.roundString += ` и <span class='critmisshit'>критически промахивается (${roll})</span> `
                return 'critmiss';
            }
        };
        function getHitValue() {
            switch (hitType) {
                case 'crit': return weapon.critChance - roll;
                case 'full': return weapon.fullChance + attackSkill.lvl - roll;
                case 'half': return weapon.halfChance + char.stats.percep - roll;
            }

        };
        function checkProtect() {
            if (enemy.protection.type == 'dodge'|| 'parry' || 'block') { return 'yes'
            } else return 'no'

        };
        function doProtect(){

            switch (enemy.protection.type) {
                case 'dodge':
                   return enemy.doDodge();
                case 'parry':
                   return enemy.doParry(hitType, hitValue,enemy.mainWeapon);
                case 'block':
                    roll = enemy.doBlock(roll);
                    hitType = checkHit();
                    return 'hitted';

            }

        };
        function getDmg(hitType) {
        let dmgStat;

           if (attackSkill.type == "phisical")  dmgStat = char.might
                else if (attackSkill.type == "mental") dmgStat = char.mind;
            switch(hitType) {
                case 'crit':
                    return Math.trunc((weapon.fullDmg + attackSkill.dmg + dmgStat) * 1.5 );
                case 'full':
                    return weapon.fullDmg +attackSkill.dmg + dmgStat;
                case 'half':
                    return weapon.halfDmg +attackSkill.dmg;

        }
        };
        function makeDmg(dmg) {
        if (attackSkill.dmgType  == "phis" ) {
           statistic.maxDmg = getMax(dmg,statistic.maxDmg);
           if (dmg >0) {statistic.minDmg = getMin(dmg,statistic.minDmg)};
            if( char == characters.buffer1) {statistic.allDmg1 += dmg
            } else statistic.allDmg2 += dmg;
            enemy.curHP = enemy.curHP - dmg;
            statistic.roundString += `. Нанесено <span class = 'dmg'>${dmg}</span> урона <p><span class = 'big'>${enemy.name}</span> <span class='health'>${enemy.curHP} HP</span>`

        }

        };
    };
    doDodge = function() {
        let dies = rollDie(2,10);
        if (dies <= this.evoid + this.protection.lvl*0.5) {
            statistic.dodge++;
            statistic.roundString += ` но <span class='big'>${this.name}</span> <span class='misshit'>увернулся (${dies})</span>`
            return 'protected'
        } else return 'hitted';
    };
    doParry = function(hitType, hitValue, weapon) {
        let char = this;
        let roll = rollDie(2,10);
        let parryType = getParryType();

        switch(hitType) {
            case 'crit':
                if (parryType = 'crit' && (hitValue - getParryValue('crit') >= 0)) {
                    statistic.parry++;
                    statistic.roundString += ` но <span class='big'>${this.name}</span> <span class='misshit'>парировал</span>`
                    return 'protected'
                } else return 'hitted'

            case 'full':
                if (parryType = 'crit') return 'protected';
                if (parryType = 'full') {
                    if (hitValue - getParryValue('full') >=0 ) {
                        statistic.parry++;
                        statistic.roundString += ` но <span class='big'>${this.name}</span> <span class='misshit'>парировал</span>`
                        return 'protected'
                    } else {
                        statistic.parry++;
                        statistic.roundString += ` но <span class='big'>${this.name}</span><span class='misshit'> частично парировал</span>`
                        return 'offended'
                    }
                } else return 'hitted'

            case 'half':
                if (parryType = 'crit'|| 'full') {
                    statistic.parry++;
                    statistic.roundString += ` но <span class='big'>${this.name}</span> <span class='misshit'>парировал</span>`
                    return 'protected';
                }
                if (parryType = 'half' && (hitValue - getParryValue('full') >=0 )) {
                    statistic.parry++;
                    statistic.roundString += ` но <span class='big'>${this.name}</span> <span class='misshit'>парировал</span>`
                    return 'protected'
            } else return 'hitted'

        };
        function getParryType() {

        if (roll <= weapon.critChance) {
            return 'crit';
        } else if (roll <= weapon.fullChance + char.protection.lvl) {
            return 'full';
        } else if (roll<= weapon.halfChance + char.stats.percep) {
            return 'half';
        } else return 'miss';
        };
        function getParryValue(parryType) {
        switch (parryType) {
            case 'crit':
                return weapon.critChance - rollDie(2,10);
            case 'full':
                return weapon.fullChance + char.protection.lvl- rollDie(2,10)
            case 'half':
                return weapon.halfChance + char.stats.percep - rollDie(2,10) ;
            default: return -1;
        }
        };
    };
    doBlock = function(roll) {
        return roll - (this.protection.lvl + this.offHand.value);
    };
    setProtection = function(protectSkill) {
            this.protection = protectSkill;
    };


};



function createChar(num) {
    let char = 'war' + Object.keys(characters).length;
    let buffer;
    (num == 1 ) ? buffer = characters.buffer1 : buffer = characters.buffer2;
    characters[char] = new Character('','war',char, 'war.jpg');
    cloneChar(characters[char],buffer)
    characters[char].id = char;
    characters[char].name = document.getElementById(`char__input__${num}`).value;

    charIni(characters[char]);

}


// Initialisation

const characters = {
    void1: new Character('Пустой 1', 'war', 'void1','war.jpg','-','-','-','-','-','-','-','-'),
    void2: new Character('Пустой 2', 'war', 'void1','war.jpg',1,1,1,1,0,1,1,1),
    buffer1: new Character('Шаблон 1', 'war', 'buf1','war.jpg',11,11,11,11,22,5.5,1,11),
    buffer2: new Character('Шаблон 2', 'war', 'buf2','war.jpg',11,11,11,11,22,5.5,1,11),

    war1: new Character("Воин 1", 'war','war1','war.jpg', 11,11,11,11,22,5.5,1,11),
    war2: new Character('Воин 2', 'war','war2','war.jpg', 11,11,11,11,22,5.5,1,11 ),
    dummy: new Character('Маникен', 'dummy', 'dummy','dummy.jpg', 11,11,11,11,1000,5.5,1,11 ),
};


Object.defineProperties(characters, {
    void1: {enumerable: false},
    void2: {enumerable: false},
    buffer1: {enumerable: false},
    buffer2: {enumerable: false},
});
characters.void1.mainWeapon = weapons.void;
characters.void2.mainWeapon = weapons.void;
characters.void1.offHand = offHands.void;
characters.void2.offHand = offHands.void;


characters.war1.mainWeapon = weapons.ironSword;
characters.war1.offHand = offHands.ironShield;
createOwnSkill(characters.war1,'normalPunch');
createOwnSkill(characters.war1,'normalDodge');
//increaseSkillLvl(characters.war1,'normalDodge');
characters.war1.calculateStats();

characters.war2.mainWeapon = weapons.ironSword;
characters.war2.offHand = offHands.ironShield;
createOwnSkill(characters.war2,'normalPunch');
createOwnSkill(characters.war2,'normalDodge');
createOwnSkill(characters.war2,'normalParry');
createOwnSkill(characters.war2,'normalBlock');
characters.war2.calculateStats();

characters.dummy.mainWeapon = weapons.ironSword;
characters.dummy.offHand = offHands.ironShield;
createOwnSkill(characters.dummy,'normalDodge');
createOwnSkill(characters.dummy,'normalParry');
createOwnSkill(characters.dummy,'normalBlock');
characters.dummy.calculateStats();


export {characters}
export {createChar}