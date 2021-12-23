const mongoose = require('mongoose');
const Role = require('../../models/role');
const Permission = require('../../models/permission');
const RoleToPermission = require('../../models/RoleToPermission');
const User = require('../../models/user');
const Regulation = require('../../models/regulation');
async function InitRole() {
    var check = await Role.find({});
    if (check.length == 0) {
        Role.create(
            [{ name: 'Admin' },
            { name: 'Staff' }],
            (err, docs) => {
                if (err) {
                    console.log(err);
                }
                console.log(docs);
            }
        );
        Permission.create(
            [
                { name: 'Quản lý sản phẩm' },
                { name: 'Quản lý khách hàng' },
                { name: 'Quản lý nhà cung cấp' },
                { name: 'Quản lý nhập hàng' },
                { name: 'Quản lý nhân viên' },
                { name: 'Quản lý bán hàng' },
                { name: 'Quản lý quy định' },
                { name: 'Xem báo cáo' }
            ],
            (err, docs) => {
                if (err) {
                    console.log(err);
                }
                console.log(docs);
            }
        );
        RoleToPermission.create(
            [
                { idrole: 1, idpermission: 1 }, // admin
                { idrole: 1, idpermission: 2 },
                { idrole: 1, idpermission: 3 },
                { idrole: 1, idpermission: 4 },
                { idrole: 1, idpermission: 5 },
                { idrole: 1, idpermission: 6 },
                { idrole: 1, idpermission: 7 },
                { idrole: 1, idpermission: 8 },

                { idrole: 2, idpermission: 1 }, // staff
                { idrole: 2, idpermission: 2 },
                { idrole: 2, idpermission: 3 },
                { idrole: 2, idpermission: 4 },
                { idrole: 2, idpermission: 5 },
                { idrole: 2, idpermission: 6 },
                { idrole: 2, idpermission: 7 }           
            ],
            (err, docs) => {
                if (err) {
                    console.log(err);
                }
                console.log(docs);
            }
        )
        Regulation.create([
            { name: 'Số lượng nhập tối thiểu', value: 50 },
            { name: 'Số lượng tồn tối đa', value: 400 },
            { name: 'Lợi nhuận % trên sản phẩm', value: 130 }
        ], (err, docs) => {
            if (err) {
                console.log(err);
            }
            console.log(docs);
        }
        );
        console.log("Excute Init");
    }
}

async function connect() {

    try {
        await mongoose.connect('mongodb://localhost:27017/store');
        console.log('connect successfully.')
        await InitRole();
    } catch (error) {
        console.log(error);
    }

}
module.exports = { connect };