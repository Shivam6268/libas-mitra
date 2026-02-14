import { Eye } from "lucide-react";
import man from "../assets/manClothing.jpg";
import hoodie from "../assets/hoodies.jpeg";
import superHero from "../assets/superHero.jpg";
import woman from "../assets/womanCloths.jpeg";

const ClothesCollection = [
  { id: 1, text: "Men", image_url: man },
  { id: 2, text: "Women", image_url: woman },
  { id: 3, text: "Hoodies", image_url: hoodie },
  { id: 4, text: "SuperHero", image_url: superHero },
];

const FeaturedCategory = () => {
  return (
    <div className="grid md:grid-cols-4 gap-8">
      {ClothesCollection.map((item) => (
        <div key={item.id} className="group cursor-pointer">
          <div
            className="relative h-96 rounded-xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-all mb-4 bg-cover bg-center"
            style={{ backgroundImage: `url(${item.image_url})` }}
          >
            {/* Virtual Try Icon */}
            <div className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
              <Eye className="w-5 h-5 text-emerald-500" />
            </div>
          </div>

          <h3 className="text-xl font-semibold text-slate-900 text-center">
            {item.text}
          </h3>
        </div>
      ))}
    </div>
  );
};

export default FeaturedCategory;
