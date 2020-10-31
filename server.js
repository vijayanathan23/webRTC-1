const express = require('express');
const app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var users = 0;
var test = '/test1';
var mediaFlag=0;
var nsp = io.of(test);//creating a name-space
nsp.on('connection',function(abc){
        console.log('user connected');
        users++;
        console.log(users);
        abc.on('gotMedia',function()
        {
            mediaFlag++;
            if(users==2 && mediaFlag==2)
        {
            console.log('Emitting ');
            nsp.emit('connected');
        }
            console.log('Got media '+mediaFlag);
        });
        nsp.emit('callerNum',users);
        
        // Reference-1
        // abc.broadcast.broadcast.emit('Hii', 'hello friends!');
        abc.on('candidate', function (event)
        {
            abc.broadcast.emit('candidate', event);
        });
        abc.on('offer', function(event)
        {
            abc.broadcast.emit('offer',event.sdp);
        });
        abc.on('answer', function(event)
        {
            abc.broadcast.emit('answer',event.sdp);
        });

        abc.on('disconnect',function(bc)    
        {
            console.log('user disconnected');
            users--;
            console.log(users);
        });

});



//serving a webpage for the http request
app.get(test,res);
function res(req,res)
{
    res.sendfile('page1.html');
}


//starting server at port 3000
http.listen(port,function(){
    console.log('server serving');
});