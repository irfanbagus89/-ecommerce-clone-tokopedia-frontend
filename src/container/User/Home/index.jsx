import { CustomCarousel } from "@/components/ui/carousel";
import Image from "next/image";
import React from "react";
import CategorySection from "./Components/CategorySection";
import ProductSection from "./Components/ProductSection";

const HomeContainer = () => {
  const images = [
    "https://p16-images-comn-sg.tokopedia-static.net/tos-alisg-i-zr7vqa5nfb-sg/ad4ca94af45a4046931c7b1ae146c29d~tplv-zr7vqa5nfb-resize-jpeg:800:0.image",
    "https://p16-images-comn-sg.tokopedia-static.net/tos-alisg-i-zr7vqa5nfb-sg/addd29eb8eab42f39933bfdf9efad984~tplv-zr7vqa5nfb-resize-jpeg:800:0.image",
    "https://p16-images-comn-sg.tokopedia-static.net/tos-alisg-i-zr7vqa5nfb-sg/63b13914e39747eba08253b8587e5ce2~tplv-zr7vqa5nfb-resize-jpeg:800:0.image",
  ];

  return (
    <div>
      <CustomCarousel
        items={images}
        autoPlay={true}
        arrowVisibility={"hover"}
        renderItem={(src) => (
          <div className="h-80 w-full relative overflow-hidden rounded-lg">
            <Image
              src={src}
              alt="Banner_carousel"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        )}
      />
      <CategorySection />
      <ProductSection />
    </div>
  );
};

export default HomeContainer;
