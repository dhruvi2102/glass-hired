import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import GlassCard from '@/components/ui/GlassCard';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Software Engineer',
    company: 'TechCorp',
    text: 'HireGlass helped me land my dream job within 2 weeks! The AI matching is incredible.',
    avatar: 'SJ'
  },
  {
    name: 'Michael Chen',
    role: 'HR Director',
    company: 'InnovateCo',
    text: 'We\'ve hired over 50 talented individuals through HireGlass. Best recruitment platform!',
    avatar: 'MC'
  },
  {
    name: 'Emily Rodriguez',
    role: 'Product Manager',
    company: 'StartupXYZ',
    text: 'The user experience is seamless. Applied to 10 jobs in one afternoon and got 5 callbacks.',
    avatar: 'ER'
  },
  {
    name: 'David Kim',
    role: 'CEO',
    company: 'GrowthLabs',
    text: 'Finding quality candidates has never been easier. HireGlass is a game-changer.',
    avatar: 'DK'
  },
  {
    name: 'Lisa Thompson',
    role: 'Data Scientist',
    company: 'DataFlow',
    text: 'The job recommendations were spot-on. Felt like the platform truly understood my skills.',
    avatar: 'LT'
  }
];

const TestimonialsCarousel = () => {
  return (
    <section className="py-16">
      <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-4">
        What People Say
      </h2>
      <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
        Thousands of job seekers and employers trust HireGlass for their recruitment needs.
      </p>
      
      <div className="px-12">
        <Carousel opts={{ align: 'start', loop: true }} className="w-full">
          <CarouselContent className="-ml-4">
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <GlassCard hover className="p-6 h-full flex flex-col">
                  <Quote className="w-8 h-8 text-primary/50 mb-4" />
                  <p className="text-muted-foreground flex-1 mb-6">"{testimonial.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-semibold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role} at {testimonial.company}</p>
                    </div>
                  </div>
                </GlassCard>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="glass-card" />
          <CarouselNext className="glass-card" />
        </Carousel>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
