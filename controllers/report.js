const invoice = require('../models/pos/invoice');
const order = require('../models/pos/order');
const order_detail = require('../models/pos/order_detail');
const product = require('../models/product');
const typeproduct = require('../models/typeproduct');
class reportController {
    async index(req, res) {
        res.render('report/report');
    }
    async dayyyy(req,res){
        let days7=[];
        let data_money=[];
        let a = new Date();
        a = a.getFullYear() + '-' + (a.getMonth() + 1) + '-' + a.getDate();
        for (let i=6; i>=0; i--){
            let date_now = new Date(a);
            let date_7= new Date(date_now);
            date_7.setDate(date_7.getDate() - i);
            let datee= new Date(date_7);
            datee.setDate(datee.getDate() +1);
            let data=[];
            data  = await invoice.find({ createAt: { $gte: date_7, $lte: datee } }).
            sort({ createAt: 1 });
            let ngay=  date_7.getDate()+ '-'  +  (date_7.getMonth() + 1); 
            let tg=0;
            for (let j=0; j<data.length; j++){
                tg=tg+data[j].total_payment;
            }
            days7.push(ngay);
            data_money.push(tg);
        }
        console.log(days7);
        console.log(data_money);
        res.json({days7: days7, data_money: data_money});
    }
    async getdata(req, res) {
        let data = [];
        let list_typeproduct = [];
        let list_counttypeproduct = [];
        let list_product = [];
        let list_idorderdetail = [];
        let list_order = [];
        let date_start = req.body.date_start;
        let date_end = req.body.date_end;
        //--------------------------------
        list_product = await product.find({});
        list_typeproduct = await typeproduct.find({});
        for (var i = 0; i < list_typeproduct.length; i++) {
            list_counttypeproduct.push(0);
        }
        data = await invoice.find({ createAt: { $gte: date_start, $lte: date_end } }).
            sort({ createAt: 1 });
        for (var i = 0; i < data.length; i++) {
            let orderr = await order.find({ "idOrder": data[i].idOrder });
            list_order.push(orderr);
        }
        for (var i = 0; i < data.length; i++) {
            let order_detaill = await order_detail.find({ "idOrder": data[i].idOrder });
            list_idorderdetail.push(order_detaill);
        }
        for (var i = 0; i < list_idorderdetail.length; i++) {
            for (var h = 0; h < list_idorderdetail[i].length; h++) {
                for (var j = 0; j < list_product.length; j++) {
                    for (var k = 0; k < list_typeproduct.length; k++) {
                        let idProduct_order = String(list_idorderdetail[i][h].idProduct) ;
                        let idProduct_product =String(list_product[j]._id);
                        let idType_product = list_product[j].idType;
                        let idType_type = list_typeproduct[k].idType;

                        if (( idProduct_order == idProduct_product) && (idType_type == idType_product)) {
                            list_counttypeproduct[k] =  list_counttypeproduct[k] + list_idorderdetail[i][h].quantity;
                        }
                    }
                }
            }
        }
    res.json({data_count: list_counttypeproduct, data_type: list_typeproduct});
    }
}
module.exports = new reportController;