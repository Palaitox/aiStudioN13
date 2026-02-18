
import React, { useState, useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { MessageSquare, X, Send, Globe, User, Bot, Trash2, Mic, MicOff, Volume2, Square, Brain, AlertTriangle, Sparkles } from 'lucide-react';
import { GoogleGenAI, Modality } from "@google/genai";
import { NOTARIA_INFO, TRAMITES_DATA } from '../../constants';

// --- Types ---
interface Message {
  id: string;
  role: 'user' | 'model' | 'system';
  text: string;
  isStreaming?: boolean;
  sources?: { title: string; uri: string }[];
  isThinking?: boolean;
  isError?: boolean;
}

export interface ChatWidgetHandle {
  openWithQuery: (query: string) => void;
}

// --- Quick Suggestions (Updated per user request) ---
const QUICK_PROMPTS = [
  "Consultar tarifas nuevas de trámites 2026",
  "Horarios de atención"
];

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

// --- Audio Helper Functions (Raw PCM Decoding) ---
function base64ToUint8Array(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

function createAudioBufferFromPCM(
  ctx: AudioContext,
  data: Uint8Array,
  sampleRate: number = 24000,
  numChannels: number = 1
): AudioBuffer {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

export const ChatWidget = forwardRef<ChatWidgetHandle, {}>((props, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // AI Configuration State
  const [isThinkingMode, setIsThinkingMode] = useState(false);
  const [chatSession, setChatSession] = useState<any>(null);
  
  // UI States
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [pendingPrompt, setPendingPrompt] = useState<string | null>(null);

  // Audio States
  const [isListening, setIsListening] = useState(false);
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null);
  
  const INITIAL_MESSAGE: Message = { 
    id: 'welcome', 
    role: 'model', 
    text: '¡Hola! Soy NotarIA. Puedo ayudarte con requisitos de trámites, costos, horarios o buscar información normativa actualizada. ¿En qué te puedo servir hoy?' 
  };

  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  
  const recognitionRef = useRef<any>(null);
  const textBeforeDictation = useRef<string>('');
  const inputStateRef = useRef<string>('');

  const audioContextRef = useRef<AudioContext | null>(null);
  const audioSourceRef = useRef<AudioBufferSourceNode | null>(null);

  useEffect(() => {
    inputStateRef.current = input;
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 180)}px`;
    }
  }, [input]);

  useImperativeHandle(ref, () => ({
    openWithQuery: (query: string) => {
      setIsOpen(true);
      setPendingPrompt(query);
    }
  }));

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      const initAI = async () => {
        try {
          const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
          const modelName = isThinkingMode ? 'gemini-3-pro-preview' : 'gemini-3-flash-preview';
          
          const chatConfig: any = {
            systemInstruction: SYSTEM_INSTRUCTION,
            tools: [{ googleSearch: {} }],
          };

          if (isThinkingMode) {
             chatConfig.thinkingConfig = { thinkingBudget: 32768 };
          }

          const chat = ai.chats.create({
            model: modelName,
            config: chatConfig,
          });
          
          setChatSession(chat);
        } catch (error) {
          console.error("Error initializing NotarIA:", error);
        }
      };
      initAI();
    }
  }, [isOpen, isThinkingMode]);

  useEffect(() => {
    if (chatSession && pendingPrompt && !isLoading) {
      handleSend(undefined, pendingPrompt);
      setPendingPrompt(null);
    }
  }, [chatSession, pendingPrompt, isLoading]);

  const toggleThinkingMode = () => {
    const newMode = !isThinkingMode;
    setIsThinkingMode(newMode);
    setMessages(prev => [...prev, {
        id: `sys-${Date.now()}`,
        role: 'system',
        text: newMode 
            ? 'Modo Razonamiento Activado. Ideal para casos complejos.' 
            : 'Modo Estándar Activado. Respuestas rápidas.',
    }]);
  };

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Tu navegador no soporta dictado por voz.");
      return;
    }
    try {
        const recognition = new SpeechRecognition();
        recognitionRef.current = recognition;
        recognition.lang = 'es-CO';
        recognition.continuous = true;
        recognition.interimResults = true;
        textBeforeDictation.current = inputStateRef.current;
        recognition.onstart = () => setIsListening(true);
        recognition.onend = () => setIsListening(false);
        recognition.onresult = (event: any) => {
          let interimTranscript = '';
          let finalTranscript = '';
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) finalTranscript += event.results[i][0].transcript;
            else interimTranscript += event.results[i][0].transcript;
          }
          const currentBase = textBeforeDictation.current;
          const separator = (currentBase && !currentBase.match(/\s$/)) ? ' ' : '';
          setInput(currentBase + separator + finalTranscript + interimTranscript);
          if (finalTranscript) textBeforeDictation.current = currentBase + separator + finalTranscript;
        };
        recognition.start();
    } catch (e) {
      setIsListening(false);
    }
  };

  const toggleSpeech = async (text: string, messageId: string) => {
    if (speakingMessageId === messageId) {
      if (audioSourceRef.current) {
        audioSourceRef.current.stop();
        audioSourceRef.current = null;
      }
      setSpeakingMessageId(null);
      return;
    }
    if (audioSourceRef.current) {
      audioSourceRef.current.stop();
      audioSourceRef.current = null;
    }
    window.speechSynthesis.cancel();
    setSpeakingMessageId(messageId); 
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') await ctx.resume();
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const cleanText = text.replace(/[#*]/g, '').replace(/\[.*?\]/g, ''); 
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: cleanText }] }],
        config: {
          responseModalalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Kore' },
            },
          },
        },
      });
      const audioData = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (!audioData) throw new Error("No audio generated");
      const pcmBytes = base64ToUint8Array(audioData);
      const buffer = createAudioBufferFromPCM(ctx, pcmBytes);
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(ctx.destination);
      source.onended = () => {
        setSpeakingMessageId(null);
        audioSourceRef.current = null;
      };
      audioSourceRef.current = source;
      source.start();
    } catch (error) {
      setSpeakingMessageId(null);
    }
  };

  const handleSend = async (e?: React.FormEvent, textOverride?: string) => {
    e?.preventDefault();
    if (isListening) {
        recognitionRef.current?.stop();
        setIsListening(false);
    }
    const userText = textOverride || input;
    if (!userText.trim() || !chatSession || isLoading) return;

    setInput('');
    setIsLoading(true);
    const userMsgId = Date.now().toString();
    setMessages(prev => [...prev, { id: userMsgId, role: 'user', text: userText }]);

    try {
      const resultStream = await chatSession.sendMessageStream({ message: userText });
      const modelMsgId = (Date.now() + 1).toString();
      setMessages(prev => [...prev, { id: modelMsgId, role: 'model', text: '', isStreaming: true, isThinking: isThinkingMode }]);

      let fullText = "";
      let sources: { title: string; uri: string }[] = [];

      for await (const chunk of resultStream) {
        if (chunk.text) fullText += chunk.text;
        const groundingChunks = chunk.candidates?.[0]?.groundingMetadata?.groundingChunks;
        if (groundingChunks) {
            groundingChunks.forEach((gc: any) => {
                if (gc.web?.uri && gc.web?.title) sources.push({ title: gc.web.title, uri: gc.web.uri });
            });
        }
        setMessages(prev => prev.map(msg => 
          msg.id === modelMsgId ? { ...msg, text: fullText, sources: sources.length > 0 ? sources : undefined } : msg
        ));
      }
      setMessages(prev => prev.map(msg => msg.id === modelMsgId ? { ...msg, isStreaming: false, isThinking: false } : msg));
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      let errorMsg = "Lo siento, ocurrió un error inesperado al procesar tu solicitud.";
      
      if (error.message?.includes('429')) {
        errorMsg = "He alcanzado mi límite de capacidad momentáneo (Error 429). Por favor, espera 1 o 2 minutos antes de intentarlo de nuevo.";
      } else if (error.message?.includes('400')) {
        errorMsg = "Tu consulta no pudo ser procesada por restricciones de seguridad o formato (Error 400). Intenta preguntar de otra forma.";
      } else if (error.message?.includes('401')) {
        errorMsg = "Error de autenticación. La llave de acceso no es válida (Error 401).";
      } else if (error.message?.includes('fetch')) {
        errorMsg = "Error de conexión. Revisa tu internet e inténtalo de nuevo.";
      }

      setMessages(prev => {
        const filtered = prev.filter(m => !m.isStreaming);
        return [...filtered, { 
          id: `err-${Date.now()}`, 
          role: 'model', 
          text: errorMsg,
          isError: true 
        }];
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([INITIAL_MESSAGE]);
    if (audioSourceRef.current) {
        audioSourceRef.current.stop();
        audioSourceRef.current = null;
    }
    setSpeakingMessageId(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const renderMarkdown = (text: string) => {
    const lines = text.split('\n');
    const processInline = (str: string) => {
      const parts = str.split(/(\*\*.*?\*\*|\*.*?\*)/g);
      return parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i} className="font-bold text-brand-secondary">{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith('*') && part.endsWith('*')) {
          return <em key={i} className="italic text-orange-200/90">{part.slice(1, -1)}</em>;
        }
        return part;
      });
    };

    return lines.map((line, idx) => {
      const trimmed = line.trim();
      if (trimmed.startsWith('### ')) return <h4 key={idx} className="text-base font-bold text-brand-secondary mt-3 mb-1">{processInline(trimmed.slice(4))}</h4>;
      if (trimmed.startsWith('## ')) return <h3 key={idx} className="text-lg font-bold text-white mt-4 mb-2 border-b border-white/5 pb-1">{processInline(trimmed.slice(3))}</h3>;
      if (trimmed.startsWith('# ')) return <h2 key={idx} className="text-xl font-bold text-brand-secondary mt-5 mb-3">{processInline(trimmed.slice(2))}</h2>;
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        return (
          <div key={idx} className="flex gap-2 ml-2 my-1.5 leading-relaxed">
            <span className="text-brand-secondary shrink-0">•</span>
            <span className="text-slate-200">{processInline(trimmed.slice(2))}</span>
          </div>
        );
      }
      if (trimmed.length === 0) return <div key={idx} className="h-2" />;
      return <p key={idx} className="mb-2.5 leading-relaxed text-slate-200">{processInline(line)}</p>;
    });
  };

  return (
    <>
      <div className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ${isOpen ? 'translate-y-24 opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'}`}>
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-brand-primary to-orange-600 shadow-lg transition-all duration-300 hover:scale-110"
        >
          <div className="absolute inset-0 rounded-full border border-white/20 animate-pulse-slow" />
          <MessageSquare size={28} className="text-white" />
        </button>
      </div>

      <div className={`fixed z-50 transition-all duration-500 bottom-6 right-6 w-[90vw] md:w-[480px] lg:w-[550px] h-[720px] max-h-[85vh] rounded-3xl bg-slate-900/95 backdrop-blur-2xl border border-white/10 shadow-2xl flex flex-col overflow-hidden ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none scale-95'}`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-5 bg-white/5 border-b border-white/5 shrink-0">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center border transition-all duration-500 relative overflow-hidden ${isThinkingMode ? 'bg-purple-900/30 border-purple-500/50' : 'bg-gradient-to-br from-brand-primary/20 to-orange-600/10 border-brand-primary/30'}`}>
               <div className={`absolute inset-0 animate-pulse-slow ${isThinkingMode ? 'bg-purple-500/20' : 'bg-brand-primary/20'}`}></div>
               {isThinkingMode ? <Brain size={24} className="text-purple-400 relative z-10 animate-pulse" /> : <Bot size={24} className="text-brand-secondary relative z-10" />}
            </div>
            <div>
              <h3 className="font-bold text-white text-base md:text-lg">NotarIA</h3>
              <span className={`text-[10px] md:text-xs uppercase tracking-widest font-medium ${isThinkingMode ? 'text-purple-300' : 'text-slate-400'}`}>
                {isThinkingMode ? 'Modo Razonamiento' : 'Modo Estándar'}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={toggleThinkingMode} className={`p-2 rounded-lg transition-all border ${isThinkingMode ? 'bg-purple-500/20 text-purple-300 border-purple-500/30' : 'text-slate-400 border-transparent hover:bg-white/5'}`}>
              <Brain size={18} />
            </button>
            <button onClick={handleReset} className="p-2 text-slate-400 hover:text-red-400 rounded-lg"><Trash2 size={18} /></button>
            <button onClick={() => setIsOpen(false)} className="p-2 text-slate-400 hover:text-white rounded-lg"><X size={20} /></button>
          </div>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 scrollbar-thin">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : (msg.role === 'system' ? 'justify-center' : '')}`}>
              {msg.role !== 'system' && (
                <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center shrink-0 mt-1 shadow-lg ${msg.role === 'user' ? 'bg-slate-700' : (isThinkingMode && msg.role === 'model' ? 'bg-purple-900/40 border border-purple-500/30' : 'bg-brand-primary/20')}`}>
                  {msg.role === 'user' ? <User size={16} /> : (isThinkingMode && msg.role === 'model' ? <Brain size={16} className="text-purple-400" /> : <Bot size={16} className="text-brand-secondary" />)}
                </div>
              )}
              
              <div className={`flex flex-col ${msg.role === 'user' ? 'items-end' : (msg.role === 'system' ? 'items-center w-full' : 'items-start')} max-w-[85%]`}>
                {msg.role === 'system' ? (
                  <div className="bg-white/5 text-[10px] uppercase tracking-widest text-slate-500 py-1 px-4 rounded-full border border-white/5">
                    {msg.text}
                  </div>
                ) : (
                  <div className={`p-4 md:p-5 rounded-3xl text-sm md:text-base shadow-sm relative group/msg ${msg.role === 'user' ? 'bg-slate-800 text-white rounded-tr-none border border-white/5' : 'bg-white/5 text-slate-200 rounded-tl-none border border-white/10 backdrop-blur-md'} ${msg.isError ? 'border-orange-500/40 bg-orange-500/5' : ''}`}>
                    {msg.isError && <div className="flex items-center gap-2 text-orange-400 font-bold mb-2 text-xs"><AlertTriangle size={14} /> ERROR DE SISTEMA</div>}
                    <div>{renderMarkdown(msg.text)}</div>
                    {msg.role === 'model' && !msg.isStreaming && !msg.isError && (
                      <button onClick={() => toggleSpeech(msg.text, msg.id)} className={`absolute -bottom-8 left-0 p-1.5 rounded-full transition-all duration-300 opacity-0 group-hover/msg:opacity-100 ${speakingMessageId === msg.id ? 'opacity-100 text-brand-secondary bg-brand-primary/10' : 'text-slate-500 hover:text-white'}`}>
                        {speakingMessageId === msg.id ? <Square size={14} className="animate-pulse" fill="currentColor" /> : <Volume2 size={16} />}
                      </button>
                    )}
                  </div>
                )}
                {msg.sources && (
                  <div className="flex flex-wrap gap-2 mt-3 animate-fade-in">
                    {msg.sources.map((source, idx) => (
                      <a key={idx} href={source.uri} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-[10px] bg-blue-500/10 text-blue-300 px-3 py-1.5 rounded-full border border-blue-500/20">
                        <Globe size={12} /> {source.title}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${isThinkingMode ? 'bg-purple-900/40 border border-purple-500/30' : 'bg-brand-primary/20'}`}>
                  {isThinkingMode ? <Brain size={16} className="text-purple-400 animate-pulse" /> : <Bot size={16} className="text-brand-secondary animate-pulse" />}
                </div>
                <div className="bg-white/5 p-4 rounded-3xl rounded-tl-none border border-white/5">
                  <span className="flex gap-1.5 items-center">
                    <span className="w-2 h-2 rounded-full animate-bounce bg-slate-400" />
                    <span className="w-2 h-2 rounded-full animate-bounce bg-slate-400" style={{ animationDelay: '0.2s' }} />
                    <span className="w-2 h-2 rounded-full animate-bounce bg-slate-400" style={{ animationDelay: '0.4s' }} />
                  </span>
                </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input & Quick Suggestions */}
        <div className="p-4 md:p-6 bg-brand-dark/50 border-t border-white/5 backdrop-blur-xl shrink-0">
          
          {/* Quick Suggestions (Restored as per user request) */}
          {messages.length <= 1 && !isLoading && (
            <div className="mb-4 flex flex-wrap gap-2 animate-fade-in">
              {QUICK_PROMPTS.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(undefined, prompt)}
                  className="flex items-center gap-2 text-xs bg-white/5 hover:bg-white/10 border border-white/10 hover:border-brand-secondary/50 text-slate-300 hover:text-white px-4 py-2.5 rounded-full transition-all backdrop-blur-sm group/btn"
                >
                  <Sparkles size={12} className="text-brand-secondary group-hover/btn:scale-110 transition-transform" />
                  {prompt}
                </button>
              ))}
            </div>
          )}

          <form onSubmit={handleSend} className="relative max-w-4xl mx-auto w-full">
            <textarea
              ref={inputRef}
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={isListening ? "Escuchando..." : (isThinkingMode ? "Modo Pensamiento: Describe tu caso..." : "Escribe o dicta tu consulta...")}
              className={`w-full bg-slate-800/80 border rounded-2xl py-4 pl-6 pr-24 text-white placeholder-slate-500 text-sm md:text-base focus:outline-none focus:ring-2 transition-all shadow-inner resize-none min-h-[56px] max-h-[180px] ${isListening ? 'border-red-500/50 ring-red-500/20' : 'border-white/10'} ${isThinkingMode && !isListening ? 'focus:ring-purple-500/50' : 'focus:ring-brand-secondary/50'}`}
              disabled={isLoading}
            />
            <div className="absolute right-3 bottom-3 flex items-center gap-1">
              <button type="button" onClick={toggleListening} className={`p-2.5 rounded-xl transition-all ${isListening ? 'bg-red-500/20 text-red-400 animate-pulse' : 'text-slate-400 hover:text-white'}`}>
                {isListening ? <MicOff size={18} /> : <Mic size={18} />}
              </button>
              <button type="submit" disabled={!input.trim() || isLoading} className={`p-2.5 rounded-xl text-white transition-all ${isThinkingMode ? 'bg-purple-600 hover:bg-purple-500' : 'bg-brand-primary hover:bg-orange-500'}`}>
                <Send size={18} />
              </button>
            </div>
          </form>
          <p className="text-center mt-3 text-[10px] text-slate-500">NotarIA puede cometer errores. Verifica la información.</p>
        </div>
      </div>
    </>
  );
});
