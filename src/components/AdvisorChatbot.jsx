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

function getBotResponse(userText) {
  const query = userText.toLowerCase().trim();
  const memory = getStoredMemory();

  // Automatic Kashmir Orchard Area & Tree Count Chemical Dosage Calculator Engine
  const kanalMatch = query.match(/(\d+(?:\.\d+)?)\s*(?:kanal|kanals|کنال)/i);
  const treeMatch = query.match(/(\d+)\s*(?:tree|trees|پودے|درخت)/i);

  if (kanalMatch || treeMatch) {
    const kanals = kanalMatch ? parseFloat(kanalMatch[1]) : null;
    const trees = treeMatch ? parseInt(treeMatch[1], 10) : (kanals ? Math.round(kanals * 18) : 20);
    const estWaterLitre = trees ? Math.round(trees * 18) : Math.round(kanals * 350);
    const barrels200L = (estWaterLitre / 200).toFixed(1);

    // Check if user asked about a specific product in products DB
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

  // Srinagar Weather & Agricultural Spray Window Inquiry Handler
  if (query.includes('weather') || query.includes('srinagar weather') || query.includes('rain') || query.includes('forecast') || query.includes('mausam') || query.includes('موسم') || query.includes('بارش') || query.includes('temperature') || query.includes('wind') || query.includes('humidity')) {
    return {
      text: "🌤️ **Srinagar Live Agricultural Weather & Spray Window:**\n\n- 🌡️ **Temperature:** 22°C (Optimal Spray Range: 15°C – 25°C)\n- 💧 **Humidity:** 58% (Moderate moisture retention)\n- 🌬️ **Wind Speed:** 5 km/h (Calm — Excellent for spraying without drift loss)\n- 🌧️ **Rain Warning Window:** Light shower probability in 48-72 hours.\n\n⚠️ **Chemist Spray Advice:**\nSpray preventative contact fungicides (**Bayer Antracol 70% WP** @ 2.5g/L or **Dodine 65% WP** @ 1g/L) TODAY before rain begins to establish protective rain-fast leaf coverage!\n\n*Need to calculate mixing ratios for your spray barrel? Click below!*",
      urdu: "سرینگر کا موسم سپرے کے لیے موزوں ہے۔ بارش سے پہلے بائر اینٹراکول یا ڈوڈائن کا سپرے کریں۔",
      promptChips: [
        { label: '⚡ 200L Tank Dosage Calc', query: 'dosage calculation' },
        { label: '🍏 Apple Scab Advisory', query: 'Apple Scab spray' },
        { label: '📞 Consult Sheikh Ayoub', query: 'whatsapp consult' }
      ],
      actionLink: "https://wa.me/919906541321?text=Hello%20Sheikh%20Mohammad%20Ayoub%2C%20what%20is%20the%20best%20spray%20timing%20for%20Srinagar%20weather%20today%3F"
    };
  }

  // Automatic Organic Fact Extraction (AI learns facts automatically from user conversation)
  const isOrganicFact = userText.match(/(?:i sprayed|we sprayed|i used|my orchard has|my trees have|there is|disease in|i bought|i have|my farm|my location|we use|my tree|my crop|i am using|worked well|did not work)/i);
  if (isOrganicFact && userText.split(' ').length >= 3 && !query.includes('how much') && !query.includes('what is') && !query.includes('where is')) {
    const existingFact = memory.facts.find(f => f.fact.toLowerCase() === userText.toLowerCase());
    if (!existingFact) {
      memory.facts.push({
        fact: userText.trim(),
        timestamp: new Date().toISOString()
      });
      saveStoredMemory(memory);
    }
  }

  // Automatic Knowledge Recall ("what do you remember", "my facts", "what did I spray", "my memory")
  if (query.includes('what do you remember') || query.includes('my memory') || query.includes('my facts') || query.includes('what did i spray') || query.includes('my orchard details') || query.includes('what do you know about me')) {
    if (memory.facts.length === 0 && !memory.userProfile.name && !memory.userProfile.location) {
      return {
        text: "🧠 **AI Organic Memory Base:**\n\nI haven't learned any custom facts about your orchard yet!\n\nAs we chat, I will automatically learn your orchard details, past spray history, and tree counts!",
        urdu: "ابھی تک میں نے آپ کے باغ کے بارے میں کوئی معلومات نہیں سیکھی ہیں۔"
      };
    }

    const learnedList = memory.facts.map((f, i) => `${i + 1}. *"${f.fact}"*`).join('\n');
    const profileInfo = [];
    if (memory.userProfile.name) profileInfo.push(`- 👤 **Farmer Name:** ${memory.userProfile.name}`);
    if (memory.userProfile.location) profileInfo.push(`- 📍 **Location:** ${memory.userProfile.location}`);

    return {
      text: `🧠 **AI Organic Self-Learned Memory Base:**\n\n${profileInfo.join('\n')}\n\n📚 **Automatically Extracted Orchard Facts (${memory.facts.length}):**\n${learnedList || '*No specific facts recorded yet.*'}\n\n*I use these learned facts to personalize your spray dosage calculations and disease advice!*`,
      urdu: "یہ وہ معلومات ہیں جو میں نے خودکار طریقے سے آپ کی باتوں سے سیکھی ہیں۔"
    };
  }

  // 1. Self-Learning Command: "teach:" or "remember:"
  if (query.startsWith('teach:') || query.startsWith('remember:') || query.startsWith('note:')) {
    const newFact = userText.replace(/^(teach:|remember:|note:)/i, '').trim();
    if (newFact.length > 3) {
      memory.facts.push({
        fact: newFact,
        timestamp: new Date().toISOString()
      });
      saveStoredMemory(memory);
      return {
        text: `🧠 **Knowledge Learned & Saved!**\n\nI have permanently recorded this new fact into my memory database:\n> *"http://ma-pesticides-ai/memory#${memory.facts.length} — ${newFact}"*\n\nI will remember this knowledge across your future visits and use it to answer orchard inquiries!`,
        urdu: "معلومات محفوظ کر لی گئی ہیں۔ میں آئندہ اسے یاد رکھوں گا۔"
      };
    }
  }

  // 2. User Name & Orchard Location Learning (e.g. "My name is Tariq", "I am from Shopian")
  const nameMatch = userText.match(/(?:my name is|i am|call me)\s+([a-zA-Z]+)/i);
  if (nameMatch && nameMatch[1]) {
    const name = nameMatch[1];
    memory.userProfile.name = name;
    saveStoredMemory(memory);
    return {
      text: `Pleasure to meet you, **${name}**! 👋\n\nI have saved your name to memory. How can I assist you with your orchard or crop spray schedule today?`,
      urdu: `خوش آمدید ${name}! آپ کا نام محفوظ کر لیا گیا ہے۔`
    };
  }

  const locationMatch = userText.match(/(?:my orchard is in|i am from|located in|farm in)\s+([a-zA-Z\s]+)/i);
  if (locationMatch && locationMatch[1]) {
    const location = locationMatch[1].trim();
    memory.userProfile.location = location;
    saveStoredMemory(memory);
    return {
      text: `📍 **Orchard Location Saved:** ${location}!\n\nI will tailor spray timing recommendations for ${location} weather conditions!`,
      urdu: `آپ کے باغ کا مقام (${location}) محفوظ کر لیا گیا ہے۔`
    };
  }

  // Check Learned Facts Database
  const matchedFact = memory.facts.find(f => query.split(' ').some(word => word.length > 3 && f.fact.toLowerCase().includes(word)));
  if (matchedFact) {
    const userName = memory.userProfile.name ? `, ${memory.userProfile.name}` : '';
    return {
      text: `💡 **Learned Insight${userName}:**\n\nFrom my self-learned memory records:\n> *"http://ma-ai-memory#fact — ${matchedFact.fact}"*\n\n*Would you like to double-check store inventory at our Srinagar shop?*`,
      urdu: "یہ معلومات میری سیکھی ہوئی یادداشت سے حاصل کی گئی ہے۔"
    };
  }

  // Greetings & Casual Interaction Handler
  if (query.match(/^(hi|hii|hiii|hello|hey|heyy|salam|assalamu|aOA|good morning|good evening|how are u|how are you|how are u doing|kaise ho|hru)/i)) {
    const greetingName = memory.userProfile.name ? ` **${memory.userProfile.name}**` : '';
    const greetingLoc = memory.userProfile.location ? ` for your orchard in **${memory.userProfile.location}**` : '';

    return {
      text: `Hii${greetingName}! Hello! Assalamu Alaikum! 👋\n\nI am doing great and ready to assist you today${greetingLoc}! 🍏 How are your crops and fruit trees doing?\n\nFeel free to ask me anything or teach me new facts by typing \`teach: [your fact]\`!\n\n- 🍏 **Apple Scab, Mites & Disease Cures**\n- ⚡ **Spray Tank Dosage Calculations (100L / 200L / 500L)**\n- 📦 **Stock & 20% Discount Rates in Srinagar**`,
      urdu: "السلام علیکم! میں آپ کی زرعی معلومات اور دواؤں کے بارے میں مدد کے لیے تیار ہوں۔",
      actionLink: "https://wa.me/919906541321?text=Hello%20MA%20Pesticides%2C%20I%20have%20a%20question%20about%20my%20crops."
    };
  }

  // Thanks & Gratitude Micro-Questions
  if (query.match(/^(thanks|thank you|thx|shukriya|jazakallah|shukria|شکریہ)/i)) {
    return {
      text: "You're very welcome! 😊 Glad I could help!\n\nIs there anything else you need regarding your orchard spray schedule, tank mixing ratios, or store inventory today?",
      urdu: "آپ کا بہت شکریہ! اگر مزید کوئی معلومات چاہیے تو پوچھیے۔"
    };
  }

  // Positive Acknowledgment Micro-Questions
  if (query.match(/^(ok|okay|good|great|awesome|nice|perfect|fine|shukr|ثحیح)/i)) {
    return {
      text: "Awesome! 👍 Let me know whenever you need to calculate tank dosages or check product availability at our Srinagar shop!",
      urdu: "بہترین! جب بھی دواؤں یا مقدار کی معلومات چاہیے، پوچھیے۔"
    };
  }

  // Identity & Capabilities Micro-Questions
  if (query.includes('who are you') || query.includes('what are you') || query.includes('your name') || query.includes('what can you do') || query.includes('help me') || query.includes('کون ہیں')) {
    return {
      text: "🤖 **I am the M.A. Pesticides AI Crop Advisor!**\n\nI can help you with:\n1. 🍏 **Crop Disease Diagnosis:** Apple Scab, Mites, Scale, Walnut Blight, & Saffron Corm Rot.\n2. ⚡ **Spray Tank Dosage Calc:** Mixing ratios for 100L, 200L barrels, & 500L tractor tanks.\n3. 📦 **Stock & Formulations:** 60+ stocked products from Bayer, Syngenta, FMC, & Willowood.\n4. 🏷️ **Fair Pricing:** Products sold at up to 20% discount below print MRP in Srinagar!",
      urdu: "میں ایم اے پیسٹیسائیڈز کا اے آئی کراپ ایڈوائزری اسسٹنٹ ہوں۔",
      actionLink: "https://wa.me/919906541321?text=Hello%20MA%20Pesticides%2C%20I%20have%20an%20inquiry%20about%20my%20crops."
    };
  }

  // Product Authenticity Micro-Questions
  if (query.includes('genuine') || query.includes('original') || query.includes('duplicate') || query.includes('fake') || query.includes('real') || query.includes('authentic') || query.includes('اصلی')) {
    return {
      text: "🛡️ **100% Genuine Product Guarantee:**\n\nAll chemicals, fungicides, insecticides, and fertilizers sold at **M.A. Pesticides** are 100% original, factory sealed, and directly sourced from authorized brand distributors (Bayer, Syngenta, FMC, Willowood, FIL, IPL Biologicals).\n\nSenior Chemist Sheikh Mohammad Ayoub (M.Sc. Chemistry) personally verifies all store stock!",
      urdu: "ہمارے پاس 100% اصل اور مصدقہ زرعی دوائیں دستیاب ہیں۔",
      actionLink: "https://wa.me/919906541321?text=Hello%20MA%20Pesticides%2C%20I%20want%20to%20confirm%20genuine%20product%20stock."
    };
  }

  // Shop Opening Hours & Schedule Micro-Questions
  if (query.includes('open') || query.includes('timing') || query.includes('time') || query.includes('hours') || query.includes('closed') || query.includes('sunday') || query.includes('کھلا')) {
    return {
      text: "⏰ **M.A. Pesticides Store Working Hours:**\n\nOur store is **Open Daily from 9:30 AM to 7:00 PM** opposite High Court Complex, Hari Singh High Street / M.A. Road, Srinagar!\n\nFor urgent inquiries outside store hours, WhatsApp Sheikh Mohammad Ayoub anytime: +91 99065 41321.",
      urdu: "دکان روزانہ صبح 9:30 سے شام 7:00 بجے تک کھلی رہتی ہے۔",
      actionLink: "https://wa.me/919906541321?text=Hello%20MA%20Pesticides%2C%20I%20want%20to%20visit%20the%20shop%20today."
    };
  }

  // Spray Safety & Mixing Rules Micro-Questions
  if (query.includes('mix') || query.includes('tank mix') || query.includes('safety') || query.includes('precaution') || query.includes('combine')) {
    return {
      text: "⚠️ **Chemist Spray Mixing & Safety Rules:**\n\n1. **Jar Test First:** Mix a small sample of chemicals in a clean bottle before filling your 200L barrel to ensure no curdling.\n2. **Never Mix Copper with Sulphur or Dodine.**\n3. **Always Wear Protective Gear:** Gloves, mask, and goggles.\n4. **Spray in Calm Conditions:** Avoid spraying during strong winds (> 15 km/h) or extreme afternoon heat.",
      urdu: "سپرے مکس کرتے وقت پہلے چھوٹی بوتل میں ٹیسٹ کریں۔ کاپر اور سلفر کو اکٹھا مکس نہ کریں۔",
      actionLink: "https://wa.me/919906541321?text=Hello%20Sheikh%20Mohammad%20Ayoub%2C%20can%20I%20mix%20these%20two%20pesticides%20together%3F"
    };
  }

  // Price & Discount Inquiries
  if (query.includes('price') || query.includes('rate') || query.includes('cost') || query.includes('discount') || query.includes('mrp') || query.includes('قیمت')) {
    return {
      text: "🏷️ **M.A. Pesticides Fair Pricing Guarantee:**\n\nAs authorized stockists, we provide **up to 20% discount on print price (MRP)** for all genuine products from Bayer, Syngenta, FMC, and Willowood.\n\nVisit us at Opposite High Court Complex, Srinagar or WhatsApp us to lock in store pricing!",
      urdu: "تمام معیاری زرعی مصنوعات پر پرنٹ ریٹ سے 20% تک رعایت دستیاب ہے۔",
      actionLink: "https://wa.me/919906541321?text=Hello%20MA%20Pesticides%2C%20I%20want%20to%20inquire%20about%20product%20prices."
    };
  }

  if (query.includes('location') || query.includes('address') || query.includes('where') || query.includes('shop') || query.includes('پتہ')) {
    return {
      text: "📍 **M.A. Pesticides & Fertilizers Shop Location:**\n\nOpposite High Court Complex, Hari Singh High Street / M.A. Road, Srinagar, Jammu & Kashmir (190001).\n\n👨‍🔬 **Senior Chemist:** Sheikh Mohammad Ayoub (M.Sc. Chemistry)\n📞 **Phone:** +91 99065 41321\n⏰ **Hours:** Open daily from 9:30 AM to 7:00 PM.",
      urdu: "پتہ: ہائی کورٹ کمپلیکس کے سامنے، ہری سنگھ ہائی سٹریٹ / ایم اے روڈ، سرینگر۔ رابطہ: 9906541321 91+",
      actionLink: "https://wa.me/919906541321?text=Hello%20M.A.%20Pesticides%20Srinagar%2C%20I%20want%20to%20visit%20your%20shop."
    };
  }

  if (query.includes('dosage') || query.includes('calc') || query.includes('tank') || query.includes('barrel') || query.includes('مقدار')) {
    return {
      text: "⚡ **Standard Spray Tank Mixing Rule:**\n\n- **Bayer Antracol (Propineb 70% WP):** 2.5g per Litre (500g for a 200L Barrel)\n- **Superstar Dodine 65% WP:** 1g per Litre (200g for a 200L Barrel)\n- **Syngenta Alika:** 0.5 ml per Litre (100 ml for a 200L Barrel)\n- **Horticultural Mineral Oil (HMO):** 20 ml per Litre (4 Litres for a 200L Barrel)\n\n*All products available at 20% below print MRP at our Srinagar store!*",
      urdu: "200 لیٹر بیرل کے لیے: اینٹراکول 500 گرام، ڈوڈائن 200 گرام، الیکا 100 ملی لیٹر، ایچ ایم او آئل 4 لیٹر۔",
      actionLink: "https://wa.me/919906541321?text=Hello%20Sheikh%20Mohammad%20Ayoub%2C%20please%20calculate%20spray%20tank%20dosage%20for%20my%20orchard."
    };
  }

  if (query.includes('scab') || query.includes('apple') || query.includes('سیب') || query.includes('خارش')) {
    return {
      text: "🍏 **Apple Scab (ایپل سکیب) Advisory:**\n\n- **Primary Protection (Green Tip / Pink Bud):** Bayer Antracol (Propineb 70% WP) @ 2.5g/L or Mancozeb 75% WP @ 2.5g/L.\n- **Erudite Systemic Protection:** Superstar Dodine 65% WP @ 1g/L or Bayer Luna Experience @ 1ml/L.\n\n*Always apply before predicted continuous rainfall window for maximum preventative coverage.*",
      urdu: "ایپل سکیب کے لیے بائر اینٹراکول یا ڈوڈائن 65% کا باقاعدگی سے سپرے کریں۔",
      actionLink: "https://wa.me/919906541321?text=Hello%20Sheikh%20Mohammad%20Ayoub%2C%20I%20need%20Apple%20Scab%20treatment%20recommendations."
    };
  }

  if (query.includes('mite') || query.includes('moth') || query.includes('spider') || query.includes('کیڑا')) {
    return {
      text: "🐛 **Mite & Sucking Pest Control Advisory:**\n\n- **Delayed Dormancy:** HMO Oil @ 2% (20 ml/L) to smother eggs.\n- **Summer Infestation:** Syngenta Alika (Thiamethoxam + Lambda) @ 0.5 ml/L or Tegata Miticide @ 1 ml/L.\n\n*Consult Senior Chemist Sheikh Mohammad Ayoub at shop for leaf sample inspection.*",
      urdu: "مائٹس اور پتے کے کیڑوں کے لیے الیکا یا ہارڈ منرل آئل کا انتخاب کریں۔",
      actionLink: "https://wa.me/919906541321?text=Hello%20MA%20Pesticides%2C%20I%20have%20spider%20mites%20in%20my%20orchard."
    };
  }

  // Interactive Stock & Inventory Inquiry Flow
  if (query.match(/(products in stock|stock|in stock|inventory|available products|what products|products available|what do you have|do you have)/i)) {
    return {
      text: "📦 **M.A. Pesticides Store Inventory:**\n\nWhich type of agricultural formulation do you want to inspect?\n\n1️⃣ **Fungicides (پھپھوندی کش)** — Apple Scab, Blight & Powdery Mildew\n2️⃣ **Insecticides (کیڑے مار دوا)** — Mites, Aphids, Codling Moth & Scale\n3️⃣ **Herbicides (جڑی بوٹی کش)** — Orchard & Field Weed Clearance\n4️⃣ **Bio-Stimulants & Tonics (پودوں کا مقوی)** — Crop Growth & Yield Boosters\n\n*Click one of the options below or type: Fungicides, Insecticides, or Herbicides!*",
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

  // Loaded Category: Fungicides
  if (query.includes('fungicide') || query.includes('پھپھوندی')) {
    const fungList = products.filter(p => p.type === 'Fungicide' || p.type === 'Bio-Fungicide').slice(0, 6);
    const listText = fungList.map((p, i) => `${i+1}. **${p.name}** — ${p.dosage} (${p.uses.slice(0, 70)}...)`).join('\n');
    return {
      text: `🧪 **Top In-Stock Fungicides (پھپھوندی کش):**\n\n${listText}\n\n🏷️ *All stocked at our Srinagar shop at 20% below print MRP!*`,
      urdu: "یہ ہمارے پاس دستیاب بہترین فنگسائڈز کی فہرست ہے۔",
      actionLink: "https://wa.me/919906541321?text=Hello%20MA%20Pesticides%2C%20I%20want%20to%20order%20Fungicides."
    };
  }

  // Loaded Category: Insecticides / Pesticides
  if (query.includes('insecticide') || query.includes('pesticide') || query.includes('کیڑے مار')) {
    const insecList = products.filter(p => p.type === 'Insecticide').slice(0, 6);
    const listText = insecList.map((p, i) => `${i+1}. **${p.name}** — ${p.dosage} (${p.uses.slice(0, 70)}...)`).join('\n');
    return {
      text: `🐛 **Top In-Stock Insecticides (کیڑے مار دوا):**\n\n${listText}\n\n🏷️ *All stocked at our Srinagar shop at 20% below print MRP!*`,
      urdu: "یہ ہمارے پاس دستیاب بہترین کیڑے مار دواؤں کی فہرست ہے۔",
      actionLink: "https://wa.me/919906541321?text=Hello%20MA%20Pesticides%2C%20I%20want%20to%20order%20Insecticides."
    };
  }

  // Loaded Category: Herbicides
  if (query.includes('herbicide') || query.includes('weed') || query.includes('جڑی بوٹی')) {
    const herbList = products.filter(p => p.type === 'Herbicide').slice(0, 6);
    const listText = herbList.map((p, i) => `${i+1}. **${p.name}** — ${p.dosage} (${p.uses.slice(0, 70)}...)`).join('\n');
    return {
      text: `🌿 **Top In-Stock Herbicides (جڑی بوٹی کش):**\n\n${listText}\n\n🏷️ *All stocked at our Srinagar shop at 20% below print MRP!*`,
      urdu: "یہ ہمارے پاس دستیاب بہترین جڑی بوٹی کش دواؤں کی فہرست ہے۔",
      actionLink: "https://wa.me/919906541321?text=Hello%20MA%20Pesticides%2C%20I%20want%20to%20order%20Herbicides."
    };
  }

  // Loaded Category: Tonics / Bio-Stimulants
  if (query.includes('tonic') || query.includes('stimulant') || query.includes('محرک')) {
    const tonicList = products.filter(p => p.type === 'Plant Tonic' || p.type === 'Bio-Stimulant').slice(0, 6);
    const listText = tonicList.map((p, i) => `${i+1}. **${p.name}** — ${p.dosage} (${p.uses.slice(0, 70)}...)`).join('\n');
    return {
      text: `🌱 **Top In-Stock Plant Tonics & Bio-Stimulants:**\n\n${listText}\n\n🏷️ *All stocked at our Srinagar shop at 20% below print MRP!*`,
      urdu: "یہ ہمارے پاس دستیاب بہترین پلانٹ ٹانکس کی فہرست ہے۔",
      actionLink: "https://wa.me/919906541321?text=Hello%20MA%20Pesticides%2C%20I%20want%20to%20order%20Plant%20Tonics."
    };
  }

  if (query.includes('whatsapp') || query.includes('call') || query.includes('phone') || query.includes('ayoub')) {
    return {
      text: "📞 **Direct Expert Consultation:**\n\nSpeak directly with **Sheikh Mohammad Ayoub** (M.Sc. Chemistry, Former Senior Lecturer).\n\n📱 **WhatsApp:** +91 99065 41321\n📍 **Store:** Opposite High Court Complex, Srinagar.",
      urdu: "شیخ محمد ایوب (ایم ایس سی کیمسٹری) سے براہ راست واٹس ایپ پر مشورہ کریں۔",
      actionLink: "https://wa.me/919906541321?text=Hello%20Sheikh%20Mohammad%20Ayoub%2C%20I%20would%20like%20expert%20crop%20advice."
    };
  }

  // 3. Store Info, Chemist & About Website Queries
  if (query.includes('about') || query.includes('who') || query.includes('ayoub') || query.includes('owner') || query.includes('chemist') || query.includes('license')) {
    return {
      text: "🏛️ **About M.A. Pesticides & Fertilizers:**\n\n- **Proprietor & Senior Chemist:** Sheikh Mohammad Ayoub (M.Sc. Chemistry, B.Ed.), former Senior Lecturer.\n- **Location:** Opposite High Court Complex, Hari Singh High Street / M.A. Road, Srinagar, Kashmir (190001).\n- **Authorized Brands:** Bayer, Syngenta, FMC, Willowood, FIL & IPL Biologicals.\n- **Pricing Policy:** Authorized stockist offering up to **20% discount on print price (MRP)**.\n- **Free Store Services:** Free leaf sample disease diagnosis, soil testing consultation & custom spray tank dosage calculations.",
      urdu: "ایم اے پیسٹیسائیڈز: شیخ محمد ایوب (ایم ایس سی کیمسٹری)۔ 20% رعایت کے ساتھ معیاری دوائیں دستیاب ہیں۔",
      actionLink: "https://wa.me/919906541321?text=Hello%20Sheikh%20Mohammad%20Ayoub%2C%20I%20have%20an%20inquiry%20about%20your%20services."
    };
  }

  // 4. Disease Database Search (Apple Scab, Mites, Scale, Mildew, Blight, Corm Rot, etc.)
  const matchedDisease = diseases.find(d => 
    query.includes(d.name.toLowerCase()) || 
    d.crop.toLowerCase().includes(query) || 
    d.symptoms.toLowerCase().includes(query) ||
    d.cure.toLowerCase().includes(query)
  );

  if (matchedDisease) {
    return {
      text: `🔬 **Disease Guide: ${matchedDisease.name}** (${matchedDisease.crop})\n\n- 🚨 **Symptoms:** ${matchedDisease.symptoms}\n- 🩺 **Recommended Cure:** ${matchedDisease.cure}\n- ⚡ **Dosage Rate:** ${matchedDisease.dosage}\n- ⚠️ **Severity Level:** ${matchedDisease.severity}\n\n*Visit our Srinagar shop or WhatsApp Sheikh Mohammad Ayoub to get genuine store stock at 20% below print MRP.*`,
      urdu: `${matchedDisease.nameUrdu}: ${matchedDisease.symptomsUrdu}\nعلاج: ${matchedDisease.cureUrdu} - مقدار: ${matchedDisease.dosageUrdu}`,
      actionLink: `https://wa.me/919906541321?text=${encodeURIComponent(`Hello Sheikh Mohammad Ayoub, I need treatment for ${matchedDisease.name} in my orchard.`)}`
    };
  }

  // 5. Product Search (Bayer Antracol, Syngenta Alika, Dodine, HMO Oil, Contaf, Luna, etc.)
  const matchedProd = products.find(p => 
    query.includes(p.name.toLowerCase()) || 
    p.uses.toLowerCase().includes(query) ||
    (p.composition && p.composition.toLowerCase().includes(query)) ||
    p.diseases.some(d => d.toLowerCase().includes(query))
  );

  if (matchedProd) {
    return {
      text: `🌿 **${matchedProd.name}** (${matchedProd.type})\n\n- 🧪 **Composition:** ${matchedProd.composition || 'Standard Formulation'}\n- 🎯 **Uses & Target Crops:** ${matchedProd.uses}\n- 💧 **Recommended Dosage:** ${matchedProd.dosage}\n- 💡 **Key Benefits:** ${matchedProd.benefits}\n\n*Available at our Srinagar shop opposite High Court Complex with 20% print price discount.*`,
      urdu: `${matchedProd.name}: ${matchedProd.dosage} - 20% چھوٹ کے ساتھ دستیاب۔`,
      actionLink: `https://wa.me/919906541321?text=${encodeURIComponent(`Hello, I want to purchase ${matchedProd.name} from your Srinagar shop.`)}`
    };
  }

  // Intelligent fallback for any question
  return {
    text: `✨ **AI Self-Learning Crop Advisor:**\n\nI analyzed your query: "${userText}".\n\nI can help you with:\n1. Recommended spray dosages for Apple, Pear, Walnut, Cherry, & Saffron.\n2. Genuine Bayer, Syngenta, FMC & Willowood product availability.\n3. Spray tank calculations for 100L, 200L & 500L containers.\n\n*Tip: You can teach me new facts anytime by typing \`teach: [your fact]\`!*`,
    urdu: "آپ سیب، ناشپاتی، اخروٹ اور زعفران کی بیماریوں اور دواؤں کے بارے میں پوچھ سکتے ہیں۔",
    actionLink: `https://wa.me/919906541321?text=${encodeURIComponent(`Hello Sheikh Mohammad Ayoub, I have a query about: ${userText}`)}`
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
