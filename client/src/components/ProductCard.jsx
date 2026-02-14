import React from 'react'
import { Eye } from 'lucide-react';
import { Link } from "react-router-dom"

const ProductCard = ({ product }) => {

    let discount = parseInt(((product.orignalPrice - product.salePrice) / product.orignalPrice) * 100)

    return (
        <div key={product.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
            <div
                className="relative h-96 bg-cover bg-center overflow-hidden"
                style={{ backgroundImage: `url(${product.image})` }}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="absolute top-4 left-4 bg-violet-100 text-violet-700 text-xs font-semibold px-3 py-1 rounded-full">
                    Get {discount}% Discount
                </span>
            </div>

            <div className="p-5">
                <h3 className="font-bold text-neutral-900 mb-1">{product.name}</h3>
                <p className="text-2xl font-bold text-neutral-900 mb-4">₹{product.salePrice}</p>
                <div className="flex gap-2">
                    <Link to={`/collections/${product._id}`} className="flex-1 text-center bg-gradient-to-r from-violet-600 to-purple-600 text-white py-2.5 rounded-xl font-medium hover:from-violet-700 hover:to-purple-700 transition-all">
                        Try Now
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ProductCard