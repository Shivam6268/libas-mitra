import { Sparkles, Eye, Leaf, Star } from 'lucide-react';
import FeaturedCategory from "../components/FeaturedCategory"
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import virtualImage from "../assets/virtualImage.webp"


const Home = () => {


    const { user, isLoading, isSuccess, isError, message } = useSelector(state => state.auth)

    const navigate = useNavigate()

    useEffect(() => {

        if (!user) {
            navigate("/login")
        }

        if (isError && message) {
            toast.error(message, { position: "top-center" })
        }

    }, [user, isError, message])


    if (isLoading) {
        return (
            <h1 className="text-center my-10">Loading...</h1>
        )
    }


    return (
        <div className="min-h-screen bg-stone-100">

            <section className="relative bg-white py-20 md:py-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 leading-tight">
                                Experience Fashion Before You Buy
                            </h1>
                            <p className="text-xl text-gray-700 leading-relaxed">
                                Revolutionary Virtual Try-On technology that brings the boutique experience to your screen. See yourself in luxury fashion, instantly.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button className="px-8 py-4 bg-emerald-500 text-white font-semibold rounded-lg shadow-lg hover:bg-emerald-600 transition-all">
                                    Try Now
                                </button>
                                <button className="px-8 py-4 bg-slate-900 text-white font-semibold rounded-lg shadow-lg hover:bg-slate-800 transition-all">
                                    Explore Collection
                                </button>
                            </div>
                        </div>
                        <div
                            className="relative h-96 md:h-[600px] rounded-2xl shadow-2xl overflow-hidden bg-no-repeat bg-center bg-cover"
                            style={{ backgroundImage: `url(${virtualImage})` }}
                        >
                        </div>

                    </div>
                </div>
            </section>

            <section className="py-20 bg-stone-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Why Meta Fashion</h2>
                        <p className="text-xl text-gray-700">The future of luxury shopping is here</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                                <Eye className="w-8 h-8 text-emerald-500" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">Virtual Try-On</h3>
                            <p className="text-gray-700 leading-relaxed">
                                See how garments look on you with our advanced AI-powered virtual try-on technology. No guesswork, just perfect fit visualization.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                                <Sparkles className="w-8 h-8 text-emerald-500" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">AI Fit Preview</h3>
                            <p className="text-gray-700 leading-relaxed">
                                Our intelligent sizing algorithm predicts the perfect fit based on your measurements and preferences. Shop with confidence.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                                <Leaf className="w-8 h-8 text-emerald-500" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">Sustainable Fashion</h3>
                            <p className="text-gray-700 leading-relaxed">
                                Reduce returns and environmental impact. Buy only what truly fits and flatters. Fashion that cares for our planet.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Curated Collections</h2>
                        <p className="text-xl text-gray-700">Timeless pieces, modern technology</p>
                    </div>

                    {/* currented collection */}

                    <FeaturedCategory />
                </div>
            </section>

            <section className="py-20 bg-slate-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">What Our Customers Say</h2>
                        <p className="text-xl text-gray-300">Join thousands of satisfied fashion enthusiasts</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                name: "Sophia Chen",
                                role: "Fashion Blogger",
                                text: "The virtual try-on feature is revolutionary. I can finally see how clothes look before buying. No more returns!"
                            },
                            {
                                name: "Marcus Johnson",
                                role: "Creative Director",
                                text: "Meta Fashion combines luxury with technology seamlessly. The AI fit preview saved me so much time and disappointment."
                            },
                            {
                                name: "Isabella Rodriguez",
                                role: "Entrepreneur",
                                text: "Sustainable, stylish, and smart. This is the future of online shopping. I'm never going back to traditional e-commerce."
                            }
                        ].map((testimonial, index) => (
                            <div key={index} className="bg-slate-800 p-8 rounded-xl">
                                <div className="flex items-center mb-4">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star key={star} className="w-5 h-5 text-emerald-500 fill-emerald-500" />
                                    ))}
                                </div>
                                <p className="text-gray-300 leading-relaxed mb-6 italic">"{testimonial.text}"</p>
                                <div>
                                    <p className="text-white font-semibold">{testimonial.name}</p>
                                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
}

export default Home;
