import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { useRef } from 'react';

const companies = [
  { name: 'TechCorp', logo: 'TC' },
  { name: 'InnovateCo', logo: 'IC' },
  { name: 'DataFlow', logo: 'DF' },
  { name: 'CloudNine', logo: 'C9' },
  { name: 'GrowthLabs', logo: 'GL' },
  { name: 'StartupXYZ', logo: 'SX' },
  { name: 'DesignHub', logo: 'DH' },
  { name: 'CodeCraft', logo: 'CC' },
];

const CompaniesCarousel = () => {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: false }));

  return (
    <section className="py-12">
      <h2 className="text-2xl md:text-3xl font-display font-bold text-center mb-4">
        Trusted by Leading Companies
      </h2>
      <p className="text-muted-foreground text-center mb-10">
        Join thousands of companies hiring through HireGlass
      </p>
      
      <Carousel
        opts={{ align: 'start', loop: true }}
        plugins={[plugin.current]}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {companies.map((company, index) => (
            <CarouselItem key={index} className="pl-4 basis-1/3 md:basis-1/4 lg:basis-1/6">
              <div className="flex flex-col items-center justify-center p-6 glass-card rounded-xl h-24 hover:scale-105 transition-transform">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center font-display font-bold text-foreground mb-2">
                  {company.logo}
                </div>
                <span className="text-xs text-muted-foreground">{company.name}</span>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
};

export default CompaniesCarousel;
