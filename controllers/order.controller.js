const Order = require('../schemas/order.schema');

async function getOrders (req, res) {
    const orderDB = await Order.find();
    
    console.log(orderDB);
    res.send(orderDB);
}

async function addOrders (req, res) {
    try {
        const order = new Order({
            product: req.body.product,
            user: req.body.user,
            state: req.body.state
        });
        const checkOrder = await Order.findOne({ user: order.user });
        if(checkOrder) return res.status(400).send('Ya tienes un pedido en curso');
        await order.save();
        res.status(200).send('El producto fue agregado con éxito');
    } catch (error) {
      console.log(error);
      res.status(400).send('El pedido no pudo agregarse')
    }
}

async function delOrder(req, res) {
    try {
        console.log(req.params.id);
        const id = req.params.id;
        const deletedOrder = await Order.findByIdAndDelete(id);
        if(!deletedOrder) return res.status(404).send(`El id ${id} no se ha encontrado`);
        return res.status(200).send('Usuario borrado');
    } catch (error) {
        console.log(error);
        res.status(400).send('Error al borrar pedido');
    }
}

async function updateOrder(req,res){
    try {
        const id = req.params.id

        const product = await Order.findById(id);
        if(!product){
            return formatMsg(res,404,`No se encontro el usuario`,false)
        }
        const update = req.body
        const productUpdate = await Order.findByIdAndUpdate(id,update,{new:true}).select({password:0})

        console.log(productUpdate);
        return res.status(200).send('producto editado')


    } catch (error) {
        res.status(400).send('error')
    }
}

module.exports = {
    getOrders,
    addOrders,
    delOrder,
    updateOrder
}