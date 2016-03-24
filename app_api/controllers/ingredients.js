var mongoose = require('mongoose');
var Rec = mongoose.model('Recipe');

var doAddIngredient = function(req, res, recipe) {
  if (!recipe) {
    sendJsonResponse(res, 404, {
      "message": "recipeid not found"
    });
  } else {
    recipe.ingredients.push({
      name: req.body.name,
      measure: req.body.measure,
      quantity: req.body.quantity
    });
    recipe.save(function(err, recipe) {
      var thisIngredient;
        if (err) {
          sendJsonResponse(res, 400, err);
        } else {
          thisIngredient = recipe.ingredients[recipe.ingredients.length - 1];
          sendJsonResponse(res, 201, thisIngredient);
        }
      });
  }
};

var sendJsonResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.ingredientsCreate = function (req, res) { 
  var recipeid = req.params.recipeid;
  if (recipeid) {
  Rec
    .findById(recipeid)
    .select('ingredients')
    .exec(
      function(err, recipe) {
        if (err) {
          sendJsonResponse(res, 400, err);
        } else {
          doAddIngredient(req, res, recipe);
        }
      }
    );
  } else {
    sendJsonResponse(res, 404, {
    "message": "Not found, recipeid required"
  });
  }
};


module.exports.ingredientsReadOne = function (req, res) { };
module.exports.ingredientsUpdateOne = function (req, res) { };
module.exports.ingredientsDeleteOne = function (req, res) { };
