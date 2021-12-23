const { multipleMongooseToObject } = require("../util/mongoose");
const { mongooseToObject } = require("../util/mongoose");
const User = require("../models/user");
const moment = require("moment");
class CustomerController {
  // [GET] users /users
  index(req, res, next) {
    User.find({}, (err, docs) => {
      if (err) {
        console.log(err);
      }
      res.render("user/users", {
        users: multipleMongooseToObject(docs),
        isUserCreated: req.session.isUserCreated,
        isUserDeleted: req.session.isUserDeleted,
        isUserUpdated: req.session.isUserUpdated,
      });
      delete req.session.isUserCreated;
      delete req.session.isUserDeleted;
      delete req.session.isUserUpdated;
    });
  }
  // [GET] /users/create
  create(req, res) {
    res.render("user/create");
  }
  // [POST] /users/store
  store(req, res) {
    var newUser = new User(req.body);
    newUser.birth = moment(newUser.birth).format("YYYY-MM-DD");
    newUser
      .save()
      .then(() => {
        req.session.isUserCreated = "true";
        res.redirect("/users");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // [POST] /users/:id/delete
  delete(req, res) {
    let id = req.params.id;
    User.findOneAndDelete({ iduser: id }, (err, doc) => {
      if (err) {
        console.log(err);
      }
      req.session.isUserDeleted = "true";
      res.redirect("/users");
    });
  }
  // [GET]
  async edit(req, res) {
    let id = req.params.id;
    User.findOne({ iduser: id }, (err, doc) => {
      if (err) {
        console.log(err);
      }
      var date = moment(doc.birth).format("YYYY-MM-DD");
      res.render("user/edit", { user: mongooseToObject(doc), date: date });
    });
  }

  update(req, res) {
    let id = req.body.id;
    let update = {
      name: req.body.name,
      birth: req.body.birth,
      address: req.body.address,
      phone: req.body.phone,
      idrole: req.body.idrole,
    };
    User.findOneAndUpdate({ iduser: id }, update, (err, doc) => {
      if (err) {
        console.log(err);
      }
      req.session.isUserUpdated = "true";
      res.redirect("/users");
    });
  }
}

module.exports = new CustomerController();
