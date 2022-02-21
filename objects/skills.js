

class AttackSkill{
    constructor(name,lvl,type,dmgType, dmg, buffType, buff, debuffType, debuff,cost) {
        this.name = name;
        this.lvl = lvl;
        this.type = type;
        this.dmgType = dmgType;
        this.dmg = dmg;
        this.buffType = buffType;
        this.buff = buff;
        this.debuffType = debuffType;
        this.debuff = debuff;
        this.cost = cost;
    }
};
class ProtectSkill {
    constructor(name,lvl,type) {
        this.name = name;
        this.lvl = lvl;
        this.type = type;
    }
};


export const skills ={
    normalPunch: new AttackSkill("Обычный удар", 0,"phisical", "phis", 0, 0, 0, 0, 0, 0),
    normalDodge: new ProtectSkill("Обычное уклонение", 0,'dodge'),
    normalParry: new ProtectSkill("Обычное парирование", 0,'parry'),
    normalBlock: new ProtectSkill("Обычный блок", 0,'block'),

}

