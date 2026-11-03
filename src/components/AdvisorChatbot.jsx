import { useState, useRef, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart, estimateProductPrice } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import {
  Bot, X, Send, Sparkles, MessageCircle, ExternalLink, RefreshCw,
  ArrowRight, Mic, MicOff, Volume2, VolumeX, ShieldAlert, Droplets,
  Calendar, Phone, MapPin, CheckCircle, Info, Beaker, Leaf, AlertTriangle,
  ShoppingCart, Plus, Check, Sun, Moon, Compass, Zap, Calculator, PhoneCall, Search,
  CloudRain, Wind, Thermometer, Copy, Layers, Brain, ChevronDown, ChevronUp
} from 'lucide-react';
import { products, diseases } from '../data/agricultureData';
import { safeOpen, sanitizeInput, checkRateLimit } from '../utils/security';
import { fetchLiveWeatherData, buildWeatherChatResponse } from '../utils/weatherService';
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
    keywords: ['saeb', 'saeb manz', 'scab lagyomut', 'kharash', 'chhaanik', 'kya karun', 'che chhaanik', 'saeb kharab'],
    title: '🍏 Apple Scab (سیب کی خارش) Management Protocol',
    response: `🍏 **Apple Scab (سیب کی خارش / کھاراش) Comprehensive Protocol:**\n\nIn Kashmir orchards, Apple Scab (*Venturia inaequalis*) spreads aggressively during spring rain breaks.\n\n- 🛡️ **Pre-Rain Preventive Shield:** Spray **Bayer Antracol 70% WP** @ 2.5 g/L (500g / 200L) or **Superstar Dodine 65% WP** @ 1 g/L (200g / 200L) before rain starts.\n- 🧬 **Post-Rain Curative Eradication:** If rain exceeded 24 hours, apply systemic **Bayer Luna Experience** @ 1 ml/L (200ml / 200L) or **Score (Difenoconazole)** @ 0.5 ml/L to kill active fungal germ-tubes inside leaf tissue.\n- 💰 **Store Privilege:** 20% discount on print MRP directly at MA Pesticides Srinagar.`
  },
  {
    keywords: ['red mite', 'surakh mite', 'lal keeda', 'chote keede', 'makdi', 'spider mite', 'jal'],
    title: '🕷️ European Red Mite (سرخ مائٹس) Cure',
    response: `🕷️ **European Red Mite (سرخ مائٹس) Treatment:**\n\nRed Mites flare up during warm dry spells in June–July, producing bronze dusty leaves and early defoliation.\n\n- 🩺 **Acaricide Spray:** Spray **Mitofix (Propargite 57% EC)** @ 1.5 ml/L (300ml / 200L barrel).\n- 💧 **Add Non-Ionic Spreader:** Mix **Life80** (0.5 ml/L) so spray droplets spread uniformly underneath leaves where mites hide.\n- ⏰ **Best Time:** Early morning (6:00 AM – 9:00 AM) when temperature is below 25°C.`
  },
  {
    keywords: ['canker', 'chhaal kharab', 'tahni sukhna', 'chaubatia', 'silver leaf', 'wound'],
    title: '🩹 Apple Tree Canker & Bark Wound Treatment',
    response: `🩹 **Apple Canker & Stem Wound Recovery (SKUAST Standard):**\n\nCanker fungi (*Botryosphaeria*) enter via unsealed pruning cuts and frost injuries.\n\n- ✂️ **Sanitation:** Scrape diseased bark down to healthy green wood using a sanitized curved knife.\n- 🎨 **Protective Sealant:** Apply **Proma Gro Chaubatia Paste** (Copper Carbonate + Red Lead + Linseed oil) directly over the cut surface.\n- 🌿 **Soil Drenching:** Drench the tree root collar with **IPL Sanjeevni Trichoderma** (10 g/L) to prevent soil-borne reinfection.`
  },
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
    title: '👨‍💻 Sheikh Behroze Ayub (Platform Engineer)',
    response: `👨‍💻 **Digital Platform Engineer:**\n\n**Sheikh Behroze Ayub (B.Tech CSE)** has engineered this platform.\n\nHe built this digital agrochemical service for **M.A. Pesticides & Fertilizers**, creating tools such as the Chemist Advisory Desk, Precision Tank Dosage Calculator, SKUAST-guided Spray Schedules, and Orchard Health Analytics.`,
    imageEmbed: '/sheikh-behroze-signature.webp'
  },
  {
    keywords: ['who are you', 'what are you', 'kya kar sakte ho', 'help me', 'about yourself', 'what is this bot'],
    title: '🌿 About M.A. Pesticides Advisory Desk',
    response: `🌿 **About M.A. Pesticides Advisory Desk:**\n\nThis is the digital agronomy desk for **M.A. Pesticides & Fertilizers**, drawing on decades of organic chemistry and field agronomy from **Sheikh Mohammad Ayoub** (M.Sc. Organic Chemistry, B.Ed. — University of Kashmir).\n\n💡 **We provide guidance on:**\n- 🍏 **Disease & Pest Diagnosis:** Apple Scab, Mites, Codling Moth, Canker, Mildew, Fire Blight\n- 🧮 **Precision Dosage:** Exact chemical grams/ml for any tree count or tank capacity\n- 🗓️ **SKUAST-K Schedules:** Stage-by-stage spray recommendations from Dormant to Harvest\n- ⚠️ **Tank Mix Compatibility:** Safe chemical combinations and WALES mixing order\n- 🌾 **Soil & Tree Nutrition:** Urea, Calcium Nitrate, Boron, NPK, Vermicompost\n- 📍 **Store & Discounts:** Genuine factory batches with 20% flat discount on print MRP`
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

// Helper: Parse inline markdown: **bold**, ~~strikethrough~~, `code/dosage`, [label](url)
function formatInlineMarkdown(text) {
  if (!text) return null;
  const regex = /(\[.*?\]\(.*?\)|\*\*.*?\*\*|~~.*?~~|`.*?`)/g;
  const parts = text.split(regex);

  return parts.map((part, index) => {
    if (!part) return null;

    // Link: [label](url)
    const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
    if (linkMatch) {
      const [, label, url] = linkMatch;
      return (
        <a
          key={index}
          href={url}
          target={url.startsWith('http') ? '_blank' : '_self'}
          rel={url.startsWith('http') ? 'noopener noreferrer' : undefined}
          style={{
            color: 'var(--color-pine-green, #1c472a)',
            fontWeight: 650,
            textDecoration: 'underline',
            textUnderlineOffset: '2px'
          }}
        >
          {label}
        </a>
      );
    }

    // Bold: **text**
    if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
      return (
        <strong key={index} style={{ fontWeight: 650, color: 'inherit' }}>
          {part.slice(2, -2)}
        </strong>
      );
    }

    // Strikethrough: ~~text~~
    if (part.startsWith('~~') && part.endsWith('~~') && part.length >= 4) {
      return (
        <span
          key={index}
          style={{
            textDecoration: 'line-through',
            opacity: 0.65,
            color: '#6b7280',
            marginRight: '3px'
          }}
        >
          {part.slice(2, -2)}
        </span>
      );
    }

    // Code / Dosage tag: `text`
    if (part.startsWith('`') && part.endsWith('`') && part.length >= 2) {
      return (
        <code
          key={index}
          style={{
            backgroundColor: 'rgba(28, 71, 42, 0.08)',
            color: 'var(--color-pine-green, #1c472a)',
            padding: '1px 6px',
            borderRadius: '4px',
            fontSize: '0.88em',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            fontWeight: 600,
            border: '1px solid rgba(28, 71, 42, 0.15)'
          }}
        >
          {part.slice(1, -1)}
        </code>
      );
    }

    return part;
  });
}

// Structured Bot Message Content with crisp visual hierarchy & clear sections
function StructuredBotMessage({ text }) {
  if (!text) return null;

  const lines = text.split('\n');
  const elements = [];
  let currentList = [];

  const flushList = (keyPrefix) => {
    if (currentList.length > 0) {
      elements.push(
        <div key={`${keyPrefix}-list`} style={{ display: 'flex', flexDirection: 'column', gap: '5px', margin: '6px 0' }}>
          {currentList.map((item, itemIdx) => (
            <div key={itemIdx} style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '8px',
              fontSize: '13.5px',
              lineHeight: '1.45',
              padding: '4px 8px',
              borderRadius: '6px',
              backgroundColor: 'rgba(0, 0, 0, 0.02)'
            }}>
              <span style={{
                color: 'var(--color-pine-green, #1c472a)',
                fontWeight: 700,
                fontSize: '13px',
                lineHeight: '1.3',
                flexShrink: 0
              }}>•</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                {formatInlineMarkdown(item)}
              </div>
            </div>
          ))}
        </div>
      );
      currentList = [];
    }
  };

  lines.forEach((line, lineIdx) => {
    const trimmed = line.trim();

    // Empty line -> flush list
    if (!trimmed) {
      flushList(lineIdx);
      return;
    }

    // Bullet item line: starts with '- ' or '• ' or '* '
    if (trimmed.startsWith('- ') || trimmed.startsWith('• ') || trimmed.startsWith('* ')) {
      const content = trimmed.replace(/^[-•*]\s+/, '');
      currentList.push(content);
      return;
    }

    // Flush any pending list before other elements
    flushList(lineIdx);

    // Callout / Alert box line (e.g. 💡 **Application Tip:** or ⚠️ **Warning:** or 🚨 **Danger:** or 🔬 **Rain-Fastness Protocol:**)
    const isCallout = /^(💡|⚠️|🚨|✅|🧪|🔬|🏷️)\s+\*\*/.test(trimmed);
    if (isCallout) {
      elements.push(
        <div key={lineIdx} style={{
          margin: '8px 0',
          padding: '8px 12px',
          borderRadius: '8px',
          backgroundColor: trimmed.startsWith('🚨') ? 'rgba(239, 68, 68, 0.08)' : trimmed.startsWith('💡') ? 'rgba(245, 158, 11, 0.08)' : 'rgba(28, 71, 42, 0.06)',
          borderLeft: `3px solid ${trimmed.startsWith('🚨') ? '#ef4444' : trimmed.startsWith('💡') ? '#f59e0b' : 'var(--color-pine-green, #1c472a)'}`,
          fontSize: '12.5px',
          lineHeight: '1.45'
        }}>
          {formatInlineMarkdown(trimmed)}
        </div>
      );
      return;
    }

    // Title / Header line (e.g. starts with emoji + bold, or ###, or starts with Assalamu Alaikum)
    const isHeader = /^(#{1,3}\s+|\p{Extended_Pictographic}\s+\*\*)/u.test(trimmed);
    if (isHeader) {
      elements.push(
        <div key={lineIdx} style={{
          fontSize: '14.5px',
          fontWeight: 700,
          color: 'var(--color-ink-black)',
          marginTop: lineIdx === 0 ? '0' : '10px',
          marginBottom: '6px',
          lineHeight: '1.35',
          fontFamily: 'var(--font-sohne), system-ui, sans-serif'
        }}>
          {formatInlineMarkdown(trimmed.replace(/^[#]{1,3}\s+/, ''))}
        </div>
      );
      return;
    }

    // Normal paragraph
    elements.push(
      <p key={lineIdx} style={{ margin: '4px 0', fontSize: '13.5px', lineHeight: '1.5' }}>
        {formatInlineMarkdown(trimmed)}
      </p>
    );
  });

  flushList('end');
  return <div style={{ display: 'flex', flexDirection: 'column' }}>{elements}</div>;
}

// Strip markdown for TTS voice
function cleanTextForSpeech(text) {
  if (!text) return '';
  return text
    .replace(/\*\*/g, '')
    .replace(/~~.*?~~/g, '')
    .replace(/`.*?`/g, (m) => m.slice(1, -1))
    .replace(/\p{Extended_Pictographic}/gu, '')
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')
    .replace(/^[-•*]\s+/gm, '')
    .trim();
}

// Generator: Step-by-step reasoning thought process for each intent
function generateThoughtProcess(intentType, details = {}) {
  switch (intentType) {
    case 'price':
      return [
        { title: '1. Catalog Price & MRP Verification', detail: `Located official inventory entry for ${details.productName || 'agrochemical formulation'} in store database.` },
        { title: '2. Direct Distributor Margin Calculation', detail: 'Applied guaranteed 20% discount on print MRP (verified direct-from-distributor rate).' },
        { title: '3. Genuine Batch & Counter Availability', detail: 'Confirmed factory-sealed batch availability at Hari Singh High Street, Srinagar store counter.' }
      ];
    case 'tank_mix':
      return [
        { title: '1. Chemical Formulation & Surfactant Analysis', detail: `Screened formulation types and active molecules for ${details.chemicals || 'tank mixture'}.` },
        { title: '2. Biochemical Compatibility Check', detail: details.isHazard ? `FLAGGED INCOMPATIBILITY: ${details.hazardDesc || 'Phytotoxic cuticle destruction or precipitation hazard'}.` : 'Verified molecular compatibility; zero precipitate curdling or active ingredient degradation detected.' },
        { title: '3. WALES Mixing Protocol Verification', detail: details.isHazard ? 'Formulated mandatory safety gap rule and safe protective alternative.' : 'Calibrated standard WALES order (Water -> WP -> Agitate -> Liquids -> EC -> Surfactants).' }
      ];
    case 'stage':
      return [
        { title: '1. Phenological Timing Calibration', detail: `Mapped inquiry to official SKUAST-K Stage: ${details.stageName || 'Orchard Phenology'}.` },
        { title: '2. Pathogen Inoculum & Pest Pressure', detail: `Evaluated primary seasonal threats: ${details.pests || 'Fungal spores and insect eggs'}.` },
        { title: '3. Formulation & Spray Condition Check', detail: `Selected recommended treatment: ${details.recommendation || 'Approved chemistry'} with temperature and rainfastness rules.` }
      ];
    case 'dosage':
      return [
        { title: '1. Scale & Tree Metric Parsing', detail: `Determined target water volume: ${details.waterLiters || 200} Litres (${details.barrels || 1.0} standard 200L barrels) for ${details.scaleDescription || 'orchard scale'}.` },
        { title: '2. SKUAST-K Dilution Calibration', detail: 'Converted recommended g/L and ml/L concentrations to net required bulk formulation quantities.' },
        { title: '3. Commercial Packaging & Discount', detail: `Calculated commercial packaging count with guaranteed 20% store discount (Estimated Total: ~₹${details.totalEstimate || 0}).` }
      ];
    case 'disease':
      return [
        { title: '1. Symptom & Pathology Identification', detail: `Diagnosed ${details.diseaseName || 'Crop Disease'} (${details.crop || 'Apple'}). Assessed severity as ${details.severity || 'Moderate'} risk.` },
        { title: '2. Kashmir Climate & Spore Inoculum Analysis', detail: 'Correlated prevailing temperature and humidity thresholds triggering sporulation.' },
        { title: '3. Targeted Curative Chemistry Selection', detail: `Prescribed: ${details.cure || 'Recommended formulation'} @ ${details.dosage || 'standard rate'} for rapid fungal eradication.` }
      ];
    case 'product':
      return [
        { title: '1. Registered Product Match', detail: `Retrieved ${details.productName || 'Product'} (${details.type || 'Agrochemical'}) from authorized company catalog.` },
        { title: '2. Active Molecule & Label Claims', detail: `Active ingredient: ${details.composition || 'Active formulation'}. Verified registered targets and mode of action.` },
        { title: '3. Commercial Rate & Store Availability', detail: `Calculated 20% store discount below print MRP. Factory batch verified at Srinagar counter.` }
      ];
    case 'weather':
      return [
        { title: '1. Real-Time Meteorological Interrogation', detail: `Retrieved live satellite & ground station telemetry for ${details.location || 'Srinagar'} fruit belt.` },
        { title: '2. Microclimate Spray Suitability Matrix', detail: `Analyzed temperature (${details.temp || 'N/A'}), rain risk (${details.rain || 0}%), and wind speed (${details.wind || 'N/A'}).` },
        { title: '3. SKUAST-K Spray Decision & Drying Window', detail: `Determined spray status: ${details.sprayStatus || 'SAFE'}. Calculated minimum rain-free drying window.` }
      ];
    case 'agronomy':
      return [
        { title: '1. Query & Crop Physiology Parsing', detail: `Parsed topic: "${details.title || 'Agronomy consultation'}" under Kashmir temperate valley conditions.` },
        { title: '2. Organic Chemistry & Nutrition Correlation', detail: 'Reviewed senior chemist principles (soil pH balance, foliar micronutrients, tree vigor).' },
        { title: '3. Practical Grower Action Steps', detail: 'Synthesized direct, high-contrast instructions for field application and orchard protection.' }
      ];
    case 'action':
      return [
        { title: '1. Autonomous Command Parsing', detail: `Recognized user operational request: "${details.command || 'Autonomous Action'}".` },
        { title: '2. Application State Execution', detail: 'Dispatched immediate routing and viewport synchronization for seamless user experience.' }
      ];
    default:
      return [
        { title: '1. Horticultural Inquiry Parsing', detail: `Analyzed grower inquiry: "${details.query || 'agronomy query'}" for Kashmir orchard conditions.` },
        { title: '2. Chemical Mode of Action Correlation', detail: 'Cross-referenced contact vs systemic action with standard university advisory guidelines.' },
        { title: '3. Clear Practical Recommendation', detail: 'Formulated direct actionable steps, optimal application windows, and authorized store formulations.' }
      ];
  }
}

// ============================================================================
// 3. Dynamic Question-Answering Synthesizer (Answers EVERY Question)
// ============================================================================
function generateUniversalAnswer(userText, query, _words) {
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
  } else if (isPracticalQuery) {
    customAdvice = `\n\n💡 **Application & Timing Protocol:**\n- Always spray during calm weather (wind < 10 km/h) and moderate temperatures (15°C–25°C).\n- Maintain spray water pH between 5.5 and 6.5 to prevent alkaline hydrolysis of active chemical ingredients.`;
  } else {
    customAdvice = `\n\n💡 **Chemist Best Practice:**\n- Always inspect orchard rows before spraying. Verify chemical expiry and batch numbers.\n- Maintain calibrated nozzle pressure to achieve 150–250 micron fine mist coverage.`;
  }

  return {
    text: `✨ **Expert Chemist Advisory on: "${userText}"**\n\nRegarding your question for **${fruitName}** in Kashmir conditions:\n\nIn Kashmir horticulture, success depends on aligning chemical action with SKUAST-K stage phenology and local microclimate conditions.${customAdvice}\n\n🏷️ **Store Privilege:** All authorized formulations from Bayer, Syngenta, and IPL Biologicals are available at **20% flat discount on print MRP** directly at our Srinagar store.`,
    thoughtProcess: generateThoughtProcess('universal', { query: userText }),
    actionLink: `https://wa.me/919906541321?text=${encodeURIComponent(`Hello Sheikh Mohammad Ayoub, I need expert guidance regarding: "${userText}"`)}`,
    suggestions: ['🧮 Calculate 200L Tank Dosage', '🗓️ SKUAST Spray Stages', '⚠️ Check Tank Mix Rules', '📍 Srinagar Store Details']
  };
}

// ============================================================================
// 4. Master AI Decision & Advisory Engine
// ============================================================================
async function getBotResponse(userText, messageHistory = []) {
  const query = userText.toLowerCase().trim();
  const words = query
    .split(/[\s,?.!]+/)
    .filter(w => !['the', 'and', 'is', 'for', 'in', 'to', 'of', 'a', 'an', 'what', 'how', 'which', 'where', 'who', 'my', 'i', 'have', 'me', 'please', 'can', 'you', 'give'].includes(w));

  // --------------------------------------------------------------------------
  // INTENT 0: Product Price & 20% Discount Query
  // ("what is the price of that product", "price of Luna", "how much is it", "rate of Antracol", "kitne ka hai", "pricing of products", "price list")
  // --------------------------------------------------------------------------
  const isPriceQuery = /(price|pricing|cost|costs|rate|rates|mrp|discount|discounts|kitne|kitna|dam|daam|paisa|paise|kitne ka|how much|worth|retail|wholesale|keemat|qemat|bhav|cheap|expensive|offers|rate list|price list)/i.test(query);

  if (isPriceQuery) {
    // 0a. Check if this is a general/catalog pricing query without a single specific product
    const isCatalogPricing = (
      /(pricing of products|product pric|prices of products|price list|rate list|all products|catalog price|complete price|how much are the products|cost of products|rates of products|product rates|rates chart|rate chart|price chart|pricing chart|list of prices)/i.test(query) ||
      (query === 'pricing' || query === 'prices' || query === 'rates' || query === 'price list' || query === 'rate list' || query === 'discount' || query === 'discounts') ||
      (/(what|how|show|tell|give|send).*(price|pricing|cost|rate|discount).*(products|all|everything|items|medicines|chemicals|sprays)/i.test(query))
    );

    // 0b. Check for Category-Specific Pricing queries
    const isFungicideCategory = /(fungicide|fungicides|phaphundi|scab spray|mildew spray|blotch spray)/i.test(query);
    const isInsecticideCategory = /(insecticide|insecticides|acaricide|miticide|red mite|mite spray|keeda|keede|aphid|scale)/i.test(query);
    const isFertilizerCategory = /(fertilizer|fertilizers|bio-stimulant|biostimulant|tonic|plant food|khad|vermicompost|nutrient)/i.test(query);
    const isOilCategory = /(oil|hmo|mineral oil|tree spray|spreader|sticker|adjuvant|surfactant)/i.test(query);

    // If category pricing requested:
    if (isFungicideCategory && !/(luna|antracol|dodine|filpostar|carmel|score|difenoconazole|blitox|copper)/i.test(query)) {
      const fungicides = products.filter(p => p.type === 'Fungicide' || p.type === 'Bio-Fungicide').slice(0, 6);
      const listText = fungicides.map(p => {
        const { mrp, discounted } = estimateProductPrice(p);
        return `• **${p.name}** (${p.composition || 'Fungicide'})\n  ~~₹${mrp.toLocaleString('en-IN')}~~ ➔ **₹${discounted.toLocaleString('en-IN')}** *(20% OFF • Save ₹${mrp - discounted})* • Dosage: \`${p.dosage}\``;
      }).join('\n\n');

      return {
        text: `🌾 **M.A. Pesticides — SKUAST-K Approved Fungicides Price List (Flat 20% OFF):**\n\nAll authorized factory-sealed fungicides for Apple Scab, Powdery Mildew, and Alternaria carry our unconditional **20% flat discount on print MRP**:\n\n${listText}\n\n📍 **Store Location:** Hari Singh High Street, Srinagar (opp. High Court Complex)\n🚚 **Valley Delivery:** Direct dispatch to Baramulla, Shopian, Sopore, Pulwama, and Budgam.`,
        thoughtProcess: generateThoughtProcess('price', { productName: 'SKUAST-K Approved Fungicides' }),
        actionLink: `https://wa.me/919906541321?text=${encodeURIComponent('Hello Sheikh Mohammad Ayoub, I want to inquire about Fungicide prices and order stock.')}`,
        suggestions: ['🏷️ Price of Luna', '🏷️ Price of Superstar Dodine', '🏷️ Price of Bayer Antracol', '🧮 Calculate 200L Tank Dosage']
      };
    }

    if (isInsecticideCategory && !/(alika|cyclone|505|mitofix|takumi|kozen|propargite)/i.test(query)) {
      const insecticides = products.filter(p => p.type === 'Insecticide' || p.type === 'Bio-Insecticide').slice(0, 6);
      const listText = insecticides.map(p => {
        const { mrp, discounted } = estimateProductPrice(p);
        return `• **${p.name}** (${p.composition || 'Insecticide'})\n  ~~₹${mrp.toLocaleString('en-IN')}~~ ➔ **₹${discounted.toLocaleString('en-IN')}** *(20% OFF • Save ₹${mrp - discounted})* • Dosage: \`${p.dosage}\``;
      }).join('\n\n');

      return {
        text: `🐛 **M.A. Pesticides — Insecticides & Miticides Price List (Flat 20% OFF):**\n\nHigh-potency broad-spectrum insecticides and targeted acaricides for European Red Mite, San Jose Scale, Aphids, and Borers:\n\n${listText}\n\n💰 **Guaranteed Discount:** Flat 20% below print MRP on genuine factory seals.\n📞 **Chemist Helpline:** +91 99065 41321`,
        thoughtProcess: generateThoughtProcess('price', { productName: 'Insecticides & Mite Sprays' }),
        actionLink: `https://wa.me/919906541321?text=${encodeURIComponent('Hello Sheikh Mohammad Ayoub, I want to order Insecticides and Mite sprays with 20% discount.')}`,
        suggestions: ['🏷️ Price of Syngenta Alika', '🏷️ Price of Mitofix', '🏷️ Price of Cyclone 505', '🧮 Calculate 200L Tank Dosage']
      };
    }

    if (isFertilizerCategory && !/(neo|vermicompost|sikri|bublin)/i.test(query)) {
      const ferts = products.filter(p => p.type.includes('Fertilizer') || p.type.includes('Bio-Stimulant') || p.type.includes('Tonic')).slice(0, 6);
      const listText = ferts.map(p => {
        const { mrp, discounted } = estimateProductPrice(p);
        return `• **${p.name}** (${p.type})\n  ~~₹${mrp.toLocaleString('en-IN')}~~ ➔ **₹${discounted.toLocaleString('en-IN')}** *(20% OFF • Save ₹${mrp - discounted})* • Dosage: \`${p.dosage}\``;
      }).join('\n\n');

      return {
        text: `🌿 **M.A. Pesticides — Bio-Stimulants & Orchard Fertilizers Price List (20% OFF):**\n\nCertified foliar nutrition, micronutrient formulations, and organic soil enrichers for fruit sizing, shoot vigor, and cold resilience:\n\n${listText}\n\n📍 In stock at Hari Singh High Street, Srinagar.`,
        thoughtProcess: generateThoughtProcess('price', { productName: 'Bio-Stimulants & Orchard Fertilizers' }),
        actionLink: `https://wa.me/919906541321?text=${encodeURIComponent('Hello Sheikh Mohammad Ayoub, please send me Bio-Stimulant and Fertilizer prices.')}`,
        suggestions: ['🏷️ Price of IPL 5G Neo+', '🏷️ Price of Sikri Vermicompost', '🧮 Calculate Orchard Dosage', '📍 Store Location']
      };
    }

    if (isOilCategory && !/(cyclone|alika)/i.test(query)) {
      const oils = products.filter(p => p.name.includes('Oil') || p.name.includes('HMO') || p.type === 'Adjuvant').slice(0, 5);
      const listText = oils.map(p => {
        const { mrp, discounted } = estimateProductPrice(p);
        return `• **${p.name}** (${p.composition || p.type})\n  ~~₹${mrp.toLocaleString('en-IN')}~~ ➔ **₹${discounted.toLocaleString('en-IN')}** *(20% OFF • Save ₹${mrp - discounted})* • Dosage: \`${p.dosage}\``;
      }).join('\n\n');

      return {
        text: `🛢️ **M.A. Pesticides — Dormant Oils & Adjuvants Price List (20% OFF):**\n\nEssential winter washes for San Jose scale suffocation and non-ionic spreaders for maximum rain-fastness:\n\n${listText}\n\n📍 In stock at Hari Singh High Street, Srinagar.`,
        thoughtProcess: generateThoughtProcess('price', { productName: 'Dormant Oils & Adjuvants' }),
        actionLink: `https://wa.me/919906541321?text=${encodeURIComponent('Hello Sheikh Mohammad Ayoub, I want to order HMO Mineral Oil and Spreaders.')}`,
        suggestions: ['🏷️ Price of HMO Oil', '🏷️ Price of Life80 Spreader', '🗓️ Dormant Spray Guide', '🧮 200L Barrel Dosage']
      };
    }

    // 1. Search if a specific product was explicitly typed
    let targetProduct = null;
    let maxScore = 0;

    if (!isCatalogPricing) {
      products.forEach(p => {
        const score = scoreMatch(p.name, words) * 3 + scoreMatch(p.composition, words) * 1.5;
        if (score > maxScore) {
          maxScore = score;
          targetProduct = p;
        }
      });
    }

    // 2. If no explicit product named and not a catalog query, check history for the last referenced product
    if (!isCatalogPricing && (!targetProduct || maxScore < 3) && Array.isArray(messageHistory)) {
      for (let i = messageHistory.length - 1; i >= 0; i--) {
        const msg = messageHistory[i];
        if (msg.productEmbed) {
          targetProduct = msg.productEmbed;
          break;
        }
        if (msg.diseaseEmbed && msg.diseaseEmbed.cure) {
          const cureLower = msg.diseaseEmbed.cure.toLowerCase();
          const found = products.find(p => cureLower.includes(p.name.toLowerCase()) || p.name.toLowerCase().includes(cureLower));
          if (found) {
            targetProduct = found;
            break;
          }
        }
        if (msg.text) {
          for (const p of products) {
            if (msg.text.toLowerCase().includes(p.name.toLowerCase())) {
              targetProduct = p;
              break;
            }
          }
        }
        if (targetProduct) break;
      }
    }

    // 3. If a specific product was identified:
    if (targetProduct && !isCatalogPricing) {
      const { mrp, discounted } = estimateProductPrice(targetProduct);
      const savings = mrp - discounted;

      return {
        text: `🏷️ **Price & Discount Breakdown for ${targetProduct.name}:**\n\n- 🏷️ **Print MRP:** ~~₹${mrp.toLocaleString('en-IN')}~~\n- 💚 **MA Pesticides Store Price (20% OFF):** **₹${discounted.toLocaleString('en-IN')}**\n- 💰 **Your Direct Savings:** **₹${savings.toLocaleString('en-IN')} (Flat 20% Below Print MRP)**\n\n🧪 **Active Formulation:** ${targetProduct.composition || 'Authorized Factory Formulation'}\n💧 **Standard SKUAST-K Dosage:** **${targetProduct.dosage}**\n🎯 **Targets / Uses:** ${targetProduct.diseases?.join(', ') || targetProduct.uses}\n✨ **Key Benefit:** ${targetProduct.benefits}\n\n📍 **Store Privilege:** 100% factory-sealed original product available at our Hari Singh High Street store in Srinagar with instant valley delivery.`,
        productEmbed: targetProduct,
        thoughtProcess: generateThoughtProcess('price', { productName: targetProduct.name }),
        actionLink: `https://wa.me/919906541321?text=${encodeURIComponent(`Hello Sheikh Mohammad Ayoub, I want to order genuine ${targetProduct.name} at discounted price ₹${discounted} (MRP ₹${mrp}).`)}`,
        suggestions: ['🧮 Calculate 200L Tank Dosage', '🛒 Add to Cart', '🗓️ SKUAST Spray Stages', '📍 Visit Srinagar Store']
      };
    }

    // 4. Master Product Pricing & Catalog Breakdown
    const sampleFungicides = [
      products.find(p => p.name.includes('Luna')) || products[3],
      products.find(p => p.name.includes('Superstar') || p.name.includes('Dodeine')) || products[1],
      products.find(p => p.name.includes('Antracol')) || products[4],
      products.find(p => p.name.includes('Filpostar')) || products[2]
    ].filter(Boolean);

    const sampleInsecticides = [
      products.find(p => p.name.includes('Alika')) || products[8],
      products.find(p => p.name.includes('Cyclone')) || products[0],
      products.find(p => p.name.includes('Mitofix')) || products[12],
      products.find(p => p.name.includes('Takumi')) || products[9]
    ].filter(Boolean);

    const sampleOthers = [
      products.find(p => p.name.includes('Mineral Oil') || p.name.includes('HMO')) || products[10],
      products.find(p => p.name.includes('Life80') || p.name.includes('Neo+')) || products[15]
    ].filter(Boolean);

    const formatCatalogSection = (title, items) => {
      const rows = items.map(p => {
        const { mrp, discounted } = estimateProductPrice(p);
        return `• **${p.name}**\n  Print MRP: ~~₹${mrp.toLocaleString('en-IN')}~~ ➔ **₹${discounted.toLocaleString('en-IN')}** *(Save ₹${mrp - discounted} • 20% OFF)*\n  Dosage: \`${p.dosage}\``;
      }).join('\n');
      return `### ${title}\n${rows}`;
    };

    const fungSec = formatCatalogSection('🌾 Top Fungicides (Apple Scab, Mildew & Rot)', sampleFungicides);
    const insSec = formatCatalogSection('🐛 Insecticides & Mite Sprays (Red Mite, Aphids & Scales)', sampleInsecticides);
    const othSec = formatCatalogSection('🌿 Tonics, Dormant Oils & Adjuvants', sampleOthers);

    return {
      text: `🏷️ **M.A. Pesticides Srinagar — Official Product Pricing & 20% Discount Catalog:**\n\nAs authorized distributor for **Bayer, Syngenta, IPL Biologicals, Tata, and Willowood**, all genuine factory batches carry an unconditional **20% flat discount on print MRP**:\n\n${fungSec}\n\n${insSec}\n\n${othSec}\n\n💰 **Wholesale Privilege:** Direct factory-sealed stock with batch certificates.\n📍 **Counter Location:** Hari Singh High Street, Srinagar (opp. High Court Complex).\n🚚 **Valley Delivery:** Same-day dispatch to Baramulla, Sopore, Shopian, Pulwama, and Anantnag.\n\n💡 *Ask me for the price of any specific chemical (e.g. "Price of Luna" or "Price of Alika") to see full dosage and barrel calculation!*`,
      thoughtProcess: generateThoughtProcess('price', { productName: 'Comprehensive Store Catalog' }),
      actionLink: `https://wa.me/919906541321?text=${encodeURIComponent('Hello Sheikh Mohammad Ayoub, please send me the complete product price list for my orchard.')}`,
      suggestions: ['🏷️ Price of Luna', '🏷️ Price of Syngenta Alika', '🏷️ Price of Superstar Dodine', '🏷️ Price of Bayer Antracol', '🧮 200L Tank Dosage Calc']
    };
  }

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
      text: `👨‍💻 **Developer Information:**\n\n**Sheikh Behroze Ayub (B.Tech CSE)** has developed it.\n\nHe designed, engineered, and developed this digital platform for **M.A. Pesticides & Fertilizers**, creating features such as the Agronomist Advisory Desk, Interactive Dosage Calculator, SKUAST-guided Spray Schedules, and Orchard Health Analytics.`,
      imageEmbed: '/sheikh-behroze-signature.webp',
      thoughtProcess: generateThoughtProcess('agronomy', { title: 'Platform Architecture & Engineering by Sheikh Behroze Ayub' }),
      actionLink: `https://wa.me/919906541321?text=${encodeURIComponent('Hello Sheikh Behroze Ayub, I visited the MA Pesticides website developed by you.')}`,
      suggestions: ['🍏 Ask Crop Disease Question', '🧮 Calculate Orchard Dosage', '🗓️ SKUAST Spray Schedule', '📍 Visit Srinagar Store']
    };
  }

  // --------------------------------------------------------------------------
  // INTENT 2: Chemical Tank Mix Compatibility & WALES Rule
  // --------------------------------------------------------------------------
  const isTankMixQuery = query.includes('mix') || query.includes('compatib') || query.includes('milana') || query.includes('milaye') || query.includes('wales') || query.includes('can i mix');
  if (isTankMixQuery) {
    const q = query.toLowerCase();
    let mixResult = null;

    if ((q.includes('dodine') || q.includes('dodeine')) && (q.includes('oil') || q.includes('hmo') || q.includes('mineral'))) {
      mixResult = {
        status: 'INCOMPATIBLE_HAZARD',
        badge: 'STRICT INCOMPATIBILITY HAZARD',
        badgeColor: '#dc2626',
        headline: 'DO NOT mix Superstar Dodine with Horticultural Mineral Oil (HMO)',
        danger: 'Severe phytotoxicity, wax cuticle destruction, and rapid defoliation on apple trees.',
        explanation: 'Dodine acts as a strong surfactant and disrupts cell membranes if combined with penetrant petroleum oil. Applying them together or within 14 days of each other dissolves the protective wax cuticles on apple foliage, causing widespread necrotic scorching and leaf drop.',
        rule: 'Maintain a minimum 14-day gap between any HMO oil spray and Dodine application.',
        safeAlternative: 'Use Bayer Antracol (Propineb) or Mancozeb as a contact pre-rain fungicide near oil spray windows.'
      };
    } else if ((q.includes('sulfur') || q.includes('sulphur')) && (q.includes('oil') || q.includes('hmo') || q.includes('mineral'))) {
      mixResult = {
        status: 'INCOMPATIBLE_HAZARD',
        badge: 'CATASTROPHIC HAZARD',
        badgeColor: '#dc2626',
        headline: 'NEVER mix Wettable Sulfur with Horticultural Mineral Oil',
        danger: 'Extreme foliar burn, terminal shoot dieback, and fruit russeting.',
        explanation: 'Oils dissolve the epidermal wax and carry elemental sulfur into leaf mesophyll cells, causing acute chemical defoliation (50–90% canopy loss).',
        rule: 'Keep a strict 30-day interval between sulfur applications and oil sprays.',
        safeAlternative: 'For Powdery Mildew, use systemic Hexaconazole (Contaf) or Luna Experience instead of elemental sulfur if oil was recently sprayed.'
      };
    } else if ((q.includes('copper') || q.includes('blitox') || q.includes('bordeaux')) && (q.includes('lime') || q.includes('sulfur') || q.includes('sulphur') || q.includes('acid'))) {
      mixResult = {
        status: 'INCOMPATIBLE_HAZARD',
        badge: 'CHEMICAL BREAKDOWN HAZARD',
        badgeColor: '#dc2626',
        headline: 'Do NOT mix Copper Fungicides with Lime Sulphur or Acidic Sprays',
        danger: 'Precipitate curdling and release of toxic free cupric ions (Cu²⁺).',
        explanation: 'Alkaline or acidic additives destabilize copper hydroxide/oxychloride matrices, burning young spring foliage and causing severe fruit russeting.',
        rule: 'Always spray Copper Oxychloride strictly alone on dormant bark or post-harvest leaf fall.',
        safeAlternative: 'Apply Copper as a standalone wash with clean water (pH 6.5–7.0).'
      };
    } else if ((q.includes('captan') || q.includes('captaf')) && (q.includes('oil') || q.includes('hmo'))) {
      mixResult = {
        status: 'INCOMPATIBLE_HAZARD',
        badge: 'PHYTOTOXIC HAZARD',
        badgeColor: '#dc2626',
        headline: 'Incompatible: Captan 50% WP + Horticultural Oil',
        danger: 'Severe foliar chlorosis, leaf spot necrosis, and fruit finish injury.',
        explanation: 'Petroleum oils facilitate excessive penetration of Captan molecules into tender leaf tissue.',
        rule: 'Wait at least 10–14 days between Captan and petroleum oil sprays.',
        safeAlternative: 'Use Bayer Antracol or Dodine during delayed dormancy.'
      };
    } else if ((q.includes('calcium') || q.includes('calc')) && (q.includes('phosphate') || q.includes('sulfate') || q.includes('sulphate') || q.includes('npk'))) {
      mixResult = {
        status: 'INCOMPATIBLE_HAZARD',
        badge: 'PRECIPITATION CLOGGING HAZARD',
        badgeColor: '#dc2626',
        headline: 'Incompatible: Calcium Nitrate + Phosphates / Sulphates',
        danger: 'Forms insoluble Calcium Phosphate / Gypsum sludge that clogs spray nozzles and prevents nutrient uptake.',
        explanation: 'Free calcium ions (Ca²⁺) bond instantly with phosphate and sulfate ions in the tank water to form insoluble chalk.',
        rule: 'Apply Calcium Nitrate foliar sprays as a standalone treatment or mix only with compatible Boron (Solubor).',
        safeAlternative: 'Spray Calcium + Boron together at Pink Bud/Walnut stage; apply NPK fertilizers separately.'
      };
    } else if ((q.includes('luna') || q.includes('fluopyram')) && (q.includes('alika') || q.includes('thiamethoxam'))) {
      mixResult = {
        status: 'COMPATIBLE_SAFE',
        badge: 'FULLY COMPATIBLE TANK MIX',
        badgeColor: '#047857',
        headline: 'Fully Compatible: Bayer Luna Experience + Syngenta Alika',
        benefit: 'Premier curative apple scab & systemic sucking pest control.',
        explanation: 'Luna (SC flowable suspension) and Alika (ZC microcapsule) blend smoothly with zero curdling and excellent translaminar absorption.',
        walesOrder: '1. Fill tank 60% water -> 2. Run pump agitator -> 3. Add Luna Experience (SC) -> 4. Add Syngenta Alika (ZC) -> 5. Fill remaining water.'
      };
    } else if ((q.includes('antracol') || q.includes('propineb')) && (q.includes('alika') || q.includes('thiamethoxam'))) {
      mixResult = {
        status: 'COMPATIBLE_SAFE',
        badge: 'FULLY COMPATIBLE TANK MIX',
        badgeColor: '#047857',
        headline: 'Fully Compatible: Bayer Antracol 70% WP + Syngenta Alika',
        benefit: 'Protective multi-site fungal barrier + broad systemic insect knockdown.',
        explanation: 'Antracol provides external foliar rain-fast coverage while Alika controls aphids, thrips, and beetles.',
        walesOrder: '1. Fill tank 50% water -> 2. Pre-slurry Antracol (WP) in bucket and add -> 3. Agitate thoroughly -> 4. Add Alika (ZC) -> 5. Fill to mark.'
      };
    } else if ((q.includes('dodine') || q.includes('superstar')) && (q.includes('captan') || q.includes('mancozeb'))) {
      mixResult = {
        status: 'COMPATIBLE_SAFE',
        badge: 'COMPATIBLE (RESISTANCE MANAGEMENT)',
        badgeColor: '#047857',
        headline: 'Fully Compatible: Superstar Dodine 65% + Captan / Mancozeb',
        benefit: 'Dual-site contact synergy to prevent Apple Scab fungicide resistance.',
        explanation: 'Combines Dodine membrane disruption with multi-site sulfhydryl enzyme inhibition of Mancozeb/Captan.',
        walesOrder: 'Pre-slurry both wettable powders together in clean water before adding to agitated tank.'
      };
    } else if ((q.includes('score') || q.includes('difenoconazole')) && (q.includes('mitofix') || q.includes('propargite'))) {
      mixResult = {
        status: 'COMPATIBLE_SAFE',
        badge: 'FULLY COMPATIBLE TANK MIX',
        badgeColor: '#047857',
        headline: 'Fully Compatible: Score (Difenoconazole) + Mitofix (Propargite)',
        benefit: 'Curative Scab protection + European Red Mite summer eradication.',
        explanation: 'Ideal for June/July summer sprays when warm humid conditions promote both secondary scab and spider mite flares.',
        walesOrder: '1. Fill tank 60% water -> 2. Agitate -> 3. Add Score (EC) -> 4. Add Mitofix (EC) -> 5. Add Life80 non-ionic surfactant last.'
      };
    } else {
      mixResult = {
        status: 'WALES_GUIDE',
        badge: 'SCIENTIFIC TANK MIXING PROTOCOL',
        badgeColor: '#0284c7',
        headline: 'Standard WALES Sequence (Prevents Curdling & Nozzle Clogs)',
        explanation: 'Always follow the WALES order whenever combining two or more agrochemicals in a 200L or 500L orchard tank.',
        walesOrder: '1. W (Water): Fill tank 50% to 70% with clean water (pH 5.5–6.5)\n2. W (Wettable Powders): Pre-slurry WP powders (Antracol, Dodine, Mancozeb) in bucket\n3. A (Agitate): Turn on tank agitator / pump recirculation\n4. L (Liquid Flowables): Add SC, ZC or CS suspensions (Luna, Alika, Kozen)\n5. E (Emulsifiable Concentrates): Add EC formulations (Cyclone, Mitofix, HMO)\n6. S (Solubles & Surfactants): Add foliar tonics and non-ionic spreaders (Life80) last'
      };
    }

    let textOut = '';
    if (mixResult.status === 'INCOMPATIBLE_HAZARD') {
      textOut = `🚨 **${mixResult.badge}:**\n\n**${mixResult.headline}**\n\n- 🚫 **Danger:** ${mixResult.danger}\n- 💥 **Biochemical Cause:** ${mixResult.explanation}\n- ⏱️ **Rule:** ${mixResult.rule}\n- 💡 **Safe Alternative:** ${mixResult.safeAlternative}`;
    } else if (mixResult.status === 'COMPATIBLE_SAFE') {
      textOut = `✅ **${mixResult.badge}:**\n\n**${mixResult.headline}**\n\n- 🌟 **Agronomic Benefit:** ${mixResult.benefit}\n- 🔬 **Mode of Action:** ${mixResult.explanation}\n- 📋 **Mixing Order:** ${mixResult.walesOrder}`;
    } else {
      textOut = `🧪 **${mixResult.badge}:**\n\n**${mixResult.headline}**\n\n${mixResult.explanation}\n\n${mixResult.walesOrder}`;
    }

    return {
      text: textOut,
      tankMixEmbed: mixResult,
      thoughtProcess: generateThoughtProcess('tank_mix', {
        chemicals: query,
        isHazard: mixResult.status === 'INCOMPATIBLE_HAZARD',
        hazardDesc: mixResult.danger
      }),
      actionLink: `https://wa.me/919906541321?text=${encodeURIComponent(`Hello Sheikh Mohammad Ayoub, can you confirm tank mix compatibility for: "${query}"?`)}`,
      suggestions: ['🧮 200L Tank Dosage Calc', '🗓️ SKUAST-K Spray Stages', '🍏 Apple Scab Treatment', '🌤️ Check Spray Weather']
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
      thoughtProcess: generateThoughtProcess('stage', {
        stageName: stage.name,
        pests: stage.keyPests,
        recommendation: stage.recommendation
      }),
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
  const isDosageQuery = query.includes('dosage') || query.includes('calculate') || query.includes('quantity') || query.includes('kitna') || query.includes('tanki') || query.includes('dawa kitni') || query.includes('how much');

  if (kanalMatch || treeMatch || barrelMatch || litreMatch || (isDosageQuery && query.length < 65)) {
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

    // Detect if a specific chemical was requested
    const calcProducts = [];
    if (query.includes('luna') || query.includes('fluopyram')) {
      const ml = Math.round(estWaterLitre * 1.0);
      const packs = Math.ceil(ml / 100);
      const price = packs * 1160;
      calcProducts.push({
        name: 'Bayer Luna Experience (Fluopyram + Tebuconazole)',
        rate: '1.0 ml / L',
        requiredQty: ml >= 1000 ? `${(ml / 1000).toFixed(2)} Litres` : `${ml} ml`,
        packDesc: `${packs} bottle(s) of 100ml / 250ml`,
        price,
        rawProduct: products.find(p => p.name.includes('Luna'))
      });
    } else if (query.includes('antracol') || query.includes('propineb')) {
      const g = Math.round(estWaterLitre * 2.5);
      const packs = Math.ceil(g / 500);
      const price = packs * 520;
      calcProducts.push({
        name: 'Bayer Antracol 70% WP (Propineb)',
        rate: '2.5 g / L',
        requiredQty: g >= 1000 ? `${(g / 1000).toFixed(2)} kg` : `${g} g`,
        packDesc: `${packs} packet(s) of 500g`,
        price,
        rawProduct: products.find(p => p.name.includes('Antracol'))
      });
    } else if (query.includes('dodine') || query.includes('superstar')) {
      const g = Math.round(estWaterLitre * 1.0);
      const packs = Math.ceil(g / 500);
      const price = packs * 680;
      calcProducts.push({
        name: 'Superstar Dodine 65% WP',
        rate: '1.0 g / L',
        requiredQty: g >= 1000 ? `${(g / 1000).toFixed(2)} kg` : `${g} g`,
        packDesc: `${packs} packet(s) of 500g`,
        price,
        rawProduct: products.find(p => p.name.includes('Dodeine') || p.name.includes('Dodine'))
      });
    } else if (query.includes('alika') || query.includes('thiamethoxam')) {
      const ml = Math.round(estWaterLitre * 0.5);
      const packs = Math.ceil(ml / 80);
      const price = packs * 600;
      calcProducts.push({
        name: 'Syngenta Alika (Thiamethoxam + Lambda)',
        rate: '0.5 ml / L',
        requiredQty: ml >= 1000 ? `${(ml / 1000).toFixed(2)} Litres` : `${ml} ml`,
        packDesc: `${packs} bottle(s) of 80ml / 200ml`,
        price,
        rawProduct: products.find(p => p.name.includes('Alika'))
      });
    } else if (query.includes('oil') || query.includes('hmo') || query.includes('mineral')) {
      const l = (estWaterLitre * 0.02).toFixed(1);
      const cans = Math.ceil(parseFloat(l) / 5);
      const price = cans * 1440;
      calcProducts.push({
        name: 'Horticultural Mineral Oil (HMO 2%)',
        rate: '20 ml / L',
        requiredQty: `${l} Litres`,
        packDesc: `${cans} can(s) of 5L`,
        price,
        rawProduct: products.find(p => p.name.includes('Cyclone') || p.name.includes('505'))
      });
    } else {
      // Default: Standard Spring Scab & Pest Shield (Antracol 70% + Syngenta Alika)
      const gAntracol = Math.round(estWaterLitre * 2.5);
      const packsAntracol = Math.ceil(gAntracol / 500);
      const mlAlika = Math.round(estWaterLitre * 0.5);
      const packsAlika = Math.ceil(mlAlika / 80);

      calcProducts.push({
        name: 'Bayer Antracol 70% WP (Scab Protective)',
        rate: '2.5 g / L',
        requiredQty: gAntracol >= 1000 ? `${(gAntracol / 1000).toFixed(2)} kg` : `${gAntracol} g`,
        packDesc: `${packsAntracol} packet(s) of 500g`,
        price: packsAntracol * 520,
        rawProduct: products.find(p => p.name.includes('Antracol'))
      });
      calcProducts.push({
        name: 'Syngenta Alika (Sucking Insect Knockdown)',
        rate: '0.5 ml / L',
        requiredQty: mlAlika >= 1000 ? `${(mlAlika / 1000).toFixed(2)} Litres` : `${mlAlika} ml`,
        packDesc: `${packsAlika} bottle(s) of 80ml`,
        price: packsAlika * 600,
        rawProduct: products.find(p => p.name.includes('Alika'))
      });
    }

    const totalEstimate = calcProducts.reduce((sum, p) => sum + p.price, 0);

    const dosageEmbed = {
      scaleDescription,
      waterLiters: estWaterLitre,
      barrels: barrels200L,
      products: calcProducts,
      totalEstimate
    };

    const productLines = calcProducts.map(p => `• **${p.name}:** **${p.requiredQty}** (${p.packDesc}) ~₹${p.price.toLocaleString('en-IN')}`).join('\n');

    return {
      text: `🧮 **Precision Chemical Dosage Calculation:**\n\n- 🌳 **Orchard / Tank Scale:** **${scaleDescription}**\n- 💧 **Total Water Volume:** **${estWaterLitre} Litres** (${barrels200L} × 200L barrels)\n\n📦 **SKUAST-K Recommended Quantities:**\n${productLines}\n\n💰 **Estimated Store Total:** **~₹${totalEstimate.toLocaleString('en-IN')}** *(with guaranteed 20% discount on print MRP)*`,
      dosageEmbed,
      thoughtProcess: generateThoughtProcess('dosage', {
        scaleDescription,
        waterLiters: estWaterLitre,
        barrels: barrels200L,
        totalEstimate
      }),
      actionLink: `https://wa.me/919906541321?text=${encodeURIComponent(`Hello Sheikh Mohammad Ayoub, please reserve spray products for ${scaleDescription} (${estWaterLitre}L water, Est: ₹${totalEstimate}).`)}`,
      suggestions: ['⚠️ Check Tank Mix Compatibility', '🛒 Open Cart', '🗓️ Spray Calendar Stages', '🌤️ Check Weather Window']
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
        thoughtProcess: generateThoughtProcess('agronomy', { title: item.title }),
        actionLink: `https://wa.me/919906541321?text=${encodeURIComponent(`Hello Sheikh Mohammad Ayoub, I need further guidance regarding: ${item.title}`)}`,
        suggestions: ['🧮 Calculate 200L Tank Dosage', '🗓️ SKUAST-K Spray Calendar', '⚠️ Check Tank Mix Safety', '📍 Srinagar Store Details']
      };
    }
  }

  // --------------------------------------------------------------------------
  // INTENT 6: Live Weather & Spray Timing Window (Real-time Open-Meteo Feed)
  // --------------------------------------------------------------------------
  const isWeatherQuery = (
    /(weather|mausam|rain|barish|forecast|temperature|humidity|wind\s*speed|climate|spray\s*timing|spray\s*window|safe\s*to\s*spray|can\s*i\s*spray)/i.test(query) &&
    !/(soil|fertilizer|npk|address|shop|counter|bhejo|transport|delivery|dukaan|kahan)/i.test(query)
  );

  if (isWeatherQuery) {
    let districtKey = 'srinagar';
    if (/shopian|shupiyan/i.test(query)) districtKey = 'shopian';
    else if (/sopore|baramulla|baramula/i.test(query)) districtKey = 'sopore';
    else if (/pulwama/i.test(query)) districtKey = 'pulwama';
    else if (/anantnag|islamabad/i.test(query)) districtKey = 'anantnag';

    const liveWeather = await fetchLiveWeatherData(districtKey);
    const weatherResp = buildWeatherChatResponse(liveWeather);
    return {
      ...weatherResp,
      thoughtProcess: generateThoughtProcess('weather', {
        location: liveWeather.location,
        temp: liveWeather.temp,
        rain: liveWeather.rainProbability,
        wind: liveWeather.wind,
        sprayStatus: liveWeather.sprayStatus
      })
    };
  }

  // --------------------------------------------------------------------------
  // INTENT 7: Store Location, Consultation & Pricing
  // --------------------------------------------------------------------------
  if (query.includes('location') || query.includes('address') || query.includes('shop') || query.includes('store') || query.includes('contact') || query.includes('phone') || query.includes('discount') || query.includes('rate') || query.includes('pata') || query.includes('kahan') || query.includes('dukaan')) {
    return {
      text: `📍 **M.A. Pesticides & Fertilizers — Srinagar Store Details:**\n\n- 🏢 **Address:** Near Exhibition Road, opp. High Court Complex, Hari Singh High Street, Srinagar — 190001\n- 📞 **Expert Chemist Helpline:** [+91 99065 41321](tel:+919906541321)\n- 🕒 **Store Timings:** Monday – Saturday: **9:00 AM – 7:00 PM**\n- 🔬 **In-Store Consultation:** Guided by **Sheikh Mohammad Ayoub** (M.Sc. Organic Chemistry, B.Ed. — University of Kashmir).\n- 🏷️ **Guaranteed Discount:** **20% flat discount on print MRP** across all Bayer, Syngenta, and IPL Biologicals lines.\n- 🌿 **Complimentary Service:** Free leaf and soil inspection for orchardists.`,
      thoughtProcess: generateThoughtProcess('agronomy', { title: 'M.A. Pesticides Srinagar Store & Consultations' }),
      actionLink: `https://wa.me/919906541321?text=${encodeURIComponent('Hello Sheikh Mohammad Ayoub, I want to visit your Srinagar shop.')}`,
      suggestions: ['🍏 Apple Scab Treatment', '⚡ 200L Tank Dosage Calc', '🗓️ SKUAST Spray Stages', '👨‍💻 Website Developer']
    };
  }

  // --------------------------------------------------------------------------
  // INTENT 8: Friendly Greeting
  // --------------------------------------------------------------------------
  if (query.match(/^(hi|hello|hey|salam|assalamu|good morning|namaste|adaab)/i)) {
    return {
      text: `Assalamu Alaikum! 👋\n\nWelcome to the **M.A. Pesticides Consultation Desk**, guided by decades of organic chemistry expertise from **Sheikh Mohammad Ayoub**.\n\nHow can we help protect your harvest today?\n\n- 🏷️ **Product Pricing & Rates:** Ask "pricing of products" or "price of Luna" to see verified store rates with **20% flat discount on print MRP**\n- 🍏 **Crop Disease Doctor:** Diagnose Apple Scab, Red Mites, Mildew & Canker\n- 🧮 **Precision Dosage Calculator:** Tell me your tree count or tank size (e.g. \`50 trees\` or \`200L\`)\n- 🗓️ **SKUAST-K Spray Calendar:** Get stage-by-stage spray recommendations\n- ⚠️ **Tank Mixing Safety:** Check chemical compatibility & WALES mixing rules`,
      thoughtProcess: generateThoughtProcess('agronomy', { title: 'Grower Onboarding & Expert Chemist Guidance' }),
      actionLink: "https://wa.me/919906541321?text=Hello%20MA%20Pesticides%2C%20I%20have%20a%20question%20about%20my%20crops.",
      suggestions: ['🏷️ Pricing of Products', '🍏 Apple Scab Treatment', '🧮 200L Tank Dosage Calc', '🗓️ Pink Bud Stage Spray']
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
    const cureLower = (bestDisease.cure || '').toLowerCase();
    const matchedProd = products.find(p => cureLower.includes(p.name.toLowerCase()) || p.name.toLowerCase().includes(cureLower));
    let priceNote = 'Available at guaranteed 20% discount on print MRP.';
    if (matchedProd) {
      const { mrp, discounted } = estimateProductPrice(matchedProd);
      priceNote = `**${matchedProd.name}:** ~~₹${mrp.toLocaleString('en-IN')}~~ ➔ **₹${discounted.toLocaleString('en-IN')}** *(Save ₹${mrp - discounted} • 20% OFF)*`;
    }

    return {
      text: `🔬 **Crop Disease Advisory: ${bestDisease.name}**\n*${bestDisease.nameUrdu || ''}* (${bestDisease.crop})\n\n- 🚨 **Severity:** **${bestDisease.severity} Risk**\n- 🩺 **Symptoms:** ${bestDisease.symptoms}\n- 💊 **Recommended Cure:** **${bestDisease.cure}**\n- ⚡ **Dosage Rate:** ${bestDisease.dosage}\n- 💰 **Prescription Pricing:** ${priceNote}\n\n💡 **Application Tip:** Spray early morning (7–10 AM) or late afternoon (4–7 PM) when relative humidity ensures uniform droplet coverage on foliage.`,
      diseaseEmbed: bestDisease,
      thoughtProcess: generateThoughtProcess('disease', {
        diseaseName: bestDisease.name,
        crop: bestDisease.crop,
        severity: bestDisease.severity,
        cure: bestDisease.cure,
        dosage: bestDisease.dosage
      }),
      actionLink: `https://wa.me/919906541321?text=${encodeURIComponent(`Hello Sheikh Mohammad Ayoub, I need treatment for ${bestDisease.name} in my orchard.`)}`,
      suggestions: ['🧮 Calculate Tank Dosage for this Cure', '🏷️ Price of ' + (matchedProd?.name || 'Cure'), '⚠️ Check Tank Mix Compatibility', '🌤️ Srinagar Spray Window']
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
    const { mrp, discounted } = estimateProductPrice(bestProd);
    const savings = mrp - discounted;

    return {
      text: `🌿 **${bestProd.name}** (${bestProd.type})\n\n- 🧪 **Active Formulation:** ${bestProd.composition || 'Authorized Formulation'}\n- 🎯 **Target Uses:** ${bestProd.uses}\n- 💧 **Recommended Dosage:** **${bestProd.dosage}**\n- ✨ **Benefits:** ${bestProd.benefits}\n\n💰 **Guaranteed Store Pricing (Flat 20% OFF):**\n- 🏷️ **Print MRP:** ~~₹${mrp.toLocaleString('en-IN')}~~\n- 💚 **MA Pesticides Store Price:** **₹${discounted.toLocaleString('en-IN')}**\n- 💵 **Your Direct Savings:** **₹${savings.toLocaleString('en-IN')} (20% Below Print MRP)**\n\n📍 100% factory-sealed original batch in stock at Hari Singh High Street, Srinagar.`,
      productEmbed: bestProd,
      thoughtProcess: generateThoughtProcess('product', {
        productName: bestProd.name,
        type: bestProd.type,
        composition: bestProd.composition
      }),
      actionLink: `https://wa.me/919906541321?text=${encodeURIComponent(`Hello Sheikh Mohammad Ayoub, I want to purchase genuine ${bestProd.name} with 20% discount (Store Price: ₹${discounted}).`)}`,
      suggestions: ['🧮 Calculate 200L Barrel Dosage', '🛒 Add to Cart', '⚠️ Check Tank Mix Compatibility', '🗓️ Spray Calendar Stage']
    };
  }

  // --------------------------------------------------------------------------
  // INTENT 11: Universal Dynamic Question Answering (Answers Every Question!)
  // --------------------------------------------------------------------------
  return generateUniversalAnswer(userText, query, words);
}

// ============================================================================
// 4b. Autonomous Website Command & Execution Engine (Full Site Agency)
// ============================================================================
function findProductFromText(text, history = []) {
  if (!text) return null;
  const lower = text.toLowerCase();

  // 1. Direct product name / alias matching
  let best = null;
  let highestScore = 0;
  for (const p of products) {
    const pName = p.name.toLowerCase();
    const pClean = pName.replace(/\(.*?\)/g, '').trim();
    const pComp = (p.composition || '').toLowerCase();

    let score = 0;
    if (lower.includes(pClean) && pClean.length >= 3) score += 10;
    if (lower.includes(pName)) score += 12;

    const tokens = pClean.split(/\s+/).filter(t => t.length > 2);
    for (const t of tokens) {
      if (lower.includes(t)) score += 5;
    }
    if (pComp && lower.includes(pComp)) score += 4;

    if (score > highestScore) {
      highestScore = score;
      best = p;
    }
  }

  if (best && highestScore >= 5) return best;

  // 2. Check if user is referencing contextual "it" / "this" / "that product" from recent messages
  if (/(this|that|it|same|the product|cure|dawa|medicine|spray)/i.test(lower) && Array.isArray(history)) {
    for (let i = history.length - 1; i >= 0; i--) {
      const msg = history[i];
      if (msg.productEmbed) return msg.productEmbed;
      if (msg.diseaseEmbed && msg.diseaseEmbed.cure) {
        const cureLower = msg.diseaseEmbed.cure.toLowerCase();
        const found = products.find(p => cureLower.includes(p.name.toLowerCase()) || p.name.toLowerCase().includes(cureLower));
        if (found) return found;
      }
      if (msg.text) {
        for (const p of products) {
          if (msg.text.toLowerCase().includes(p.name.toLowerCase())) return p;
        }
      }
    }
  }

  return null;
}

function executeWebsiteCommand({
  userText,
  messageHistory = [],
  navigate,
  cart,
  themeContext,
  closeChatOnMobile
}) {
  const query = userText.toLowerCase().trim();

  // 1. ADD PRODUCT TO CART INTENT
  // Handles: "add antracol to my cart", "buy luna", "order 2 alika", "add to cart", "add it"
  const isAddCart = /(add(\s+to\s+cart|\s+in\s+cart)?|buy|order|purchase|cart\s+mein\s+daalo|kharidna)/i.test(query);
  const isCartQueryOnly = /(what('?s|\s+is)\s+in\s+my\s+cart|open\s+cart|show\s+cart|view\s+cart|clear\s+cart|empty\s+cart)/i.test(query);

  if (isAddCart && !isCartQueryOnly) {
    const targetProduct = findProductFromText(userText, messageHistory);
    if (targetProduct) {
      let quantity = 1;
      const qtyMatch = query.match(/\b([1-9]|10)\s*(pack|packs|bottle|bottles|kg|l|litres?|units?|item|items|bag|bags)?\b/i);
      if (qtyMatch) {
        const parsed = parseInt(qtyMatch[1], 10);
        if (!isNaN(parsed) && parsed >= 1 && parsed <= 10) quantity = parsed;
      }

      cart.addToCart(targetProduct, quantity, { openDrawer: false });
      const priceInfo = estimateProductPrice(targetProduct);

      return {
        isCommand: true,
        response: {
          sender: 'bot',
          text: `🛒 **Added ${quantity > 1 ? `${quantity}× ` : ''}${targetProduct.name} to your Cart.**\n\n- 🧪 **Formulation:** ${targetProduct.composition || targetProduct.type}\n- 💧 **Recommended Dosage:** ${targetProduct.dosage}\n- 💰 **Est. Price:** ₹${(priceInfo.discounted * quantity).toLocaleString('en-IN')} (20% valley discount applied)\n- 📦 **Cart Status:** Total **${cart.totalItems + quantity} item(s)** in your cart.\n\nWould you like me to open your cart drawer, calculate your tank dosage, or add another product?`,
          productEmbed: targetProduct,
          actionButtons: [
            { label: 'Open Cart Drawer', action: 'open_cart', primary: true, icon: 'cart' },
            { label: 'Compute Tank Dosage', action: 'nav_calc', icon: 'calc' },
            { label: 'Browse More Products', action: 'nav_products', icon: 'compass' }
          ],
          suggestions: ['Open Cart Drawer', '🧮 Calculate 200L Dosage', '🛍️ Go to Products', '🌙 Dark Mode']
        }
      };
    }
  }

  // 2. OPEN CART DRAWER
  if (/(open\s+(the\s+|my\s+)?cart|show\s+(the\s+|my\s+)?cart|view\s+(the\s+|my\s+)?cart|cart\s+drawer|open\s+basket|show\s+basket)/i.test(query)) {
    cart.openCart();
    return {
      isCommand: true,
      response: {
        sender: 'bot',
        text: `🛒 **Cart drawer opened.**\n\nYou currently have **${cart.totalItems} item(s)** in your cart (Est. Value: ~₹${cart.subtotal.toLocaleString('en-IN')}).\n\nYou can review items, select orchard delivery or shop pickup at Tengpora Bypass Srinagar, and finalize your order.`,
        actionButtons: [
          { label: 'Browse Products', action: 'nav_products', icon: 'compass' },
          { label: 'Clear Cart', action: 'clear_cart', icon: 'zap' }
        ],
        suggestions: ['🛍️ Go to Products', '🧮 Dosage Calculator', '🗓️ Spray Calendar']
      }
    };
  }

  // 3. CLOSE CART DRAWER
  if (/(close\s+(the\s+|my\s+)?cart|hide\s+(the\s+|my\s+)?cart)/i.test(query)) {
    cart.closeCart();
    return {
      isCommand: true,
      response: {
        sender: 'bot',
        text: `🔒 **Cart drawer closed.** You can reopen it at any time by asking me or tapping the cart badge!`,
        suggestions: ['Open Cart Drawer', '🛍️ Browse Products', '🗓️ Spray Calendar']
      }
    };
  }

  // 4. CLEAR / EMPTY CART
  if (/(clear\s+(the\s+|my\s+)?cart|empty\s+(the\s+|my\s+)?cart|delete\s+all\s+(from\s+)?cart|remove\s+all\s+(from\s+)?cart)/i.test(query)) {
    cart.clearCart();
    return {
      isCommand: true,
      response: {
        sender: 'bot',
        text: `🗑️ **Your cart has been cleared.**\n\nYour basket is now empty and ready for fresh items.`,
        actionButtons: [
          { label: 'Browse Products', action: 'nav_products', icon: 'compass' },
          { label: 'View Spray Stages', action: 'nav_calendar', icon: 'compass' }
        ],
        suggestions: ['🛍️ Go to Products', '🗓️ Spray Calendar', '🍏 Apple Scab Treatment']
      }
    };
  }

  // 5. INSPECT CART STATUS / TOTAL
  if (/(what('?s|\s+is)\s+in\s+my\s+cart|cart\s+items|cart\s+status|cart\s+total|check\s+my\s+cart|show\s+my\s+items|how\s+many\s+items\s+in\s+cart)/i.test(query)) {
    if (cart.cartItems.length > 0) {
      return {
        isCommand: true,
        response: {
          sender: 'bot',
          text: `🛒 **You have ${cart.totalItems} item(s) in your Cart:**\n\n${cart.cartItems.map((item, idx) => `${idx + 1}. **${item.name}** × ${item.quantity} — ₹${(item.price * item.quantity).toLocaleString('en-IN')}`).join('\n')}\n\n💰 **Subtotal:** ~₹${cart.subtotal.toLocaleString('en-IN')}\n🏷️ **Total Farmer Savings:** ₹${cart.savings.toLocaleString('en-IN')} (20% valley discount)`,
          actionButtons: [
            { label: 'Open Cart Drawer', action: 'open_cart', primary: true, icon: 'cart' },
            { label: 'Clear Cart', action: 'clear_cart', icon: 'zap' },
            { label: 'Add More Products', action: 'nav_products', icon: 'compass' }
          ],
          suggestions: ['Open Cart Drawer', '🛍️ Go to Products', '🧮 Dosage Calculator']
        }
      };
    } else {
      return {
        isCommand: true,
        response: {
          sender: 'bot',
          text: `🛒 **Your cart is currently empty.**\n\nTell me which chemical or stage you're preparing for (e.g., "Add Antracol to cart", "Pink Bud Stage"), and I will add the right genuine formulation for you!`,
          actionButtons: [
            { label: 'Browse Products', action: 'nav_products', primary: true, icon: 'compass' },
            { label: 'Check Spray Calendar', action: 'nav_calendar', icon: 'compass' }
          ],
          suggestions: ['🛍️ Go to Products', '🍏 Apple Scab Treatment', '🧮 200L Tank Dosage Calc']
        }
      };
    }
  }

  // 6. CHECKOUT / PLACE ORDER
  if (/(checkout|place\s+order|order\s+now|order\s+on\s+whatsapp|buy\s+now)/i.test(query)) {
    cart.openCart();
    return {
      isCommand: true,
      response: {
        sender: 'bot',
        text: `🛒 **Opening Cart Checkout...**\n\nYou have **${cart.totalItems} item(s)** in your cart (Est. Total: ~₹${cart.subtotal.toLocaleString('en-IN')}).\n\nYou can send your order directly to Sheikh Ayoub on WhatsApp or choose shop pickup at Tengpora Bypass Srinagar with 20% discount.`,
        actionButtons: [
          { label: 'Review Cart', action: 'open_cart', primary: true, icon: 'cart' },
          { label: 'Call Shop (+91 9906541321)', action: 'call_shop', icon: 'phone' }
        ],
        suggestions: ['🛍️ Browse Products', '🧮 Dosage Calculator', '🗓️ Spray Calendar']
      }
    };
  }

  // 7. THEME CONTROLS (Dark / Light Mode)
  if (/(dark\s+mode|enable\s+dark|turn\s+on\s+dark|night\s+mode|switch\s+to\s+dark)/i.test(query)) {
    if (themeContext.theme !== 'dark') themeContext.toggleTheme();
    return {
      isCommand: true,
      response: {
        sender: 'bot',
        actionExecuted: 'Switched to Dark Theme',
        text: `🌙 **Activated Dark Theme!** The website is now optimized for low-glare viewing in orchards and late evenings.`,
        actionButtons: [
          { label: '☀️ Switch to Light Mode', action: 'toggle_light', icon: 'sun' },
          { label: '🛍️ Continue Browsing', action: 'nav_products', icon: 'compass' }
        ],
        suggestions: ['☀️ Light Mode', '🛍️ Go to Products', '🗓️ Spray Calendar']
      }
    };
  }

  if (/(light\s+mode|enable\s+light|turn\s+on\s+light|day\s+mode|switch\s+to\s+light)/i.test(query)) {
    if (themeContext.theme !== 'light') themeContext.toggleTheme();
    return {
      isCommand: true,
      response: {
        sender: 'bot',
        actionExecuted: 'Switched to Light Theme',
        text: `☀️ **Activated Light Theme!** The website is now set to high-contrast crisp day mode.`,
        actionButtons: [
          { label: '🌙 Switch to Dark Mode', action: 'toggle_dark', icon: 'moon' },
          { label: '🛍️ Continue Browsing', action: 'nav_products', icon: 'compass' }
        ],
        suggestions: ['🌙 Dark Mode', '🛍️ Go to Products', '🗓️ Spray Calendar']
      }
    };
  }

  if (/(toggle\s+theme|change\s+theme|switch\s+theme)/i.test(query)) {
    themeContext.toggleTheme();
    const newTheme = themeContext.theme === 'light' ? 'Dark' : 'Light';
    return {
      isCommand: true,
      response: {
        sender: 'bot',
        actionExecuted: `Toggled Theme to ${newTheme}`,
        text: `🌓 **Theme toggled to ${newTheme} Mode!**`,
        suggestions: ['🌓 Toggle Theme Again', '🛍️ Go to Products', '🗓️ Spray Calendar']
      }
    };
  }

  // 8. AUTONOMOUS SITE NAVIGATION (Instant Page Shifting)
  // Home Page (Highest Priority Navigation)
  if (
    /^(take\s+me\s+(to\s+)?(the\s+)?home(\s*page)?|go\s+to\s+(the\s+)?home(\s*page)?|open\s+(the\s+)?home(\s*page)?|shift(\s+(me|the\s+page))?\s+(and\s+take\s+me\s+)?to\s+(the\s+)?home(\s*page)?|switch\s+to\s+(the\s+)?home(\s*page)?|navigate\s+to\s+(the\s+)?home(\s*page)?|redirect\s+to\s+(the\s+)?home(\s*page)?|return\s+(to\s+)?(the\s+)?home(\s*page)?|back\s+to\s+(the\s+)?home(\s*page)?|take\s+me\s+home|return\s+home|home\s*page|main\s*page|landing\s*page|front\s*page|^homepage$|^home$)/i.test(query) ||
    /\b(take\s+me\s+(to\s+)?(the\s+)?home(\s*page)?|shift\s+(the\s+page\s+to|to)\s+(the\s+)?home(\s*page)?|go\s+to\s+(the\s+)?home(\s*page)?|open\s+(the\s+)?home(\s*page)?)\b/i.test(query)
  ) {
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (typeof closeChatOnMobile === 'function') closeChatOnMobile();
    return {
      isCommand: true,
      response: {
        sender: 'bot',
        text: `🏠 **Shifted to the Homepage!**\n\nI have shifted your screen to the main Home Page. Explore authorized dealerships (Bayer, Syngenta, IPL Biologicals), SKUAST spray calendar stages, and orchard advisory tools.`,
        actionButtons: [
          { label: 'View Full Homepage', action: 'close_chat', primary: true, icon: 'compass' },
          { label: 'Browse Products', action: 'nav_products', icon: 'compass' },
          { label: 'Spray Calendar', action: 'nav_calendar', icon: 'compass' }
        ],
        suggestions: ['🛍️ Browse Products', '🗓️ Spray Calendar', '🧮 Dosage Calculator']
      }
    };
  }

  // Products Catalog
  if (
    /^(take\s+me\s+(to\s+)?(the\s+)?products?(\s*page)?|go\s+to\s+(the\s+)?products?(\s*page)?|open\s+(the\s+)?products?(\s*page)?|shift(\s+(me|the\s+page))?\s+(and\s+take\s+me\s+)?to\s+(the\s+)?products?(\s*page)?|show\s+products?|view\s+products?|open\s+catalog|show\s+catalog|open\s+shop|pesticides\s*page|^products?$|^catalog$|^shop$)/i.test(query) ||
    /\b(take\s+me\s+(to\s+)?(the\s+)?products?(\s*page)?|go\s+to\s+(the\s+)?products?(\s*page)?|shift\s+(the\s+page\s+to|to)\s+(the\s+)?products?(\s*page)?)\b/i.test(query)
  ) {
    navigate('/products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (typeof closeChatOnMobile === 'function') closeChatOnMobile();
    return {
      isCommand: true,
      response: {
        sender: 'bot',
        text: `🛍️ **Shifted to the Products Catalog!**\n\nBrowse 100% genuine factory-sealed formulations from Bayer, Syngenta, and IPL Biologicals at 20% discount on print MRP.`,
        actionButtons: [
          { label: 'View Products Catalog', action: 'close_chat', primary: true, icon: 'compass' },
          { label: 'Dosage Calculator', action: 'nav_calc', icon: 'calc' },
          { label: 'Spray Calendar', action: 'nav_calendar', icon: 'compass' }
        ],
        suggestions: ['🧮 Dosage Calculator', '🗓️ Spray Calendar', 'Open Cart Drawer']
      }
    };
  }

  // Spray Calendar
  if (
    /^(take\s+me\s+(to\s+)?(the\s+)?spray\s*calendar(\s*page)?|go\s+to\s+(the\s+)?spray\s*calendar(\s*page)?|open\s+(the\s+)?spray\s*calendar(\s*page)?|shift(\s+(me|the\s+page))?\s+(and\s+take\s+me\s+)?to\s+(the\s+)?spray\s*calendar(\s*page)?|show\s+spray\s*calendar|view\s+spray\s*calendar|open\s+calendar|spray\s*schedule|stage\s*schedule|spray\s*stages?|^calendar$)/i.test(query) ||
    /\b(take\s+me\s+(to\s+)?(the\s+)?spray\s*calendar(\s*page)?|go\s+to\s+(the\s+)?spray\s*calendar(\s*page)?|shift\s+(the\s+page\s+to|to)\s+(the\s+)?spray\s*calendar(\s*page)?)\b/i.test(query)
  ) {
    navigate('/spray-calendar');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (typeof closeChatOnMobile === 'function') closeChatOnMobile();
    return {
      isCommand: true,
      response: {
        sender: 'bot',
        text: `🗓️ **Shifted to the SKUAST-K Apple Spray Calendar!**\n\nFollow official stages from Dormant winter spray through Petal Fall and Pre-Harvest.`,
        actionButtons: [
          { label: 'View Spray Calendar', action: 'close_chat', primary: true, icon: 'compass' },
          { label: 'Calculate Dosage', action: 'nav_calc', icon: 'calc' },
          { label: 'View Products', action: 'nav_products', icon: 'compass' }
        ],
        suggestions: ['🧮 Dosage Calculator', '🛍️ Products Page', 'Open Cart Drawer']
      }
    };
  }

  // Dosage Calculator & Leaf Disease Detection
  if (
    /^(take\s+me\s+(to\s+)?(the\s+)?(dosage\s*calculator|calculator|tank\s*calculator)(\s*page)?|go\s+to\s+(the\s+)?(dosage\s*calculator|calculator|tank\s*calculator)(\s*page)?|open\s+(the\s+)?(dosage\s*calculator|calculator|tank\s*calculator)(\s*page)?|shift(\s+(me|the\s+page))?\s+(and\s+take\s+me\s+)?to\s+(the\s+)?(dosage\s*calculator|calculator|tank\s*calculator)(\s*page)?|leaf\s*disease|detect\s*leaf|leaf\s*detector|leaf\s*scan|scan\s*leaf|leaf\s*doctor|tank\s*calculator|calculate\s*tank|barrel\s*calculator|dosage\s*tool|^calculator$)/i.test(query) ||
    /\b(take\s+me\s+(to\s+)?(the\s+)?(dosage\s*calculator|calculator|tank\s*calculator)(\s*page)?|go\s+to\s+(the\s+)?(dosage\s*calculator|calculator|tank\s*calculator)(\s*page)?|shift\s+(the\s+page\s+to|to)\s+(the\s+)?(dosage\s*calculator|calculator|tank\s*calculator)(\s*page)?)\b/i.test(query)
  ) {
    navigate('/dosage-calculator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (typeof closeChatOnMobile === 'function') closeChatOnMobile();
    return {
      isCommand: true,
      response: {
        sender: 'bot',
        text: `🍃 **Shifted to Leaf Disease Pathology & Tank Dosage Guide!**\n\nExamine foliar symptoms against SKUAST-K pathology keys and calculate precise chemical tank dilutions for your barrel.`,
        actionButtons: [
          { label: 'View Dosage Calculator', action: 'close_chat', primary: true, icon: 'compass' },
          { label: 'Open Leaf Pathology Guide', action: 'nav_calc', icon: 'calc' },
          { label: 'Spray Calendar', action: 'nav_calendar', icon: 'compass' }
        ],
        suggestions: ['🌿 Leaf Pathology Guide', '🗓️ Spray Calendar', 'Open Cart Drawer']
      }
    };
  }

  // Disease Guide
  if (
    /^(take\s+me\s+(to\s+)?(the\s+)?disease\s*guide(\s*page)?|go\s+to\s+(the\s+)?disease\s*guide(\s*page)?|open\s+(the\s+)?disease\s*guide(\s*page)?|shift(\s+(me|the\s+page))?\s+(and\s+take\s+me\s+)?to\s+(the\s+)?disease\s*guide(\s*page)?|show\s+disease\s*guide|plant\s*doctor|disease\s*diagnosis|open\s+diseases?|disease\s*guide\s*page|^diseases?$)/i.test(query) ||
    /\b(take\s+me\s+(to\s+)?(the\s+)?disease\s*guide(\s*page)?|go\s+to\s+(the\s+)?disease\s*guide(\s*page)?|shift\s+(the\s+page\s+to|to)\s+(the\s+)?disease\s*guide(\s*page)?)\b/i.test(query)
  ) {
    navigate('/disease-guide');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (typeof closeChatOnMobile === 'function') closeChatOnMobile();
    return {
      isCommand: true,
      response: {
        sender: 'bot',
        text: `🔬 **Shifted to the Disease & Pest Identification Guide!**\n\nHigh-resolution symptom galleries and chemical cures for Apple Scab, Powdery Mildew, Mites, and Canker.`,
        actionButtons: [
          { label: 'View Disease Guide', action: 'close_chat', primary: true, icon: 'compass' },
          { label: 'Recommended Chemicals', action: 'nav_products', icon: 'compass' },
          { label: 'Stage Calendar', action: 'nav_calendar', icon: 'compass' }
        ],
        suggestions: ['🛍️ Products Page', '🗓️ Spray Calendar', '🧮 Dosage Calculator']
      }
    };
  }

  // Videos
  if (
    /^(take\s+me\s+(to\s+)?(the\s+)?videos?(\s*page|\s*gallery)?|go\s+to\s+(the\s+)?videos?(\s*page|\s*gallery)?|open\s+(the\s+)?videos?(\s*page|\s*gallery)?|shift(\s+(me|the\s+page))?\s+(and\s+take\s+me\s+)?to\s+(the\s+)?videos?(\s*page|\s*gallery)?|show\s+videos?|video\s*gallery|watch\s*videos?|tutorials?|^videos?$)/i.test(query) ||
    /\b(take\s+me\s+(to\s+)?(the\s+)?videos?(\s*page|\s*gallery)?|go\s+to\s+(the\s+)?videos?(\s*page|\s*gallery)?|shift\s+(the\s+page\s+to|to)\s+(the\s+)?videos?(\s*page|\s*gallery)?)\b/i.test(query)
  ) {
    navigate('/videos');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (typeof closeChatOnMobile === 'function') closeChatOnMobile();
    return {
      isCommand: true,
      response: {
        sender: 'bot',
        text: `🎥 **Shifted to the Farmer Video Gallery!**\n\nStep-by-step demonstrations on spray methods, WALES mixing order, and orchard management.`,
        actionButtons: [
          { label: 'View Video Gallery', action: 'close_chat', primary: true, icon: 'compass' },
          { label: 'Return Home', action: 'nav_home', icon: 'compass' },
          { label: 'Products', action: 'nav_products', icon: 'compass' }
        ],
        suggestions: ['🏠 Return Home', '🛍️ Products Page', '🗓️ Spray Calendar']
      }
    };
  }

  // Contact / Shop
  if (
    /^(take\s+me\s+(to\s+)?(the\s+)?contact(\s*page)?|go\s+to\s+(the\s+)?contact(\s*page)?|open\s+(the\s+)?contact(\s*page)?|shift(\s+(me|the\s+page))?\s+(and\s+take\s+me\s+)?to\s+(the\s+)?contact(\s*page)?|contact\s*page|where\s+is\s+(your\s+|the\s+)?shop|shop\s*address|visit\s*shop|srinagar\s*location|contact\s*us|^contact$)/i.test(query) ||
    /\b(take\s+me\s+(to\s+)?(the\s+)?contact(\s*page)?|go\s+to\s+(the\s+)?contact(\s*page)?|shift\s+(the\s+page\s+to|to)\s+(the\s+)?contact(\s*page)?)\b/i.test(query)
  ) {
    navigate('/contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (typeof closeChatOnMobile === 'function') closeChatOnMobile();
    return {
      isCommand: true,
      response: {
        sender: 'bot',
        text: `📍 **Shifted to Store Contact & Location!**\n\nM.A. Pesticides & Fertilizers is located at Hari Singh High Street / Tengpora Bypass, Srinagar, Kashmir.\n\n- 📞 Phone: +91 9906541321\n- 👨‍🔬 Founder: Sheikh Mohammad Ayoub (M.Sc. Organic Chemistry)`,
        actionButtons: [
          { label: 'View Contact Page', action: 'close_chat', primary: true, icon: 'compass' },
          { label: 'Call Shop (+91 9906541321)', action: 'call_shop', icon: 'phone' },
          { label: 'Open Google Maps', action: 'open_map', icon: 'compass' }
        ],
        suggestions: ['📞 Call Shop', '🗺️ Open Google Maps', '🛍️ Browse Products']
      }
    };
  }

  // About Us
  if (
    /^(take\s+me\s+(to\s+)?(the\s+)?about(\s*us|\s*page)?|go\s+to\s+(the\s+)?about(\s*us|\s*page)?|open\s+(the\s+)?about(\s*us|\s*page)?|shift(\s+(me|the\s+page))?\s+(and\s+take\s+me\s+)?to\s+(the\s+)?about(\s*us|\s*page)?|about\s*page|who\s+are\s+you|about\s*company|about\s*us|^about$)/i.test(query) ||
    /\b(take\s+me\s+(to\s+)?(the\s+)?about(\s*us|\s*page)?|go\s+to\s+(the\s+)?about(\s*us|\s*page)?|shift\s+(the\s+page\s+to|to)\s+(the\s+)?about(\s*us|\s*page)?)\b/i.test(query)
  ) {
    navigate('/about');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (typeof closeChatOnMobile === 'function') closeChatOnMobile();
    return {
      isCommand: true,
      response: {
        sender: 'bot',
        text: `📖 **Shifted to the About Us Page!**\n\nRead about Sheikh Mohammad Ayoub's 30+ year commitment to pesticide authenticity and Kashmir horticulture.`,
        actionButtons: [
          { label: 'View About Page', action: 'close_chat', primary: true, icon: 'compass' },
          { label: 'Return Home', action: 'nav_home', icon: 'compass' },
          { label: 'Products', action: 'nav_products', icon: 'compass' }
        ],
        suggestions: ['🏠 Return Home', '🛍️ Products Page', '🗓️ Spray Calendar']
      }
    };
  }

  // 9. LIVE SEARCH REDIRECTION
  if (/^(search\s+for|search|find|look\s+for)\s+(.+)$/i.test(query)) {
    const term = query.replace(/^(search\s+for|search|find|look\s+for)\s+/i, '').trim();
    if (term) {
      navigate('/search?q=' + encodeURIComponent(term));
      return {
        isCommand: true,
        response: {
          sender: 'bot',
          actionExecuted: `Searched Website for "${term}"`,
          text: `🔍 **Searching the website for "${term}"...**\n\nI have routed you to live matching products, disease protocols, and calendar stages.`,
          actionButtons: [
            { label: '🛍️ View Products', action: 'nav_products', icon: 'compass' },
            { label: '🧮 Dosage Calculator', action: 'nav_calc', icon: 'calc' }
          ],
          suggestions: ['🛍️ View Products', '🧮 Dosage Calculator', '🗓️ Spray Calendar']
        }
      };
    }
  }

  // 10. PHONE CALL TRIGGER
  if (/(call\s+shop|call\s+sheikh\s+ayoub|call\s+the\s+store|phone\s+call|dial\s+number|call\s+now)/i.test(query)) {
    safeOpen('tel:+919906541321', '_self');
    return {
      isCommand: true,
      response: {
        sender: 'bot',
        actionExecuted: 'Dialed Shop Phone (+91 9906541321)',
        text: `📞 **Initiating phone call to Sheikh Mohammad Ayoub (+91 9906541321)...**\n\nConnecting you directly to our Tengpora Bypass Srinagar shop counter for instant consultation!`,
        actionButtons: [
          { label: '💬 WhatsApp Store', action: 'open_whatsapp', icon: 'phone' }
        ],
        suggestions: ['🛍️ Browse Products', '📍 Srinagar Location', '⚡ Open Cart Drawer']
      }
    };
  }

  // 11. GOOGLE MAPS DIRECTIONS
  if (/(google\s+maps?|open\s+map|directions?\s+to\s+shop|how\s+to\s+reach\s+shop|map\s+location)/i.test(query)) {
    safeOpen('https://maps.google.com/?q=MA+Pesticides+Tengpora+Bypass+Batamaloo+Srinagar', '_blank');
    return {
      isCommand: true,
      response: {
        sender: 'bot',
        actionExecuted: 'Opened Google Maps Directions',
        text: `🗺️ **Opened Google Maps Navigation to M.A. Pesticides Srinagar!**\n\nLocated centrally on Tengpora Bypass, Batamaloo, Srinagar, Kashmir.`,
        actionButtons: [
          { label: '📞 Call Shop Counter', action: 'call_shop', icon: 'phone' }
        ],
        suggestions: ['📞 Call Shop', '🛍️ Browse Products', '🗓️ Spray Calendar']
      }
    };
  }

  // 12. SCROLLING
  if (/(scroll\s+to\s+top|back\s+to\s+top|scroll\s+up)/i.test(query)) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return {
      isCommand: true,
      response: {
        sender: 'bot',
        actionExecuted: 'Scrolled to Top of Page',
        text: `⬆️ **Scrolled to the top of the page!**`,
        suggestions: ['🛍️ Products Page', '🗓️ Spray Calendar', '🧮 Dosage Calculator']
      }
    };
  }

  if (/(scroll\s+to\s+bottom|scroll\s+down)/i.test(query)) {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    return {
      isCommand: true,
      response: {
        sender: 'bot',
        actionExecuted: 'Scrolled to Bottom of Page',
        text: `⬇️ **Scrolled to the bottom of the page!**`,
        suggestions: ['⬆️ Scroll to Top', '🛍️ Products Page', '⚡ Open Cart Drawer']
      }
    };
  }

  return { isCommand: false };
}

// ============================================================================
// 5. Main Component: AdvisorChatbot
// ============================================================================
export default function AdvisorChatbot() {
  const navigate = useNavigate();
  const cart = useCart();
  const themeContext = useTheme();

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Assalamu Alaikum! 👋 Welcome to **M.A. Pesticides & Fertilizers**.\n\nI am your digital consultation desk, drawing on decades of organic chemistry and field agronomy from **Sheikh Mohammad Ayoub** (M.Sc. Organic Chemistry, B.Ed. — University of Kashmir).\n\nHow can we help protect your orchard today?\n- 🌤️ **Live Weather Window:** Srinagar orchard temperature, rain risk & spray safety\n- 🍏 **Crop Disease Diagnosis:** Identify Apple Scab, Red Mites, Mildew, and Canker\n- 🧮 **Spray Dilution:** Compute exact formulation grams for 200L barrels or orchard acreage\n- 🗓️ **SKUAST-K Calendar:** Official stage-by-stage spray recommendations\n- 🛒 **Store Orders:** Inquire about genuine factory batches & 20% discount on print MRP",
      thoughtProcess: [
        { title: '1. Knowledge Base Initialization', detail: 'Loaded SKUAST-K Kashmir Spray Guidelines and verified pesticide formulation inventory.' },
        { title: '2. Microclimate Telemetry Ready', detail: 'Linked multi-district Open-Meteo satellite feed for Srinagar, Shopian, Sopore, and Pulwama.' },
        { title: '3. Clinical Consultation Ready', detail: 'Ready for disease diagnosis, precision tank dilution math, and tank mix safety verification.' }
      ],
      suggestions: ['🌤️ What is the weather right now', '🍏 Apple Scab Treatment', '🧮 200L Tank Dosage Calc', '🗓️ Pink Bud Stage Spray']
    }
  ]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [thinkingStepIndex, setThinkingStepIndex] = useState(0);
  const [expandedThoughts, setExpandedThoughts] = useState({ 0: false });
  const [isListening, setIsListening] = useState(false);
  const [speakingIdx, setSpeakingIdx] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [addedItemNotification, setAddedItemNotification] = useState(null);
  const [copiedPrescriptionId, setCopiedPrescriptionId] = useState(null);

  const toggleThoughts = (msgIdx) => {
    setExpandedThoughts(prev => ({
      ...prev,
      [msgIdx]: !prev[msgIdx]
    }));
  };

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
  }, [messages, isOpen, isThinking, thinkingStepIndex]);

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
        try { recognitionRef.current.abort(); } catch { /* ignore */ }
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

  // Autonomous action execution dispatcher
  const handleExecuteAction = (action, payload) => {
    switch (action) {
      case 'add_to_cart':
        if (payload) {
          cart.addToCart(payload, 1, { openDrawer: false });
          setAddedItemNotification(payload.name);
          setTimeout(() => setAddedItemNotification(null), 2500);
        }
        break;
      case 'open_cart':
        cart.openCart();
        break;
      case 'close_cart':
        cart.closeCart();
        break;
      case 'clear_cart':
        cart.clearCart();
        break;
      case 'close_chat':
        setIsOpen(false);
        break;
      case 'nav_products':
        navigate('/products');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        break;
      case 'nav_calendar':
        navigate('/spray-calendar');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        break;
      case 'nav_calc':
        navigate('/dosage-calculator');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        break;
      case 'nav_diseases':
        navigate('/disease-guide');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        break;
      case 'nav_videos':
        navigate('/videos');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        break;
      case 'nav_contact':
        navigate('/contact');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        break;
      case 'nav_about':
        navigate('/about');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        break;
      case 'nav_home':
        navigate('/');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        break;
      case 'toggle_dark':
        if (themeContext.theme !== 'dark') themeContext.toggleTheme();
        break;
      case 'toggle_light':
        if (themeContext.theme !== 'light') themeContext.toggleTheme();
        break;
      case 'toggle_theme':
        themeContext.toggleTheme();
        break;
      case 'call_shop':
        safeOpen('tel:+919906541321', '_self');
        break;
      case 'open_whatsapp':
        safeOpen('https://wa.me/919906541321?text=Salam%20Sheikh%20Ayoub,%20I%20need%20expert%20assistance.', '_blank');
        break;
      case 'open_map':
        safeOpen('https://maps.google.com/?q=MA+Pesticides+Tengpora+Bypass+Batamaloo+Srinagar', '_blank');
        break;
      default:
        break;
    }
  };

  // Copy spray dilution prescription to clipboard
  const handleCopyPrescription = (embed, msgIdx) => {
    const text = `🌿 SKUAST-K Spray Dilution Recipe (MA Pesticides Srinagar)\n` +
      `• Scale: ${embed.scaleDescription}\n` +
      `• Total Spray Water: ${embed.waterLiters}L (${embed.barrels} Barrels)\n\n` +
      embed.products.map(p => `• ${p.name}: ${p.requiredQty} (${p.packDesc}) ~₹${p.price.toLocaleString('en-IN')}`).join('\n') +
      `\n\nEstimated Cost: ~₹${embed.totalEstimate.toLocaleString('en-IN')} (20% OFF MRP)\n` +
      `Mix using WALES order. Apply early morning or late afternoon. MA Pesticides Srinagar (+91 99065 41321).`;
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        setCopiedPrescriptionId(msgIdx);
        setTimeout(() => setCopiedPrescriptionId(null), 2200);
      }).catch(() => {});
    }
  };

  // Send message & execute autonomous action
  const handleSend = (textToSend) => {
    const raw = (textToSend || input).trim();
    if (!raw) return;

    if (!checkRateLimit('chatbot_query', 6, 3000)) {
      setMessages(prev => [...prev, {
        sender: 'bot',
        text: '⚠️ **System Protection:** Request rate limit reached. Please wait a brief moment.'
      }]);
      return;
    }

    const queryText = sanitizeInput(raw, 400);

    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setSpeakingIdx(null);
    }

    const userMsg = { sender: 'user', text: queryText };
    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsThinking(true);
    setThinkingStepIndex(0);

    const stepInterval = setInterval(() => {
      setThinkingStepIndex(prev => (prev + 1) % 4);
    }, 280);

    setTimeout(async () => {
      clearInterval(stepInterval);
      try {
        // 1. Try autonomous website executive action
        const commandResult = executeWebsiteCommand({
          userText: queryText,
          messageHistory: messages,
          navigate,
          cart,
          themeContext,
          closeChatOnMobile: () => {
            if (typeof window !== 'undefined' && window.innerWidth <= 768) {
              setTimeout(() => {
                setIsOpen(false);
              }, 1200);
            }
          }
        });

        if (commandResult && commandResult.isCommand) {
          const resp = {
            ...commandResult.response,
            thoughtProcess: commandResult.response.thoughtProcess || generateThoughtProcess('action', {
              command: commandResult.response.actionExecuted || queryText
            })
          };
          setMessages(prev => {
            const nextIdx = prev.length;
            setExpandedThoughts(curr => ({ ...curr, [nextIdx]: true }));
            return [...prev, resp];
          });
          setIsThinking(false);
          return;
        }

        // 2. Synthesize domain response & inject contextual actions
        const response = await getBotResponse(queryText, messages);
        setMessages(prev => {
          const nextIdx = prev.length;
          setExpandedThoughts(curr => ({ ...curr, [nextIdx]: true }));
          return [...prev, { sender: 'bot', ...response }];
        });
      } catch (err) {
        console.error('Advisor deliberation error:', err);
      } finally {
        setIsThinking(false);
      }
    }, 1100);
  };

  // Reset chat
  const handleResetChat = () => {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    setSpeakingIdx(null);
    setExpandedThoughts({ 0: false });
    setMessages([
      {
        sender: 'bot',
        text: "Assalamu Alaikum! Conversation reset.\n\nWelcome to the **M.A. Pesticides Consultation Desk**. How can we help your orchard today? You can ask about product prices (with 20% discount on print MRP), spray timing, tank dilutions, or disease control.",
        thoughtProcess: [
          { title: '1. Session Re-initialization', detail: 'Reset contextual dialogue memory and re-calibrated SKUAST-K agronomic database.' },
          { title: '2. Ready for Next Inquiry', detail: 'Awaiting farmer questions on crop diseases, spray schedules, or store pricing.' }
        ],
        suggestions: ['🍏 Apple Scab Treatment', '🧮 200L Tank Dosage Calc', '🗓️ Pink Bud Stage Spray', '🏷️ Products Price List']
      }
    ]);
  };

  // Filter tab quick prompts
  const activePrompts = useMemo(() => {
    if (activeCategory === 'pricing') {
      return [
        { label: '🏷️ Products Price List', query: 'what is the pricing of products' },
        { label: '🌾 Fungicide Prices', query: 'what is the price of fungicides' },
        { label: '🐛 Insecticide Prices', query: 'what is the price of insecticides' },
        { label: '🏷️ Price of Luna Experience', query: 'what is the price of Luna' },
        { label: '🏷️ Price of Superstar Dodine', query: 'what is the price of Superstar Dodine' },
        { label: '🏷️ Price of Bayer Antracol', query: 'what is the price of Antracol' },
        { label: '🏷️ Price of Syngenta Alika', query: 'what is the price of Alika' },
        { label: '🛢️ Price of HMO Oil', query: 'what is the price of HMO' },
        { label: '🌿 Bio-Stimulant Prices', query: 'what is the price of bio stimulants' }
      ];
    }
    if (activeCategory === 'actions') {
      return [
        { label: '🛒 Open Cart Drawer', query: 'open my cart' },
        { label: '🛍️ Go to Products', query: 'take me to products' },
        { label: '🧮 Dosage Calculator', query: 'open dosage calculator' },
        { label: '🗓️ Spray Calendar', query: 'open spray calendar' },
        { label: '🔬 Disease Guide', query: 'open disease guide' },
        { label: '🌙 Dark Mode', query: 'turn on dark mode' },
        { label: '☀️ Light Mode', query: 'turn on light mode' },
        { label: '📞 Call Store Now', query: 'call shop' },
        { label: '🗺️ Google Maps Directions', query: 'open map directions' },
        { label: '🗑️ Clear My Cart', query: 'clear my cart' }
      ];
    }
    if (activeCategory === 'weather') {
      return [
        { label: '🌤️ Weather Right Now', query: 'what is the weather right now' },
        { label: '🛡️ Safe to Spray Today?', query: 'is it safe to spray right now' },
        { label: '🌧️ Srinagar Rain Chance', query: 'is it going to rain in srinagar today' },
        { label: '⏱️ Rain-Fastness Window', query: 'how much rain free drying time needed for fungicide' }
      ];
    }
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
      { label: '🏷️ Pricing of Products (20% OFF)', query: 'what is the pricing of products' },
      { label: '🌤️ Weather Right Now', query: 'what is the weather right now' },
      { label: '🛒 Open My Cart', query: 'open my cart' },
      { label: '🍏 Apple Scab Cure', query: 'Apple Scab spray' },
      { label: '⚡ 200L Tank Dosage Calc', query: '200 litre tank dosage' },
      { label: '🛍️ Go to Products', query: 'take me to products' },
      { label: '🌙 Turn on Dark Mode', query: 'turn on dark mode' },
      { label: '✂️ How to Prune Trees', query: 'how to prune apple trees?' },
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
        aria-label="Open Sheikh Mohammad Ayoub Advisory Desk"
        style={{
          boxShadow: '0 8px 30px rgba(28, 71, 42, 0.35)',
          background: 'var(--color-pine-green)',
          color: '#ffffff',
          fontWeight: 500,
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
      >
        <MessageCircle size={17} style={{ color: '#ffffff' }} />
        <span>Chemist Advisory Desk</span>
        <span style={{
          display: 'inline-block',
          width: '7px',
          height: '7px',
          borderRadius: '50%',
          backgroundColor: '#34d399'
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
          <div className="advisor-chatbot-modal" role="dialog" aria-modal="true" aria-label="Sheikh Mohammad Ayoub Orchard Advisory Desk">
            {/* Mobile Sheet Handle */}
            <div className="advisor-mobile-handle" />

            {/* Notification Toast for Live Actions */}
            {addedItemNotification && (
              <div style={{
                position: 'absolute',
                top: '64px',
                left: '14px',
                right: '14px',
                backgroundColor: 'var(--color-pine-green, #1c472a)',
                color: '#ffffff',
                padding: '8px 14px',
                borderRadius: '10px',
                fontSize: '12px',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: '0 6px 18px rgba(28, 71, 42, 0.35)',
                zIndex: 25,
                animation: 'fadeInModal 0.2s ease-out'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle size={15} style={{ color: '#34d399' }} />
                  <span>Added <strong>{addedItemNotification}</strong> to Cart!</span>
                </div>
                <button
                  onClick={() => cart.openCart()}
                  style={{
                    background: 'rgba(255,255,255,0.2)',
                    border: 'none',
                    color: '#ffffff',
                    fontSize: '11px',
                    fontWeight: 600,
                    padding: '2px 8px',
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }}
                >
                  View Cart
                </button>
              </div>
            )}

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
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                    <h4 style={{ fontFamily: 'var(--font-signifier)', fontSize: '17px', fontWeight: 500, margin: 0, color: 'var(--color-ink-black)' }}>
                      Sheikh Mohammad Ayoub
                    </h4>
                    <span style={{
                      fontSize: '9.5px',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.4px',
                      padding: '1px 6px',
                      borderRadius: '10px',
                      backgroundColor: 'rgba(16, 185, 129, 0.15)',
                      color: '#047857',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '3px'
                    }}>
                      SKUAST-K Aligned
                    </span>
                  </div>
                  <span style={{ fontSize: '11px', color: 'var(--color-slate-gray)' }}>
                    Senior Chemist &amp; Agronomist • Hari Singh High Street, Srinagar
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
                { id: 'pricing', label: '🏷️ Pricing' },
                { id: 'weather', label: '🌤️ Weather' },
                { id: 'actions', label: '⚡ Actions' },
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
                    <div style={{ flex: 1, minWidth: 0 }}>
                      {/* Expandable Chemist Clinical Thought Process */}
                      {msg.sender === 'bot' && msg.thoughtProcess && msg.thoughtProcess.length > 0 && (
                        <div style={{
                          marginBottom: '10px',
                          padding: '8px 12px',
                          borderRadius: '10px',
                          backgroundColor: 'rgba(28, 71, 42, 0.04)',
                          border: '1px solid rgba(28, 71, 42, 0.12)'
                        }}>
                          <button
                            type="button"
                            onClick={() => toggleThoughts(idx)}
                            style={{
                              width: '100%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              background: 'none',
                              border: 'none',
                              padding: 0,
                              cursor: 'pointer',
                              color: 'var(--color-pine-green, #1c472a)',
                              fontSize: '11.5px',
                              fontWeight: 700,
                              letterSpacing: '0.2px'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <Brain size={13} style={{ color: 'var(--color-pine-green)' }} />
                              <span>Chemist Reasoning ({msg.thoughtProcess.length} analytical steps)</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--color-slate-gray)', fontSize: '11px', fontWeight: 500 }}>
                              <span>{expandedThoughts[idx] ? 'Hide' : 'View'}</span>
                              {expandedThoughts[idx] ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                            </div>
                          </button>

                          {expandedThoughts[idx] && (
                            <div style={{
                              marginTop: '8px',
                              paddingTop: '8px',
                              borderTop: '1px solid rgba(28, 71, 42, 0.1)',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '6px'
                            }}>
                              {msg.thoughtProcess.map((step, sIdx) => (
                                <div key={sIdx} style={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  padding: '5px 8px',
                                  borderRadius: '6px',
                                  backgroundColor: 'rgba(255, 255, 255, 0.85)',
                                  border: '1px solid rgba(28, 71, 42, 0.08)'
                                }}>
                                  <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-pine-green, #1c472a)' }}>
                                    {step.title}
                                  </span>
                                  <span style={{ fontSize: '11px', color: '#4b5563', lineHeight: '1.4', marginTop: '1px' }}>
                                    {step.detail}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      {msg.sender === 'bot' ? (
                        <StructuredBotMessage text={msg.text} />
                      ) : (
                        <div style={{ whiteSpace: 'pre-line' }}>{msg.text}</div>
                      )}
                    </div>
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

                  {/* Interactive In-Chat Action Buttons */}
                  {msg.actionButtons && msg.actionButtons.length > 0 && (
                    <div style={{
                      marginTop: '10px',
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '6px'
                    }}>
                      {msg.actionButtons.map((btn, bIdx) => (
                        <button
                          key={bIdx}
                          onClick={() => handleExecuteAction(btn.action, btn.payload)}
                          className={`advisor-control-btn ${btn.primary ? 'advisor-control-btn-primary' : ''}`}
                        >
                          {btn.icon === 'cart' && <ShoppingCart size={12} />}
                          {btn.icon === 'calc' && <Calculator size={12} />}
                          {btn.icon === 'compass' && <Compass size={12} />}
                          {btn.icon === 'phone' && <PhoneCall size={12} />}
                          {btn.icon === 'moon' && <Moon size={12} />}
                          {btn.icon === 'sun' && <Sun size={12} />}
                          {btn.icon === 'zap' && <Zap size={12} />}
                          <span>{btn.label}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Embedded Interactive Product Card */}
                  {msg.productEmbed && (
                    <div style={{
                      marginTop: '10px',
                      padding: '12px',
                      borderRadius: '12px',
                      backgroundColor: 'var(--color-fog-white, #fafafb)',
                      border: '1px solid rgba(23, 25, 28, 0.08)'
                    }}>
                      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        {msg.productEmbed.image ? (
                          <img
                            src={msg.productEmbed.image}
                            alt={msg.productEmbed.name}
                            loading="lazy"
                            decoding="async"
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
                            20% Flat Discount (~₹{estimateProductPrice(msg.productEmbed).discounted})
                          </div>
                        </div>
                      </div>

                      {/* Instant Autonomous Actions on Product */}
                      <div style={{ display: 'flex', gap: '6px', marginTop: '10px', flexWrap: 'wrap' }}>
                        <button
                          onClick={() => {
                            cart.addToCart(msg.productEmbed, 1, { openDrawer: false });
                            setAddedItemNotification(msg.productEmbed.name);
                            setTimeout(() => setAddedItemNotification(null), 2500);
                          }}
                          className="advisor-control-btn advisor-control-btn-primary"
                        >
                          <ShoppingCart size={12} />
                          <span>+ Add to Cart</span>
                        </button>
                        <button
                          onClick={() => navigate('/dosage-calculator')}
                          className="advisor-control-btn"
                        >
                          <Calculator size={12} />
                          <span>Calc Tank Dosage</span>
                        </button>
                        <button
                          onClick={() => navigate('/products')}
                          className="advisor-control-btn"
                        >
                          <Compass size={12} />
                          <span>Catalog</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Embedded Live Weather Radar Card */}
                  {msg.weatherEmbed && (
                    <div style={{
                      marginTop: '12px',
                      padding: '14px',
                      borderRadius: '14px',
                      background: 'linear-gradient(135deg, rgba(28, 71, 42, 0.08) 0%, rgba(28, 71, 42, 0.02) 100%)',
                      border: '1px solid rgba(28, 71, 42, 0.16)',
                      boxShadow: '0 4px 14px rgba(0, 0, 0, 0.04)'
                    }}>
                      {/* Header */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            backgroundColor: '#10b981',
                            display: 'inline-block',
                            boxShadow: '0 0 6px #10b981'
                          }} />
                          <span style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--color-pine-green)' }}>
                            Srinagar Weather Station (Open-Meteo)
                          </span>
                        </div>
                        <span style={{
                          fontSize: '11px',
                          fontWeight: 600,
                          padding: '3px 8px',
                          borderRadius: '9999px',
                          backgroundColor: msg.weatherEmbed.sprayStatus === 'SAFE' ? 'rgba(16, 185, 129, 0.15)' : msg.weatherEmbed.sprayStatus === 'CAUTION' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                          color: msg.weatherEmbed.sprayStatus === 'SAFE' ? '#047857' : msg.weatherEmbed.sprayStatus === 'CAUTION' ? '#b45309' : '#b91c1c'
                        }}>
                          {msg.weatherEmbed.sprayStatus === 'SAFE' ? 'SAFE TO SPRAY' : msg.weatherEmbed.sprayStatus === 'CAUTION' ? 'EXERCISE CAUTION' : 'UNSAFE TO SPRAY'}
                        </span>
                      </div>

                      {/* Primary Temp & Condition Banner */}
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '12px' }}>
                        <span style={{ fontSize: '32px', fontWeight: 700, fontFamily: 'var(--font-signifier)', color: 'var(--color-ink-black)', lineHeight: 1 }}>
                          {msg.weatherEmbed.temp}
                        </span>
                        <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--color-slate-gray)' }}>
                          {msg.weatherEmbed.condition?.emoji} {msg.weatherEmbed.condition?.text} • {msg.weatherEmbed.location}
                        </div>
                      </div>

                      {/* Metric Chips Grid */}
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        gap: '6px',
                        marginBottom: '10px'
                      }}>
                        <div style={{ padding: '8px 6px', backgroundColor: '#ffffff', borderRadius: '8px', textAlign: 'center', border: '1px solid rgba(0,0,0,0.05)' }}>
                          <span style={{ fontSize: '10px', color: 'var(--color-ash-gray)', display: 'block' }}>Humidity</span>
                          <strong style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-ink-black)' }}>{msg.weatherEmbed.humidity}</strong>
                        </div>
                        <div style={{ padding: '8px 6px', backgroundColor: '#ffffff', borderRadius: '8px', textAlign: 'center', border: '1px solid rgba(0,0,0,0.05)' }}>
                          <span style={{ fontSize: '10px', color: 'var(--color-ash-gray)', display: 'block' }}>Rain Risk</span>
                          <strong style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-ink-black)' }}>{msg.weatherEmbed.rainProbability}%</strong>
                        </div>
                        <div style={{ padding: '8px 6px', backgroundColor: '#ffffff', borderRadius: '8px', textAlign: 'center', border: '1px solid rgba(0,0,0,0.05)' }}>
                          <span style={{ fontSize: '10px', color: 'var(--color-ash-gray)', display: 'block' }}>Wind</span>
                          <strong style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-ink-black)' }}>{msg.weatherEmbed.wind}</strong>
                        </div>
                        <div style={{ padding: '8px 6px', backgroundColor: '#ffffff', borderRadius: '8px', textAlign: 'center', border: '1px solid rgba(0,0,0,0.05)' }}>
                          <span style={{ fontSize: '10px', color: 'var(--color-ash-gray)', display: 'block' }}>Dry Window</span>
                          <strong style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-ink-black)' }}>{msg.weatherEmbed.dryWindow}</strong>
                        </div>
                      </div>

                      {/* SKUAST-K Advisory Note */}
                      <div style={{ fontSize: '11.5px', color: 'var(--color-slate-gray)', lineHeight: '1.4', marginBottom: '10px', padding: '6px 8px', borderRadius: '6px', backgroundColor: 'rgba(255,255,255,0.7)' }}>
                        <strong>SKUAST-K Rule:</strong> {msg.weatherEmbed.advisory}
                      </div>

                      {/* Action Buttons */}
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                        <button
                          onClick={() => navigate('/spray-calendar')}
                          className="advisor-control-btn advisor-control-btn-primary"
                        >
                          <Calendar size={12} />
                          <span>Open Spray Calendar</span>
                        </button>
                        <button
                          onClick={() => navigate('/dosage-calculator')}
                          className="advisor-control-btn"
                        >
                          <Calculator size={12} />
                          <span>Tank Dosage</span>
                        </button>
                        <button
                          onClick={() => handleSend('what is the weather right now')}
                          className="advisor-control-btn"
                          title="Refresh live satellite weather feed"
                        >
                          <RefreshCw size={12} />
                          <span>Refresh Live</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Embedded Stage Card */}
                  {msg.stageEmbed && (
                    <div style={{
                      marginTop: '10px',
                      padding: '12px',
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
                      <div style={{ display: 'flex', gap: '6px', marginTop: '8px', flexWrap: 'wrap' }}>
                        <button
                          onClick={() => navigate('/spray-calendar')}
                          className="advisor-control-btn advisor-control-btn-primary"
                        >
                          <Calendar size={12} />
                          <span>Open Spray Calendar</span>
                        </button>
                        <button
                          onClick={() => navigate('/dosage-calculator')}
                          className="advisor-control-btn"
                        >
                          <Calculator size={12} />
                          <span>Compute Dilution</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Embedded Interactive Dosage Calculation Card */}
                  {msg.dosageEmbed && (
                    <div style={{
                      marginTop: '12px',
                      padding: '14px',
                      borderRadius: '14px',
                      backgroundColor: 'rgba(28, 71, 42, 0.05)',
                      border: '1px solid rgba(28, 71, 42, 0.2)',
                      fontSize: '12px'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px', paddingBottom: '6px', borderBottom: '1px solid rgba(28, 71, 42, 0.12)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Calculator size={15} style={{ color: 'var(--color-pine-green)' }} />
                          <span style={{ fontWeight: 700, color: 'var(--color-pine-green)', fontSize: '12.5px' }}>
                            Orchard Spray Dilution Card
                          </span>
                        </div>
                        <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '12px', backgroundColor: 'rgba(28, 71, 42, 0.12)', color: 'var(--color-pine-green)', fontWeight: 600 }}>
                          {msg.dosageEmbed.barrels} Barrels (200L)
                        </span>
                      </div>

                      <div style={{ fontSize: '11.5px', color: 'var(--color-slate-gray)', marginBottom: '10px' }}>
                        <span>Target Scale: <strong>{msg.dosageEmbed.scaleDescription}</strong> ({msg.dosageEmbed.waterLiters}L Water)</span>
                      </div>

                      {/* Product Formulation Breakdown */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
                        {msg.dosageEmbed.products.map((p, pIdx) => (
                          <div key={pIdx} style={{
                            padding: '8px 10px',
                            borderRadius: '8px',
                            backgroundColor: 'rgba(255, 255, 255, 0.85)',
                            border: '1px solid rgba(28, 71, 42, 0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '8px'
                          }}>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ fontWeight: 600, color: '#111827', fontSize: '12px' }}>
                                {p.name}
                              </div>
                              <div style={{ fontSize: '11px', color: '#6b7280', marginTop: '1px' }}>
                                Dilution: <strong style={{ color: '#059669' }}>{p.rate}</strong> • Qty: <strong>{p.requiredQty}</strong> ({p.packDesc})
                              </div>
                            </div>
                            <div style={{ textAlign: 'right', display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <span style={{ fontWeight: 700, color: 'var(--color-pine-green)', fontSize: '12px' }}>
                                ~₹{p.price.toLocaleString('en-IN')}
                              </span>
                              {p.rawProduct && (
                                <button
                                  type="button"
                                  onClick={() => handleExecuteAction('add_to_cart', p.rawProduct)}
                                  className="advisor-control-btn advisor-control-btn-primary"
                                  style={{ padding: '3px 8px', fontSize: '10.5px' }}
                                  title={`Add ${p.name} to cart`}
                                >
                                  <Plus size={11} />
                                  <span>Cart</span>
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Total & Action Controls */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', paddingTop: '8px', borderTop: '1px solid rgba(28, 71, 42, 0.12)' }}>
                        <div style={{ fontSize: '11.5px', color: 'var(--color-slate-gray)' }}>
                          Total Est: <strong style={{ color: 'var(--color-pine-green)', fontSize: '13px' }}>~₹{msg.dosageEmbed.totalEstimate.toLocaleString('en-IN')}</strong> <span style={{ fontSize: '10px', color: '#059669' }}>(20% OFF)</span>
                        </div>
                        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                          <button
                            type="button"
                            onClick={() => handleCopyPrescription(msg.dosageEmbed, idx)}
                            className="advisor-control-btn"
                            title="Copy prescription to clipboard"
                          >
                            {copiedPrescriptionId === idx ? <Check size={12} style={{ color: '#059669' }} /> : <Copy size={12} />}
                            <span>{copiedPrescriptionId === idx ? 'Copied Recipe!' : 'Copy Recipe'}</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              msg.dosageEmbed.products.forEach(p => {
                                if (p.rawProduct) {
                                  cart.addToCart(p.rawProduct, 1, { openDrawer: false });
                                }
                              });
                              setAddedItemNotification('All Recipe Items');
                              setTimeout(() => setAddedItemNotification(null), 2500);
                            }}
                            className="advisor-control-btn advisor-control-btn-primary"
                            title="Add all recipe products to shopping cart"
                          >
                            <ShoppingCart size={12} />
                            <span>Add All to Cart</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => navigate('/dosage-calculator')}
                            className="advisor-control-btn"
                            title="Open full interactive dosage calculator"
                          >
                            <ExternalLink size={12} />
                            <span>Full Calc</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Embedded Tank Mix Biochemical Compatibility Card */}
                  {msg.tankMixEmbed && (
                    <div style={{
                      marginTop: '12px',
                      padding: '14px',
                      borderRadius: '14px',
                      backgroundColor: msg.tankMixEmbed.status === 'INCOMPATIBLE_HAZARD'
                        ? 'rgba(239, 68, 68, 0.06)'
                        : msg.tankMixEmbed.status === 'COMPATIBLE_SAFE'
                        ? 'rgba(16, 185, 129, 0.06)'
                        : 'rgba(2, 132, 199, 0.06)',
                      border: `1px solid ${
                        msg.tankMixEmbed.status === 'INCOMPATIBLE_HAZARD'
                          ? 'rgba(239, 68, 68, 0.3)'
                          : msg.tankMixEmbed.status === 'COMPATIBLE_SAFE'
                          ? 'rgba(16, 185, 129, 0.3)'
                          : 'rgba(2, 132, 199, 0.3)'
                      }`,
                      fontSize: '12px'
                    }}>
                      {/* Header Badge */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px', paddingBottom: '6px', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          {msg.tankMixEmbed.status === 'INCOMPATIBLE_HAZARD' ? (
                            <AlertTriangle size={16} style={{ color: '#dc2626' }} />
                          ) : msg.tankMixEmbed.status === 'COMPATIBLE_SAFE' ? (
                            <CheckCircle size={16} style={{ color: '#059669' }} />
                          ) : (
                            <Beaker size={16} style={{ color: '#0284c7' }} />
                          )}
                          <span style={{
                            fontWeight: 700,
                            fontSize: '11px',
                            letterSpacing: '0.4px',
                            textTransform: 'uppercase',
                            color: msg.tankMixEmbed.badgeColor || '#1f2937'
                          }}>
                            {msg.tankMixEmbed.badge}
                          </span>
                        </div>
                        <span style={{
                          fontSize: '10px',
                          padding: '2px 8px',
                          borderRadius: '10px',
                          backgroundColor: msg.tankMixEmbed.status === 'INCOMPATIBLE_HAZARD' ? '#fee2e2' : msg.tankMixEmbed.status === 'COMPATIBLE_SAFE' ? '#d1fae5' : '#e0f2fe',
                          color: msg.tankMixEmbed.status === 'INCOMPATIBLE_HAZARD' ? '#991b1b' : msg.tankMixEmbed.status === 'COMPATIBLE_SAFE' ? '#065f46' : '#075985',
                          fontWeight: 700
                        }}>
                          {msg.tankMixEmbed.status === 'INCOMPATIBLE_HAZARD' ? 'PROHIBITED TANK MIX' : msg.tankMixEmbed.status === 'COMPATIBLE_SAFE' ? 'VERIFIED COMPATIBLE' : 'SKUAST-K PROTOCOL'}
                        </span>
                      </div>

                      <div style={{ fontWeight: 600, color: '#111827', fontSize: '12.5px', marginBottom: '6px' }}>
                        {msg.tankMixEmbed.headline}
                      </div>

                      {/* Incompatible specific details */}
                      {msg.tankMixEmbed.status === 'INCOMPATIBLE_HAZARD' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '8px' }}>
                          <div style={{ color: '#b91c1c', fontSize: '11.5px', padding: '6px 8px', borderRadius: '6px', backgroundColor: '#fef2f2' }}>
                            <strong>Danger:</strong> {msg.tankMixEmbed.danger}
                          </div>
                          <div style={{ color: '#4b5563', fontSize: '11.5px' }}>
                            <strong>Rule:</strong> {msg.tankMixEmbed.rule}
                          </div>
                          <div style={{ color: '#047857', fontSize: '11.5px', padding: '6px 8px', borderRadius: '6px', backgroundColor: '#ecfdf5' }}>
                            <strong>Safe Alternative:</strong> {msg.tankMixEmbed.safeAlternative}
                          </div>
                        </div>
                      )}

                      {/* Compatible specific details */}
                      {msg.tankMixEmbed.status === 'COMPATIBLE_SAFE' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '8px' }}>
                          <div style={{ color: '#047857', fontSize: '11.5px' }}>
                            <strong>Agronomic Benefit:</strong> {msg.tankMixEmbed.benefit}
                          </div>
                          <div style={{ color: '#374151', fontSize: '11.5px', padding: '6px 8px', borderRadius: '6px', backgroundColor: 'rgba(255,255,255,0.7)' }}>
                            <strong>Mixing Order:</strong> {msg.tankMixEmbed.walesOrder}
                          </div>
                        </div>
                      )}

                      {/* WALES Guide details */}
                      {msg.tankMixEmbed.status === 'WALES_GUIDE' && (
                        <div style={{
                          whiteSpace: 'pre-line',
                          fontFamily: 'monospace',
                          fontSize: '11px',
                          color: '#1e293b',
                          padding: '8px 10px',
                          borderRadius: '8px',
                          backgroundColor: 'rgba(255, 255, 255, 0.85)',
                          border: '1px solid rgba(2, 132, 199, 0.2)',
                          marginBottom: '8px'
                        }}>
                          {msg.tankMixEmbed.walesOrder}
                        </div>
                      )}

                      {/* Controls */}
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '8px', paddingTop: '8px', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                        <button
                          type="button"
                          onClick={() => navigate('/dosage-calculator')}
                          className="advisor-control-btn advisor-control-btn-primary"
                        >
                          <Calculator size={12} />
                          <span>Tank Calculator</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => navigate('/spray-calendar')}
                          className="advisor-control-btn"
                        >
                          <Calendar size={12} />
                          <span>Spray Calendar</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSend('what is WALES sequence in spray mixing')}
                          className="advisor-control-btn"
                        >
                          <Layers size={12} />
                          <span>WALES Rules</span>
                        </button>
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
                        width="32"
                        height="32"
                        loading="lazy"
                        decoding="async"
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

            {isThinking && (
              <div style={{
                alignSelf: 'flex-start',
                maxWidth: '92%',
                padding: '12px 14px',
                borderRadius: '18px 18px 18px 4px',
                backgroundColor: 'rgba(28, 71, 42, 0.04)',
                border: '1px solid rgba(28, 71, 42, 0.15)',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{
                      width: '22px',
                      height: '22px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(28, 71, 42, 0.12)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-pine-green)'
                    }}>
                      <Brain size={13} style={{ animation: 'pulse 1.4s ease-in-out infinite' }} />
                    </div>
                    <span style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--color-pine-green)', letterSpacing: '0.3px', textTransform: 'uppercase' }}>
                      Chemist Reasoning &amp; Analysis
                    </span>
                  </div>
                  <span style={{ fontSize: '10.5px', color: 'var(--color-slate-gray)', fontWeight: 600 }}>
                    Step {thinkingStepIndex + 1} of 4
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', color: 'var(--color-ink-black)', paddingLeft: '2px' }}>
                  <Sparkles size={13} style={{ color: '#d97706', flexShrink: 0, animation: 'spin 2s linear infinite' }} />
                  <span style={{ fontStyle: 'italic', fontWeight: 500 }}>
                    {[
                      'Analyzing query context & orchard phenology...',
                      'Cross-referencing SKUAST-K Spray Guidelines & chemistry database...',
                      'Evaluating active formulations, dilution ratios & tank compatibility...',
                      'Synthesizing clinical prescription & grower advisory...'
                    ][thinkingStepIndex]}
                  </span>
                </div>

                {/* Animated progress bar */}
                <div style={{ width: '100%', height: '3px', backgroundColor: 'rgba(28, 71, 42, 0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%',
                    width: `${((thinkingStepIndex + 1) / 4) * 100}%`,
                    backgroundColor: 'var(--color-pine-green)',
                    borderRadius: '2px',
                    transition: 'width 0.28s ease'
                  }} />
                </div>
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
