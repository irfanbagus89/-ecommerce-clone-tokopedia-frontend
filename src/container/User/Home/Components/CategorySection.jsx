import { CardContent } from "@/components/ui/card";
import {
  Smartphone,
  MonitorPlay,
  Shirt,
  Coffee,
  ChevronRight,
  Pill,
  Baby,
  Car,
  Dumbbell,
  Home,
} from "lucide-react";
import Link from "next/link";

const categories = [
  {
    name: "Top-Up &\nTagihan",
    icon: <Smartphone className="w-6 h-6 text-blue-500" />,
  },
  {
    name: "Elektronik",
    icon: <MonitorPlay className="w-6 h-6 text-indigo-500" />,
  },
  { name: "Fashion", icon: <Shirt className="w-6 h-6 text-red-400" /> },
  {
    name: "Makanan &\nMinuman",
    icon: <Coffee className="w-6 h-6 text-orange-500" />,
  },
  { name: "Kesehatan", icon: <Pill className="w-6 h-6 text-orange-400" /> },
  { name: "Ibu & Bayi", icon: <Baby className="w-6 h-6 text-sky-400" /> },
  { name: "Otomotif", icon: <Car className="w-6 h-6 text-emerald-500" /> },
  { name: "Olahraga", icon: <Dumbbell className="w-6 h-6 text-slate-500" /> },
  { name: "Rumah\nTangga", icon: <Home className="w-6 h-6 text-amber-600" /> },
  {
    name: "Lihat\nSemua",
    isGreen: true,
    icon: <ChevronRight className="w-6 h-6 text-white" />,
  },
];

const CategorySection = () => {
  return (
    <div className="w-full bg-white rounded-2xl md:rounded-xl shadow-sm border border-gray-100 p-3 sm:p-5 mt-4">
      <div className="grid grid-cols-5 md:grid-cols-10 gap-x-2 gap-y-4">
        {categories.map((cat, idx) => (
          <Link
            href="#"
            key={idx}
            className="flex flex-col items-center justify-start gap-2 group cursor-pointer"
          >
            <div
              className={`w-11 h-11 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-transform group-hover:scale-105 shrink-0 ${
                cat.isGreen ? "bg-[#00AA5B]" : "bg-white border border-gray-200"
              }`}
            >
              {cat.icon}
            </div>

            <span
              className={`text-center font-medium leading-[1.2] whitespace-pre-line ${
                cat.isGreen ? "text-[#00AA5B]" : "text-gray-700"
              }`}
              style={{ fontSize: "clamp(10px, 2.5vw, 13px)" }}
            >
              {cat.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
