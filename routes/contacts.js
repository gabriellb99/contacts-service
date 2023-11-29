var express = require('express');
var router = express.Router();
var fakesocial = require('../services/fakeservice');

var contacts = [
  {"name": "peter", "phone": 12345},
  {"name": "john", "phone": 34645}
]

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(contacts);
});

/* POST contact  */
router.post('/', function(req, res, next) {
  var contact = req.body;
  contacts.push(contact);
  res.sendStatus(201);
});

/* GET contact/id */
router.get('/:name', async function(req, res, next) {
  var name = req.params.name;
  var result = contacts.find( c => {
    return c.name === name;
  })
  var social = await fakesocial.getSocial(name);

  if(result) {
    res.send({
      ...result,
      "social": social
    });
  } else {
    res.sendStatus(404);
  }
});

module.exports = router;
