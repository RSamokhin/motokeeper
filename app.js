var serve = require('koa-static');
var koa = require('koa');
var app = koa();

app.use(serve('web/build/'));

app.listen(3000);

console.log('static');