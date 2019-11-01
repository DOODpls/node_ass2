const express = require('express');
const path = require('path');
const pageContent = require('./pageContent')
const aaa = require('./logrender')
const fs = require('fs');

const app = express();

app.set('view engine','ejs');

app.use(express.urlencoded({ extended: false }))

app.get('/', function(request, response){
  response.render('index', pageContent.index)
})

app.get('/:page', function(request, response){
  response.render(request.params.page,pageContent[request.params.page]);

})

app.use(function (err, request, response, next) {
  console.error(err.stack)
  response.status(404).render('notfound');
})

app.use('/sent', aaa);

app.post('/sent', function(request, response){
 
  const name = request.body.name;
  const email = request.body.mail;
  const commt = request.body.comment;

  var obj = {namee: name, maile: email, comment: commt}
  response.render("sent", obj)
  // response.render('sent', pageContent.sent)
  // console.log(request.body)

  // fs.appendFile('./assets/feedbacks.txt', JSON.stringify(request.body)+"\n", err => {
  //   if (err) throw err;
  //   console.log('File saved.');
  // })
})

app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'logs')));


const PORT = process.env.PORT || 3000;

app.listen(PORT, function(){
  console.log(`Listening on PORT ${PORT}`)
})