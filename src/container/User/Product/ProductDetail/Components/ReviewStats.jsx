import { Star } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const ReviewStats = ({ stats }) => {
  return (
    <div className="rounded-lg border border-gray-200 p-6 shadow-sm mb-8">
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div className="flex flex-col items-center min-w-[150px]">
          <div className="flex items-end gap-1">
            <Star className="w-8 h-8 text-yellow-400 fill-yellow-400 mb-1" />
            <span className="text-5xl font-bold text-gray-900">
              {stats.summaryRating}
            </span>
            <span className="text-gray-500 text-lg mb-1">/ 5.0</span>
          </div>
          <p className="mt-2 font-bold text-gray-900">
            {stats.satisfaction}% pembeli merasa puas
          </p>
          <p className="text-sm text-gray-500">
            {stats.totalRating} rating • {stats.totalReviews} ulasan
          </p>
        </div>

        <div className="flex-1 w-full space-y-2">
          {stats.stars.map((item) => (
            <div key={item.star} className="flex items-center gap-3 text-sm">
              <div className="flex items-center gap-1 w-8 text-gray-600 font-medium">
                <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                {item.star}
              </div>
              <Progress
                value={item.percent}
                className="h-2 bg-gray-100 [&>div]:bg-green-500"
              />
              <div className="w-10 text-right text-gray-400 text-xs">
                {item.count}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewStats;
