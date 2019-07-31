function telephoneCheck(str) {
  // Good luck!
  let regBrackets = /^(1\s?)?(\(\d{3}\)|\d{3})[\s\-]?\d{3}[\s\-]?\d{4}$/;
  return regBrackets.test(str);
}

console.log(telephoneCheck("555)-555-5555"));