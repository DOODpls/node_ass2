
const fs = require('fs');

const filee = function(request, response, next){

    fs.appendFile('./logs/feedbacks.log', JSON.stringify(request.body) +"\n", err => {
      if (err) throw err;
      console.log('File saved.');
    })
    next();
}

module.exports= filee;