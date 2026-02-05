import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, ArrowRight, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export function TopBar() {
  const [isVisible, setIsVisible] = useState(true);
  const { language } = useLanguage();

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -40, opacity: 0 }}
        className="relative bg-harvest-gold text-primary z-[60]"
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-center gap-3 py-2.5 text-sm font-medium relative">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <Zap className="h-4 w-4" />
            </motion.div>
            <span className="hidden sm:inline">
              {language === 'en' 
                ? '🎉 Special Offer: Get 50% off Pro plan for your first 3 months!' 
                : '🎉 বিশেষ অফার: প্রথম ৩ মাসের জন্য প্রো প্ল্যানে ৫০% ছাড়!'}
            </span>
            <span className="sm:hidden">
              {language === 'en' ? '🎉 50% off Pro plan!' : '🎉 প্রো প্ল্যানে ৫০% ছাড়!'}
            </span>
            <Link 
              to="/auth?tab=signup"
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-colors group"
            >
              {language === 'en' ? 'Claim Now' : 'এখনই নিন'}
              <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <button 
              onClick={() => setIsVisible(false)}
              className="absolute right-0 p-1.5 hover:bg-primary/10 rounded-lg transition-colors"
              aria-label="Close announcement"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
