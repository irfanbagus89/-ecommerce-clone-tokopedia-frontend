"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Star } from "lucide-react";

const ReviewFilter = () => {
  return (
    <div className="space-y-6 pr-4">
      <div>
        <h3 className="font-bold text-gray-900 mb-3">Media</h3>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="with-media"
            className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
          />
          <label
            htmlFor="with-media"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-600"
          >
            Dengan Foto & Video
          </label>
        </div>
      </div>

      <hr className="border-gray-100" />

      <div>
        <h3 className="font-bold text-gray-900 mb-3">Rating</h3>
        <div className="space-y-3">
          {[5, 4, 3, 2, 1].map((star) => (
            <div key={star} className="flex items-center space-x-2">
              <Checkbox
                id={`star-${star}`}
                className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
              />
              <label
                htmlFor={`star-${star}`}
                className="flex items-center gap-1 text-sm text-gray-600"
              >
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                {star}
              </label>
            </div>
          ))}
        </div>
      </div>

      <hr className="border-gray-100" />

      <div>
        <h3 className="font-bold text-gray-900 mb-3">Topik Ulasan</h3>
        <div className="space-y-3">
          {[
            "Kualitas Barang",
            "Pelayanan Penjual",
            "Kemasan Barang",
            "Harga Barang",
            "Pengiriman",
          ].map((topic, i) => (
            <div key={i} className="flex items-center space-x-2">
              <Checkbox
                id={`topic-${i}`}
                className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
              />
              <label htmlFor={`topic-${i}`} className="text-sm text-gray-600">
                {topic}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewFilter;
