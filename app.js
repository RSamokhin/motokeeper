var serve = require('koa-static');
var route = require('koa-route');
var koa = require('koa');
var bodyParser = require('koa-body-parser');
var app = koa();
var fs = require('fs');
var sendmail = require('sendmail')();

app.use(serve('web/build/'));


app.use(bodyParser());

app.use(route.post('/task', function *(){
    var req = this.request.body,
        email = 'motokeeper@mail.ru',
        from = 'taskmail@motokeeper.ru',
        task = '';
    req.date = new Date();
    task = JSON.stringify(req,null,2);
    sendmail({
        from: from,
        to: email,
        subject: 'ЗАЯВКА',
        content: task
    }, function(err, reply) {
        console.log(err && err.stack);
        fs.appendFile('./../message.txt', task, function (err) {
            console.log('err')
        });
        console.dir(reply);
    });


    this.body = 'OK';
}));

app.listen(3000);

console.log('static');