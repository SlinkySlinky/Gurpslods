const statistic = {

    createParametr: function (parametr) {
        statistic[parametr] = 0;
    },
    setParamet: function (parametr,num) {
        statistic[parametr] = num;
    },
    count: function(parametr){
        statistic[parametr]++
    },
    say: function(parametr) {
        console.log(`${parametr} = ${statistic[parametr]}`)
    },
     sayLog: function(parametr){
        document.getElementById("log").innerHTML += `<p> ${parametr} = ${statistic[parametr]}</p>`
     }
}

export {statistic}