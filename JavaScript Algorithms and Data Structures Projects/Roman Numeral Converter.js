function convertToRoman(num) {
  let romanAr = ["I", "V", "X", "L", "C", "D", "M"];
  let retStr = "";
  let len = String(num).length;
  
  while (len !== 0) {
    len--;
    let divRes = Math.floor(num / Math.pow(10, len));
    num -= divRes * Math.pow(10, len);
    switch (divRes) {
      case 0:
      case 1:
      case 2:
      case 3:
        retStr += romanAr[2 * len].repeat(divRes);
        break;
      case 4:
        retStr += romanAr[2 * len] + romanAr[(2 * len) + 1];
        break;
      case 5:
        retStr += romanAr[(2 * len) + 1];
        break;
      case 6:
      case 7:
      case 8:
        retStr += romanAr[(2 * len) + 1] + romanAr[2 * len].repeat(divRes - 5);
        break;
      case 9:
        retStr += romanAr[(2 * len)] + romanAr[(2 * len) + 2];
        break;
    }
  }
  return retStr;
}

console.log(convertToRoman(29));