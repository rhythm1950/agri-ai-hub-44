import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getAIChatResponse } from '@/lib/chatResponses';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Leaf, Sparkles, Bot, User, Minimize2, Maximize2 } from 'lucide-react';
import { ChatMessage } from '@/lib/types';

export function Chatbot() {
  const { language, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', role: 'assistant', content: t.chat.welcome, timestamp: new Date().toISOString() }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    setMessages([
      { id: '1', role: 'assistant', content: t.chat.welcome, timestamp: new Date().toISOString() }
    ]);
  }, [language, t.chat.welcome]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    await new Promise(r => setTimeout(r, 1000 + Math.random() * 1000));

    const response = getAIChatResponse(input, language);
    
    const assistantMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: response,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, assistantMessage]);
    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickActions = [
    { label: language === 'en' ? 'Crop tips' : 'ফসলের টিপস', query: language === 'en' ? 'Give me tips for growing rice' : 'ধান চাষের টিপস দিন' },
    { label: language === 'en' ? 'Weather' : 'আবহাওয়া', query: language === 'en' ? 'How does weather affect crops?' : 'আবহাওয়া কিভাবে ফসলকে প্রভাবিত করে?' },
    { label: language === 'en' ? 'Pests' : 'কীটপতঙ্গ', query: language === 'en' ? 'How to control pests?' : 'কীটপতঙ্গ নিয়ন্ত্রণ কিভাবে করব?' },
  ];

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 z-50 w-14 h-14 rounded-2xl bg-primary text-primary-foreground shadow-xl flex items-center justify-center"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={isOpen ? { rotate: 0 } : { rotate: 0 }}
        style={{ boxShadow: '0 10px 40px hsl(var(--primary) / 0.4)' }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="h-6 w-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <MessageSquare className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-harvest-gold rounded-full flex items-center justify-center">
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`fixed bottom-24 left-6 z-50 w-[380px] flex flex-col shadow-2xl border-0 overflow-hidden rounded-3xl bg-card ${
              isMinimized ? 'h-16' : 'h-[550px]'
            }`}
          >
            {/* Header */}
            <div className="p-4 bg-primary text-primary-foreground flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-sm">
                  <Leaf className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold flex items-center gap-2">
                    {t.chat.title}
                    <Badge className="bg-harvest-gold/20 text-harvest-gold border-0 text-xs px-2 py-0.5">AI</Badge>
                  </h3>
                  <p className="text-xs text-white/70 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-tech-teal rounded-full animate-pulse" />
                    {language === 'en' ? 'Online' : 'অনলাইন'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <AnimatePresence>
              {!isMinimized && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col flex-1 overflow-hidden"
                >
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/30">
                    {messages.map((msg, index) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`flex items-end gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                          <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                            msg.role === 'user' 
                              ? 'bg-primary/10' 
                              : 'bg-primary'
                          }`}>
                            {msg.role === 'user' ? (
                              <User className="h-4 w-4 text-primary" />
                            ) : (
                              <Bot className="h-4 w-4 text-primary-foreground" />
                            )}
                          </div>
                          <div
                            className={`p-3.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                              msg.role === 'user'
                                ? 'bg-primary text-primary-foreground rounded-br-md'
                                : 'bg-card border border-border/50 shadow-sm rounded-bl-md'
                            }`}
                          >
                            {msg.content}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    {isTyping && (
                      <motion.div 
                        className="flex justify-start"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <div className="flex items-end gap-2">
                          <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
                            <Bot className="h-4 w-4 text-primary-foreground" />
                          </div>
                          <div className="bg-card border border-border/50 shadow-sm p-3.5 rounded-2xl rounded-bl-md">
                            <div className="flex gap-1.5">
                              <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                              <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                              <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Quick Actions */}
                  {messages.length <= 2 && (
                    <div className="px-4 pb-3 flex gap-2 overflow-x-auto bg-muted/30">
                      {quickActions.map((action, i) => (
                        <motion.button
                          key={i}
                          onClick={() => setInput(action.query)}
                          className="px-3 py-1.5 rounded-full bg-harvest-gold/10 text-harvest-gold text-xs font-medium whitespace-nowrap hover:bg-harvest-gold/20 transition-colors flex items-center gap-1.5"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Sparkles className="h-3 w-3" />
                          {action.label}
                        </motion.button>
                      ))}
                    </div>
                  )}

                  {/* Input */}
                  <div className="p-4 border-t border-border/50 bg-card">
                    <div className="flex gap-2">
                      <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder={t.chat.placeholder}
                        className="flex-1 h-11 rounded-xl border-border/50 bg-muted/30 focus:bg-background transition-colors"
                      />
                      <Button 
                        size="icon" 
                        onClick={handleSend} 
                        disabled={!input.trim() || isTyping}
                        className="h-11 w-11 rounded-xl"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-center text-muted-foreground mt-3">
                      {language === 'en' ? 'Powered by AgriAI' : 'AgriAI দ্বারা চালিত'}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
