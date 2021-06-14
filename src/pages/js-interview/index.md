---
title: JS Interview
date: '2020-06-24'
spoiler: interview with miro
cta: 'interview'
tags: ["draft"]
---
var a = [{a:1}, {a:1}, {a:1}]
var b = a.filter(o => o.a === 1)

if(a[0] === b[0]) {
  console.log(1)
}

if(a === b) {
  console.log(2)
}

if(a[0].a === b[1].a) {
  console.log(3)
}








function a() {
  console.log(this)
}

console.log(a())
console.log(new a())









var cls1 = function(){};
cls1.prototype.method = function(val) {
 return val*val;
}

var cls2 = function() {
  this.method = function(val) {
  return val*val;
  }
}

var instance1 = new cls1();
var instance2 = new cls2();














new Promise((resolve) => {
  resolve();
  console.log(1);
}).then(() => console.log(4))

setTimeout(() => console.log(2))
console.log(3)

const closure = {
  a: {abc: 1},
  b: function() {
    adsaslkj;
  }
}

function closure() {
  const a;
  
}

