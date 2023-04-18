const Product = require('../schemas/product.schema');

async function getProducts (req, res) {
    const productDB = await Product.find();
    res.send(productDB);
}

async function addProduct (req, res) {
    try {
        const productToSave = new Product({
            url: req.body.url,
            name: req.body.name,
            description: req.body.description,
            info: req.body.info,
            price: req.body.price
        })
        await productToSave.save();
        res.status(200).send('El producto se agrego con exito');
    } catch (error) {
        res.status(400).send('Error al agregar producto')
    }
}

async function delProduct (req, res) {
    try {
        const id = req.params.id;
        const deletedProduct = await Product.findByIdAndDelete(id);
        if(!deletedProduct) return res.status(404).send(`El id ${id} no se ha encontrado`);
        return res.status(200).send('Usuario borrado');
    } catch (error) {
        res.status(400).send('Error al borrar usuario');
    }
}

async function updateProduct(req,res){
    try {
        const id = req.params.id

        const product = await Product.findById(id);
        if(!product){
            return formatMsg(res,404,`No se encontro el usuario`,false)
        }
        const update = req.body
        await Product.findByIdAndUpdate(id,update,{new:true}).select({password:0})
        return res.status(200).send('producto editado')
    } catch (error) {
        res.status(400).send('error')
    }
}

module.exports = {
    getProducts,
    addProduct,
    delProduct,
    updateProduct
}