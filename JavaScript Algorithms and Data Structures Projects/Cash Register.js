function checkCashRegister(price, cash, cid) {
  let valueAr = [0.01, 0.05, 0.1, 0.25, 1, 5, 10, 20, 100].map(x=> x*100);
  let cidCopy = JSON.parse(JSON.stringify(cid));

  for (let i = 0; i < cid.length; i++){
    cid[i][1] = cid[i][1] * 100;
  }

  let change = []; 
  let dif = (cash - price) * 100;
  let i = valueAr.length - 1;
  let tmp = 0;

  while (dif !== 0) {
    if (i === 0 && cid[0][1] === 0) {
      return {status: "INSUFFICIENT_FUNDS", change : []};
    }
    if (dif >= valueAr[i] && cid[i][1] !== 0) {
      cid[i][1] -= valueAr[i];
      dif -= valueAr[i];
      tmp += valueAr[i];
    } else {
      if (tmp !== 0) {
      change.push([cid[i][0], tmp / 100]);
      tmp = 0;
      }
      i--;
    }
  }

  if (tmp !== 0) {
    change.push([cid[i][0], tmp / 100]);
  }
  
  let sum = 0;
  for (let i = 0; i < cid.length; i++){
    sum += cid[i][1];
  }

  if (sum === 0) {
    return {status: "CLOSED", change : cidCopy};
  } else {
    return {status: "OPEN", change: change};
  }
}



// Example cash-in-drawer array:
// [["PENNY", 1.01],
// ["NICKEL", 2.05],
// ["DIME", 3.1],
// ["QUARTER", 4.25],
// ["ONE", 90],
// ["FIVE", 55],
// ["TEN", 20],
// ["TWENTY", 60],
// ["ONE HUNDRED", 100]]

console.log(checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]));