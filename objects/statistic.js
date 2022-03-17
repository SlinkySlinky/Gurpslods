
const statistic = {

    roundString: '',
    round: 0,
    allRounds: 0,

    attaks: 0,
    attaks1: 0,
    attaks2: 0,
    crithit: 0,
    hit: 0,
    halfhit: 0,
    misshit:0,
    anticrithit:0,
    protects: 0,
    dodge: 0,
    parry: 0,
    block: 0,

    allDmg1: 0,
    allDmg2: 0,
    getDmg:0,
    maxDmg: 0,
    minDmg: 10000,
    middleDmg: 0,
    dps1:0,
    dps2:0,

    fights: 0,
    winsOne: 0,
    winsSecond: 0,
    draws: 0,
    timeouts: 0,
    maxRound: 0,
    minRound: 1000,
    middleRound: 0,

     say: function(str) {
        document.getElementById("log").innerHTML +=`<p> ${str} <p>`
     },
     clearAll: function () {
      for ( let key in statistic ) {
        if (typeof this[key] !== 'function') {
            this[key] = 0;
        }
    }   this.roundString = '';
        this.minRound = 1000;
        this.minDmg = 10000;
    },

}

export {statistic}