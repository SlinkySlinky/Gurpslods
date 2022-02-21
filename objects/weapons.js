class Weapon {
    constructor(name,type,id,critChance,fullChance,halfChance,anticritChance,fullDmg,halfDmg){
         this.name = name;
         this.type = type;
         this.id = id;
         this.critChance = critChance;
         this.fullChance = fullChance;
         this.halfChance = halfChance;
         this.anticritChance = anticritChance;
         this.fullDmg = fullDmg;
         this.halfDmg = halfDmg;
    }
};
class offHand {
    constructor(name,type,buffType,value){
        this.name = name;
        this.type = type;
        this.buffType = buffType;
        this.value = value;
    }
}


export const weapons = {
    void: new Weapon ('Нет','','void'),
    ironSword: new Weapon("Железный меч", "меч",'ironSword', 3, 9, 12, 18, 4, 2),
    steelSword: new Weapon("Стальной меч", "меч",'steelSword', 3, 10, 13, 18, 5, 2),

}

export const offHands = {
    ironShield: new offHand("Железный щит", "щит", "decreaseHit", 3)
}


