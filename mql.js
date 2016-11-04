var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://192.168.1.1')

client.on('connect', function () {
  loop()
});

var clr = {
  red: 0,
  green: 0,
  blue: 0
}

var spd = {
  red: 0,
  green: 1.7,
  blue: 1.3
}

var max = {
  red: 128,
  green: 192,
  blue: 224
}

var min = {
  red: 0,
  green: 32,
  blue: 48
}


var chkclr = () => {

  let colors = ['red', 'green', 'blue']
  for(c in colors) {
    let color = colors[c]
    let n = clr[color]
    let p = spd[color]
    let mx = max[color]
    let mi = min[color]

    if (n + p > mx || n + p < mi) p = -p

    p = spd[color] = p
    n = clr[color] = n + p

    if(n > mx) clr[color] = mx
    if(n < mi) clr[color] = mi
  }
}

var loop = () => {

  setTimeout(() => {
    client.publish('/rvb87/lights/egg/set', JSON.stringify(clr))

    chkclr()

    console.log(clr)
    loop()
  }, 1000)
}


