import { Sparkles } from 'lucide-react'
import React from 'react'

const Footer = () => {
    return (
        <footer className="bg-white py-12 border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                            <Sparkles className="w-6 h-6 text-emerald-500" />
                            <span className="text-xl font-bold text-slate-900">Meta Fashion</span>
                        </div>
                        <p className="text-gray-700">Redefining luxury fashion through innovative virtual try-on technology.</p>
                    </div>
                    <div>
                        <h4 className="text-slate-900 font-semibold mb-4">Shop</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-700 hover:text-emerald-500">New Arrivals</a></li>
                            <li><a href="#" className="text-gray-700 hover:text-emerald-500">Collections</a></li>
                            <li><a href="#" className="text-gray-700 hover:text-emerald-500">Virtual Try-On</a></li>
                            <li><a href="#" className="text-gray-700 hover:text-emerald-500">Sale</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-slate-900 font-semibold mb-4">Support</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-700 hover:text-emerald-500">Contact Us</a></li>
                            <li><a href="#" className="text-gray-700 hover:text-emerald-500">Size Guide</a></li>
                            <li><a href="#" className="text-gray-700 hover:text-emerald-500">Shipping</a></li>
                            <li><a href="#" className="text-gray-700 hover:text-emerald-500">Returns</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-slate-900 font-semibold mb-4">Company</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-700 hover:text-emerald-500">About Us</a></li>
                            <li><a href="#" className="text-gray-700 hover:text-emerald-500">Sustainability</a></li>
                            <li><a href="#" className="text-gray-700 hover:text-emerald-500">Careers</a></li>
                            <li><a href="#" className="text-gray-700 hover:text-emerald-500">Press</a></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-200 pt-8 text-center">
                    <p className="text-gray-500">© 2026 Meta Fashion. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer