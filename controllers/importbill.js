const { multipleMongooseToObject } = require('../util/mongoose');
const { mongooseToObject } = require('../util/mongoose');
const importbill = require('../models/import/import');
const importdetail = require('../models/import/import_detail');
const product= require('../models/product');
class invoiceController {
    async index(req, res) {
        var id = req.params.id;
        var items = await importdetail.find({ "idImport": id });
        console.log(items);
        var data;
        var cc;
        var listdata=[];
        await items.forEach(async item => {
            let idd= item.idProduct;
            cc=await product.find({"_id": idd});
            data = {
                idProduct: cc[0].Name,
                unitPrice: item.unitPrice,
                quantity: item.quantity,
                total: item.total
            }
            listdata.push(data);
        })
        importbill.findOne({"idImport": id}, (err,item)=>{
            console.log(listdata);
            res.render('importbill/importbill',{importdetail: listdata,importbill: mongooseToObject(item) });
        })
    }
}
module.exports = new invoiceController;