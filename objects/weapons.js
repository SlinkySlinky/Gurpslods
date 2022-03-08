class Weapon {
    constructor(name,id,type,hand,critChance,fullChance,halfChance,anticritChance,fullDmg,halfDmg){
         this.name = name;
         this.id = id;
         this.type = type;
         this.hand = hand;
         this.critChance = critChance;
         this.fullChance = fullChance;
         this.halfChance = halfChance;
         this.anticritChance = anticritChance;
         this.fullDmg = fullDmg;
         this.halfDmg = halfDmg;
    }
};
class offHand {
    constructor(name,id,type,buffType,value){
        this.name = name;
        this.id = id;
        this.type = type;

        this.buffType = buffType;
        this.value = value;
    }
}


export const weapons = {
    void: new Weapon ('Нет','void','void',''),
    ironSword: new Weapon("Железный меч",'ironSword','sword','oneHand', 3, 9, 12, 18, 4, 2),
    steelSword: new Weapon("Стальной меч",'steelSword','sword','oneHand', 3, 10, 13, 18, 5, 2),

}

export const offHands = {
    void: new offHand ('Нет','void','void',''),
    ironShield: new offHand("Железный щит", "ironShield",'shield', "decreaseHit", 3)
}


