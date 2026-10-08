import { useState, useRef, useEffect, useMemo } from 'react';
import {
  Bot, X, Send, Sparkles, MessageCircle, ExternalLink, RefreshCw,
  ArrowRight, Mic, MicOff, Volume2, VolumeX, ShieldAlert, Droplets,
  Calendar, Phone, MapPin, CheckCircle, Info, Beaker, Leaf, AlertTriangle
} from 'lucide-react';
import { products, diseases } from '../data/agricultureData';
import '../pages/urdu.css';

// ============================================================================
// 1. SKUAST-K Stage Spray Knowledge Base (Kashmir Climate Specific)
// ============================================================================
const SKUAST_STAGES = [
  {
    id: 'dormant',
    name: 'Dormant / Winter Spray',
    nameUrdu: 'خوابیدہ حالت کا سپرے',
    timing: 'January – February',
    keyPests: 'San Jose Scale, Overwintering Mites & Eggs, Woolly Aphid in bark crevices',
    recommendation: 'Horticultural Mineral Oil (HMO 3–4%)',
    dosage: '30–40 ml HMO per Litre of water (6–8 Litres per 200L barrel). Spray until entire bark drips.',
    cautions: 'Do NOT spray below freezing (4°C min) or if frost is forecast within 24 hrs. This single spray wipes out 80% of overwintering scales and mite eggs.',
    products: ['Cyclone 505 (Insecticide)']
  },
  {
    id: 'green_tip',
    name: 'Delayed Dormancy / Green Tip',
    nameUrdu: 'گرین ٹپ مرحلہ (شروع بہار)',
    timing: 'Late March – Early April',
    keyPests: 'Apple Scab primary ascospore release, Scale, Early Mites',
    recommendation: 'HMO 2% + Dodine 65% WP or Copper Oxychloride 50% WP',
    dosage: '20 ml HMO + 1.5 g Dodine per Litre of water (4L HMO + 300g Dodine per 200L barrel).',
    cautions: 'Kashmir snowmelt triggers primary scab ascospore discharge from overwintered floor leaves. Spray before continuous leaf wetness exceeds 9 hours.',
    products: ['Superstar Dodeine (Fungicide)', 'Cyclone 505 (Insecticide)']
  },
  {
    id: 'pink_bud',
    name: 'Pink Bud Stage',
    nameUrdu: 'پنک بڈ مرحلہ (شگوفے نکلنے پر)',
    timing: 'Mid April',
    keyPests: 'Apple Scab, Powdery Mildew, Sucking Pests (Aphids/Thrips)',
    recommendation: 'Bayer Luna Experience (Fluopyram + Tebuconazole) or Bayer Antracol (Propineb 70% WP)',
    dosage: '1 ml Luna Experience or 2.5 g Antracol per Litre of water (200 ml Luna or 500g Antracol per 200L).',
    cautions: '⚠️ MOST CRITICAL SPRAY OF THE YEAR! April spring rains in Kashmir cause maximum scab infection. Re-spray if more than 25mm rain falls within 48 hours.',
    products: ['Luna (Bayer)', 'Antracol (Bayer)']
  },
  {
    id: 'full_bloom',
    name: 'Full Bloom / Blossom Stage',
    nameUrdu: 'مکمل پھول کا مرحلہ',
    timing: 'Late April',
    keyPests: 'Fire Blight (Erwinia amylovora), Blossom Rot',
    recommendation: 'Streptocycline 0.5 g/L + Copper Oxychloride 2 g/L (Applied strictly alone early morning)',
    dosage: '10g Streptocycline + 400g Copper per 200 Litres of water.',
    cautions: '⚠️ STRICT WARNING: NEVER spray broad-spectrum chemical insecticides during bloom! It kills honeybees essential for apple pollination. Only target Fire Blight if blossom blight symptoms appear.',
    products: ['Superstar Dodeine (Fungicide)']
  },
  {
    id: 'petal_fall',
    name: 'Petal Fall / Pea Stage',
    nameUrdu: 'پھل بننے کا ابتدائی مرحلہ (مٹر دانہ)',
    timing: 'Early May',
    keyPests: 'Apple Scab, Codling Moth 1st Generation, Sucking Aphids, Red Mites',
    recommendation: 'Tata Sarthak (Hexaconazole 5% EC) or Syngenta Alika + Tata Takumi (Flubendiamide)',
    dosage: '1 ml Hexaconazole + 0.5 ml Alika per Litre of water (200 ml Hexa + 100 ml Alika per 200L).',
    cautions: 'Codling moth first flight begins when nighttime temps cross 15°C. Target sprays 7-10 days after 75% petal drop.',
    products: ['Syngenta Alika (Insecticide)', 'Tata Sarthak (Fungicide)', 'Tata Takumi (Insecticide)']
  },
  {
    id: 'june_drop',
    name: 'June Drop / Fruitlet Protection',
    nameUrdu: 'جون میں پھل جھڑنا — تحفظی سپرے',
    timing: 'Late May – Mid June',
    keyPests: 'European Red Mite, Secondary Scab, Powdery Mildew',
    recommendation: 'Mitofix (Propargite 57% EC) + Antracol + Life80 Surfactant',
    dosage: '1.5 ml Mitofix + 2 g Antracol + 0.5 ml Life80 per Litre (300 ml Mitofix + 400g Antracol per 200L).',
    cautions: 'Kashmir June temperatures (28-34°C) trigger explosive mite flare-ups. Check leaf undersides with hand lens. Always add Life80 non-ionic surfactant for uniform droplet spread.',
    products: ['Mitofix (Insecticide)', 'Antracol (Bayer)', 'Life80 (Spreader, Non-ionic Surfactant)']
  },
  {
    id: 'fruit_development',
    name: 'Fruit Development & Sizing',
    nameUrdu: 'پھل کی افزائش کا مرحلہ',
    timing: 'June – July',
    keyPests: 'Alternaria Leaf Blotch, Secondary Scab, San Jose Crawlers, Codling Moth 2nd Gen',
    recommendation: 'Willowood Carmel (Carbendazim + Mancozeb) or Difenoconazole 25% + Kozen (Chlorantraniliprole)',
    dosage: '2 g Carmel or 0.5 ml Difenoconazole + 0.4 ml Kozen per Litre of water.',
    cautions: 'Alternaria thrives during warm humid rains. Alternate fungicide chemical groups (FRAC codes) to prevent resistance.',
    products: ['Willowood Carmel (Fungicide)', 'Difenoconazole 25% (Willowood)', 'Kozen (Insecticide)']
  },
  {
    id: 'pre_harvest',
    name: 'Pre-Harvest / Color Development',
    nameUrdu: 'پھل پکنے اور رنگت کا مرحلہ',
    timing: 'August – September',
    keyPests: 'Fruit Rot, Storage Scab, Bitter Rot, Fly Speck',
    recommendation: 'Fargo Super (Captan 50% WP) or Mancozeb 75% WP',
    dosage: '2 g Captan per Litre of water. Apply 15–20 days prior to harvest.',
    cautions: 'Observe Pre-Harvest Interval (PHI) of 14-21 days. Ensures fruit stores cleanly in CA (Controlled Atmosphere) cold stores without rot.',
    products: ['Fargo Super', 'Stargem-45 (Fungicide)']
  },
  {
    id: 'post_harvest',
    name: 'Post-Harvest / Autumn Fall',
    nameUrdu: 'خزاں میں پتوں کے گرنے کا سپرے',
    timing: 'October – November (Leaf Fall)',
    keyPests: 'Overwintering Scab Inoculum, Canker Bacteria, Fungal Spores',
    recommendation: 'Agricultural Urea 5% solution (50g/L) + Copper Oxychloride 50% WP (3g/L)',
    dosage: '10 kg Urea + 600g Copper Oxychloride per 200L water sprayed directly on tree canopy when 50% leaves have fallen.',
    cautions: 'Urea accelerates leaf litter decomposition on the orchard floor, starving the scab fungus and reducing next spring ascospore pressure by up to 70%!',
    products: ['Proma Gro (Chaubatia Paste)', 'Filpostar Proponib (Fungicide)']
  }
];

// ============================================================================
// 2. Comprehensive Agronomy & Horticultural Knowledge Base
// ============================================================================
const GENERAL_AGRONOMY_KB = [
  {
    keywords: ['prun', 'cutting', 'katayi', 'shakh tarashi', 'trimming'],
    title: '✂️ Apple & Fruit Tree Pruning Advisory',
    response: `✂️ **Apple & Fruit Tree Pruning Advisory (Kashmir Conditions):**\n\n- 📅 **Optimal Timing:** January to February (Dormant period before bud swell, when daily temps are above 0°C).\n- 🎯 **Pruning System:** Central Leader (Modified) for standard trees; Slender Spindle for high-density M9 rootstocks.\n- 🔬 **Key Steps:**\n  1. Remove dead, diseased (canker-infected), and criss-crossing water sprouts.\n  2. Open the central canopy to maximize sunlight penetration for fruit color development.\n  3. Maintain 45°–60° branch angles for heavy fruit-bearing capacity.\n- ⚠️ **Critical Precaution:** Always sterilize pruning shears with 70% alcohol or copper wash between cuts. Paint all cut wounds larger than 2 cm immediately with **Proma Gro Chaubatia Paste** to prevent Canker and Silver Leaf fungus.`
  },
  {
    keywords: ['urea', 'nitrogen', 'leaf fall', 'autumn urea', 'khazaan'],
    title: '🌾 Urea & Autumn Sanitation Spray',
    response: `🌾 **Agricultural Urea Guide for Kashmir Orchards:**\n\n- 🍂 **Post-Harvest / Autumn Foliar Spray (Most Critical):**\n  - **Dosage:** 5% Agricultural Urea (**10 kg per 200L barrel** of water).\n  - **Timing:** October–November when ~50% leaves have turned yellow/fallen.\n  - **Benefit:** Accelerates leaf decomposition on the orchard floor, destroying overwintering Apple Scab (*Venturia inaequalis*) pseudothecia and reducing spring fungal inoculum by up to **70%**!\n- 🌱 **Spring Soil Application:** Apply Urea in split doses: 1st dose at Green Tip/Bud Burst; 2nd dose 3 weeks after Petal Fall. Avoid excessive nitrogen in late summer, which causes soft fruit and poor color.`
  },
  {
    keywords: ['yellow', 'chlorosis', 'leaves turning yellow', 'peele patte', 'zard'],
    title: '🍂 Yellowing Leaves (Chlorosis) Diagnosis',
    response: `🍂 **Why Are Your Apple Leaves Turning Yellow? (Diagnosis & Cure):**\n\n1. 🟡 **Iron/Zinc Deficiency (Interveinal Chlorosis):** Young leaves turn pale yellow while veins stay green. Cause: Alkaline high-pH soil in parts of Kashmir.\n   - **Cure:** Foliar spray of Chelated Micronutrients / **IPL 5G Neo+** (2 ml/L) or Zinc Sulphate.\n2. 🕷️ **European Red Mite Attack:** Leaves turn dull bronze or yellow-brown with dusty undersides.\n   - **Cure:** Spray **Mitofix (Propargite 57% EC)** @ 1.5 ml/L.\n3. 💧 **Waterlogging / Collar Rot:** Lower leaves wilt, yellow, and drop due to poor drainage.\n   - **Cure:** Expose root collar, drench with **Ridomil Gold** (3g/L), and improve soil trench drainage.`
  },
  {
    keywords: ['size', 'increase size', 'bada kaise', 'fruit growth', 'weight', 'fruitlet', 'motayi'],
    title: '🍎 How to Increase Apple Fruit Size & Color',
    response: `🍎 **How to Maximize Apple Fruit Size, Weight & Color (SKUAST Protocol):**\n\n1. ✂️ **Early Fruit Thinning (Crucial):** Thin out clusters 15–20 days after petal fall, leaving only the central 'king blossom' fruitlet (1 fruit per 15–20 cm branch). Trees carrying excess fruit produce small, unmarketable apples.\n2. 💧 **Consistent Soil Moisture:** Apple fruit expands primarily through cell expansion in June–July. Ensure regular irrigation during dry spells (15–20L per tree every 4–5 days).\n3. 🌿 **Foliar Nutrition:**\n   - At Walnut/Pea stage: Spray **Calcium Nitrate** (5g/L) + **Boron** (1g/L) to enhance cell wall elasticity.\n   - At Fruit Sizing: Foliar spray of Potassium Schoenite or **Bublin NPK suspension** (2 ml/L).\n4. ☀️ **Canopy Sunlight:** Summer prune excessive water shoots in July to allow sunlight directly onto fruit clusters for rich red anthocyanin color development.`
  },
  {
    keywords: ['calcium', 'bitter pit', 'cork', 'spots on fruit', 'dhabbe fruit par'],
    title: '🦴 Calcium Nitrate & Bitter Pit Prevention',
    response: `🦴 **Calcium Nutrition & Bitter Pit Management in Apples:**\n\n- 🚨 **The Problem:** Bitter Pit appears as small, sunken, corky brown pits on fruit skin and flesh (common in Delicious apples in Kashmir), drastically degrading market price.\n- 🧪 **The Cause:** Calcium moves very slowly inside tree xylem. Fast shoot growth diverts calcium away from the fruit into leaves.\n- 🩺 **The Solution:** Apply 3–4 foliar sprays of **Agricultural Calcium Nitrate** (5 g per Litre of water = **1 kg per 200L barrel**) starting 4 weeks after petal fall at 14-day intervals.\n- 💡 **Bonus:** Enhances fruit firmness and gives 2–3 extra months of shelf life in CA cold storage.`
  },
  {
    keywords: ['boron', 'flower set', 'fruit drop', 'blossom drop', 'phool girna'],
    title: '🌸 Boron Advisory for Fruit Setting',
    response: `🌸 **Boron Spray for Flowering & Fruit Setting:**\n\n- 🎯 **Why Boron Matters:** Boron is vital for pollen grain germination, pollen tube elongation down the style, and initial cell division in developing fruitlets.\n- 📅 **Best Application Timing:**\n  1. **Pink Bud Stage:** 1 g Solubor (Boron 20%) per Litre of water.\n  2. **Petal Fall Stage:** Repeat at 1 g/L with Hexaconazole or fungicide.\n- ⚠️ **Precaution:** Never exceed 1g/L concentration, as excessive boron causes leaf margin scorching.`
  },
  {
    keywords: ['water', 'irrigation', 'pani', 'how much water', 'drip', 'paani'],
    title: '💧 Orchard Water & Irrigation Guidelines',
    response: `💧 **Water & Irrigation Guidelines for Kashmir Fruit Trees:**\n\n- 🌳 **Mature Apple Tree Requirement:** ~**20–30 Litres of water per day** during peak summer (June–August) fruit development.\n- 🚜 **High-Density Rootstocks (M9/M26):** Require daily drip irrigation (4–8 Litres per tree) because root systems are shallow.\n- 📅 **Critical Moisture Windows:**\n  1. **Bud Break to Petal Fall (April–May):** Dry spells cause flower drop.\n  2. **Fruit Expansion (June–July):** Moisture stress halts fruit cell expansion.\n- ⚠️ **Chemist Tip:** Avoid flooding the tree base trunk directly! Build raised mounds around the collar to prevent Phytophthora Collar Rot fungus.`
  },
  {
    keywords: ['contact', 'systemic', 'difference', 'fungicide types', 'dawa ka farq'],
    title: '🔬 Contact vs. Systemic Fungicides Explained',
    response: `🔬 **Contact vs. Systemic Fungicides (Chemist Guide):**\n\n1. 🛡️ **Contact Fungicides (e.g. Bayer Antracol, Dodine, Mancozeb):**\n   - **Mechanism:** Remains strictly on the leaf and fruit surface, creating a protective chemical shield that kills fungal spores *before* they penetrate.\n   - **When to Use:** Pre-rain preventive sprays.\n   - **Rain-Fastness:** Needs **4–6 hours** of dry sunny weather to bind firmly with leaf wax cuticles.\n\n2. 🧬 **Systemic Fungicides (e.g. Bayer Luna, Hexaconazole, Score):**\n   - **Mechanism:** Absorbed through stomata into leaf vascular tissue, moving translaminarly to cure active infections already inside the plant.\n   - **When to Use:** Post-infection curative sprays (within 48–72h of a scab-promoting rain event).\n   - **Rain-Fastness:** Rain-safe within **1–2 hours** after application.`
  },
  {
    keywords: ['timing', 'best time', 'evening', 'morning', 'dhoop', 'time to spray', 'subah', 'sham'],
    title: '⏰ Best Time of Day to Spray Pesticides',
    response: `⏰ **Optimal Time of Day for Spray Application in Kashmir:**\n\n- 🌅 **Early Morning (6:00 AM – 9:30 AM):** Highly recommended! Winds are calm (< 5 km/h), relative humidity is high (preventing droplet evaporation), and leaves absorb systemic chemicals efficiently.\n- 🌇 **Late Afternoon (4:30 PM – 7:30 PM):** Excellent secondary window after mid-day heat subsides.\n- 🚫 **NEVER SPRAY AT MID-DAY (11:30 AM – 3:30 PM):** High temperatures (> 28°C) cause rapid chemical evaporation, photolysis degradation, and severe droplet lens scorching on tender apple skin!`
  },
  {
    keywords: ['weed', 'ghas', 'grass', 'herbicide', 'glyphosate', 'paraquat', 'weeds', 'bood'],
    title: '🌿 Orchard Weed Management & Herbicides',
    response: `🌿 **Orchard Weed Management (Safe Chemical Protocol):**\n\n- 🚜 **Non-Chemical Ring Weeding:** Clear a 1-meter radius clean basin around the tree trunk to prevent rodents and weed competition.\n- 🧴 **Contact Herbicide (Paraquat 24% SL / All Clear / Bragg):**\n  - **Dosage:** 5–6 ml per Litre of water.\n  - **Action:** Scorches all green foliage within 24 hours. Does not leave soil residue.\n- 🌾 **Systemic Herbicide (Glyphosate 41% SL / Gulftop):**\n  - **Dosage:** 8–10 ml per Litre for deep-rooted perennial grasses and tough weeds.\n- ⚠️ **STRICT WARNING:** Always use a spray hood attachment. Never allow herbicide drift to touch green apple bark, leaves, or trunk root suckers, or severe tree decline will occur!`
  },
  {
    keywords: ['organic', 'bio', 'natural', 'chemical free', 'trichoderma', 'qudrati'],
    title: '🌱 Organic & Bio-Pesticide Solutions',
    response: `🌱 **Organic & Biological Crop Protection at MA Pesticides:**\n\n- 🦠 **IPL Sanjeevni (Trichoderma Viride):** Biological antagonistic fungus for controlling root rot, collar rot, and soil wilt without synthetic chemicals (5–10 g/L soil drench).\n- 🌿 **IPL Neemkavach (Cold-pressed Neem Oil / Azadirachtin):** Natural botanical antifeedant repellent against sucking pests, whiteflies, and mites (3–5 ml/L).\n- 🪱 **Sikri Vermicompost:** 100% natural organic carbon and microbial amendment for restoring exhausted orchard soils (2–4 kg per tree).\n- 🍄 **IPL Vamshakti (Mycorrhiza):** Bio-fertilizer that expands root surface area by 300% for natural phosphorus and drought resistance.`
  },
  {
    keywords: ['soil', 'soil test', 'ph', 'testing', 'mitti', 'zameen'],
    title: '🧪 Soil Health & Testing Service',
    response: `🧪 **Soil Health & pH Advisory for Kashmir Valley:**\n\n- 🎯 **Optimal Orchard pH:** **6.0 – 6.8** (Slightly acidic to neutral). Many soils in Baramulla, Shopian, and Pulwama range from 6.8–7.6.\n- 🔬 **Free Service at MA Pesticides:** Bring 500g of dry soil collected 1 foot deep from your orchard tree dripline to our **Hari Singh High Street store in Srinagar** for free inspection and custom fertilizer dosage chart by **Sheikh Mohammad Ayoub** (M.Sc. Organic Chemistry)!`
  },
  {
    keywords: ['delivery', 'home delivery', 'bhejo', 'order', 'parcel', 'transport', 'deliver'],
    title: '📦 Order & Orchard Delivery Services',
    response: `📦 **Ordering & Delivery to Orchards across Kashmir:**\n\n- 🚚 **District Coverage:** We supply authorized factory batches to orchardists across **Srinagar, Budgam, Pulwama, Shopian, Baramulla, Anantnag, Kulgam, and Ganderbal**.\n- 💰 **Wholesale Privilege:** Direct factory pricing with **20% flat discount on print MRP**.\n- 📲 **How to Order:** Click the WhatsApp link below or call [+91 99065 41321](tel:+919906541321). Provide your tree count or product list, and our team will coordinate direct dispatch to your orchard!`
  },
  {
    keywords: ['ayoub', 'sheikh ayoub', 'sheikh mohammad ayoub', 'owner', 'founder', 'chemist'],
    title: '👨‍🔬 Sheikh Mohammad Ayoub (Founder & Chemist)',
    response: `👨‍🔬 **Sheikh Mohammad Ayoub — Founder & Managing Director:**\n\n- 🎓 **Credentials:** M.Sc. Organic Chemistry, B.Ed. — University of Kashmir.\n- 🏫 **Background:** Senior Chemistry educator for decades who dedicated his career to applying molecular chemical analysis to agriculture and fruit crop protection.\n- 🌿 **Mission:** Protecting Kashmir's fruit growers from counterfeit pesticides by supplying 100% factory-sealed stock from Bayer, Syngenta, and IPL Biologicals at genuine discounted rates.\n- 📍 **Consult Him:** In person at MA Pesticides, Hari Singh High Street, Srinagar or via WhatsApp at [+91 99065 41321](https://wa.me/919906541321).`
  },
  {
    keywords: ['behroze', 'sheikh behroze', 'developer', 'who created', 'who made this website', 'engineer', 'btech', 'developed this'],
    title: '👨‍💻 Sheikh Behroze Ayub (Website Developer)',
    response: `👨‍💻 **Developer Information:**\n\n**Sheikh Behroze Ayub (B.Tech CSE)** has developed it.\n\nHe designed, engineered, and developed this digital platform for **M.A. Pesticides & Fertilizers**, creating features such as the AI Crop Advisor, Interactive Dosage Calculator, SKUAST-guided Spray Schedules, and Orchard Health Analytics.`,
    imageEmbed: '/sheikh-behroze-signature.webp'
  },
  {
    keywords: ['who are you', 'what are you', 'kya kar sakte ho', 'help me', 'about yourself', 'what is this bot'],
    title: '🤖 About M.A. Pesticides AI Advisor',
    response: `🤖 **About M.A. Pesticides AI Crop Advisor:**\n\nI am your dedicated digital agronomy assistant for Kashmir fruit farming, powered by the chemical expertise of **Sheikh Mohammad Ayoub** (M.Sc. Organic Chemistry) and technical engineering of **Sheikh Behroze Ayub** (B.Tech CSE).\n\n💡 **I can answer ANY question about:**\n- 🍏 **Disease & Pest Diagnosis:** Apple Scab, Mites, Codling Moth, Canker, Mildew, Fire Blight\n- 🧮 **Precision Dosage:** Exact chemical grams/ml for any tree count or tank capacity\n- 🗓️ **SKUAST-K Schedules:** Stage-by-stage spray recommendations from Dormant to Harvest\n- ⚠️ **Tank Mix Compatibility:** Safe chemical combinations and WALES mixing order\n- 🌾 **Soil & Tree Nutrition:** Urea, Calcium Nitrate, Boron, NPK, Vermicompost\n- 📍 **Store & Discounts:** Genuine factory batches with 20% flat discount on print MRP`
  },
  {
    keywords: ['thank', 'thanks', 'shukriya', 'dhanwad', 'great', 'good job', 'zabardast'],
    title: '🙏 You are most welcome!',
    response: `🙏 **Shukriya! You are most welcome!**\n\nMay your orchard flourish with abundant, healthy fruit this season. If you need any more spray schedules, dosage calculations, or product availability, I am always here.\n\nFor in-person chemical analysis and a free leaf check, visit Sheikh Mohammad Ayoub at our **Hari Singh High Street shop in Srinagar**!`
  }
];

// Helper: Word score matching
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

// Helper: Format bold markdown safely
function formatBotText(text) {
  if (!text) return null;
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index} style={{ fontWeight: 600 }}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

// Strip markdown for TTS voice
function cleanTextForSpeech(text) {
  if (!text) return '';
  return text
    .replace(/\*\*/g, '')
    .replace(/[🍏🌤️⚡🐛📍👨‍💻🔬🌿🚨🩺💡⚠️🌳💧📦🧪✨🚨✅🐝🗓️✂️🌾🍂🍎🦴🌸⏰🌱🪱🍄🚜🧴🧬🟡🟡🦗]/g, '')
    .replace(/\[.*?\]/g, '')
    .trim();
}

// ============================================================================
// 3. Dynamic Question-Answering Synthesizer (Answers EVERY Question)
// ============================================================================
function generateUniversalAnswer(userText, query, words) {
  // Extract topic themes
  const isFruitQuery = query.match(/(apple|saib|walnut|akhrot|cherry|almond|badam|peach|pear|plum|grape|saffron|rice|paddy|dhan|tomato|potato|vegetable)/i);
  const isProblemQuery = query.match(/(rot|fungus|disease|pest|bug|worm|sundi|infe|decay|blight|scab|spot|fall|drop|burn|dead|dry|crack|hole|wilt)/i);
  const isFertilizerQuery = query.match(/(fertilizer|npk|manure|compost|potash|phosphate|zinc|micronutrient|tonic|spray|feed|growth)/i);
  const isPracticalQuery = query.match(/(how|why|when|where|which|can i|should i|kya|kaise|kab|kahan|kyun)/i);

  const fruitName = isFruitQuery ? isFruitQuery[0].charAt(0).toUpperCase() + isFruitQuery[0].slice(1) : 'Fruit Orchards';

  let customAdvice = '';
  if (isProblemQuery) {
    customAdvice = `\n\n🛡️ **Agronomic Defense Strategy:**\n- **Sanitation First:** Prune away and burn infected twigs or fallen leaves to eliminate fungal spore reserves.\n- **Preventive Fungicide / Insecticide Barrier:** Apply protective contact formulations (**Bayer Antracol 70% WP** @ 2.5g/L or **Superstar Dodine** @ 1g/L for fungal issues; **Syngenta Alika** @ 0.5ml/L for insect pests).\n- **Timing Window:** Ensure foliage dries for at least 4 hours post-spray.`;
  } else if (isFertilizerQuery) {
    customAdvice = `\n\n🌿 **Balanced Nutritional Protocol:**\n- **Soil Application:** Apply well-rotted organic manure / **Sikri Vermicompost** (2–4 kg/tree) in early spring basins.\n- **Foliar Nutrition:** Spray balanced **Bublin NPK 11:11:8 Suspension** (2 ml/L) or **IPL 5G Neo+ Bio-stimulant** (2 ml/L) during active fruitlet cell expansion.`;
  } else {
    customAdvice = `\n\n💡 **Chemist Best Practice:**\n- Always spray during calm weather (wind < 10 km/h) and moderate temperatures (15°C–25°C).\n- Maintain spray water pH between 5.5 and 6.5 to prevent alkaline hydrolysis of active chemical ingredients.`;
  }

  return {
    text: `✨ **Expert Chemist Advisory on: "${userText}"**\n\nRegarding your question for **${fruitName}** in Kashmir conditions:\n\nIn Kashmir horticulture, success depends on aligning chemical action with SKUAST-K stage phenology and local microclimate conditions.${customAdvice}\n\n🏷️ **Store Privilege:** All authorized formulations from Bayer, Syngenta, and IPL Biologicals are available at **20% flat discount on print MRP** directly at our Srinagar store.`,
    actionLink: `https://wa.me/919906541321?text=${encodeURIComponent(`Hello Sheikh Mohammad Ayoub, I need expert guidance regarding: "${userText}"`)}`,
    suggestions: ['🧮 Calculate 200L Tank Dosage', '🗓️ SKUAST Spray Stages', '⚠️ Check Tank Mix Rules', '📍 Srinagar Store Details']
  };
}

// ============================================================================
// 4. Master AI Decision & Advisory Engine
// ============================================================================
function getBotResponse(userText) {
  const query = userText.toLowerCase().trim();
  const words = query
    .split(/[\s,?.!]+/)
    .filter(w => !['the', 'and', 'is', 'for', 'in', 'to', 'of', 'a', 'an', 'what', 'how', 'which', 'where', 'who', 'my', 'i', 'have', 'me', 'please', 'can', 'you', 'give'].includes(w));

  // --------------------------------------------------------------------------
  // INTENT 1: Developer Inquiry (Priority Match)
  // --------------------------------------------------------------------------
  const isDevQuery = (
    /(who|kisne).*(develop|devolop|devlop|made|make|built|build|create|creat|design|code|program)/i.test(query) ||
    /(who|kisne).*(website|site|web|app|portal|bot|agent|software|project)/i.test(query) ||
    /\b(developer|developar|creator|programmer|coder|webmaster|web\s*dev)\b/i.test(query) ||
    /\b(sheikh\s+)?behroze(\s+ayub)?\b/i.test(query) ||
    query.includes('hjas developed') ||
    query.includes('has developed') ||
    query.includes('developed this') ||
    query.includes('who developed') ||
    query.includes('who made') ||
    query.includes('who built') ||
    query.includes('who created') ||
    query.includes('who designed')
  );

  if (isDevQuery) {
    return {
      text: `👨‍💻 **Developer Information:**\n\n**Sheikh Behroze Ayub (B.Tech CSE)** has developed it.\n\nHe designed, engineered, and developed this digital platform for **M.A. Pesticides & Fertilizers**, creating features such as the AI Crop Advisor, Interactive Dosage Calculator, SKUAST-guided Spray Schedules, and Orchard Health Analytics.`,
      imageEmbed: '/sheikh-behroze-signature.webp',
      actionLink: `https://wa.me/919906541321?text=${encodeURIComponent('Hello Sheikh Behroze Ayub, I visited the MA Pesticides website developed by you.')}`,
      suggestions: ['🍏 Ask Crop Disease Question', '🧮 Calculate Orchard Dosage', '🗓️ SKUAST Spray Schedule', '📍 Visit Srinagar Store']
    };
  }

  // --------------------------------------------------------------------------
  // INTENT 2: Chemical Tank Mix Compatibility & WALES Rule
  // --------------------------------------------------------------------------
  const isTankMixQuery = query.includes('mix') || query.includes('compatib') || query.includes('milana') || query.includes('milaye');
  if (isTankMixQuery) {
    if ((query.includes('dodine') || query.includes('dodeine')) && (query.includes('oil') || query.includes('hmo') || query.includes('mineral'))) {
      return {
        text: `🚨 **STRICT INCOMPATIBILITY WARNING:**\n\n**DO NOT mix Dodine with Horticultural Mineral Oil (HMO)!**\n\n- 🚫 **The Danger:** Mixing Dodine (Superstar Dodine) with oils, or applying within **14 days** of each other, dissolves the protective wax cuticles on apple leaves.\n- 💥 **Result:** Rapid phytotoxicity, severe leaf scorching, yellowing, and defoliation on Delicious varieties.\n- ⏱️ **Safe Practice:** Keep a strict **14-day gap** between an HMO oil spray and any Dodine application.`,
        actionLink: `https://wa.me/919906541321?text=${encodeURIComponent('Hello Sheikh Mohammad Ayoub, can you advise me on Dodine and oil spraying gap?')}`,
        suggestions: ['🧮 200L Tank Dosage Calc', '🗓️ Delayed Dormancy / Green Tip Stage', '🍏 Apple Scab Alternative']
      };
    }

    if (query.includes('copper') && (query.includes('sulfur') || query.includes('sulphur') || query.includes('lime'))) {
      return {
        text: `⚠️ **TANK MIX WARNING:**\n\n**Never mix Copper Fungicides with Lime Sulphur!**\n\n- 🚫 Chemical reaction causes precipitate breakdown and releases toxic free copper ions, scorching leaves and fruit russeting.\n- 💡 Always spray Copper Oxychloride strictly as a standalone formulation or dormant wash.`,
        suggestions: ['🗓️ Dormant Spray Guide', '⚡ Tank Mixing Order (WALES)']
      };
    }

    return {
      text: `🧪 **Scientific Tank Mixing Protocol (The WALES Method):**\n\nTo prevent chemical curdling, nozzle clogging, or crop injury, always mix chemicals in this exact order:\n\n1. 💧 **W (Water):** Fill spray barrel 50%–70% full with clean water (pH 5.5 – 6.5). Avoid muddy ditch water!\n2. 🌾 **W (Wettable Powders):** Pre-mix WP powders (**Antracol 70%**, **Dodine 65%**) in a bucket with a little water before pouring in.\n3. 🔄 **A (Agitate):** Stir or run pump agitation continuously.\n4. 💧 **L (Liquid Flowables):** Add SC, ZC or flowable suspensions (**Alika**, **Kozen**, **Luna**).\n5. 🛢️ **E (Emulsifiable Concentrates):** Add EC formulations (**Cyclone 505**, **Mitofix**, **HMO**).\n6. 🧼 **S (Solubles & Surfactants):** Add foliar tonics and non-ionic spreaders (**Life80**) last for uniform leaf wetting.`,
      actionLink: `https://wa.me/919906541321?text=${encodeURIComponent('Hello Sheikh Mohammad Ayoub, please verify my tank mix compatibility.')}`,
      suggestions: ['🍏 Apple Scab Treatment', '⚡ 200L Tank Dosage Calc', '🗓️ SKUAST-K Spray Stages']
    };
  }

  // --------------------------------------------------------------------------
  // INTENT 3: SKUAST-K Stage-wise Spray Schedule
  // --------------------------------------------------------------------------
  const matchedStage = SKUAST_STAGES.find(s => {
    const sId = s.id.toLowerCase();
    return query.includes(sId) ||
      (query.includes('dormant') && sId.includes('dormant')) ||
      (query.includes('green tip') && sId.includes('green_tip')) ||
      (query.includes('pink bud') && sId.includes('pink_bud')) ||
      ((query.includes('bloom') || query.includes('blossom') || query.includes('flower')) && sId.includes('bloom')) ||
      ((query.includes('petal fall') || query.includes('pea stage')) && sId.includes('petal_fall')) ||
      (query.includes('june drop') && sId.includes('june_drop')) ||
      ((query.includes('fruit development') || query.includes('sizing')) && sId.includes('fruit_dev')) ||
      ((query.includes('pre harvest') || query.includes('color')) && sId.includes('pre_harvest')) ||
      ((query.includes('post harvest') || query.includes('autumn') || query.includes('urea')) && sId.includes('post_harvest'));
  });

  if (matchedStage || (query.includes('stage') && (query.includes('spray') || query.includes('next')))) {
    const stage = matchedStage || SKUAST_STAGES[2]; // Default to Pink Bud

    return {
      text: `🗓️ **SKUAST-K Orchard Spray Advisory:**\n\n📌 **Stage:** **${stage.name}** (${stage.nameUrdu})\n📅 **Optimal Window:** ${stage.timing}\n🎯 **Target Pests:** ${stage.keyPests}\n\n🧪 **Recommended Formulation:**\n- **Chemical:** **${stage.recommendation}**\n- **Standard Dosage:** ${stage.dosage}\n\n💡 **Expert Chemist Note:**\n${stage.cautions}`,
      stageEmbed: stage,
      actionLink: `https://wa.me/919906541321?text=${encodeURIComponent(`Hello Sheikh Mohammad Ayoub, I need genuine products for ${stage.name} spray.`)}`,
      suggestions: ['🧮 Calculate 200L Tank Dosage', '⚠️ Check Tank Mix Compatibility', '🌤️ Check Srinagar Weather Window', '📦 View Product Stock']
    };
  }

  // --------------------------------------------------------------------------
  // INTENT 4: Orchard Dosage & Equipment Capacity Calculator
  // --------------------------------------------------------------------------
  const kanalMatch = query.match(/(\d+(?:\.\d+)?)\s*(?:kanal|kanals|کنال)/i);
  const treeMatch = query.match(/(\d+)\s*(?:tree|trees|پودے|درخت|apple trees)/i);
  const barrelMatch = query.match(/(\d+)\s*(?:barrel|barrels|drum|drums|tank|tanks|200l)/i);
  const litreMatch = query.match(/(\d+)\s*(?:litre|litres|liter|liters|l\b)/i);
  const isDosageQuery = query.includes('dosage') || query.includes('calculate') || query.includes('quantity') || query.includes('kitna') || query.includes('tanki') || query.includes('dawa kitni');

  if (kanalMatch || treeMatch || barrelMatch || litreMatch || (isDosageQuery && query.length < 50)) {
    let estWaterLitre = 200;
    let scaleDescription = '1 Standard Orchard Barrel (200 Litres)';

    if (litreMatch) {
      estWaterLitre = parseInt(litreMatch[1], 10);
      scaleDescription = `${estWaterLitre} Litres Tank Capacity`;
    } else if (barrelMatch) {
      const bCount = parseInt(barrelMatch[1], 10);
      estWaterLitre = bCount * 200;
      scaleDescription = `${bCount} Orchard Barrel(s) (${estWaterLitre} Litres)`;
    } else if (treeMatch) {
      const trees = parseInt(treeMatch[1], 10);
      estWaterLitre = Math.round(trees * 18);
      scaleDescription = `${trees} Mature Apple Trees (~${estWaterLitre} Litres)`;
    } else if (kanalMatch) {
      const kanals = parseFloat(kanalMatch[1]);
      estWaterLitre = Math.round(kanals * 350);
      scaleDescription = `${kanals} Kanal(s) of Orchard (~${estWaterLitre} Litres)`;
    }

    const barrels200L = (estWaterLitre / 200).toFixed(1);
    const antracolGrams = Math.round(estWaterLitre * 2.5);
    const dodineGrams = Math.round(estWaterLitre * 1.0);
    const alikaMl = Math.round(estWaterLitre * 0.5);
    const hmoLitres = (estWaterLitre * 0.02).toFixed(1);

    return {
      text: `🧮 **Precision Chemical Dosage Calculation:**\n\n- 🌳 **Orchard / Tank Scale:** **${scaleDescription}**\n- 💧 **Total Water Volume:** **${estWaterLitre} Litres** (${barrels200L} x 200L barrels)\n\n📦 **SKUAST-K Standard Quantities:**\n1. 🍏 **Bayer Antracol 70% WP (Scab Contact):** **${antracolGrams}g** (${(antracolGrams / 500).toFixed(1)} packets of 500g)\n2. 🛡️ **Superstar Dodine 65% WP (Curative):** **${dodineGrams}g** (${(dodineGrams / 500).toFixed(1)} packets)\n3. 🐛 **Syngenta Alika Insecticide:** **${alikaMl} ml** (${(alikaMl / 100).toFixed(1)} bottles of 100ml)\n4. 🛢️ **Horticultural Mineral Oil (HMO 2%):** **${hmoLitres} Litres** (${(hmoLitres / 5).toFixed(1)} cans of 5L)\n\n💰 **Shop Privilege:** Get all factory-sealed stock at **20% flat discount on print MRP** directly at MA Pesticides Srinagar!`,
      actionLink: `https://wa.me/919906541321?text=${encodeURIComponent(`Hello Sheikh Mohammad Ayoub, please reserve spray products for ${scaleDescription} (${estWaterLitre}L water).`)}`,
      suggestions: ['⚠️ Tank Mixing Order (WALES)', '🗓️ Pink Bud Stage Schedule', '🌤️ Spray Weather Window', '📍 Store Location Srinagar']
    };
  }

  // --------------------------------------------------------------------------
  // INTENT 5: Agronomy Knowledge Base Match (Nutrition, Pruning, Irrigation, etc.)
  // --------------------------------------------------------------------------
  for (const item of GENERAL_AGRONOMY_KB) {
    const isMatch = item.keywords.some(k => query.includes(k.toLowerCase()));
    if (isMatch) {
      return {
        text: item.response,
        imageEmbed: item.imageEmbed,
        actionLink: `https://wa.me/919906541321?text=${encodeURIComponent(`Hello Sheikh Mohammad Ayoub, I need further guidance regarding: ${item.title}`)}`,
        suggestions: ['🧮 Calculate 200L Tank Dosage', '🗓️ SKUAST-K Spray Calendar', '⚠️ Check Tank Mix Safety', '📍 Srinagar Store Details']
      };
    }
  }

  // --------------------------------------------------------------------------
  // INTENT 6: Weather & Spray Timing Window
  // --------------------------------------------------------------------------
  if (query.includes('weather') || query.includes('srinagar') || query.includes('rain') || query.includes('forecast') || query.includes('barish') || query.includes('mausam')) {
    return {
      text: `🌤️ **Srinagar Orchard Weather & Spray Suitability Window:**\n\n- 🌡️ **Temperature:** Optimal Spray Range: **15°C – 25°C** (Avoid sprays above 28°C or below 4°C).\n- 🌬️ **Wind Speed:** < 10 km/h (Calm – prevents chemical drift and wastage).\n- 🌧️ **Rain-Fastness Advisory:**\n  - **Contact Fungicides (Antracol, Mancozeb):** Require **4–6 hours** of rain-free drying time to form a protective layer.\n  - **Systemic Fungicides (Luna, Score, Hexaconazole):** Absorbed into plant tissue within **2 hours**.\n\n⚠️ **Chemist Rule:** Spray contact fungicide **before** anticipated rainfall to protect emerging buds from moisture-borne scab ascospores!`,
      actionLink: `https://wa.me/919906541321?text=${encodeURIComponent('Hello Sheikh Mohammad Ayoub, what is the best spray timing for Srinagar weather today?')}`,
      suggestions: ['🍏 Apple Scab Treatment', '⚡ 200L Tank Dosage Calc', '🗓️ Spray Calendar', '📍 Srinagar Store Details']
    };
  }

  // --------------------------------------------------------------------------
  // INTENT 7: Store Location, Consultation & Pricing
  // --------------------------------------------------------------------------
  if (query.includes('location') || query.includes('address') || query.includes('shop') || query.includes('store') || query.includes('contact') || query.includes('phone') || query.includes('discount') || query.includes('rate') || query.includes('pata') || query.includes('kahan') || query.includes('dukaan')) {
    return {
      text: `📍 **M.A. Pesticides & Fertilizers — Srinagar Store Details:**\n\n- 🏢 **Address:** Near Exhibition Road, opp. High Court Complex, Hari Singh High Street, Srinagar — 190001\n- 📞 **Expert Chemist Helpline:** [+91 99065 41321](tel:+919906541321)\n- 🕒 **Store Timings:** Monday – Saturday: **9:00 AM – 7:00 PM**\n- 🔬 **In-Store Consultation:** Guided by **Sheikh Mohammad Ayoub** (M.Sc. Organic Chemistry, B.Ed. — University of Kashmir).\n- 🏷️ **Guaranteed Discount:** **20% flat discount on print MRP** across all Bayer, Syngenta, and IPL Biologicals lines.\n- 🌿 **Complimentary Service:** Free leaf and soil inspection for orchardists.`,
      actionLink: `https://wa.me/919906541321?text=${encodeURIComponent('Hello Sheikh Mohammad Ayoub, I want to visit your Srinagar shop.')}`,
      suggestions: ['🍏 Apple Scab Treatment', '⚡ 200L Tank Dosage Calc', '🗓️ SKUAST Spray Stages', '👨‍💻 Website Developer']
    };
  }

  // --------------------------------------------------------------------------
  // INTENT 8: Friendly Greeting
  // --------------------------------------------------------------------------
  if (query.match(/^(hi|hello|hey|salam|assalamu|good morning|namaste|adaab)/i)) {
    return {
      text: `Assalamu Alaikum! 👋\n\nI am the **M.A. Pesticides AI Orchard Advisor**, guided by decades of organic chemistry expertise from **Sheikh Mohammad Ayoub**.\n\nHow can I protect your harvest today?\n\n- 🍏 **Crop Disease Doctor:** Diagnose Apple Scab, Red Mites, Mildew & Canker\n- 🧮 **Precision Dosage Calculator:** Tell me your tree count or tank size (e.g. \`50 trees\` or \`200L\`)\n- 🗓️ **SKUAST-K Spray Calendar:** Get stage-by-stage spray recommendations\n- ⚠️ **Tank Mixing Safety:** Check chemical compatibility & WALES mixing rules`,
      actionLink: "https://wa.me/919906541321?text=Hello%20MA%20Pesticides%2C%20I%20have%20a%20question%20about%20my%20crops.",
      suggestions: ['🍏 Apple Scab Treatment', '⚡ 200L Tank Dosage Calc', '🗓️ Pink Bud Stage Spray', '⚠️ Dodine + Oil Safety']
    };
  }

  // --------------------------------------------------------------------------
  // INTENT 9: Disease Diagnosis & Leaf Health Engine
  // --------------------------------------------------------------------------
  let bestDisease = null;
  let maxDiseaseScore = 0;
  diseases.forEach(d => {
    const score =
      scoreMatch(d.name, words) * 3 +
      scoreMatch(d.nameUrdu, words) * 2 +
      scoreMatch(d.crop, words) +
      scoreMatch(d.symptoms, words) * 2 +
      scoreMatch(d.cure, words);
    if (score > maxDiseaseScore) {
      maxDiseaseScore = score;
      bestDisease = d;
    }
  });

  if (bestDisease && maxDiseaseScore >= 3) {
    return {
      text: `🔬 **Crop Disease Advisory: ${bestDisease.name}**\n*${bestDisease.nameUrdu || ''}* (${bestDisease.crop})\n\n- 🚨 **Severity:** **${bestDisease.severity} Risk**\n- 🩺 **Symptoms:** ${bestDisease.symptoms}\n- 💊 **Recommended Cure:** **${bestDisease.cure}**\n- ⚡ **Dosage Rate:** ${bestDisease.dosage}\n\n💡 **Application Tip:** Spray early morning (7–10 AM) or late afternoon (4–7 PM) when relative humidity ensures uniform droplet coverage on foliage.`,
      diseaseEmbed: bestDisease,
      actionLink: `https://wa.me/919906541321?text=${encodeURIComponent(`Hello Sheikh Mohammad Ayoub, I need treatment for ${bestDisease.name} in my orchard.`)}`,
      suggestions: ['🧮 Calculate Tank Dosage for this Cure', '⚠️ Check Tank Mix Compatibility', '🌤️ Srinagar Spray Window', '📦 Check In-Store Stock']
    };
  }

  // --------------------------------------------------------------------------
  // INTENT 10: Product Catalog & Brand Lookup Engine
  // --------------------------------------------------------------------------
  let bestProd = null;
  let maxProdScore = 0;
  products.forEach(p => {
    const score =
      scoreMatch(p.name, words) * 3 +
      scoreMatch(p.type, words) +
      scoreMatch(p.uses, words) +
      scoreMatch(p.composition, words) * 2;
    if (score > maxProdScore) {
      maxProdScore = score;
      bestProd = p;
    }
  });

  if (bestProd && maxProdScore >= 3) {
    return {
      text: `🌿 **${bestProd.name}** (${bestProd.type})\n\n- 🧪 **Active Formulation:** ${bestProd.composition || 'Authorized Formulation'}\n- 🎯 **Target Uses:** ${bestProd.uses}\n- 💧 **Recommended Dosage:** **${bestProd.dosage}**\n- ✨ **Benefits:** ${bestProd.benefits}\n\n🏷️ **MA Pesticides Pricing:** Guaranteed **20% discount on print MRP** with 100% genuine factory batch seal.`,
      productEmbed: bestProd,
      actionLink: `https://wa.me/919906541321?text=${encodeURIComponent(`Hello, I want to purchase genuine ${bestProd.name} with 20% discount.`)}`,
      suggestions: ['🧮 Calculate 200L Barrel Dosage', '⚠️ Check Tank Mix Compatibility', '🗓️ Spray Calendar Stage', '📍 Srinagar Shop Location']
    };
  }

  // --------------------------------------------------------------------------
  // INTENT 11: Universal Dynamic Question Answering (Answers Every Question!)
  // --------------------------------------------------------------------------
  return generateUniversalAnswer(userText, query, words);
}

// ============================================================================
// 5. Main Component: AdvisorChatbot
// ============================================================================
export default function AdvisorChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "👋 Assalamu Alaikum! I am the **M.A. Pesticides AI Advisor**.\n\nAsk me **ANY question** about orchard dosages, apple scab spray schedules, chemical mixing rules, pruning, tree nutrition, or shop availability in Srinagar.",
      suggestions: ['🍏 Apple Scab Treatment', '⚡ 200L Tank Dosage Calc', '🗓️ Pink Bud Stage Spray', '👨‍💻 Website Developer']
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speakingIdx, setSpeakingIdx] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');

  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  // Auto scroll to latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  // Global event listeners for mobile BottomNav and quick touch buttons
  useEffect(() => {
    const handleOpen = (e) => {
      setIsOpen(true);
      if (e?.detail && typeof e.detail === 'string' && e.detail.trim()) {
        setInput(e.detail.trim());
      }
    };
    const handleToggle = () => setIsOpen(prev => !prev);
    const handleClose = () => setIsOpen(false);

    window.addEventListener('open-advisor-chat', handleOpen);
    window.addEventListener('toggle-advisor-chat', handleToggle);
    window.addEventListener('close-advisor-chat', handleClose);

    return () => {
      window.removeEventListener('open-advisor-chat', handleOpen);
      window.removeEventListener('toggle-advisor-chat', handleToggle);
      window.removeEventListener('close-advisor-chat', handleClose);
    };
  }, []);

  // Clean up speech on unmount
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      if (recognitionRef.current) {
        try { recognitionRef.current.abort(); } catch (e) { /* ignore */ }
      }
    };
  }, []);

  // Text-to-Speech handler
  const handleToggleSpeak = (idx, text) => {
    if (!window.speechSynthesis) return;

    if (speakingIdx === idx) {
      window.speechSynthesis.cancel();
      setSpeakingIdx(null);
      return;
    }

    window.speechSynthesis.cancel();
    const cleanText = cleanTextForSpeech(text);
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    utterance.onend = () => setSpeakingIdx(null);
    utterance.onerror = () => setSpeakingIdx(null);

    setSpeakingIdx(idx);
    window.speechSynthesis.speak(utterance);
  };

  // Speech-to-Text (Voice Recognition) handler
  const handleToggleListen = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice recognition is not supported in this browser. Please type your query!");
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInput(transcript);
          handleSend(transcript);
        }
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.error('Speech recognition error:', err);
      setIsListening(false);
    }
  };

  // Send message
  const handleSend = (textToSend) => {
    const queryText = (textToSend || input).trim();
    if (!queryText) return;

    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setSpeakingIdx(null);
    }

    const userMsg = { sender: 'user', text: queryText };
    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = getBotResponse(queryText);
      setMessages(prev => [...prev, { sender: 'bot', ...response }]);
      setIsTyping(false);
    }, 180);
  };

  // Reset chat
  const handleResetChat = () => {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    setSpeakingIdx(null);
    setMessages([
      {
        sender: 'bot',
        text: "👋 Assalamu Alaikum! Conversation reset.\n\nAsk me **ANY question** about dosages, pruning, apple scab, SKUAST stages, fertilizers, or mixing rules.",
        suggestions: ['🍏 Apple Scab Treatment', '⚡ 200L Tank Dosage Calc', '🗓️ Pink Bud Stage Spray', '👨‍💻 Website Developer']
      }
    ]);
  };

  // Filter tab quick prompts
  const activePrompts = useMemo(() => {
    if (activeCategory === 'dosage') {
      return [
        { label: '⚡ 200L Barrel Dosage', query: '200 litre barrel dosage' },
        { label: '🌳 50 Apple Trees Dosage', query: 'dosage for 50 trees' },
        { label: '🚜 1000L Tractor Tanker', query: '1000 litre tractor tanker dosage' },
        { label: '🎒 15L Knapsack Sprayer', query: '15L knapsack sprayer dosage' }
      ];
    }
    if (activeCategory === 'stages') {
      return [
        { label: '❄️ Dormant Winter Spray', query: 'Dormant winter spray' },
        { label: '🌱 Delayed Green Tip', query: 'Delayed green tip spray' },
        { label: '🌸 Pink Bud Stage', query: 'Pink bud stage spray' },
        { label: '🍏 Petal Fall Stage', query: 'Petal fall stage spray' },
        { label: '🍂 Autumn Urea Spray', query: 'Autumn leaf fall urea spray' }
      ];
    }
    if (activeCategory === 'mixing') {
      return [
        { label: '🚨 Dodine + HMO Incompatibility', query: 'Can I mix Dodine with oil?' },
        { label: '⚠️ Copper + Sulfur Rule', query: 'Can I mix Copper with Sulfur?' },
        { label: '🧪 WALES Mixing Method', query: 'What is the tank mixing order?' },
        { label: '🐝 Bloom Insecticide Rule', query: 'Can I spray insecticide during bloom?' }
      ];
    }
    if (activeCategory === 'diseases') {
      return [
        { label: '🍏 Apple Scab Treatment', query: 'Apple Scab spray' },
        { label: '🕸️ Spider Mites Cure', query: 'Spider Mites cure' },
        { label: '🍂 Alternaria Blotch', query: 'Alternaria Leaf Blight cure' },
        { label: '🪵 Collar Rot Drenching', query: 'Collar rot tree decay cure' }
      ];
    }
    if (activeCategory === 'nutrition') {
      return [
        { label: '🌾 Autumn Urea Spray', query: 'what is urea foliar spray?' },
        { label: '🍎 Increase Fruit Size', query: 'how to increase apple fruit size?' },
        { label: '🦴 Bitter Pit Calcium', query: 'calcium nitrate for bitter pit' },
        { label: '🍂 Yellowing Leaves', query: 'why are apple leaves turning yellow?' }
      ];
    }
    return [
      { label: '🍏 Apple Scab Treatment', query: 'Apple Scab spray' },
      { label: '⚡ 200L Tank Dosage Calc', query: '200 litre tank dosage' },
      { label: '✂️ How to Prune Trees', query: 'how to prune apple trees?' },
      { label: '🌾 Autumn Urea Spray', query: 'what is urea foliar spray?' },
      { label: '⚠️ Can I mix Dodine + HMO?', query: 'Can I mix Dodine with oil?' },
      { label: '📍 Shop Location & Address', query: 'shop location address' },
      { label: '👨‍💻 Website Developer', query: 'who developed this website' }
    ];
  }, [activeCategory]);

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="pill-button-filled advisor-chatbot-fab"
        aria-label="Open AI Crop Advisor"
        style={{
          boxShadow: '0 8px 30px rgba(28, 71, 42, 0.35)',
          background: 'var(--color-pine-green)',
          color: '#ffffff',
          fontWeight: 500
        }}
      >
        <Sparkles size={17} style={{ color: '#fbe1d1' }} />
        <span>Ask AI Advisor</span>
        <span style={{
          display: 'inline-block',
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: '#10b981',
          boxShadow: '0 0 8px #10b981'
        }} />
      </button>

      {/* Floating AI Composer Modal / Native Mobile Bottom Sheet */}
      {isOpen && (
        <>
          <div
            className="advisor-backdrop-mobile"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div className="advisor-chatbot-modal" role="dialog" aria-modal="true" aria-label="Orchard AI Advisor">
            {/* Mobile Sheet Handle */}
            <div className="advisor-mobile-handle" />
          {/* Header */}
          <div style={{
            padding: '14px 18px',
            borderBottom: '1px solid rgba(23, 25, 28, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'var(--surface-section-fog, #fafafb)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-pine-green, #1c472a)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 600,
                fontSize: '13px',
                boxShadow: '0 2px 8px rgba(28, 71, 42, 0.25)'
              }}>
                SA
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <h4 style={{ fontFamily: 'var(--font-signifier)', fontSize: '17px', fontWeight: 500, margin: 0, color: 'var(--color-ink-black)' }}>
                    Orchard AI Advisor
                  </h4>
                  <span style={{
                    fontSize: '10px',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    padding: '1px 6px',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(16, 185, 129, 0.15)',
                    color: '#047857'
                  }}>
                    Answers All Questions
                  </span>
                </div>
                <span style={{ fontSize: '11px', color: 'var(--color-slate-gray)' }}>
                  Guided by Sheikh M. Ayoub (M.Sc. Organic Chem)
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <button
                onClick={handleResetChat}
                title="Restart Consultation"
                aria-label="Restart consultation"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--color-slate-gray)',
                  padding: '6px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  transition: 'background 0.2s'
                }}
              >
                <RefreshCw size={15} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close Advisor"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--color-ink-black)',
                  padding: '6px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Mode Selector Tabs */}
          <div style={{
            display: 'flex',
            gap: '6px',
            padding: '8px 14px',
            backgroundColor: '#ffffff',
            borderBottom: '1px solid rgba(23, 25, 28, 0.05)',
            overflowX: 'auto',
            scrollbarWidth: 'none'
          }}>
            {[
              { id: 'all', label: '✨ All' },
              { id: 'dosage', label: '🧮 Dosage' },
              { id: 'stages', label: '🗓️ Stages' },
              { id: 'mixing', label: '⚠️ Tank Mix' },
              { id: 'diseases', label: '🔬 Diseases' },
              { id: 'nutrition', label: '🌾 Nutrition' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                style={{
                  padding: '4px 10px',
                  borderRadius: '14px',
                  fontSize: '11.5px',
                  fontWeight: activeCategory === tab.id ? 600 : 450,
                  whiteSpace: 'nowrap',
                  border: 'none',
                  cursor: 'pointer',
                  backgroundColor: activeCategory === tab.id ? 'var(--color-pine-green, #1c472a)' : 'rgba(23, 25, 28, 0.05)',
                  color: activeCategory === tab.id ? '#ffffff' : 'var(--color-ink-black)'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Messages Body */}
          <div style={{
            flex: 1,
            padding: '16px 16px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            backgroundColor: '#fcfcfc'
          }}>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '92%',
                  backgroundColor: msg.sender === 'user' ? 'var(--color-ink-black)' : 'var(--surface-card-mist, #ffffff)',
                  color: msg.sender === 'user' ? 'var(--surface-canvas, #ffffff)' : 'var(--color-ink-black)',
                  padding: '12px 16px',
                  borderRadius: msg.sender === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                  fontSize: '14px',
                  lineHeight: '1.45',
                  boxShadow: msg.sender === 'bot' ? '0 2px 10px rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(23, 25, 28, 0.06)' : 'none',
                  fontFamily: 'var(--font-sohne)'
                }}
              >
                {/* Message Header with Text-to-Speech toggle */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                  <div style={{ whiteSpace: 'pre-line', flex: 1 }}>{formatBotText(msg.text)}</div>
                  {msg.sender === 'bot' && (
                    <button
                      onClick={() => handleToggleSpeak(idx, msg.text)}
                      title={speakingIdx === idx ? 'Stop voice readout' : 'Listen to voice advice'}
                      aria-label="Read advice aloud"
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '2px',
                        color: speakingIdx === idx ? 'var(--color-pine-green)' : 'var(--color-ash-gray)',
                        flexShrink: 0
                      }}
                    >
                      {speakingIdx === idx ? <VolumeX size={15} /> : <Volume2 size={15} />}
                    </button>
                  )}
                </div>

                {/* Embedded Interactive Product Card */}
                {msg.productEmbed && (
                  <div style={{
                    marginTop: '10px',
                    padding: '10px',
                    borderRadius: '12px',
                    backgroundColor: 'var(--color-fog-white, #fafafb)',
                    border: '1px solid rgba(23, 25, 28, 0.08)',
                    display: 'flex',
                    gap: '10px',
                    alignItems: 'center'
                  }}>
                    {msg.productEmbed.image ? (
                      <img
                        src={msg.productEmbed.image}
                        alt={msg.productEmbed.name}
                        style={{
                          width: '48px',
                          height: '48px',
                          objectFit: 'cover',
                          borderRadius: '8px',
                          backgroundColor: '#ffffff',
                          border: '1px solid rgba(0,0,0,0.06)'
                        }}
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                    ) : (
                      <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '8px',
                        backgroundColor: 'var(--color-sage-tint, #eaf4ed)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--color-pine-green)'
                      }}>
                        <Leaf size={20} />
                      </div>
                    )}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 600, fontSize: '13px', color: 'var(--color-ink-black)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {msg.productEmbed.name}
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--color-slate-gray)' }}>
                        Dosage: {msg.productEmbed.dosage}
                      </div>
                      <div style={{ fontSize: '11px', color: '#047857', fontWeight: 600 }}>
                        20% Flat Discount at Srinagar Store
                      </div>
                    </div>
                  </div>
                )}

                {/* Embedded Stage Card */}
                {msg.stageEmbed && (
                  <div style={{
                    marginTop: '10px',
                    padding: '10px 12px',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(28, 71, 42, 0.05)',
                    border: '1px solid rgba(28, 71, 42, 0.15)',
                    fontSize: '12px'
                  }}>
                    <div style={{ fontWeight: 600, color: 'var(--color-pine-green)' }}>
                      SKUAST-K Guide: {msg.stageEmbed.timing}
                    </div>
                    <div style={{ color: 'var(--color-slate-gray)', marginTop: '2px' }}>
                      Recommended: {msg.stageEmbed.recommendation}
                    </div>
                  </div>
                )}

                {/* Embedded Developer Logo Badge */}
                {msg.imageEmbed && (
                  <div style={{
                    marginTop: '10px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '6px 14px 6px 8px',
                    borderRadius: '9999px',
                    backgroundColor: '#0a0c0f',
                    border: '1px solid rgba(212, 175, 55, 0.35)',
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.25)'
                  }}>
                    <img
                      src="/sb-emblem.webp"
                      alt="SB Logo"
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        border: '1px solid rgba(212, 175, 55, 0.65)',
                        objectFit: 'cover'
                      }}
                    />
                    <div style={{ lineHeight: '1.2', textAlign: 'left' }}>
                      <span style={{ fontSize: '9px', color: 'rgba(255, 255, 255, 0.55)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block' }}>
                        Designed &amp; Developed by
                      </span>
                      <span style={{ fontSize: '12.5px', color: '#d4af37', fontWeight: 600, fontFamily: 'var(--font-signifier)' }}>
                        Sheikh Behroze Ayub <span style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.7)', fontFamily: 'var(--font-sohne)', fontWeight: 400 }}>B.Tech CSE</span>
                      </span>
                    </div>
                  </div>
                )}

                {/* WhatsApp Action Button */}
                {msg.actionLink && (
                  <div style={{ marginTop: '10px', paddingTop: '8px', borderTop: '1px solid rgba(23, 25, 28, 0.06)' }}>
                    <a
                      href={msg.actionLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-link-arrow"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        color: msg.sender === 'user' ? '#fbe1d1' : 'var(--color-pine-green, #1c472a)',
                        fontSize: '13px',
                        fontWeight: 600,
                        textDecoration: 'none'
                      }}
                    >
                      <MessageCircle size={14} />
                      <span>Order / Confirm with Sheikh Ayoub</span>
                      <ArrowRight size={13} />
                    </a>
                  </div>
                )}

                {/* Contextual Smart Suggestion Chips */}
                {msg.suggestions && msg.suggestions.length > 0 && (
                  <div style={{
                    marginTop: '10px',
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '6px'
                  }}>
                    {msg.suggestions.map((s, sIdx) => (
                      <button
                        key={sIdx}
                        onClick={() => handleSend(s)}
                        style={{
                          background: 'rgba(23, 25, 28, 0.04)',
                          border: '1px solid rgba(23, 25, 28, 0.08)',
                          borderRadius: '12px',
                          padding: '4px 8px',
                          fontSize: '11.5px',
                          cursor: 'pointer',
                          color: 'var(--color-ink-black)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div style={{
                alignSelf: 'flex-start',
                padding: '8px 14px',
                borderRadius: '14px',
                backgroundColor: 'rgba(23, 25, 28, 0.04)',
                fontSize: '12px',
                color: 'var(--color-slate-gray)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <Sparkles size={13} style={{ animation: 'spin 2s linear infinite' }} />
                <span>Advisor synthesizing chemistry & agronomy knowledge...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Carousel */}
          <div style={{
            padding: '6px 14px',
            backgroundColor: 'var(--surface-section-fog, #fafafb)',
            borderTop: '1px solid rgba(23, 25, 28, 0.05)',
            display: 'flex',
            gap: '6px',
            overflowX: 'auto',
            scrollbarWidth: 'none'
          }}>
            {activePrompts.map((p, i) => (
              <button
                key={i}
                onClick={() => handleSend(p.query)}
                className="pill-button-ghost pill-button-sm"
                style={{
                  height: '28px',
                  fontSize: '11.5px',
                  padding: '0 10px',
                  whiteSpace: 'nowrap',
                  borderRadius: '14px',
                  backgroundColor: '#ffffff',
                  border: '1px solid rgba(23, 25, 28, 0.08)'
                }}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Listening Indicator Banner */}
          {isListening && (
            <div style={{
              backgroundColor: '#fee2e2',
              color: '#991b1b',
              padding: '6px 14px',
              fontSize: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontWeight: 500
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#ef4444',
                  animation: 'pulse 1s infinite'
                }} />
                <span>Listening... Speak your crop question</span>
              </div>
              <button
                onClick={handleToggleListen}
                style={{ background: 'none', border: 'none', color: '#991b1b', fontWeight: 600, cursor: 'pointer', fontSize: '11px' }}
              >
                Cancel
              </button>
            </div>
          )}

          {/* Input Footer Composer */}
          <div style={{
            padding: '12px 14px',
            backgroundColor: 'var(--surface-canvas, #ffffff)',
            borderTop: '1px solid rgba(23, 25, 28, 0.06)'
          }}>
            <div className="ai-composer-input" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="text"
                placeholder="Ask ANY question about spray, dosage, pruning, or rot..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                style={{ flex: 1 }}
              />

              {/* Speech-to-Text Mic Button */}
              <button
                type="button"
                onClick={handleToggleListen}
                title={isListening ? 'Stop listening' : 'Speak your question'}
                aria-label="Voice input"
                style={{
                  background: isListening ? '#ef4444' : 'rgba(23, 25, 28, 0.06)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: isListening ? '#ffffff' : 'var(--color-ink-black)',
                  cursor: 'pointer',
                  flexShrink: 0,
                  transition: 'all 0.2s'
                }}
              >
                {isListening ? <MicOff size={15} /> : <Mic size={15} />}
              </button>

              {/* Send Button */}
              <button
                type="button"
                onClick={() => handleSend()}
                className="ai-composer-send-btn"
                aria-label="Send message"
                style={{ flexShrink: 0 }}
              >
                <Send size={15} />
              </button>
            </div>
          </div>
        </div>
        </>
      )}
    </>
  );
}
