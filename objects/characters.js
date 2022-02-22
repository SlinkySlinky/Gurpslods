import {rollDie, createOwnSkill,increaseSkillLvl, cloneChar, charIni} from '../functions/gameFunctions.js';
import { skills } from "../objects/skills.js";
import {offHands, weapons} from "../objects/weapons.js";
import {statistic}from "../objects/statistic.js";



class Character{
    constructor(name,type,id,img,ST,AG,IN,W,HP,speed,percep,WP) {
    // Stats
        this.name = name,
        this.type = type,
        this.id = id,
        this.img = img;

        this.stats = {},
        this.stats.ST = ST,
        this.stats.AG = AG,
        this.stats.IN = IN,
        this.stats.W = W,
        this.stats.HP = HP,
        this.stats.speed = speed,
        this.stats.percep = percep,
        this.stats.WP = WP,

        this.protection = undefined;
        this.skills = {

        };
        this.mainWeapon = undefined;
        this.offHand = undefined;

    };

    // Methods
    // calculateStats = function() {
    //     this.might = this.stats.ST-10,
    //     this.evoid = this.stats.AG/2,
    //     this.mind = this.stats.IN - 10,


    //     this.curHP = this.stats.HP,
    //     this.curWP = this.stats.WP
    // };

    makeAttack = function(enemy, attackSkill, weapon) {
        let character = this;
        let hit = makeHit();
        let realDmg = getDmg();
        makeDmg();
    // Functions
        function makeDmg() {
            if (attackSkill.dmgType  == "phis" ) {
                enemy.curHP = enemy.curHP - realDmg;
                console.log(`наносит ${realDmg} урона`);
                console.log(`У ${enemy.name} остается ${enemy.curHP} HP` );
            }
        };
        function makeHit() {
            console.log(`${character.name} атакует ${enemy.name}`);
            let roll = rollDie();
            function doProtect(hitType,hitValue) {
                switch(enemy.protection.type){
                    case 'dodge':
                        if (enemy.doDodge() == 1) {
                        statistic.count("dodge");
                        console.log(`но ${enemy.name} уворачивается`);
                        return 1;
                        } else {
                            statistic.count("hit");
                            console.log("и попадает"); return hitType;}
                    case 'parry':

                        switch (enemy.doParry(hitType,hitValue)) {
                            case 1:
                                console.log("и попадает")
                                return hitType;
                            case 2:
                                console.log(`но ${enemy.name} парирует часть урона`)
                                return hitType - 1;
                            case 0:
                                console.log(`но ${enemy.name} парирует`)
                                return 1;
                        };
                    case 'block':
                        console.log(`${enemy.name} блокирует`);
                        if (hitValue < enemy.doBlock()) {

                            return hitType -1}
                        else return hitType;
                        // В случаи коротких промежутков плохо работает! и парирование
                };
            };
            if (roll <= weapon.critChance) {
                let hitType = 4;
                let hitValue = weapon.critChance - roll;
                return doProtect(hitType,hitValue)
            } else if (roll <= weapon.fullChance + attackSkill.lvl) {
                let hitType = 3;
                let hitValue =  weapon.fullChance + attackSkill.lvl - roll;
                return doProtect(hitType,hitValue)

            } else if (roll<= weapon.halfChance + character.stats.percep) {
                let hitType = 2;
                let hitValue =  weapon.halfChance + character.stats.percep - roll;
                return doProtect(hitType,hitValue)
             } else {
                 statistic.count("misshit");
                  console.log("и промахивается"); return 1;}
        };

        function getDmg() {
            let dmgStat = null;
           if (attackSkill.type == "phisical")  dmgStat = character.might
                else if (attackSkill.type == "mental") dmgStat = character.mind;
            switch(hit) {
                case 4:
                    return Math.trunc((weapon.fullDmg + attackSkill.dmg + dmgStat) * 1.5 );
                case 3:
                    return weapon.fullDmg +attackSkill.dmg + dmgStat;
                case 2:
                    return weapon.halfDmg +attackSkill.dmg + dmgStat;

                case 1:
                    return 0;
            }
        };

    // Process

    };

    setProtection = function(protectSkill) {
            this.protection = protectSkill;
    };
    doDodge = function() {

        let dodgeChance = this.evoid + this.protection.lvl*0.5;
        if (rollDie() <= dodgeChance) {
            return 1
        } else return 0;
    };
    doParry = function(hitType,hitValue) {
        switch (hitType) {
            case 4:
                if (this.mainWeapon.critChance - rollDie() >= hitValue) {return 1} else return 0;
            case 3:
                if (this.mainWeapon.fullChance + this.protection.lvl- rollDie() >= hitValue) {return 1} else
                if (this.mainWeapon.halfChance + this.stats.percep - rollDie() >= hitValue) {return 2 } else return 0;
            case 2:
                if(this.mainWeapon.halfChance + this.stats.percep - rollDie() >= hitValue) {return 1 } else return 0;
        }


    };
    doBlock = function() {
        return (this.protection.lvl + this.offHand.value)
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
    void1: new Character('Пустой 1', 'war', 'void1','war.jpg',1,1,1,1,0,1,1,1),
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
// characters.void1.calculateStats();

characters.war1.mainWeapon = weapons.ironSword;
createOwnSkill(characters.war1,'normalPunch');
createOwnSkill(characters.war1,'normalDodge');
increaseSkillLvl(characters.war1,'normalDodge');
// characters.war1.calculateStats();

characters.war2.mainWeapon = weapons.steelSword;
characters.war2.offHand = offHands.ironShield;
createOwnSkill(characters.war2,'normalPunch');
createOwnSkill(characters.war2,'normalDodge');
createOwnSkill(characters.war2,'normalParry');
createOwnSkill(characters.war2,'normalBlock');
// characters.war2.calculateStats();

characters.dummy.mainWeapon = weapons.ironSword;
characters.dummy.offHand = offHands.ironShield;
createOwnSkill(characters.dummy,'normalDodge');
createOwnSkill(characters.dummy,'normalParry');
createOwnSkill(characters.dummy,'normalBlock');
// characters.dummy.calculateStats();


export {characters}
export {createChar}