import * as React from "react";
import AutoScroll from "embla-carousel-auto-scroll";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

type TechItem = {
  icon: React.ComponentType<{ className?: string }>;
  color: string;
};

type TechStackCarouselProps = {
  items: TechItem[];
  className?: string;
};

const TechStackCarousel = ({ items, className }: TechStackCarouselProps) => {
  return (
    <div className={className}>
      <div className="relative flex items-center justify-center">
        <Carousel opts={{ loop: true }} plugins={[AutoScroll({ playOnInit: true })]}>
          <CarouselContent className="ml-0">
            {items.map(({ icon: Icon, color }, i) => {
              return (
                <CarouselItem
                  key={i}
                  className="flex basis-1/3 justify-center pl-0 sm:basis-1/4 md:basis-1/5 lg:basis-1/6"
                >
                  <div className="mx-10 flex shrink-0 items-center justify-center">
                    <Icon className={`${color} size-7`} />
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
        <div className="from-background absolute inset-y-0 left-0 w-12 bg-linear-to-r to-transparent" />
        <div className="from-background absolute inset-y-0 right-0 w-12 bg-linear-to-l to-transparent" />
      </div>
    </div>
  );
};

export { TechStackCarousel };
