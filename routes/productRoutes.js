import express from "express";
const app = express();
import {createProduct, getAllProducts,
    getSingleProduct, updateProduct,
    deleteProduct, uploadImage} from '../controllers/productController.js'
import {authenticateUser,authorizePermissions} from "../middleware/authentication.js"

app.route('/')
    .post([authenticateUser,authorizePermissions('admin')],createProduct)
    .get(getAllProducts);

app.route('/uploadImage')
.post([authenticateUser,authorizePermissions('admin')],uploadImage);

app.route('/:id')
.get(getSingleProduct)
.patch([authenticateUser,authorizePermissions('admin')],updateProduct)
.delete([authenticateUser,authorizePermissions('admin')],deleteProduct);

export default app