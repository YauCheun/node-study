const readline = require('readline')
const fs = require('fs')

let r1 = readline.createInterface({
  output: process.stdout,
  input: process.stdin
})

function lcQuestion(title) {
  return new Promise((resolve) => {
    r1.question(title, (answer) => {
      resolve(answer)
    })
  })
}

async function createQuestion() {
  await lcQuestion('叫我宝贝就给你看样东西')
  var str = 'I Love You'; var res = "";
  for (var y = 15; y > -15; y--) {
    var line = '';
    for (var x = -30; x < 30; x++) {
      var item = ''; if (((Math.pow((x * 0.05), 2) + Math.pow((y * 0.1), 2) - 1) ** 3 - Math.pow((x * 0.05), 2) * Math.pow((y * 0.1), 3)) <= 0) {
        let index = (x - y) % str.length;
        if (index < 0) {
          index = index + str.length;
        }
        item = str[index];
      } else {
        item = ' ';
      }
      line += item;
    }
    res = res + line + "\n";
  }
  console.log(res);
  r1.close()
}
createQuestion()

r1.on('close',()=>{
  process.exit(0)
})