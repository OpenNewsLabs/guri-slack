
const app = require('express')();
const bodyParser = require('body-parser');
const axios = require('axios');
const nlp = require('./nlp');

app.use(bodyParser());

app.post('/', (req, res, next) => {
  try {
    var body = nlp(req.body.text.replace('“', '"'));

    axios
    .post('https://gurivr.com/api/stories', {
      title: req.body.channel_name,
      body: body,
      text: req.body.text  
    })
    .then(response => res.send(`Your scene is ready! check it out at https://s3.amazonaws.com/gurivr/s/${response.data._id}.html`))
    .catch(err => res.send('Ups! there was an error while creating the scene. Check out the guide at https://gurivr.com/guide.'))

  } catch(err) {
    return res.send(`Ups! there was an error while creating the scene. Check out the guide at https://gurivr.com/guide.`)
  }
});

app.listen();
