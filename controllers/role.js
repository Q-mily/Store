const { multipleMongooseToObject } = require("../util/mongoose");
const { mongooseToObject } = require("../util/mongoose");
const Role = require("../models/role");
const Permission = require("../models/permission");
const RoleToPermission = require("../models/RoleToPermission");
const Regulation = require("../models/regulation");

class RoleController {
  // [GET] users
  async index(req, res, next) {
    var Roles = await Role.find({});
    var Permissions = await Permission.find({});
    var RoleToPermissions = await RoleToPermission.find({});

    //admin
    var rsAdmin = {};
    var rsStaff = {};
    var rsRegulation = [];
    RoleToPermission.find({ idrole: 1 }, (err, docs) => {
      for (var i = 0; i < docs.length; i++) {
        var per = Permissions.filter(
          (x) => x.idpermission === docs[i].idpermission
        );
        rsAdmin["check" + docs[i].idpermission] = 1;
      }
    });
    RoleToPermission.find({ idrole: 2 }, (err, docs) => {
      //Nhanvien
      for (var i = 0; i < docs.length; i++) {
        var per = Permissions.filter(
          (x) => x.idpermission === docs[i].idpermission
        );
        rsStaff["check" + docs[i].idpermission] = 1;
      }
    });

    rsRegulation = await Regulation.find();

    res.render("role/role", {
      // userrole: rs,
      peradmin: rsAdmin,
      perstaff: rsStaff,
      regulation: multipleMongooseToObject(rsRegulation),
      isUpdatedRegulation: req.session.isUpdatedRegulation,
    });
    delete req.session.isUpdatedRegulation;
  }
  // POST
  async editAdmin(req, res) {
    var IDrole = 1;
    var Admin = {};
    Admin["per1"] = req.body.admin1;
    Admin["per2"] = req.body.admin2;
    Admin["per3"] = req.body.admin3;
    Admin["per4"] = req.body.admin4;
    Admin["per5"] = req.body.admin5;
    Admin["per6"] = req.body.admin6;
    Admin["per7"] = req.body.admin7;
    Admin["per8"] = req.body.admin8;
    var rs = [];
    for (var i = 1; i <= 8; i++) {
      if (Admin["per" + i] === "on") {
        rs.push({ idrole: IDrole, idpermission: i });
      }
    }
    await RoleToPermission.deleteMany({ idrole: IDrole });

    RoleToPermission.create(rs, (err, docs) => {
      if (err) {
        console.log(err);
      }
      console.log(docs);
    });
    res.redirect("/role");
  }
  // [POST] nhanvien
  async editStaff(req, res) {
    var IDrole = 2;
    var Staff = {};
    Staff["per1"] = req.body.staff1;
    Staff["per2"] = req.body.staff2;
    Staff["per3"] = req.body.staff3;
    Staff["per4"] = req.body.staff4;
    Staff["per5"] = req.body.staff5;
    Staff["per6"] = req.body.staff6;
    Staff["per7"] = req.body.staff7;
    Staff["per8"] = req.body.staff8;
    var rs = [];
    for (var i = 1; i <= 8; i++) {
      if (Staff["per" + i] === "on") {
        rs.push({ idrole: IDrole, idpermission: i });
      }
    }
    await RoleToPermission.deleteMany({ idrole: IDrole });

    RoleToPermission.create(rs, (err, docs) => {
      if (err) {
        console.log(err);
      }
      console.log(docs);
    });
    res.redirect("/role");
  }

  async updateRegulation(req, res) {
    var value1 = req.body.value_1;
    var value2 = req.body.value_2;
    var value3 = req.body.value_3;
    Regulation.findOneAndUpdate({ idregulation: 1 }, { value: value1 }).then(
      () => {
        Regulation.findOneAndUpdate(
          { idregulation: 2 },
          { value: value2 }
        ).then(() => {
          Regulation.findOneAndUpdate(
            { idregulation: 3 },
            { value: value3 }
          ).then(() => {
            req.session.isUpdatedRegulation = "true";
            res.redirect("/role");
          });
        });
      }
    );
  }
}

module.exports = new RoleController();
