function palindrome(str) {
  str = str.toLowerCase().match(/[A-Za-z0-9]*/gi).join("");
  for (let i = 0; i < str.length / 2; i++) {
    if(str[i] !== str[str.length - i - 1]) {
      return false;
    }
  }
  return true;
}



console.log(palindrome("My age is 0, 0 si ega ym."));