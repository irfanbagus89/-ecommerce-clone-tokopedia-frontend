"use client";
import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const CarouselContext = React.createContext(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }

  return context;
}

function Carousel({
  orientation = "horizontal",
  opts,
  setApi,
  plugins,
  className,
  children,
  ...props
}) {
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === "horizontal" ? "x" : "y",
    },
    plugins
  );
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);

  const onSelect = React.useCallback((api) => {
    if (!api) return;
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, []);

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = React.useCallback(() => {
    api?.scrollNext();
  }, [api]);

  const handleKeyDown = React.useCallback(
    (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        scrollNext();
      }
    },
    [scrollPrev, scrollNext]
  );

  React.useEffect(() => {
    if (!api || !setApi) return;
    setApi(api);
  }, [api, setApi]);

  React.useEffect(() => {
    if (!api) return;
    onSelect(api);
    api.on("reInit", onSelect);
    api.on("select", onSelect);

    return () => {
      api?.off("select", onSelect);
    };
  }, [api, onSelect]);

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api: api,
        opts,
        orientation:
          orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
      }}
    >
      <div
        onKeyDownCapture={handleKeyDown}
        className={cn("relative", className)}
        role="region"
        aria-roledescription="carousel"
        data-slot="carousel"
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
}

function CarouselContent({ className, ...props }) {
  const { carouselRef, orientation } = useCarousel();

  return (
    <div
      ref={carouselRef}
      className="overflow-hidden"
      data-slot="carousel-content"
    >
      <div
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className
        )}
        {...props}
      />
    </div>
  );
}

function CarouselItem({ className, ...props }) {
  const { orientation } = useCarousel();

  return (
    <div
      role="group"
      aria-roledescription="slide"
      data-slot="carousel-item"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className
      )}
      {...props}
    />
  );
}

function CarouselPrevious({
  className,
  variant = "outline",
  size = "icon",
  ...props
}) {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();

  return (
    <Button
      data-slot="carousel-previous"
      variant={variant}
      size={size}
      className={cn(
        "absolute size-8 rounded-full border-none!",
        orientation === "horizontal"
          ? "top-1/2 -left-4 -translate-y-1/2"
          : "-top-4 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeft />
      <span className="sr-only">Previous slide</span>
    </Button>
  );
}

function CarouselNext({
  className,
  variant = "outline",
  size = "icon",
  ...props
}) {
  const { orientation, scrollNext, canScrollNext } = useCarousel();

  return (
    <Button
      data-slot="carousel-next"
      variant={variant}
      size={size}
      className={cn(
        "absolute size-8 rounded-full border-none!",
        orientation === "horizontal"
          ? "top-1/2 -right-4 -translate-y-1/2"
          : "-bottom-4 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRight />
      <span className="sr-only">Next slide</span>
    </Button>
  );
}


function CustomCarousel({
  items = [],
  renderItem,
  orientation = "horizontal",
  arrowVisibility = "always", // "always" | "none" | "hover"
  showDots = true,
  loop = true,
  autoPlay = false,
  autoPlayInterval = 3000,
  className,
}) {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [carouselApi, setCarouselApi] = React.useState(null);
  const [isHover, setIsHover] = React.useState(false);

  const onSelect = React.useCallback(() => {
    if (!carouselApi) return;
    setSelectedIndex(carouselApi.selectedScrollSnap() % items.length);
  }, [carouselApi, items.length]);

  React.useEffect(() => {
    if (!carouselApi) return;

    carouselApi.on("select", onSelect);
    carouselApi.on("reInit", onSelect);

    const timer = setTimeout(() => onSelect(), 0);

    return () => {
      carouselApi.off("select", onSelect);
      carouselApi.off("reInit", onSelect);
      clearTimeout(timer);
    };
  }, [carouselApi, onSelect]);

  // autoplay
  React.useEffect(() => {
    if (!autoPlay || !carouselApi) return;

    const interval = setInterval(() => {
      carouselApi.scrollNext();
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, carouselApi]);

  // helper untuk menampilkan arrows
  const showArrow = (direction) => {
    if (arrowVisibility === "always") return true;
    if (arrowVisibility === "none") return false;
    if (arrowVisibility === "hover") return isHover;
    return true;
  };

  return (
    <Carousel
      orientation={orientation}
      setApi={setCarouselApi}
      opts={{ loop }}
      className={cn("relative w-full", className)}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <CarouselContent>
        {items.map((item, index) => (
          <CarouselItem key={index}>
            {renderItem(item, index)}
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* Arrows */}
      {orientation === "horizontal" && showArrow("prev") && (
        <CarouselPrevious>
          <ArrowLeft />
          <span className="sr-only">Previous slide</span>
        </CarouselPrevious>
      )}
      {orientation === "horizontal" && showArrow("next") && (
        <CarouselNext>
          <ArrowRight />
          <span className="sr-only">Next slide</span>
        </CarouselNext>
      )}

      {/* Dots */}
      {showDots && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => carouselApi?.scrollTo(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all cursor-pointer",
                selectedIndex === index ? "bg-white" : "bg-gray-300"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </Carousel>
  );
}


export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CustomCarousel,
};
