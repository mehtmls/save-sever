var last = []
for (let i = 0x0300; i <= 0x036F; i++) {
  const char = String.fromCharCode(i);
  last.push(char)
}
console.log(last)
function randomNumber(range) {
  r = Math.floor(Math.random() * range);
  return r;
};
function zalgo(text, level) {
  result = ""
  for (var l in text) {
    result = result + text[l];
    for (var i = 0; i <= level; i++) {
      result = result + last[randomNumber(last.length)];
    }
  }
  return result;
}
console.log(zalgo("", 10))