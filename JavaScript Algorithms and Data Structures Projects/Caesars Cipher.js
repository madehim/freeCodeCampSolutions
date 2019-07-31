function rot13(str) { // LBH QVQ VG!  A - 65, Z - 90
  let retStr = "";
  for (let i = 0; i < str.length; i++) {
      if (str[i].match(/[A-Z]/)){
          let shift = str.charCodeAt(i) + 13;
          if (shift > 90) {
              shift = 65 + shift - 91;
          } 
          retStr += String.fromCharCode(shift);
      } else {
          retStr += str[i];
      }
  }  
  return retStr;
}

// Change the inputs below to test
console.log(rot13("SERR PBQR PNZC"));