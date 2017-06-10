'use strict'
 
 var http = require('http').createServer(webServer),
     form = require('fs').readFileSync('Index.html'),
     querystring= require('querystring'),
     util = require('util'),
     dataString = '',
     sys = require ('sys'),
     formidable=require('formidable'),
     execSync = 
     exec = require('child_process').exec;

   


 function webServer(req, res)
 {
    if(req.method == 'GET')
    {
    	res.writeHead(200, {'Content-Type' : 'text/html'})
        res.end(form)
    }
    
    if(req.method == 'POST')
    {
    	req
    	    .on('data', function (data){
    		 dataString += data
    	    })
    	    .on('end', function (){
    	    	var templateStirng = `Los datos que enviaste por POST como string son: ${dataString}
    	    	`
                console.log(templateStirng)
    	        res.end(templateStirng)
               
    	    })
        
            .on('end', function(){
                querystring = querystring.parse(dataString);
              console.log("Primera funcion ejecutandose");
            	exec(`hugo new site ${querystring['titulo']}` , function(error, stdout, stderr) {
                  console.log('stdout: ' + stdout);
                  console.log('stderr: ' + stderr);
                   if (error !== null) {
                       console.log('exec error: ' + error);
                       console.log(querystring['titulo']);
                   }
               });


            })
          
            .on('end', function(){
                exec(`cd ${querystring['titulo']}/ && ls` , function(error, stdout, stderr) {
                   console.log('stdout: ' + stdout);
                  console.log('stderr: ' + stderr);
                   if (error !== null) {
                       console.log('exec error: ' + error);
                       console.log("Segunda funcion ejecutandose");
      
                       
                }
                });
            })
             
    }
 }

 http.listen(3000)

 console.log('El servidor esta corriendo en http://localhost:3000/')
