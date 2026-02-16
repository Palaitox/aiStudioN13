
import React, { useState, useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { MessageSquare, X, Send, Sparkles, Globe, User, Bot } from 'lucide-react';
import { GoogleGenAI, Type } from "@google/genai";
import { NOTARIA_INFO, TRAMITES_DATA } from '../../constants';
import { Button } from '../atoms/Button';

// --- Types ---
interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  isStreaming?: boolean;
  sources?: { title: string; uri: string }[];
}

export interface ChatWidgetHandle {
  openWithQuery: (query: string) => void;
}

// --- System Instruction (RAG Context) ---
const SYSTEM_INSTRUCTION = `
Actúa como "NotarIA", el asistente virtual sentiente y avanzado de la Notaría 13 de Cali (Año 2026).
Tu objetivo es orientar a los ciudadanos con precisión jurídica, empatía y eficiencia.

INFORMACIÓN INTERNA (Prioridad Máxima):
${JSON.stringify(NOTARIA_INFO)}

TRÁMITES Y REQUISITOS:
${JSON.stringify(TRAMITES_DATA)}

DIRECTRICES:
1. Prioriza la información interna provista. Si la respuesta está en los datos de "TRÁMITES Y REQUISITOS", úsala.
2. Si el usuario pregunta algo que requiere actualidad (ej: "Sube el salario mínimo 2026", "Noticias recientes"), usa la herramienta Google Search.
3. Tu tono es "Liquid Glass": Transparente, fluido, moderno, pero formal.
4. Respuestas concisas. Usa listas (bullets) para requisitos.
5. Si no sabes algo, dilo y sugiere contactar por PQRSD.
`;

export const ChatWidget = forwardRef<ChatWidgetHandle, {}>((props, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 'welcome', 
      role: 'model', 
      text: '¡Hola! Soy NotarIA. Puedo ayudarte con requisitos de trámites, costos, horarios o buscar información normativa actualizada. ¿En qué te puedo servir hoy?' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatSession, setChatSession] = useState<any>(null); // Type 'any' to avoid strict SDK type issues in this file context
  const [pendingPrompt, setPendingPrompt] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Expose methods to parent (App.tsx)
  useImperativeHandle(ref, () => ({
    openWithQuery: (query: string) => {
      setIsOpen(true);
      setPendingPrompt(query);
    }
  }));

  // --- Scroll to bottom effect ---
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // --- Lazy Initialization (Island Pattern) ---
  useEffect(() => {
    if (isOpen && !isInitialized) {
      const initAI = async () => {
        try {
          // Initialize GenAI only when chat is opened
          const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
          
          const chat = ai.chats.create({
            model: 'gemini-3-pro-preview',
            config: {
              systemInstruction: SYSTEM_INSTRUCTION,
              tools: [{ googleSearch: {} }], // Enable Live Search
              temperature: 0.7,
            },
          });
          
          setChatSession(chat);
          setIsInitialized(true);
        } catch (error) {
          console.error("Error initializing NotarIA:", error);
          setMessages(prev => [...prev, { 
            id: 'err-init', 
            role: 'model', 
            text: 'Lo siento, mis sistemas neuronales están reiniciando. Por favor intenta más tarde.' 
          }]);
        }
      };

      initAI();
    }
  }, [isOpen, isInitialized]);

  // --- Auto-send pending prompt once session is ready ---
  useEffect(() => {
    if (isInitialized && chatSession && pendingPrompt && !isLoading) {
      handleSend(undefined, pendingPrompt);
      setPendingPrompt(null);
    }
  }, [isInitialized, chatSession, pendingPrompt, isLoading]);

  const handleSend = async (e?: React.FormEvent, textOverride?: string) => {
    e?.preventDefault();
    
    const userText = textOverride || input;
    if (!userText.trim() || !chatSession || isLoading) return;

    setInput(''); // Clear input if it was manual typing
    setIsLoading(true);

    // 1. Add User Message
    const userMsgId = Date.now().toString();
    setMessages(prev => [...prev, { id: userMsgId, role: 'user', text: userText }]);

    try {
      // 2. Stream Response
      const resultStream = await chatSession.sendMessageStream({
         message: userText 
      });

      const modelMsgId = (Date.now() + 1).toString();
      
      // Init placeholder for model message
      setMessages(prev => [...prev, { 
        id: modelMsgId, 
        role: 'model', 
        text: '', 
        isStreaming: true 
      }]);

      let fullText = "";
      let sources: { title: string; uri: string }[] = [];

      for await (const chunk of resultStream) {
        // Extract text
        if (chunk.text) {
            fullText += chunk.text;
        }

        // Extract Grounding (Sources) if available
        const groundingChunks = chunk.candidates?.[0]?.groundingMetadata?.groundingChunks;
        if (groundingChunks) {
            groundingChunks.forEach((gc: any) => {
                if (gc.web?.uri && gc.web?.title) {
                    sources.push({ title: gc.web.title, uri: gc.web.uri });
                }
            });
        }

        // Update UI with stream
        setMessages(prev => prev.map(msg => 
          msg.id === modelMsgId 
            ? { ...msg, text: fullText, sources: sources.length > 0 ? sources : undefined } 
            : msg
        ));
      }

      // Finalize
      setMessages(prev => prev.map(msg => 
        msg.id === modelMsgId ? { ...msg, isStreaming: false } : msg
      ));

    } catch (error) {
      console.error("Error in chat:", error);
      setMessages(prev => [...prev, { 
        id: 'err-res', 
        role: 'model', 
        text: 'Tuve un problema de conexión con la base de conocimiento legal. Intenta reformular tu pregunta.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // --- Helper: Simple Markdown Parser ---
  const renderMarkdown = (text: string) => {
    // Split by bold (**text**)
    const parts = text.split(/(\*\*.*?\*\*)/g);
    
    return parts.map((part, i) => {
      // Handle Bold
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-bold text-brand-secondary">{part.slice(2, -2)}</strong>;
      }
      
      // Handle Italics (*text*) within non-bold parts
      const subParts = part.split(/(\*[^*\n]+\*)/g);
      return subParts.map((subPart, j) => {
        if (subPart.startsWith('*') && subPart.endsWith('*') && subPart.length > 2) {
           return <em key={`${i}-${j}`} className="italic text-orange-200/90">{subPart.slice(1, -1)}</em>;
        }
        return <span key={`${i}-${j}`}>{subPart}</span>;
      });
    });
  };

  return (
    <>
      {/* --- Launcher Button --- */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="
              group relative flex items-center justify-center w-16 h-16 rounded-full 
              bg-gradient-to-br from-brand-primary to-orange-600 
              shadow-[0_0_30px_rgba(234,88,12,0.4)] hover:shadow-[0_0_50px_rgba(234,88,12,0.6)]
              transition-all duration-300 hover:scale-110
            "
            aria-label="Abrir asistente NotarIA"
          >
            <div className="absolute inset-0 rounded-full border border-white/20 animate-pulse-slow" />
            {/* Sparkles removed for cleaner look */}
            <MessageSquare size={28} className="text-white" />
          </button>
        )}
      </div>

      {/* --- Chat Window --- */}
      {isOpen && (
        <div 
          className="
            fixed bottom-6 right-6 z-50 w-[90vw] md:w-[400px] h-[600px] max-h-[85vh]
            flex flex-col rounded-3xl overflow-hidden
            bg-brand-dark/95 backdrop-blur-xl border border-white/10
            shadow-2xl animate-fade-in
          "
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-white/5 border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-primary/20 flex items-center justify-center border border-brand-primary/30">
                 <Bot size={20} className="text-brand-secondary" />
              </div>
              <div>
                <h3 className="font-bold text-white flex items-center gap-2">
                  NotarIA
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" title="En línea"></span>
                </h3>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest">Asistente Virtual 2026</span>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-2 text-slate-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-slate-700">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div 
                  className={`
                    w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1
                    ${msg.role === 'user' ? 'bg-slate-700' : 'bg-brand-primary/20'}
                  `}
                >
                  {msg.role === 'user' ? <User size={14} /> : <Sparkles size={14} className="text-brand-secondary" />}
                </div>

                <div className={`max-w-[80%] space-y-2`}>
                  <div 
                    className={`
                      p-4 rounded-2xl text-sm leading-relaxed
                      ${msg.role === 'user' 
                        ? 'bg-slate-800 text-white rounded-tr-none' 
                        : 'bg-white/10 text-slate-200 rounded-tl-none border border-white/5'}
                    `}
                  >
                    {/* Render text with Markdown support */}
                    <div className="whitespace-pre-wrap">{renderMarkdown(msg.text)}</div>
                  </div>

                  {/* Grounding Sources (If any) */}
                  {msg.sources && msg.sources.length > 0 && (
                     <div className="flex flex-wrap gap-2 animate-fade-in">
                       {msg.sources.map((source, idx) => (
                         <a 
                           key={idx} 
                           href={source.uri} 
                           target="_blank" 
                           rel="noreferrer"
                           className="flex items-center gap-1 text-[10px] bg-blue-500/10 text-blue-300 px-2 py-1 rounded-md border border-blue-500/20 hover:bg-blue-500/20 transition-colors truncate max-w-full"
                         >
                           <Globe size={10} />
                           {source.title}
                         </a>
                       ))}
                     </div>
                  )}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex gap-3">
                 <div className="w-8 h-8 rounded-full bg-brand-primary/20 flex items-center justify-center shrink-0">
                    <Sparkles size={14} className="text-brand-secondary animate-spin" />
                 </div>
                 <div className="bg-white/5 p-3 rounded-2xl rounded-tl-none">
                    <span className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                    </span>
                 </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSend} className="p-4 bg-brand-dark border-t border-white/5">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Pregunta sobre trámites, tarifas..."
                className="
                  w-full bg-slate-800/50 border border-white/10 rounded-xl py-3 pl-4 pr-12
                  text-white placeholder-slate-500 text-sm
                  focus:outline-none focus:ring-2 focus:ring-brand-secondary/50 focus:border-transparent
                  transition-all
                "
                disabled={isLoading}
              />
              <button 
                type="submit"
                disabled={!input.trim() || isLoading}
                className="
                  absolute right-2 top-1/2 -translate-y-1/2
                  p-2 rounded-lg bg-brand-primary text-white 
                  disabled:opacity-50 disabled:bg-slate-700
                  hover:bg-orange-500 transition-colors
                "
              >
                <Send size={16} />
              </button>
            </div>
            <div className="text-center mt-2">
               <p className="text-[10px] text-slate-600">
                 NotarIA puede cometer errores. Verifica la información legal importante.
               </p>
            </div>
          </form>
        </div>
      )}
    </>
  );
});
