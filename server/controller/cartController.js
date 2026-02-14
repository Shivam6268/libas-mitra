import Product from "../model/productModel.js"
import Cart from "../model/cartModel.js"

const getCart = async (req, res) => {
     const userId = req.user._id;


    const cart = await Cart.findOne({ user: userId })
        .populate('products.product')

    if (!cart) {
        res.status(200).json({ products: [] })

    }

    res.status(200).json(cart)
}

const addCart = async (req, res) => {

    const { productId, qty = 1 } = req.body
    const userId = req.user._id


    // validate product exist

    const product = await Product.findById(productId)
    if (!product) {
        res.status(404)
        throw new Error("Product Not Found")
    }

    // ckeck if product is in stock 

    if (product.stock < qty) {
        res.status(400)
        throw new Error("Insufficient stock")
    }

    // Find user's cart 

    let cart = await Cart.findOne({ user: userId })

    if (!cart) {
        // create new cart if doesn't exist
        cart = new Cart({
            user: userId,
            products: [{ product: productId, qty }]
        })
    } else {
        // check if product already exist in cart

        const productIndex = cart.products.findIndex(
            (item) => item.product.toString() === productId
        )


        if (productIndex > -1) {
            cart.products[productIndex].qty += parseInt(qty)

            if (cart.products[productIndex].qty > product.stock) {
                res.status(400)
                throw new Error("Quqntity exceeds available stock")
            }
        } else {
            cart.products.push({ product: productId, qty })
        }

    }

    await cart.save();


    await cart.populate('products.product')


    res.status(200).json(cart)

}

const updateCart = async (req, res) => {

    const { productId, qty } = req.body
    const userId = req.user._id;


    // validate quantity 

    if (qty < 1) {
        res.status(400)
        throw new Error("Quantity must be at least 1")
    }

    // Find Cart 

    const cart = await Cart.findOne({ user: userId })

    if (!cart) {
        res.status(404)
        throw new Error("Cart Not Fond")
    }

    const productIndex = cart.products.findIndex(
        item => item.product.toString() === productId
    )

    if (productIndex === -1) {
        res.status(404)
        throw new Error("Product not found in cart")
    }

    const product = await Product.findById(productId)

    if (!product) {
        res.status(404)
        throw new Error("Product Not Found")
    }

    if (qty > product.stock) {
        res.status(400)
        throw new Error("Quantity exceeds available stock")
    }


    // update quantity
    cart.products[productIndex].qty = qty

    await cart.save()

    await cart.populate('products.product')


    res.status(200).json(cart)


}

const removeCart = async (req, res) => {
    const { productId } = req.params
    const userId = req.user._id

    const cart = await Cart.findOne({ user: userId })

    if (!cart) {
        res.status(404)
        throw new Error("Cart not found")
    }

    // Filter out the product 

    cart.products = cart.products.filter(
        item => item.product.toString() !== productId
    )

    // cart.products = cart.products.filter(
    //     item => item.product.toString() !== productId // ✅ Correct arrow function
    // );


    await cart.save()
    await cart.populate('products.product')

    res.status(200).json(cart)

}

const clearCart = async (req, res) => {
    const userId = req.user._id

    const cart = await Cart.findOne({ user: userId })

    if (!cart) {
        res.status(404)
        throw new Error("Cart Not Found")
    }

    cart.products = []

    await cart.save()

    res.status(200).json(cart)
}

const cartController = { getCart, addCart, updateCart, removeCart, clearCart }


export default cartController