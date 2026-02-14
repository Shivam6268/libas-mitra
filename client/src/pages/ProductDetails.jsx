import { Eye, ShoppingCart, Check } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct, getProductAllReviews } from '../feature/products/productSlice';
import { toast } from 'react-toastify';
import Loder from '../components/Loder';
import { useNavigate, useParams } from 'react-router-dom';
import { addItemToCart } from '../feature/cart/cartSlice';
import ProductReviews from '../components/ProductReview';
import AddReviews from '../components/AddReviews';
import { tryCloths } from '../feature/virtualTry/VirtualTrySlice';

const ProductDetails = () => {

  const { user } = useSelector(state => state.auth)
  const {
    product,
    productReviews,
    productLoading,
    productError,
    productErrorMessage
  } = useSelector(state => state.product)

  const { virtualTry, virtualTryLoading, virtualTrySuccess, virtualTryError, virtualTryErrorMessage } = useSelector(state => state.virtualTry)

  const [formData, setFormData] = useState({
    person_url: "",
    cloth_url: product.image,
    garment_des: product.description
  })

  const { person_url } = formData



  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { pid } = useParams()



  // handle change 

  const handleChange = (e) => {
    if (e.target.name === "person_url") {
      const file = e.target.files[0]
      if (file) {
        setFormData({ ...formData, person_url: file })
      }
    }
  }

  // handle submit 

  const handleSubmit = (e) => {
    e.preventDefault()

    const formDataToSend = new FormData()
    formDataToSend.append('person_url', person_url)
    formDataToSend.append('cloth_url', product.image)
    formDataToSend.append('garment_des', product.description)

    dispatch(tryCloths(formDataToSend))
  }



  const handleAddToCart = (cartData) => {
    dispatch(addItemToCart(cartData))
    navigate("/auth/cart")
  }

  useEffect(() => {

    if (pid) {
      dispatch(getProduct(pid))
      dispatch(getProductAllReviews(pid))
    }

    if (virtualTrySuccess) {
      toast.success("Looking Great!", { position: "top-center" })
    }

    if (productError && productErrorMessage || virtualTryError && virtualTryErrorMessage) {
      toast.error(productErrorMessage, { position: "top-center" })
    }

  }, [productError, productErrorMessage, pid])


  if (productLoading || virtualTryLoading) {
    return (
      <Loder loadingMessage={"Product Loading...."} />
    )
  }

  const customStyle = {
    backgroundImage: virtualTry ? `url(${virtualTry?.output_url})` : `url(${product.image})`,
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <nav className="text-sm text-gray-600 mb-6">
          <span>Home</span> <span className="mx-2">/</span>
          <span>Collections</span> <span className="mx-2">/</span>
          <span className="text-neutral-900 font-medium">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="bg-white rounded-3xl shadow-lg p-4 mb-4">
              <div style={customStyle} className="aspect-[3/4] bg-gray-200 relative bg-center bg-cover"></div>
            </div>

          </div>

          <div>
            <div className="mb-6">
              <span className="inline-block bg-violet-100 text-violet-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
                Dresses
              </span>
              <h1 className="text-4xl font-bold text-neutral-900 mb-4">{product.name}</h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-yellow-400">
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>☆</span>
                </div>
                <span className="text-sm text-gray-600">(127 reviews)</span>
              </div>
              <p className="text-4xl font-bold text-neutral-900 mb-6">₹{product.salePrice}</p>
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-semibold text-neutral-900 mb-3">Available SIze</h3>
              <div className="flex gap-3">
                <button className="px-6 py-3 border-2 border-violet-600 bg-violet-50 text-violet-600 rounded-xl text-sm font-medium">{product?.size?.toUpperCase()}</button>

              </div>
            </div>
            <div className="flex gap-4 mb-8">
              <button onClick={() => handleAddToCart({ productId: product._id, qty: 1 })} className="cursor-pointer flex-1 border-2 border-neutral-900 text-neutral-900 py-4 rounded-xl font-semibold hover:bg-neutral-900 hover:text-white transition-all">
                Add to Cart
              </button>
            </div>


            {/* form  */}

            <form onSubmit={handleSubmit} encType="multipart/form-data" >
              <div className="bg-gradient-to-br from-violet-50 to-purple-50 border-2 border-violet-300 rounded-3xl p-6 mb-8">
                <div className="text-center mb-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-violet-100 rounded-2xl mb-4">
                    <svg className="w-8 h-8 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-2">Upload Your Photo for Virtual Try-On</h3>
                  <p className="text-sm text-gray-600 mb-6">Front-facing photo works best for accurate results</p>
                </div>

                <div className="bg-white border-2 border-dashed border-violet-300 rounded-2xl p-8 mb-4 text-center hover:border-violet-500 transition-colors cursor-pointer">
                  <input required onChange={handleChange} name='person_url' type="file" accept="image/png,image/jpeg,image/webp" className="" id="upload-photo" />
                  <label htmlFor="upload-photo" className="cursor-pointer">
                    <svg className="w-12 h-12 text-violet-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="text-sm font-medium text-neutral-900 mb-1">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                  </label>
                </div>




                <div className="flex gap-3">
                  <button type='submit' className="flex-1 bg-gradient-to-r from-violet-600 to-purple-600 text-white py-3.5 rounded-xl font-semibold hover:from-violet-700 hover:to-purple-700 transition-all shadow-md">
                    Upload & Try Virtually
                  </button>
                </div>
              </div>
            </form>


            <div className="bg-white rounded-3xl shadow-md p-6 mb-8">
              <h3 className="text-lg font-bold text-neutral-900 mb-4">Product Details</h3>
              <div className="space-y-3">
                <div className="flex">
                  <span className="text-sm font-semibold text-gray-700 w-32">Fabric:</span>
                  <span className="text-sm text-gray-600">100% Premium Cotton</span>
                </div>
                <div className="flex">
                  <span className="text-sm font-semibold text-gray-700 w-32">Fit Type:</span>
                  <span className="text-sm text-gray-600">Regular Fit</span>
                </div>
                <div className="flex">
                  <span className="text-sm font-semibold text-gray-700 w-32">Care:</span>
                  <span className="text-sm text-gray-600">Machine wash cold, tumble dry low</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-violet-50 rounded-2xl p-4 text-center">
                <p className="text-2xl font-bold text-violet-600 mb-1">95%</p>
                <p className="text-xs text-gray-700 font-medium">AI Fit Accuracy</p>
              </div>
              <div className="bg-violet-50 rounded-2xl p-4 text-center">
                <p className="text-sm font-bold text-violet-600 mb-1">No Size</p>
                <p className="text-xs text-gray-700 font-medium">Guessing</p>
              </div>
              <div className="bg-violet-50 rounded-2xl p-4 text-center">
                <p className="text-sm font-bold text-violet-600 mb-1">Easy</p>
                <p className="text-xs text-gray-700 font-medium">Returns</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product All Reviews */}

      <ProductReviews productReviews={productReviews} />



      {/* Add Product Review */}

      {
        user && <AddReviews pid={pid} />
      }



    </div>
  )
}

export default ProductDetails;
