const upload = require('../services/s3');
const ProductHandler = require('../services/productHandler');
const Multer = require('multer');

const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
      fileSize: 25 * 1024 * 1024, // no larger than 5mb, you can change as needed.
    },
  });

module.exports = (app) => {
    app.get('/api/my_products', async (req, res) => {
        const myProducts = ProductHandler.get_user_products(req.body.userId)
        res.send(myProducts);
    });

    app.get('/api/products', async (req, res) => {
        const products = await ProductHandler.get_all_products();
        res.send(products);
    });

    app.post('/api/new_product', multer.single('image'), async (req, res) => {
        console.log(req.file.metadata);
        const product = await new ProductHandler(req.body, req.file, false).insert()
        res.send(product);
    });

    app.put('/api/add_image_to_product', multer.single('image'), async (req, res) => {
        const product = await new ProductHandler(req.body, req.file, false).add_image()
        res.send(product);
    });

    app.put('/api/add_comment_to_product', async (req, res) => {
        console.log(req.body);
        const product = await new ProductHandler(req.body, '', false).add_comment()
        res.send(product);
    });

    app.put('/api/update_product', async (req, res) => {
        console.log(req.body);
        const product = await new ProductHandler(req.body, '', false).update()
        res.send(product);
    });

    app.put('/api/update_product', async (req, res) => {
        console.log(req.body);
        const product = await new ProductHandler(req.body, '', false).update()
        res.send(product);
    });

    app.put('/api/user_likes_product', async (req, res) => {
        console.log(req.body);
        const product = await new ProductHandler(req.body, '', false).user_likes_product()
        res.send(product);
    });

    app.put('/api/user_dislikes_product', async (req, res) => {
        console.log(req.body);
        const product = await new ProductHandler(req.body, '', false).user_dislikes_product()
        res.send(product);
    });
}