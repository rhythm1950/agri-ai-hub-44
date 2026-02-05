import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { motion } from 'framer-motion';
import { 
  Leaf, Mail, Phone, MapPin, 
  Facebook, Twitter, Linkedin, Instagram, Youtube,
  ArrowRight, Send
} from 'lucide-react';

export function Footer() {
  const { t, language } = useLanguage();
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { label: 'AI Predictions', href: '/dashboard' },
      { label: 'Data Center', href: '/dashboard' },
      { label: 'Soil Analysis', href: '/dashboard' },
      { label: 'Pricing', href: '#' },
    ],
    company: [
      { label: 'About Us', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Press', href: '#' },
    ],
    resources: [
      { label: 'Documentation', href: '#' },
      { label: 'Help Center', href: '#' },
      { label: 'Community', href: '#' },
      { label: 'Webinars', href: '#' },
    ],
    legal: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Cookie Policy', href: '#' },
      { label: 'GDPR', href: '#' },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-primary to-earth-green-dark text-primary-foreground overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)', 
          backgroundSize: '40px 40px' 
        }} />
      </div>
      
      {/* Ambient Glow */}
      <motion.div 
        className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-harvest-gold/10 rounded-full blur-[150px]"
        animate={{ opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-tech-teal/10 rounded-full blur-[120px]"
        animate={{ opacity: [0.1, 0.15, 0.1] }}
        transition={{ duration: 6, repeat: Infinity, delay: 2 }}
      />

      <div className="container mx-auto px-4 lg:px-8 relative">
        {/* Newsletter Section */}
        <div className="py-12 lg:py-16 border-b border-white/10">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl lg:text-3xl font-bold mb-3">
                {language === 'en' ? 'Stay updated with AgriAI' : 'AgriAI এর সাথে আপডেট থাকুন'}
              </h3>
              <p className="text-white/70 text-lg">
                {language === 'en' 
                  ? 'Get the latest farming insights, AI updates, and agricultural tips delivered to your inbox.' 
                  : 'সর্বশেষ কৃষি অন্তর্দৃষ্টি এবং AI আপডেট পান।'}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
                <Input 
                  placeholder={language === 'en' ? 'Enter your email' : 'আপনার ইমেল লিখুন'}
                  className="h-14 pl-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-xl focus:bg-white/15 transition-colors"
                />
              </div>
              <Button className="h-14 px-8 bg-harvest-gold hover:bg-harvest-gold/90 text-primary font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all gap-2">
                {language === 'en' ? 'Subscribe' : 'সাবস্ক্রাইব'}
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
            {/* Brand Column */}
            <div className="col-span-2 md:col-span-3 lg:col-span-2">
              <Link to="/" className="flex items-center gap-3 mb-6 group">
                <motion.div 
                  className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/10"
                  whileHover={{ scale: 1.05 }}
                >
                  <Leaf className="h-6 w-6" />
                </motion.div>
                <div>
                  <span className="font-bold text-xl">AgriAI Hub</span>
                  <p className="text-xs text-white/60 tracking-wide">Intelligent Farming Platform</p>
                </div>
              </Link>
              <p className="text-white/70 mb-6 leading-relaxed max-w-sm">
                {language === 'en' 
                  ? 'Empowering farmers with AI-driven insights for sustainable agriculture and increased crop yields.' 
                  : 'টেকসই কৃষি এবং উন্নত ফসলের জন্য কৃষকদের AI-চালিত অন্তর্দৃষ্টি দিয়ে ক্ষমতায়ন।'}
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-white/70 hover:text-white transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                    <Mail className="h-4 w-4" />
                  </div>
                  <span>hello@agriaihub.com</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-white/70 hover:text-white transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                    <Phone className="h-4 w-4" />
                  </div>
                  <span>+880 1712-345678</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-white/70 hover:text-white transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <span>Dhaka, Bangladesh</span>
                </div>
              </div>
            </div>

            {/* Links Columns */}
            <div>
              <h4 className="font-semibold mb-5 text-white">Product</h4>
              <ul className="space-y-3">
                {footerLinks.product.map((link) => (
                  <li key={link.label}>
                    <Link 
                      to={link.href}
                      className="text-white/70 hover:text-white transition-colors text-sm flex items-center gap-1 group"
                    >
                      <span>{link.label}</span>
                      <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-5 text-white">Company</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <Link 
                      to={link.href}
                      className="text-white/70 hover:text-white transition-colors text-sm flex items-center gap-1 group"
                    >
                      <span>{link.label}</span>
                      <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-5 text-white">Resources</h4>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.label}>
                    <Link 
                      to={link.href}
                      className="text-white/70 hover:text-white transition-colors text-sm flex items-center gap-1 group"
                    >
                      <span>{link.label}</span>
                      <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-5 text-white">Legal</h4>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.label}>
                    <Link 
                      to={link.href}
                      className="text-white/70 hover:text-white transition-colors text-sm flex items-center gap-1 group"
                    >
                      <span>{link.label}</span>
                      <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <Separator className="bg-white/10" />
        <div className="py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-sm text-white/60">
            <span>© {currentYear} AgriAI Hub.</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">All rights reserved.</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">Made with 💚 in Bangladesh</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-2">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <social.icon className="h-4 w-4" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
