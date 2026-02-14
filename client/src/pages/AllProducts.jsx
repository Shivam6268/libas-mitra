import { SlidersHorizontal } from 'lucide-react';
import ProductCard from "../components/ProductCard"
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Loder from '../components/Loder';
import { getAllProducts } from '../feature/products/productSlice';

const AllProducts = () => {

  // filtering

  const [category, setCategory] = useState("")
  const [price, setPrice] = useState("")
  const [sort, setSort] = useState("")


  const { products, productLoading, productError, productErrorMessage } = useSelector(state => state.product)
  const dispatch = useDispatch()


  useEffect(() => {

    // Api's call 

    dispatch(getAllProducts())

    if (productError && productErrorMessage) {
      toast.error(productErrorMessage, { position: "top-center" })
    }

  }, [productError, productErrorMessage])

  if (productLoading) {
    return (
      <Loder loadingMessage={"Products Loading...."} />
    )
  }




  return (
    <div className="min-h-screen mt-12 bg-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
          <h2 className="text-2xl font-light text-slate-900">Collection</h2>

          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500">
              <option>All Categories</option>
              <option>Shirt</option>
              <option>T-shirt</option>
              <option>Hoodie</option>
              <option>Shoes</option>
            </select>

            <select value={price} onChange={(e) => setPrice(e.target.value)} className="px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500">
              <option>All Prices</option>
              <option>Under ₹500</option>
              <option>₹500 - ₹1000</option>
              <option>Over ₹1000</option>
            </select>

            <select value={sort} onChange={(e) => setSort(e.target.value)} className="px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500">
              <option>Sort by</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>

            <button className="p-2.5 bg-white border border-gray-200 rounded-lg hover:bg-stone-50 transition-colors">
              <SlidersHorizontal className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {
            products.map(product => <ProductCard key={product._id} product={product} id={product._id} />)
          }
        </div>
      </div>
    </div>
  );
}

export default AllProducts;
