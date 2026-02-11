import React from 'react';
import { motion, type Easing } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from 'lucide-react';

const easeOut: Easing = [0.0, 0.0, 0.2, 1];

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: delay * 0.1, ease: easeOut },
  }),
};

const faqs = [
  {
    question: 'How accurate are the AI yield predictions?',
    answer: 'Our AI models achieve 95% accuracy on average, trained on decades of agricultural data from Bangladesh and validated by agricultural research institutions. Accuracy improves as you provide more data about your specific farm conditions.',
  },
  {
    question: 'Does the app work offline in remote areas?',
    answer: 'Yes! AgriAI Hub is designed for rural connectivity challenges. Core features like the AI chatbot, saved predictions, and farm records work completely offline. Data syncs automatically when you regain internet connection.',
  },
  {
    question: 'What crops does the platform support?',
    answer: 'We support all major crops grown in Bangladesh including rice (Aman, Aus, Boro), wheat, jute, vegetables, fruits, and more. Our AI is continuously learning to support additional crop varieties.',
  },
  {
    question: 'Is my farm data secure and private?',
    answer: 'Absolutely. We use bank-level encryption for all data. Your farm data is never shared with third parties without your explicit consent. You retain full ownership of your data and can export or delete it anytime.',
  },
  {
    question: 'Can I use the platform in Bengali?',
    answer: 'Yes! The entire platform, including the AI chatbot, is available in both English and Bengali (বাংলা). Our AI understands conversational Bengali and can provide advice in your preferred language.',
  },
  {
    question: 'How do I get started?',
    answer: 'Simply sign up for a free account, add your farm details (location, size, crops), and start exploring. Our onboarding wizard guides you through the process in under 5 minutes. No technical expertise required!',
  },
];

export function FAQ() {
  return (
    <section className="py-16 lg:py-20 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUpVariant}
          custom={0}
        >
          <Badge className="mb-6 bg-tech-teal/10 text-tech-teal border-tech-teal/20 rounded-full px-4 py-1.5">
            <HelpCircle className="h-3 w-3 mr-1.5" />
            FAQ
          </Badge>
          <h2 className="text-foreground mb-6">
            Frequently asked <span className="text-gradient-gold">questions</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to know about AgriAI Hub. Can't find your answer? Contact our support team.
          </p>
        </motion.div>

        <motion.div 
          className="max-w-3xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUpVariant}
          custom={1}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-card border border-border/50 rounded-2xl px-6 data-[state=open]:shadow-lg transition-shadow"
              >
                <AccordionTrigger className="text-left text-sm sm:text-base font-semibold text-foreground hover:no-underline py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
