const envelope = require('../../models/response');

module.exports = function(app, db) {
  // Handling route for GET method
  app.get('/reference/:level1/:level2', (req, res) => {
    let schema = "core";
    let table = `reference_${req.params.level1}_${req.params.level2}`;
    let model = require('../../models/core/reference')(db, schema, table);

    model.findAll().then(data => {
      res.send(new envelope(data, 0));
    }).catch(function (e) {
      res.send(new envelope(e, 1));
    });
  });
};