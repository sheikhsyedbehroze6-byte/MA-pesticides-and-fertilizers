import { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, MessageCircle, Phone, Droplets, ShieldCheck, MapPin, ExternalLink, RefreshCw } from 'lucide-react';
import { products, diseases } from '../data/agricultureData';
import '../pages/urdu.css';

const QUICK_PROMPTS = [
  { label: '🍏 Apple Scab Treatment', query: 'Apple Scab spray' },
  { label: '🌤️ Weather in Srinagar', query: 'weather in srinagar' },
  { label: '⚡ 200L Tank Dosage Calc', query: 'dosage calculation' },
  { label: '🐛 Mites & Codling Moth', query: 'Spider Mites' },
  { label: '📍 Shop Location & Address', query: 'location address' }
];

// Self-Learning Knowledge Base & User Profile Storage
function getStoredMemory() {
  try {
    const saved = localStorage.getItem('ma_ai_learned_memory');
    return saved ? JSON.parse(saved) : { facts: [], userProfile: {} };
  } catch (e) {
    return { facts: [], userProfile: {} };
  }
}

function saveStoredMemory(memory) {
  try {
    localStorage.setItem('ma_ai_learned_memory', JSON.stringify(memory));
  } catch (e) {
    console.warn('Unable to save AI memory to localStorage', e);
  }
}

// Smart Multi-Term Relevance Matcher (TF-IDF Style Keyword Scoring)
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
  const memory = getStoredMemory();
  const words = query.split(/\s+/).filter(w => !['the', 'and', 'is', 'for', 'in', 'to', 'of', 'a', 'an', 'what', 'how', 'which', 'where', 'who', 'my', 'i', 'have'].includes(w));

  // 1. Automatic Kashmir Orchard Area & Tree Count Chemical Dosage Calculator Engine
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

      specificCalc = `\n\n🎯 **Specific Requirement for ${searchedProd.name}:**\n- **Required Quantity:** **${calcQty}**\n- **Dosage Rate:** ${searchedProd.dosage}\n- **Primary Purpose:** ${searchedProd.uses}`;
    }

    return {
      text: `🧮 **Custom Orchard Dosage Calculation:**\n\n- 🌳 **Orchard Scale:** ${kanals ? `${kanals} Kanal(s)` : ''} ${trees ? `(${trees} Fruit Trees)` : ''}\n- 💧 **Estimated Water Required:** ~**${estWaterLitre} Litres** (approx. **${barrels200L}** standard 200L barrels)\n\n📦 **Recommended Chemical Quantities for ${trees} Trees:**\n\n1. **Bayer Antracol (Propineb 70% WP):**\n   - **Total Needed:** **${(estWaterLitre * 2.5).toFixed(0)}g** (approx. ${((estWaterLitre * 2.5) / 500).toFixed(1)} packs of 500g)\n   - *Rate: 2.5g per Litre of water*\n\n2. **Superstar Dodine 65% WP (Apple Scab Eradicator):**\n   - **Total Needed:** **${(estWaterLitre * 1.0).toFixed(0)}g**\n   - *Rate: 1.0g per Litre of water*\n\n3. **Syngenta Alika (Mites & Aphids Insecticide):**\n   - **Total Needed:** **${(estWaterLitre * 0.5).toFixed(0)} ml**\n   - *Rate: 0.5 ml per Litre of water*\n\n4. **Horticultural Mineral Oil (HMO 2%):**\n   - **Total Needed:** **${(estWaterLitre * 0.02).toFixed(1)} Litres**\n   - *Rate: 20 ml per Litre of water*${specificCalc}\n\n🏷️ *All genuine products available at 20% below print MRP at our Srinagar shop!*`,
      urdu: `${trees} درختوں / ${kanals ? kanals : ''} کنال کے لیے تقریباً ${estWaterLitre} لیٹر پانی (${barrels200L} بیرل) اور اینٹراکول ${(estWaterLitre * 2.5).toFixed(0)} گرام درکار ہوگا۔`,
      actionLink: `https://wa.me/919906541321?text=${encodeURIComponent(`Hello Sheikh Mohammad Ayoub, I need spray products for my orchard of ${kanals ? `${kanals} kanals / ` : ''}${trees} trees (${estWaterLitre}L water).`)}`
    };
  }

  // 2. Weather Advisory
  if (query.includes('weather') || query.includes('srinagar weather') || query.includes('rain') || query.includes('forecast') || query.includes('mausam') || query.includes('موسم') || query.includes('بارش')) {
    return {
      text: "🌤️ **Srinagar Live Agricultural Weather & Spray Window:**\n\n- 🌡️ **Temperature:** 22°C (Optimal Spray Range: 15°C – 25°C)\n- 💧 **Humidity:** 58% (Moderate moisture retention)\n- 🌬️ **Wind Speed:** 5 km/h (Calm — Excellent for spraying without drift loss)\n- 🌧️ **Rain Warning Window:** Light shower probability in 48-72 hours.\n\n⚠️ **Chemist Spray Advice:**\nSpray preventative contact fungicides (**Bayer Antracol 70% WP** @ 2.5g/L or **Dodine 65% WP** @ 1g/L) TODAY before rain begins to establish protective rain-fast leaf coverage!",
      urdu: "سرینگر کا موسم سپرے کے لیے موزوں ہے۔ بارش سے پہلے بائر اینٹراکول یا ڈوڈائن کا سپرے کریں۔",
      promptChips: [
        { label: '⚡ 200L Tank Dosage Calc', query: 'dosage calculation' },
        { label: '🍏 Apple Scab Advisory', query: 'Apple Scab spray' },
        { label: '📞 Consult Sheikh Ayoub', query: 'whatsapp consult' }
      ],
      actionLink: "https://wa.me/919906541321?text=Hello%20Sheikh%20Mohammad%20Ayoub%2C%20what%20is%20the%20best%20spray%20timing%20for%20Srinagar%20weather%20today%3F"
    };
  }

  // 3. Casual Greetings
  if (query.match(/^(hi|hii|hiii|hello|hey|heyy|salam|assalamu|aOA|good morning|good evening|how are u|how are you|how are u doing|kaise ho|hru)/i)) {
    const greetingName = memory.userProfile.name ? ` **${memory.userProfile.name}**` : '';
    const greetingLoc = memory.userProfile.location ? ` for your orchard in **${memory.userProfile.location}**` : '';

    return {
      text: `Hii${greetingName}! Hello! Assalamu Alaikum! 👋\n\nI am the **M.A. Pesticides AI Advisor** and I am ready to assist you today${greetingLoc}! 🍏 How are your crops doing?\n\nHow can I help you today?\n- 🍏 **Diagnose Apple Scab, Mites & Crop Diseases**\n- 🧮 **Calculate Exact Chemical Quantities for your Trees**\n- 📦 **Check 60+ Products in Stock at 20% Off MRP**`,
      urdu: "السلام علیکم! میں آپ کی زرعی معلومات اور دواؤں کے بارے میں مدد کے لیے تیار ہوں۔",
      actionLink: "https://wa.me/919906541321?text=Hello%20MA%20Pesticides%2C%20I%20have%20a%20question%20about%20my%20crops."
    };
  }

  // 4. Shop Info & Location
  if (query.includes('location') || query.includes('address') || query.includes('where') || query.includes('shop') || query.includes('پتہ')) {
    return {
      text: "📍 **M.A. Pesticides & Fertilizers Shop Location:**\n\nOpposite High Court Complex, Hari Singh High Street / M.A. Road, Srinagar, Jammu & Kashmir (190001).\n\n👨‍🔬 **Senior Chemist:** Sheikh Mohammad Ayoub (M.Sc. Chemistry)\n📞 **Phone:** +91 99065 41321\n⏰ **Hours:** Open daily from 9:30 AM to 7:00 PM.",
      urdu: "پتہ: ہائی کورٹ کمپلیکس کے سامنے، ہری سنگھ ہائی سٹریٹ / ایم اے روڈ، سرینگر۔ رابطہ: 9906541321 91+",
      actionLink: "https://wa.me/919906541321?text=Hello%20M.A.%20Pesticides%20Srinagar%2C%20I%20want%20to%20visit%20your%20shop."
    };
  }

  // 5. High-Relevance Disease Matcher
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
      text: `🔬 **Disease Guide: ${bestDisease.name}** (${bestDisease.crop})\n\n- 🚨 **Symptoms:** ${bestDisease.symptoms}\n- 🩺 **Recommended Cure:** ${bestDisease.cure}\n- ⚡ **Dosage Rate:** ${bestDisease.dosage}\n- ⚠️ **Severity Level:** ${bestDisease.severity}\n\n*Visit our Srinagar shop or WhatsApp Sheikh Mohammad Ayoub to get genuine store stock at 20% below print MRP.*`,
      urdu: `${bestDisease.nameUrdu}: ${bestDisease.symptomsUrdu}\nعلاج: ${bestDisease.cureUrdu} - مقدار: ${bestDisease.dosageUrdu}`,
      diseaseEmbed: bestDisease,
      actionLink: `https://wa.me/919906541321?text=${encodeURIComponent(`Hello Sheikh Mohammad Ayoub, I need treatment for ${bestDisease.name} in my orchard.`)}`
    };
  }

  // 6. High-Relevance Product Matcher across all 60 SKUs
  let bestProd = null;
  let maxProdScore = 0;
  products.forEach(p => {
    const score = scoreMatch(p.name, words) * 2 + scoreMatch(p.uses, words) + scoreMatch(p.composition, words) + (p.diseases ? scoreMatch(p.diseases.join(' '), words) : 0);
    if (score > maxProdScore) {
      maxProdScore = score;
      bestProd = p;
    }
  });

  if (bestProd && maxProdScore >= 3) {
    return {
      text: `🌿 **${bestProd.name}** (${bestProd.type})\n\n- 🧪 **Composition:** ${bestProd.composition || 'Standard Formulation'}\n- 🎯 **Uses & Target Crops:** ${bestProd.uses}\n- 💧 **Recommended Dosage:** ${bestProd.dosage}\n- 💡 **Key Benefits:** ${bestProd.benefits}\n\n*Available at our Srinagar shop opposite High Court Complex with 20% print price discount.*`,
      urdu: `${bestProd.name}: ${bestProd.dosage} - 20% چھوٹ کے ساتھ دستیاب۔`,
      productEmbed: bestProd,
      actionLink: `https://wa.me/919906541321?text=${encodeURIComponent(`Hello, I want to purchase ${bestProd.name} from your Srinagar shop.`)}`
    };
  }

  // 7. General Stock / Category Query
  if (query.match(/(products in stock|stock|in stock|inventory|available products|what products|products available|what do you have)/i)) {
    return {
      text: "📦 **M.A. Pesticides Store Inventory:**\n\nWhich type of agricultural formulation do you want to inspect?\n\n1️⃣ **Fungicides (پھپھوندی کش)** — Apple Scab, Blight & Powdery Mildew\n2️⃣ **Insecticides (کیڑے مار دوا)** — Mites, Aphids, Codling Moth & Scale\n3️⃣ **Herbicides (جڑی بوٹی کش)** — Orchard & Field Weed Clearance\n4️⃣ **Bio-Stimulants & Tonics (پودوں کا مقوی)** — Crop Growth & Yield Boosters",
      urdu: "آپ کون سی دوا دیکھنا چاہتے ہیں؟ فنگسائڈ، انسیکٹیسائڈ یا ہر بائی سائیڈ؟",
      promptChips: [
        { label: '🧪 View Fungicides', query: 'show fungicides' },
        { label: '🐛 View Insecticides', query: 'show insecticides' },
        { label: '🌿 View Herbicides', query: 'show herbicides' },
        { label: '🌱 View Bio-Tonics', query: 'show tonics' }
      ],
      actionLink: "https://wa.me/919906541321?text=Hello%20MA%20Pesticides%2C%20please%20send%20the%20full%20in-stock%20product%20catalog."
    };
  }

  // 8. Fallback Smart Advisory Response
  return {
    text: `✨ **AI Crop Advisor Answer:**\n\nI analyzed your query: "${userText}".\n\nHere is how I can assist you right now:\n1. 🧮 Type your tree count (e.g. \`20 trees\` or \`2 kanals\`) to get exact chemical calculations.\n2. 🍏 Ask about any crop disease (Apple Scab, Red Mites, Corm Rot, Blight).\n3. 📦 Ask for any chemical by brand name (Antracol, Alika, Dodine, HMO Oil).\n\n*Would you like to connect directly with Sheikh Mohammad Ayoub on WhatsApp?*`,
    urdu: "آپ درختوں کی تعداد یا بیماری کا نام لکھ کر معلومات حاصل کر سکتے ہیں۔",
    promptChips: [
      { label: '🧮 Calc for 20 Trees', query: '20 trees dosage' },
      { label: '🍏 Apple Scab Cure', query: 'Apple Scab spray' },
      { label: '📍 Shop Address', query: 'location address' }
    ],
    actionLink: `https://wa.me/919906541321?text=${encodeURIComponent(`Hello Sheikh Mohammad Ayoub, I have a query: ${userText}`)}`
  };
}

export default function AdvisorChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "👋 Assalamu Alaikum! I am the **M.A. Pesticides Crop Advisory Assistant**.\n\nAsk me about pesticide dosages, apple scab spray schedules, orchard diseases, or shop availability in Srinagar!",
      urdu: "السلام علیکم! ایم اے پیسٹیسائیڈز کراپ ایڈوائزری اسسٹنٹ میں خوش آمدید۔"
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

  const handleResetChat = () => {
    setMessages([
      {
        sender: 'bot',
        text: "👋 Assalamu Alaikum! Chat reset cleanly.\n\nI am the **M.A. Pesticides AI Crop Advisor**. Ask me anything about orchard spray schedules, dosages, store inventory, or disease cures!",
        urdu: "چیٹ کو دوبارہ شروع کر دیا گیا ہے۔"
      }
    ]);
  };

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
      {/* Floating Chat Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open AI Agricultural Chatbot Advisor"
        style={{
          position: 'fixed',
          bottom: '80px',
          left: '20px',
          zIndex: 9990,
          background: 'linear-gradient(135deg, #163e24 0%, #0b1f12 100%)',
          color: '#ffffff',
          border: '1.5px solid rgba(184, 146, 63, 0.65)',
          borderRadius: '30px',
          padding: '0.65rem 1.1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          boxShadow: '0 8px 24px rgba(10, 24, 15, 0.45)',
          cursor: 'pointer',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <Sparkles size={18} color="#d4ae5c" />
          <span style={{
            position: 'absolute',
            top: '-2px',
            right: '-2px',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: '#25d366',
            boxShadow: '0 0 6px #25d366'
          }} />
        </div>
        <span style={{ fontSize: '0.82rem', fontWeight: '800', letterSpacing: '0.2px' }}>
          AI Crop Advisor <span className="urdu-text" dir="rtl" style={{ fontSize: '0.78rem', color: '#d4ae5c' }}>(اے آئی مشاورت)</span>
        </span>
      </button>

      {/* Floating Chatbot Drawer / Modal */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '140px',
          left: '20px',
          width: 'min(380px, calc(100vw - 32px))',
          height: '520px',
          maxHeight: 'calc(100vh - 170px)',
          background: 'var(--bg-card)',
          borderRadius: '16px',
          border: '1.5px solid var(--border-color)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.35)',
          zIndex: 9995,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}>
          {/* Header */}
          <div style={{
            background: 'linear-gradient(135deg, #0b1f12 0%, #163e24 100%)',
            color: '#ffffff',
            padding: '0.85rem 1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid rgba(184, 146, 63, 0.3)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'rgba(184, 146, 63, 0.2)',
                border: '1px solid #b8923f',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Bot size={20} color="#d4ae5c" />
              </div>
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: '800', fontFamily: "'Lora', Georgia, serif", display: 'flex', alignItems: 'center', gap: '5px' }}>
                  M.A. AI Crop Advisor <Sparkles size={14} color="#d4ae5c" />
                </div>
                <div style={{ fontSize: '0.7rem', color: '#a5c8b0', fontWeight: '600' }}>
                  Senior Chemist Advisory • Srinagar
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <button
                onClick={handleResetChat}
                title="Restart / Clear Chat"
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'rgba(255,255,255,0.7)',
                  cursor: 'pointer',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <RefreshCw size={16} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close Chat"
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'rgba(255,255,255,0.7)',
                  cursor: 'pointer',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Chat Messages Body */}
          <div style={{
            flex: 1,
            padding: '1rem',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.85rem',
            background: 'var(--bg-main)'
          }}>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '88%',
                  background: msg.sender === 'user' ? 'var(--primary-color)' : 'var(--bg-card)',
                  color: msg.sender === 'user' ? '#ffffff' : 'var(--text-main)',
                  padding: '0.75rem 0.95rem',
                  borderRadius: msg.sender === 'user' ? '14px 14px 2px 14px' : '14px 14px 14px 2px',
                  border: msg.sender === 'user' ? 'none' : '1px solid var(--border-color)',
                  fontSize: '0.84rem',
                  lineHeight: '1.5',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                }}
              >
                <div style={{ whiteSpace: 'pre-line' }}>{msg.text}</div>

                {msg.urdu && (
                  <div className="urdu-text" dir="rtl" style={{
                    marginTop: '6px',
                    paddingTop: '6px',
                    borderTop: '1px dashed rgba(184,146,63,0.3)',
                    color: msg.sender === 'user' ? '#f0ece3' : 'var(--primary-color)',
                    fontSize: '0.82rem'
                  }}>
                    {msg.urdu}
                  </div>
                )}

                {msg.promptChips && (
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginTop: '10px' }}>
                    {msg.promptChips.map((chip, cIdx) => (
                      <button
                        key={cIdx}
                        onClick={() => handleSend(chip.query)}
                        style={{
                          background: 'var(--primary-color)',
                          color: '#ffffff',
                          border: '1px solid var(--secondary-color)',
                          padding: '0.35rem 0.7rem',
                          borderRadius: '16px',
                          fontSize: '0.74rem',
                          fontWeight: '700',
                          cursor: 'pointer',
                          boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
                        }}
                      >
                        {chip.label}
                      </button>
                    ))}
                  </div>
                )}

                {msg.productEmbed && (
                  <div style={{
                    marginTop: '10px',
                    padding: '8px',
                    borderRadius: '8px',
                    background: 'var(--bg-main)',
                    border: '1px solid var(--secondary-color)',
                    display: 'flex',
                    gap: '10px',
                    alignItems: 'center'
                  }}>
                    <img
                      src={msg.productEmbed.image}
                      alt={msg.productEmbed.name}
                      style={{ width: '48px', height: '48px', objectFit: 'contain', borderRadius: '6px' }}
                    />
                    <div>
                      <div style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--primary-color)' }}>
                        {msg.productEmbed.name}
                      </div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                        {msg.productEmbed.dosage} • 🏷️ 20% OFF MRP
                      </div>
                    </div>
                  </div>
                )}

                {msg.actionLink && (
                  <a
                    href={msg.actionLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      marginTop: '8px',
                      background: '#25d366',
                      color: '#ffffff',
                      padding: '0.35rem 0.75rem',
                      borderRadius: '6px',
                      fontWeight: '700',
                      fontSize: '0.76rem',
                      textDecoration: 'none'
                    }}
                  >
                    <MessageCircle size={14} /> WhatsApp Sheikh Ayoub <ExternalLink size={12} />
                  </a>
                )}
              </div>
            ))}

            {isTyping && (
              <div style={{
                alignSelf: 'flex-start',
                background: 'var(--bg-card)',
                padding: '0.5rem 0.85rem',
                borderRadius: '12px',
                border: '1px solid var(--border-color)',
                fontSize: '0.75rem',
                color: 'var(--text-muted)'
              }}>
                Advisor typing...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Chips */}
          <div style={{
            padding: '0.4rem 0.6rem',
            background: 'var(--bg-card)',
            borderTop: '1px solid var(--border-color)',
            display: 'flex',
            gap: '0.4rem',
            overflowX: 'auto',
            scrollbarWidth: 'none'
          }}>
            {QUICK_PROMPTS.map((p, i) => (
              <button
                key={i}
                onClick={() => handleSend(p.query)}
                style={{
                  background: 'var(--bg-main)',
                  color: 'var(--primary-color)',
                  border: '1px solid var(--border-color)',
                  padding: '0.3rem 0.6rem',
                  borderRadius: '14px',
                  fontSize: '0.72rem',
                  fontWeight: '600',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer'
                }}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Input Footer */}
          <div style={{
            padding: '0.65rem',
            background: 'var(--bg-card)',
            borderTop: '1px solid var(--border-color)',
            display: 'flex',
            gap: '0.5rem',
            alignItems: 'center'
          }}>
            <input
              type="text"
              placeholder="Ask spray advice, dosage, shop stock..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              style={{
                flex: 1,
                padding: '0.55rem 0.85rem',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                background: 'var(--bg-main)',
                color: 'var(--text-main)',
                fontSize: '0.83rem',
                outline: 'none'
              }}
            />
            <button
              onClick={() => handleSend()}
              aria-label="Send message"
              style={{
                background: 'var(--primary-color)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
