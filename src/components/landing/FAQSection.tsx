import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import GlassCard from '@/components/ui/GlassCard';

const faqs = [
  {
    question: 'How do I create an account?',
    answer: 'Click on "Get Started Free" or "Sign Up" button. Choose your role (Job Seeker, Employer, or Recruiter), fill in your details, and you\'re ready to go!'
  },
  {
    question: 'Is HireGlass free to use?',
    answer: 'Yes! Job seekers can use HireGlass completely free. Employers have access to a free tier with basic features, and premium plans are available for advanced recruitment tools.'
  },
  {
    question: 'How does the AI job matching work?',
    answer: 'Our AI analyzes your skills, experience, and preferences to match you with the most relevant job opportunities. The more you interact with the platform, the smarter our recommendations become.'
  },
  {
    question: 'Can I apply to multiple jobs at once?',
    answer: 'Yes! With our "Quick Apply" feature, you can apply to multiple jobs with a single click using your saved profile and resume.'
  },
  {
    question: 'How do employers post jobs?',
    answer: 'After creating an employer account, navigate to your dashboard and click "Post a Job". Fill in the job details, requirements, and salary range, then publish. Your job will be visible to thousands of candidates instantly.'
  },
  {
    question: 'What makes HireGlass different from other job platforms?',
    answer: 'HireGlass combines AI-powered matching, a beautiful user experience, and enterprise-grade security. Our platform is built for speed and efficiency, helping you find the perfect match faster.'
  },
  {
    question: 'How can I track my applications?',
    answer: 'All your applications are tracked in the "My Applications" section of your dashboard. You\'ll see real-time status updates and can communicate directly with employers.'
  },
  {
    question: 'Is my data secure?',
    answer: 'Absolutely. We use enterprise-grade encryption and security protocols to protect your personal information. Your data is never shared without your explicit consent.'
  }
];

const FAQSection = () => {
  return (
    <section className="py-16">
      <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-4">
        Frequently Asked Questions
      </h2>
      <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
        Got questions? We've got answers. If you can't find what you're looking for, chat with our HireBot!
      </p>
      
      <GlassCard className="max-w-3xl mx-auto p-6">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-border/50">
              <AccordionTrigger className="text-left hover:no-underline hover:text-primary">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </GlassCard>
    </section>
  );
};

export default FAQSection;
