const envelope = require('../../models/response');

module.exports = function(app, db) {
  const model = require('../../models/core/user')(db);

  // Handling route for GET method
  app.get('/users', (req, res) => {
    model.findAll().then(users => {
      res.send(new envelope(users, 0));
    }).catch(function (e) {
      res.send(new envelope(e, 1));
    });
  });
};