// src/pages/Products.jsx
import Layout from "../components/Layout";
import { Edit2, Trash2, Plus, Image } from "lucide-react";
import { useEffect, useState } from "react";
import Loder from "../components/Loder";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createProductByAdmin, editProduct, getAllProducts, updateProductByAdmin } from "../feature/admin/adminSlice";

const inputClass =
  "w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none";

const Products = () => {

  const [formData, setFormData] = useState({
    _id: "",
    name: "",
    description: "",
    salePrice: "",
    originalPrice: "",
    stock: "",
    category: "",
    size: "",
    image: ""
  })


  const { name, description, salePrice, originalPrice, stock, category, size, image } = formData

  const handleChange = (e) => {
    if (e.target.name === "image") {
      const file = e.target.files[0]
      if (file) {
        setFormData({ ...formData, [e.target.name]: file })
      }
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value })
    }
  }

  const handleUpdateProduct = product => {
    dispatch(editProduct(product))
  }


  const handleSubmit = (e) => {
    e.preventDefault()

    // Create FormData object for file upload
    const formDataToSend = new FormData()
    formDataToSend.append('name', name)
    formDataToSend.append('description', description)
    formDataToSend.append('salePrice', salePrice)
    formDataToSend.append('orignalPrice', originalPrice)
    formDataToSend.append('stock', stock)
    formDataToSend.append('category', category)
    formDataToSend.append('size', size)
    formDataToSend.append('image', image) // This is the File object


    !productEdit.isEdit ? 
    // Add Product
    dispatch(createProductByAdmin(formDataToSend)): 
    // Update Product 
    dispatch(updateProductByAdmin(formData))


    setFormData({
      _id: "",
      name: "",
      description: "",
      salePrice: "",
      originalPrice: "",
      stock: "",
      category: "",
      size: "",
      image: ""
    })
  }



  const { user } = useSelector((state) => state.auth);

  const { adminIsLoading, adminIsError, adminMessage, allProducts, productEdit } = useSelector((state) => state.admin);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.isAdmin) navigate("/");

    // API FETCH
    if(user?.isAdmin){
      dispatch(getAllProducts());
    }


    if (adminIsError && adminMessage) toast.error(adminMessage, { position: "top-center" });

    setFormData(productEdit.product)


  }, [user, adminIsError, adminMessage, dispatch, navigate, productEdit]);

  if (adminIsLoading) return <Loder loadingMessage="Loading Products..." />;

  return (
    <Layout activeMenu="products" pageTitle="Products">
      <div className="space-y-10">

        {/* ADD PRODUCT CARD */}
        <div className="bg-white rounded-2xl shadow border">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold text-gray-800">
              Add / Update Product
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <input name="name" value={name} onChange={handleChange} placeholder="Product Name" className={inputClass} />

              <select name="category" value={category} onChange={handleChange} className={inputClass}>
                <option value="">Select Category</option>
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Accessories">Accessories</option>
                <option value="Shoes">Shoes</option>
                <option value="Bags">Bags</option>
              </select>

              <select name="size" value={size} onChange={handleChange} className={inputClass}>
                <option>Select size</option>
                <option value={'sm'}>Small (sm)</option>
                <option value={'md'}>Medium (md)</option>
                <option value={"lg"}>Large (lg)</option>
                <option value={"xl"}>Xtra Large (xl)</option>
                <option value={"2xl"}>2Xtra Large (2xl)</option>
                <option value={"3xl"}>3Xtra Large (3xl)</option>

              </select>

              <input name="originalPrice" value={originalPrice} onChange={handleChange} type="number" placeholder="Original Price" className={inputClass} />
              <input name="salePrice" value={salePrice} onChange={handleChange} type="number" placeholder="Sale Price" className={inputClass} />
              <input name="stock" value={stock} onChange={handleChange} type="number" placeholder="Stock Quantity" className={inputClass} />
            </div>

            <textarea
              name="description"
              value={description}
              onChange={handleChange}
              rows={4}
              placeholder="Product Description"
              className={inputClass}
            />

            {/* IMAGE UPLOAD */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Product Image
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-violet-500 transition-colors">
                <Image className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-sm text-gray-600 mb-2">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-500">PNG, JPG, WEBP up to 5MB</p>
                <input
                  name='image'
                  accept="image/png,image/jpeg,image/webp"
                  onChange={handleChange} type="file" className="" />
              </div>
            </div>


            <button className="px-6 py-2 bg-emerald-600 text-white rounded-xl flex items-center gap-2 hover:bg-emerald-700">
              <Plus size={18} /> {
                !productEdit.isEdit ? "Save Product" : "update Product"
              }
            </button>
          </form>
        </div>

        {/* PRODUCT TABLE */}
        <div className="bg-white rounded-2xl shadow border overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr className="text-left text-sm font-semibold text-gray-600">
                {["Image", "Name", "Category", "Size", "Price", "Sale", "Stock", "Status", "Actions"].map(h => (
                  <th key={h} className="p-4">{h}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              {allProducts.map((product) => (
                <tr key={product._id} className="border-t hover:bg-gray-50">
                  <td className="p-4">
                    <img src={product.image} className="w-14 h-14 rounded-lg object-cover" />
                  </td>

                  <td className="p-4 font-medium">{product.name}</td>
                  <td className="p-4">{product.category}</td>
                  <td className="p-4">{product.size}</td>
                  <td className="p-4">₹{product.orignalPrice}</td>
                  <td className="p-4 text-emerald-600">₹{product.salePrice}</td>
                  <td className="p-4">{product.stock}</td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold
                      ${product.stock > 0
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"}`}
                    >
                      {product.stock > 0 ? "In Stock" : "Out of Stock"}
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="flex gap-2">
                      <button onClick={() => handleUpdateProduct(product)} className="p-2 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100">
                        <Edit2 size={16} />
                      </button>
                      <button className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </Layout>
  );
}

export default Products;
