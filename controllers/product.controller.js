const Product = require('../schemas/product.schema');

async function getProducts (req, res) {
    const productDB = await Product.find();
    console.log(productDB);
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
        console.log(error);
        res.status(400).send('Error al agregar producto')
    }
}

async function delProduct (req, res) {
    try {
        console.log(req.params.id);
        const id = req.params.id;
        const deletedProduct = await Product.findByIdAndDelete(id);
        if(!deletedProduct) return res.status(404).send(`El id ${id} no se ha encontrado`);
        return res.status(200).send('Usuario borrado');
    } catch (error) {
        console.log(error);
        res.status(400).send('Error al borrar usuario');
    }
}

module.exports = {
    getProducts,
    addProduct,
    delProduct
}