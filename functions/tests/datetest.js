const dTN = new Date()

console.log(dTN.getUTCFullYear())
console.log(dTN.getUTCMonth())
console.log(dTN.getUTCDate())


console.log(`${dTN.getUTCFullYear()}${dTN.getUTCMonth()+1}${dTN.getUTCDate()}`)

var d = new Date();
var cD = ("0" + d.getUTCDate()).slice(-2);
var cM = ("0" + (d.getUTCMonth() + 1)).slice(-2);
var cY = d.getFullYear();
var cH = d.getUTCHours();

console.log(`${cY}${cM}${cD}-${cH}`);
