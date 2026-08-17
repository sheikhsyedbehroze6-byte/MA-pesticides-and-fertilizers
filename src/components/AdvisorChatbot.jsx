import { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, MessageCircle, ExternalLink, RefreshCw, ArrowRight } from 'lucide-react';
import { products, diseases } from '../data/agricultureData';
import '../pages/urdu.css';

const QUICK_PROMPTS = [
  { label: '🍏 Apple Scab Treatment', query: 'Apple Scab spray' },
  { label: '🌤️ Weather in Srinagar', query: 'weather in srinagar' },
  { label: '⚡ 200L Tank Dosage Calc', query: 'dosage calculation' },
  { label: '🐛 Mites & Codling Moth', query: 'Spider Mites' },
  { label: '📍 Shop Location & Address', query: 'location address' }
];

function scoreMatch(text, words) {
  if (!text) return 0;
  const lower = text.toLowerCase();
  let score = 0;
  words.forEach(w => {
    if (w.length < 3) return;
    if (lower.includes(w)) score += 3;
    if (lower.startsWith(w)) score += 2;
  });
  return score;
}

function getBotResponse(userText) {
  const query = userText.toLowerCase().trim();
  const words = query.split(/\s+/).filter(w => !['the', 'and', 'is', 'for', 'in', 'to', 'of', 'a', 'an', 'what', 'how', 'which', 'where', 'who', 'my', 'i', 'have'].includes(w));

  const kanalMatch = query.match(/(\d+(?:\.\d+)?)\s*(?:kanal|kanals|کنال)/i);
  const treeMatch = query.match(/(\d+)\s*(?:tree|trees|پودے|درخت)/i);

  if (kanalMatch || treeMatch) {
    const kanals = kanalMatch ? parseFloat(kanalMatch[1]) : null;
    const trees = treeMatch ? parseInt(treeMatch[1], 10) : (kanals ? Math.round(kanals * 18) : 20);
    const estWaterLitre = trees ? Math.round(trees * 18) : Math.round(kanals * 350);
    const barrels200L = (estWaterLitre / 200).toFixed(1);

    const searchedProd = products.find(p => query.includes(p.name.toLowerCase()) || p.uses.toLowerCase().includes(query));

    let specificCalc = '';
    if (searchedProd) {
      let calcQty = '';
      if (searchedProd.name.includes('Antracol')) {
        calcQty = `${(estWaterLitre * 2.5).toFixed(0)}g (${((estWaterLitre * 2.5) / 500).toFixed(1)} packets of 500g)`;
      } else if (searchedProd.name.includes('Dodine')) {
        calcQty = `${(estWaterLitre * 1.0).toFixed(0)}g`;
      } else if (searchedProd.name.includes('Alika')) {
        calcQty = `${(estWaterLitre * 0.5).toFixed(0)} ml`;
      } else if (searchedProd.name.includes('HMO')) {
        calcQty = `${(estWaterLitre * 0.02).toFixed(1)} Litres (${((estWaterLitre * 0.02) / 5).toFixed(1)} cans of 5L)`;
      } else {
        calcQty = `Standard rate (${searchedProd.dosage}) calculated for ${estWaterLitre} Litres of water.`;
      }

      specificCalc = `\n\n🎯 **Specific Requirement for ${searchedProd.name}:**\n- **Required Quantity:** **${calcQty}**\n- **Dosage Rate:** ${searchedProd.dosage}`;
    }

    return {
      text: `🧮 **Custom Orchard Dosage Calculation:**\n\n- 🌳 **Orchard Scale:** ${kanals ? `${kanals} Kanal(s)` : ''} ${trees ? `(${trees} Fruit Trees)` : ''}\n- 💧 **Estimated Water:** ~**${estWaterLitre} Litres** (${barrels200L} x 200L barrels)\n\n📦 **Recommended Quantities:**\n1. **Bayer Antracol (Propineb 70% WP):** **${(estWaterLitre * 2.5).toFixed(0)}g**\n2. **Superstar Dodine 65% WP:** **${(estWaterLitre * 1.0).toFixed(0)}g**\n3. **Syngenta Alika Insecticide:** **${(estWaterLitre * 0.5).toFixed(0)} ml**\n4. **Horticultural Oil (HMO 2%):** **${(estWaterLitre * 0.02).toFixed(1)} Litres**${specificCalc}`,
      actionLink: `https://wa.me/919906541321?text=${encodeURIComponent(`Hello Sheikh Mohammad Ayoub, I need spray products for ${kanals ? `${kanals} kanals / ` : ''}${trees} trees (${estWaterLitre}L water).`)}`
    };
  }

  if (query.includes('weather') || query.includes('srinagar') || query.includes('rain') || query.includes('forecast')) {
    return {
      text: "🌤️ **Srinagar Orchard Weather & Spray Window:**\n\n- 🌡️ Temp: 22°C (Optimal Spraying Range: 15°C – 25°C)\n- 🌬️ Wind: 5 km/h (Calm)\n- 🌧️ Rain Warning: Light rain possibility in 48-72 hours.\n\n⚠️ **Chemist Spray Advice:** Spray preventative contact fungicides (**Bayer Antracol 70% WP** @ 2.5g/L) today before rain to establish rain-fast leaf coverage!",
      actionLink: "https://wa.me/919906541321?text=Hello%20Sheikh%20Mohammad%20Ayoub%2C%20what%20is%20the%20best%20spray%20timing%20for%20Srinagar%20weather%20today%3F"
    };
  }

  if (query.match(/^(hi|hello|hey|salam|assalamu|good morning)/i)) {
    return {
      text: `Assalamu Alaikum! 👋\n\nI am the **M.A. Pesticides AI Crop Advisor**. How can I help with your orchard today?\n\n- 🍏 Diagnose Apple Scab, Mites & Crop Diseases\n- 🧮 Calculate Exact Chemical Quantities for your Trees\n- 📦 Check Stock of Bayer & Syngenta Products`,
      actionLink: "https://wa.me/919906541321?text=Hello%20MA%20Pesticides%2C%20I%20have%20a%20question%20about%20my%20crops."
    };
  }

  let bestDisease = null;
  let maxDiseaseScore = 0;
  diseases.forEach(d => {
    const score = scoreMatch(d.name, words) + scoreMatch(d.crop, words) + scoreMatch(d.symptoms, words) + scoreMatch(d.cure, words);
    if (score > maxDiseaseScore) {
      maxDiseaseScore = score;
      bestDisease = d;
    }
  });

  if (bestDisease && maxDiseaseScore >= 3) {
    return {
      text: `🔬 **Disease Guide: ${bestDisease.name}** (${bestDisease.crop})\n\n- 🚨 **Symptoms:** ${bestDisease.symptoms}\n- 🩺 **Recommended Cure:** ${bestDisease.cure}\n- ⚡ **Dosage Rate:** ${bestDisease.dosage}\n- ⚠️ **Severity:** ${bestDisease.severity}`,
      actionLink: `https://wa.me/919906541321?text=${encodeURIComponent(`Hello Sheikh Mohammad Ayoub, I need treatment for ${bestDisease.name} in my orchard.`)}`
    };
  }

  let bestProd = null;
  let maxProdScore = 0;
  products.forEach(p => {
    const score = scoreMatch(p.name, words) * 2 + scoreMatch(p.uses, words) + scoreMatch(p.composition, words);
    if (score > maxProdScore) {
      maxProdScore = score;
      bestProd = p;
    }
  });

  if (bestProd && maxProdScore >= 3) {
    return {
      text: `🌿 **${bestProd.name}** (${bestProd.type})\n\n- 🧪 **Composition:** ${bestProd.composition || 'Standard Formulation'}\n- 🎯 **Uses:** ${bestProd.uses}\n- 💧 **Recommended Dosage:** ${bestProd.dosage}\n- 💡 **Benefits:** ${bestProd.benefits}`,
      productEmbed: bestProd,
      actionLink: `https://wa.me/919906541321?text=${encodeURIComponent(`Hello, I want to purchase ${bestProd.name} from your Srinagar shop.`)}`
    };
  }

  return {
    text: `✨ **AI Crop Advisor Answer:**\n\nI analyzed your query: "${userText}".\n\n- Type your tree count (e.g. \`20 trees\` or \`2 kanals\`) to get exact spray calculations.\n- Ask about any crop disease or brand name (Antracol, Alika, Dodine).`,
    actionLink: `https://wa.me/919906541321?text=${encodeURIComponent(`Hello Sheikh Mohammad Ayoub, I have a query: ${userText}`)}`
  };
}

export default function AdvisorChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "👋 Assalamu Alaikum! I am the **M.A. Pesticides AI Advisor**.\n\nAsk me about pesticide dosages, apple scab spray schedules, orchard diseases, or shop availability."
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = (textToSend) => {
    const queryText = textToSend || input;
    if (!queryText.trim()) return;

    const userMsg = { sender: 'user', text: queryText };
    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = getBotResponse(queryText);
      setMessages(prev => [...prev, { sender: 'bot', ...response }]);
      setIsTyping(false);
    }, 150);
  };

  return (
    <>
      {/* Steep Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="pill-button-filled advisor-chatbot-fab"
        aria-label="Open AI Crop Advisor"
      >
        <Sparkles size={16} />
        <span>Ask AI</span>
      </button>

      {/* Steep Floating AI Composer Modal */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '88px',
          right: '24px',
          width: 'min(420px, calc(100vw - 32px))',
          height: '540px',
          maxHeight: 'calc(100vh - 120px)',
          backgroundColor: 'var(--surface-canvas)',
          borderRadius: 'var(--radius-cards)',
          boxShadow: 'var(--shadow-subtle-2)',
          border: '1px solid rgba(23, 25, 28, 0.08)',
          zIndex: 9995,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}>
          {/* Header */}
          <div style={{
            padding: '16px 20px',
            borderBottom: '1px solid rgba(23, 25, 28, 0.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'var(--surface-section-fog)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div className="avatar-bubble bg-peach">
                SA
              </div>
              <div>
                <h4 style={{ fontFamily: 'var(--font-signifier)', fontSize: '18px', fontWeight: 400, margin: 0 }}>
                  Orchard AI Advisor
                </h4>
                <span style={{ fontSize: '12px', color: 'var(--color-slate-gray)' }}>
                  Guided by Sheikh M. Ayoub
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-ink-black)' }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Body */}
          <div style={{
            flex: 1,
            padding: '20px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px'
          }}>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '90%',
                  backgroundColor: msg.sender === 'user' ? 'var(--color-ink-black)' : 'var(--surface-card-mist)',
                  color: msg.sender === 'user' ? 'var(--surface-canvas)' : 'var(--color-ink-black)',
                  padding: '14px 18px',
                  borderRadius: msg.sender === 'user' ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
                  fontSize: '15px',
                  lineHeight: '1.45',
                  fontFamily: 'var(--font-sohne)'
                }}
              >
                <div style={{ whiteSpace: 'pre-line' }}>{msg.text}</div>

                {msg.actionLink && (
                  <a
                    href={msg.actionLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-link-arrow"
                    style={{
                      marginTop: '8px',
                      color: msg.sender === 'user' ? '#fbe1d1' : 'var(--color-sienna-brown)',
                      fontSize: '14px',
                      fontWeight: 500
                    }}
                  >
                    <span>Connect on WhatsApp</span>
                    <ArrowRight size={14} />
                  </a>
                )}
              </div>
            ))}
            {isTyping && (
              <div style={{ fontSize: '13px', color: 'var(--color-ash-gray)' }}>
                Advisor analyzing orchard data...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          <div style={{
            padding: '8px 16px',
            backgroundColor: 'var(--surface-section-fog)',
            display: 'flex',
            gap: '8px',
            overflowX: 'auto'
          }}>
            {QUICK_PROMPTS.map((p, i) => (
              <button
                key={i}
                onClick={() => handleSend(p.query)}
                className="pill-button-ghost pill-button-sm"
                style={{ height: '32px', fontSize: '12px', padding: '0 12px', whiteSpace: 'nowrap' }}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Input Footer Composer */}
          <div style={{ padding: '16px', backgroundColor: 'var(--surface-canvas)', borderTop: '1px solid rgba(23, 25, 28, 0.06)' }}>
            <div className="ai-composer-input">
              <input
                type="text"
                placeholder="Ask anything about spray, dosage, or scab..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <button
                onClick={() => handleSend()}
                className="ai-composer-send-btn"
                aria-label="Send message"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
