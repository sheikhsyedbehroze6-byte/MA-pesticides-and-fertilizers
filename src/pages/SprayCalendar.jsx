import { useState } from 'react';
import AnimatedSection from '../components/AnimatedSection';
import WeatherSprayAlert from '../components/WeatherSprayAlert';
import DosageCalculator from '../components/DosageCalculator';
import { products } from '../data/agricultureData';
import {
  Calendar,
  MessageCircle,
  AlertTriangle,
  ChevronRight,
  Droplets,
  Shield,
  Printer,
  Snowflake,
  Sprout,
  Sun,
  Leaf
} from 'lucide-react';
import './urdu.css';

// Crisp Vector SVG Components for Crops
const AppleSvg = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z" />
    <path d="M10 2c1 .5 2 2 2 5" />
  </svg>
);

const PearSvg = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3v3" />
    <path d="M14 6c1.5 0 2.5 1 3 2.5 1 3 4 5 4 8.5a7 7 0 0 1-14 0c0-3.5 3-5.5 4-8.5.5-1.5 1.5-2.5 3-2.5Z" />
  </svg>
);

const CherrySvg = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 17a5 5 0 0 0 10 0c0-2.76-2.24-5-5-5s-5 2.24-5 5Z" />
    <path d="M12 17a5 5 0 0 0 10 0c0-2.76-2.24-5-5-5s-5 2.24-5 5Z" />
    <path d="M7 12c1-4 3-7 8-9" />
    <path d="M17 12c-1-4-2-6-2-9" />
    <path d="M15 3c2 0 5 1 6 3" />
  </svg>
);

const WalnutSvg = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2c-2.5 3-3.5 6.5-3.5 10s1 7 3.5 10" />
    <path d="M12 2c2.5 3 3.5 6.5 3.5 10s-1 7-3.5 10" />
    <path d="M2 12h20" />
  </svg>
);

const AlmondSvg = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2C7.5 6.5 4 11.5 4 16a8 8 0 0 0 16 0c0-4.5-3.5-9.5-8-14Z" />
    <path d="M12 6v12" />
  </svg>
);

const SaffronSvg = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22v-8" />
    <path d="M12 14a6 6 0 0 0 6-6c0-3.3-2.7-6-6-6s-6 2.7-6 6a6 6 0 0 0 6 6Z" />
    <path d="M8 12c-2-1-3-3-3-5" />
    <path d="M16 12c2-1 3-3 3-5" />
    <path d="M12 4v6" />
  </svg>
);

// Kashmir Climate Info with SVG Icons
const KASHMIR_SEASONS = {
  winter: { label: 'Winter (Dec–Feb)', labelUr: 'سردی (دسمبر–فروری)', icon: Snowflake, temp: '-5°C to 10°C' },
  spring: { label: 'Spring (Mar–Apr)', labelUr: 'بہار (مارچ–اپریل)', icon: Sprout, temp: '5°C to 20°C' },
  summer: { label: 'Summer (May–Aug)', labelUr: 'گرمی (مئی–اگست)', icon: Sun, temp: '20°C to 35°C' },
  autumn: { label: 'Autumn (Sep–Nov)', labelUr: 'خزاں (ستمبر–نومبر)', icon: Leaf, temp: '10°C to 25°C' },
};

// Rich SKUAST-K Stage-wise Spray Schedule Data — Kashmir Climate-Specific
const SPRAY_SCHEDULES = {
  apple: {
    name: 'Apple / سیب',
    urduTitle: 'سیب کے باغات کا سالانہ سپرے شیڈول',
    icon: AppleSvg,
    stages: [
      {
        id: 'stage0',
        title: 'Dormant / Winter Spray',
        titleUrdu: 'خوابیدہ حالت کا سپرے (جنوری/فروری)',
        timing: 'January – February',
        timingUrdu: 'جنوری سے فروری',
        season: 'winter',
        objective: 'San Jose Scale, Overwintering Mites & Eggs, Woolly Aphid colonies in bark crevices',
        objectiveUrdu: 'سان جوز سکیل، سردیوں میں چھپے مائٹس کے انڈے اور اُونی مکھو کی روک تھام',
        chemical: 'Horticultural Mineral Oil (HMO) 3–4% solution',
        chemicalUrdu: 'ہارٹیکلچرل منرل آئل 3–4% محلول',
        dosage: '30–40 ml HMO per Litre of water. Spray to drip on entire bark',
        dosageUrdu: '30–40 ملی لیٹر منرل آئل فی لیٹر پانی۔ پوری چھال پر بھرپور سپرے کریں',
        notes: 'Best done during mild sunny winter days (above 4°C). Do NOT spray if temperature is below freezing or frost is expected within 24 hrs. Thorough bark coverage is the key — this single spray can eliminate 80% of dormant pest population.',
        notesUrdu: 'ہلکی دھوپ والے دن (4°C سے اوپر) سپرے کریں۔ کورے یا شدید سردی میں سپرے سے گریز کریں۔ یہ واحد سپرے 80% خوابیدہ کیڑوں کا خاتمہ کر سکتا ہے۔',
        products: ['Cyclone 505 (Insecticide)']
      },
      {
        id: 'stage1',
        title: 'Delayed Dormancy / Green Tip',
        titleUrdu: 'گرین ٹپ مرحلہ (شروع بہار)',
        timing: 'Late March to Early April',
        timingUrdu: 'مارچ کے آخر تا اپریل کا آغاز',
        season: 'spring',
        objective: 'San Jose Scale, Mites, Scab Prevention — critical first protection window',
        objectiveUrdu: 'سان جوز سکیل، مائٹس اور سکاب سے پہلا تحفظی سپرے',
        chemical: 'Horticultural Mineral Oil (HMO) + Copper Oxychloride or Superstar Dodine',
        chemicalUrdu: 'ہارٹیکلچرل منرل آئل + کاپر آکسی کلورائڈ یا سپر سٹار ڈوڈائن',
        dosage: '20 ml HMO + 1.5 g Dodine per Litre of water',
        dosageUrdu: '20 ملی لیٹر منرل آئل + 1.5 گرام ڈوڈائن فی لیٹر پانی',
        notes: 'Thorough coverage of bark is essential. Do not spray if freezing temperatures are expected. Kashmir\'s late spring onset (March-April) means scab infection period begins as snow melts — start early.',
        notesUrdu: 'درخت کی چھال کا مکمل بھیگنا ضروری ہے۔ کشمیر میں برف پگھلنے کے ساتھ ہی سکاب پھیلنا شروع ہو جاتا ہے۔ بروقت سپرے نہایت ضروری ہے۔',
        products: ['Cyclone 505 (Insecticide)', 'Superstar Dodeine (Fungicide)']
      },
      {
        id: 'stage2',
        title: 'Pink Bud Stage',
        titleUrdu: 'پنک بڈ مرحلہ (شگوفے نکلنے پر)',
        timing: 'Mid April',
        timingUrdu: 'اپریل کا درمیان',
        season: 'spring',
        objective: 'Apple Scab Protection, Powdery Mildew, Sucking Pests — most critical spray of the year',
        objectiveUrdu: 'سیب کی خارش (سکاب)، سفیدی اور چوسنے والے کیڑے — سال کا سب سے اہم سپرے',
        chemical: 'Bayer Luna Experience or Filpostar Proponib (Antracol)',
        chemicalUrdu: 'بائر لونا ایکسپیرینس یا فلپوسٹار پروپونیب (اینٹراکول)',
        dosage: '1 ml Luna or 2.5 g Antracol per Litre of water',
        dosageUrdu: '1 ملی لیٹر لونا یا 2.5 گرام اینٹراکول فی لیٹر پانی',
        notes: 'Highly critical stage for scab prevention. Kashmir receives heavy spring rainfall in April which is the primary infection window for Apple Scab. Spray within 24 hrs of each rain event. Do NOT miss this window.',
        notesUrdu: 'سکاب کی روک تھام کے لیے یہ سب سے اہم مرحلہ ہے۔ کشمیر میں اپریل کی بارشیں سکاب پھیلانے کا سبب بنتی ہیں — ہر بارش کے بعد 24 گھنٹے میں سپرے کریں۔',
        products: ['Luna (Bayer)', 'Antracol (Bayer)']
      },
      {
        id: 'stage2b',
        title: 'Full Bloom / Blossom Spray',
        titleUrdu: 'مکمل پھول کا مرحلہ',
        timing: 'Late April (Full Bloom)',
        timingUrdu: 'اپریل کے آخر (مکمل پھول)',
        season: 'spring',
        objective: 'Fire Blight (Erwinia amylovora) Prevention — high risk during Kashmir blossom period',
        objectiveUrdu: 'فائر بلائٹ (جلی شاخوں کی بیماری) سے تحفظ — کشمیر میں پھول کے وقت زیادہ خطرہ',
        chemical: 'Streptocycline 0.5 g/L + Copper Oxychloride 2 g/L. DO NOT add other fungicides.',
        chemicalUrdu: 'سٹریپٹو سائکلین 0.5 گرام فی لیٹر + کاپر آکسی کلورائڈ 2 گرام فی لیٹر (تنہا استعمال کریں)',
        dosage: '0.5 g Streptocycline + 2 g Copper Oxychloride per Litre. Spray early morning only.',
        dosageUrdu: '0.5 گرام سٹریپٹو سائکلین + 2 گرام کاپر فی لیٹر۔ صرف صبح سویرے سپرے کریں۔',
        notes: 'NEVER spray during full bloom with broad-spectrum insecticides — this kills honeybees essential for pollination. Fire Blight spreads explosively during warm (18–29°C) wet bloom periods. Kashmir\'s April temperatures are ideal for this disease.',
        notesUrdu: 'مکمل پھول کے دوران عام کیڑے مار دوا استعمال نہ کریں — شہد کی مکھیاں پھلنے کے لیے ضروری ہیں۔ اپریل کا موسم فائر بلائٹ کے لیے بہت سازگار ہوتا ہے۔',
        products: ['Superstar Dodeine (Fungicide)']
      },
      {
        id: 'stage3',
        title: 'Petal Fall / Pea Stage',
        titleUrdu: 'پھل بننے کا ابتدائی مرحلہ (مٹر کے دانے برابر)',
        timing: 'Early May',
        timingUrdu: 'مئی کا آغاز',
        season: 'summer',
        objective: 'Scab Protection, Aphids, Mites control, Codling Moth — 1st generation egg hatch',
        objectiveUrdu: 'سیب کی خارش، چست تیلہ، سرخ مائٹس اور کوڈلنگ موتھ کی پہلی نسل کی روک تھام',
        chemical: 'Hexaconazole (Contaf) + Imidacloprid or Kozen (Chlorantraniliprole)',
        chemicalUrdu: 'ہیکسا کونازول + امیڈا کلوپرڈ یا کوزن (Chlorantraniliprole)',
        dosage: '0.5 ml Hexaconazole + 0.5 ml Imidacloprid per Litre of water',
        dosageUrdu: '0.5 ملی لیٹر ہیکسا کونازول + 0.5 ملی لیٹر امیڈا کلوپرڈ فی لیٹر پانی',
        notes: 'Codling Moth first flight begins when temperatures consistently exceed 15°C — typical in Kashmir by early May. Target sprays 7–10 days after petal fall. Use pheromone traps to time sprays accurately.',
        notesUrdu: 'کشمیر میں مئی میں درجہ حرارت 15°C سے اوپر جانے پر کوڈلنگ موتھ کی پہلی پرواز شروع ہو جاتی ہے۔ فیرومون ٹریپ لگا کر سپرے کا وقت متعین کریں۔',
        products: ['Governor (Systemic Insecticide)', 'Superstar Dodeine (Fungicide)', 'Kozen (Insecticide)']
      },
      {
        id: 'stage3b',
        title: 'June Drop / Fruitlet Protection',
        titleUrdu: 'جون میں پھل جھڑنا — تحفظی سپرے',
        timing: 'Late May to Mid June',
        timingUrdu: 'مئی کے آخر تا جون کا درمیان',
        season: 'summer',
        objective: 'Powdery Mildew, Secondary Scab, Mites, Apple Capsid Bug — fruit thinning stage',
        objectiveUrdu: 'سفیدی، دوبارہ سکاب، مائٹس اور پھل کا جھڑنا روکنے کا مرحلہ',
        chemical: 'Rubigan D (Fenarimol) + Mitofix (Propargite) + Tingo (Lambda-Cyhalothrin)',
        chemicalUrdu: 'رُبیگن ڈی (Fenarimol) + مائٹو فکس (Propargite) + ٹنگو',
        dosage: '0.4 ml Rubigan D + 1.5 ml Mitofix + 0.4 ml Tingo per Litre of water',
        dosageUrdu: '0.4 ملی لیٹر رُبیگن ڈی + 1.5 ملی لیٹر مائٹو فکس + 0.4 ملی لیٹر ٹنگو فی لیٹر پانی',
        notes: 'Kashmir summers (June) can be unexpectedly warm and humid — ideal for mite outbreaks. Check leaf undersides for mite colonies. Add Life80 surfactant at 0.5 ml/L for better leaf penetration.',
        notesUrdu: 'کشمیر میں جون گرم اور مرطوب ہو سکتا ہے — مائٹس کے لیے موزوں۔ پتوں کی نچلی سطح جانچیں۔ لائف80 سرفیکٹنٹ ملانے سے سپرے کی اثر میں اضافہ ہوتا ہے۔',
        products: ['Mitofix (Insecticide)', 'Tingo (Willshare)', 'Life80 (Spreader, Non-ionic Surfactant)']
      },
      {
        id: 'stage4',
        title: 'Fruit Development (Size Enhancement)',
        titleUrdu: 'پھل کی افزائش کا مرحلہ (جون / جولائی)',
        timing: 'June to July',
        timingUrdu: 'جون تا جولائی',
        season: 'summer',
        objective: 'Secondary Scab, Sooty Blotch, Alternaria Leaf Spot, Red Mites, Codling Moth 2nd generation',
        objectiveUrdu: 'دوسری باری کا سکاب، پتوں کے دھبے، مائٹس اور کوڈلنگ موتھ دوسری نسل',
        chemical: 'Propineb (Antracol) + Propargite (Mite control)',
        chemicalUrdu: 'پروپینیب (اینٹراکول) + پروپارگائٹ (مائٹس کی خاص دوا)',
        dosage: '2 g Antracol + 1 ml Miteicide per Litre of water',
        dosageUrdu: '2 گرام اینٹراکول + 1 ملی لیٹر مائٹیسائیڈ فی لیٹر پانی',
        notes: 'Spray in the early morning or late evening hours to avoid crop phytotoxicity. Kashmir July temperatures (28–34°C) can cause leaf burn if sprayed midday. Codling Moth 2nd generation peak flight occurs in July — use Kozen or Tata Takumi.',
        notesUrdu: 'گرمی کے دوران سپرے سے گریز کریں۔ صبح سویرے یا شام کے وقت سپرے کریں۔ جولائی میں کوڈلنگ موتھ کی دوسری نسل نکلتی ہے — کوزن یا تاکومی استعمال کریں۔',
        products: ['Antracol (Bayer)', 'Novathion (Insecticide)', 'Tata Takumi (Insecticide)']
      },
      {
        id: 'stage4b',
        title: 'Calcium & Color Development',
        titleUrdu: 'کیلشیم اور رنگ پیدا کرنے کا مرحلہ',
        timing: 'July to August',
        timingUrdu: 'جولائی تا اگست',
        season: 'summer',
        objective: 'Prevent Bitter Pit (Calcium Deficiency), improve color and fruit firmness before harvest',
        objectiveUrdu: 'کڑوا گڑھا (کیلشیم کی کمی)، پھل کا رنگ اور مضبوطی بہتر بنانا',
        chemical: 'Calcium Nitrate (Foliar) + Potassium Sulphate or Green Valley Calcium',
        chemicalUrdu: 'کیلشیم نائٹریٹ (پتوں پر) + پوٹاشیم سلفیٹ یا گرین ویلی کیلشیم',
        dosage: '10 g Calcium Nitrate per Litre. Start 6–8 weeks before harvest. Apply 3–4 times.',
        dosageUrdu: '10 گرام کیلشیم نائٹریٹ فی لیٹر پانی۔ برداشت سے 6–8 ہفتے پہلے، 3–4 دفعہ سپرے کریں۔',
        notes: 'Bitter Pit is a major quality issue in Kashmir Delicious varieties. High potassium or poor watering causes calcium imbalance. Combine with drip irrigation for best results. Do NOT use in tank-mix with fungicides.',
        notesUrdu: 'کیلشیم کی کمی کشمیری ڈیلیشس سیب کا بڑا مسئلہ ہے۔ پانی کی کمی یا زیادہ پوٹاش اس کا سبب بنتی ہے۔ ڈرپ سنچائی کے ساتھ بہترین نتائج ملتے ہیں۔',
        products: ['Green Valley (Calcium Liquid)', 'Bublin (NPK 11:11:8 Suspension Fertilizer)', 'Silixol (Fertilizer)']
      },
      {
        id: 'stage5',
        title: 'Pre-Harvest (Color & Quality Upgrade)',
        titleUrdu: 'برداشت سے پہلے کا مرحلہ (اگست / ستمبر)',
        timing: 'Late August to September',
        timingUrdu: 'اگست کے آخر تا ستمبر',
        season: 'autumn',
        objective: 'Sooty Blotch, Fly Speck, Fruit Rot, Color Enhancement — final protective window',
        objectiveUrdu: 'پھل کی سڑن سے بچاؤ، رنگ اور چمک میں بہتری — آخری تحفظی سپرے',
        chemical: 'Ziram 80% WP or Calcium Nitrate Spray + Potassium Boron',
        chemicalUrdu: 'زائرم 80% ڈبلیو پی یا کیلشیم نائٹریٹ + پوٹاشیم بورون سپرے',
        dosage: '2 g Ziram or 10 g Calcium Nitrate per Litre of water',
        dosageUrdu: '2 گرام زائرم یا 10 گرام کیلشیم نائٹریٹ فی لیٹر پانی',
        notes: 'Pre-harvest interval (PHI) must be observed: Ziram — 21 days; Captan — 14 days. September rains in Kashmir increase Sooty Blotch risk. Avoid any copper sprays within 6 weeks of harvest to prevent russeting.',
        notesUrdu: 'سپرے اور برداشت کے درمیان وقفہ ضروری ہے: زائرم — 21 دن؛ کیپٹان — 14 دن۔ ستمبر کی بارشوں میں سوٹی بلاچ کا خطرہ بڑھ جاتا ہے۔',
        products: ['Sikri Vermicompost (Organic Fertilizer)', 'Green Valley (Calcium Liquid)']
      },
      {
        id: 'stage6',
        title: 'Post-Harvest Dormancy Prep',
        titleUrdu: 'برداشت کے بعد سردی سے پہلے کا سپرے',
        timing: 'October – November',
        timingUrdu: 'اکتوبر تا نومبر',
        season: 'autumn',
        objective: 'Collar Rot Prevention, Root Health, Canker treatment before winter dormancy',
        objectiveUrdu: 'کالر راٹ کی روک تھام، جڑوں کی صحت اور کینکر کا علاج — سردی سے پہلے',
        chemical: 'Copper Oxychloride 50% WP (foliar) + Proma Gro Paste on pruning wounds',
        chemicalUrdu: 'کاپر آکسی کلورائیڈ 50% ڈبلیو پی + چھٹائی کے زخموں پر پروما گرو پیسٹ',
        dosage: '3 g Copper Oxychloride per Litre. Paste all pruning cuts immediately after pruning.',
        dosageUrdu: '3 گرام کاپر آکسی کلورائیڈ فی لیٹر۔ چھٹائی کے فوری بعد زخموں پر پیسٹ لگائیں۔',
        notes: 'Post-harvest pruning in October is ideal in Kashmir. Apply Chaubatia Paste (Proma Gro) to all cuts >2 cm. Drench tree base with Ridomil Gold for Phytophthora collar rot. This sets the orchard up for the following season.',
        notesUrdu: 'اکتوبر میں چھٹائی کریں اور تمام 2 سینٹی میٹر سے بڑے زخموں پر پروما گرو لگائیں۔ ریڈومل گولڈ سے تنے کے پاس مٹی بھگوئیں۔ اگلے سال کی فصل کی بنیاد اسی وقت رکھی جاتی ہے۔',
        products: ['Proma Gro (Chaubatia Paste)', 'Chaubatia Tree Paste']
      }
    ]
  },

  pear: {
    name: 'Pear / ناشپاتی',
    urduTitle: 'ناشپاتی کے باغات کا سالانہ سپرے شیڈول',
    icon: PearSvg,
    stages: [
      {
        id: 'pear0',
        title: 'Dormant Oil Spray',
        titleUrdu: 'خوابیدہ حالت — منرل آئل سپرے (فروری)',
        timing: 'Late January to February',
        timingUrdu: 'جنوری کے آخر تا فروری',
        season: 'winter',
        objective: 'Pear Psylla overwintering adults & eggs, San Jose Scale, Mite eggs',
        objectiveUrdu: 'ناشپاتی کا سیلا، سان جوز سکیل اور مائٹس کے انڈے — سردیوں میں روک تھام',
        chemical: 'Horticultural Mineral Oil (HMO) 3%',
        chemicalUrdu: 'ہارٹیکلچرل منرل آئل 3% (30 ملی لیٹر فی لیٹر)',
        dosage: '30 ml per Litre of water. Spray whole tree to drip.',
        dosageUrdu: '30 ملی لیٹر فی لیٹر پانی۔ پورے درخت پر ٹپکنے تک سپرے کریں۔',
        notes: 'Pear Psylla is the most destructive Kashmir pear pest — this single dormant spray is the most cost-effective control. Apply on a clear day above 4°C when no rain is forecast for 48 hrs.',
        notesUrdu: 'ناشپاتی کا سیلا کشمیر کا سب سے نقصاندہ کیڑا ہے۔ یہ اکیلا سپرے سب سے سستا اور موثر طریقہ ہے۔ 48 گھنٹے بارش نہ ہو تو سپرے کریں۔',
        products: ['Cyclone 505 (Insecticide)']
      },
      {
        id: 'pear1',
        title: 'White Bud / Blossom',
        titleUrdu: 'سفید شگوفے — پھول کا مرحلہ (مارچ/اپریل)',
        timing: 'Late March to Early April',
        timingUrdu: 'مارچ کے آخر تا اپریل کا آغاز',
        season: 'spring',
        objective: 'Pear Scab Prevention, Leaf Spot, Psylla 1st generation nymphs',
        objectiveUrdu: 'ناشپاتی کا سکاب، پتوں کے دھبے اور سیلا کی پہلی نسل',
        chemical: 'Bayer Antracol (Propineb 70% WP) or Mancozeb + Thiamethoxam for Psylla',
        chemicalUrdu: 'بائر اینٹراکول (پروپینیب 70%) + تھیامیتھوکسام (سیلا کے لیے)',
        dosage: '2.5 g Antracol + 0.5 g Thiamethoxam per Litre of water',
        dosageUrdu: '2.5 گرام اینٹراکول + 0.5 گرام تھیامیتھوکسام فی لیٹر پانی',
        notes: 'Keep a close watch on weather alerts; Pear Scab spreads fast during Kashmir\'s spring rains (March–April). Spray within 24 hours of rain if disease pressure is high.',
        notesUrdu: 'بہار کی بارشوں کے دوران بیماری تیزی سے پھیلتی ہے۔ بارش کے 24 گھنٹے کے اندر حفاظتی سپرے کریں۔',
        products: ['Antracol (Bayer)', 'Filpostar Proponib (Fungicide)', 'Thiamethoxam']
      },
      {
        id: 'pear2',
        title: 'Fruit Set & Psylla Control',
        titleUrdu: 'پھل بننے پر سیلا کا خاتمہ (مئی)',
        timing: 'May',
        timingUrdu: 'مئی',
        season: 'summer',
        objective: 'Psylla 2nd generation nymphs, Pear Midge, Scab secondary infections',
        objectiveUrdu: 'سیلا کی دوسری نسل، ناشپاتی کی مڈج مکھی، ثانوی سکاب',
        chemical: 'Tingo (Lambda-Cyhalothrin + Thiamethoxam ZC) + Filpostar (Propineb)',
        chemicalUrdu: 'ٹنگو (Lambda-Cyhalothrin + Thiamethoxam) + فلپوسٹار (Propineb)',
        dosage: '0.4 ml Tingo + 2.5 g Propineb per Litre of water',
        dosageUrdu: '0.4 ملی لیٹر ٹنگو + 2.5 گرام پروپینیب فی لیٹر پانی',
        notes: 'Psylla nymphs excrete honeydew which causes sooty mould — reducing fruit value. Early intervention in May is critical. Rotate insecticide groups to prevent resistance.',
        notesUrdu: 'سیلا کی نمفس شہد جیسی چپچپی چیز خارج کرتی ہے جس سے پھل کا معیار گرتا ہے۔ مئی میں بروقت سپرے ضروری ہے۔',
        products: ['Tingo (Willshare)', 'Filpostar Proponib (Fungicide)']
      },
      {
        id: 'pear3',
        title: 'Fruit Development & Mite Control',
        titleUrdu: 'پھل کی افزائش اور مائٹس کی روک تھام (جون/جولائی)',
        timing: 'June to July',
        timingUrdu: 'جون تا جولائی',
        season: 'summer',
        objective: 'European Red Mite, Pear Rust Mite, Psylla adults, Sooty Mould',
        objectiveUrdu: 'سرخ مائٹ، پیئر رسٹ مائٹ، سیلا کی بالغ مادہ اور سوٹی مولڈ',
        chemical: 'Mitofix (Propargite 57% EC) + Difenoconazole (Willowood)',
        chemicalUrdu: 'مائٹو فکس (Propargite 57%) + ڈائفینوکونازول (Willowood)',
        dosage: '1.5 ml Mitofix + 0.5 ml Difenoconazole per Litre of water',
        dosageUrdu: '1.5 ملی لیٹر مائٹو فکس + 0.5 ملی لیٹر ڈائفینوکونازول فی لیٹر پانی',
        notes: 'European Red Mite peaks during Kashmir\'s hot July days. Spray early morning. Avoid acaricide tank-mixes with sulphur. Check 10 leaves per tree for mite population before spraying.',
        notesUrdu: 'جولائی کی گرمی میں سرخ مائٹ تیزی سے بڑھتا ہے۔ صبح سویرے سپرے کریں۔ سلفر کے ساتھ مائٹیسائیڈ مت ملائیں۔',
        products: ['Mitofix (Insecticide)', 'Difenoconazole 25% (Willowood)']
      },
      {
        id: 'pear4',
        title: 'Pre-Harvest Color & Storage',
        titleUrdu: 'برداشت سے پہلے رنگ اور ذخیرہ کاری',
        timing: 'August to September',
        timingUrdu: 'اگست تا ستمبر',
        season: 'autumn',
        objective: 'Prevent Bitter Pit, Improve Shelf Life, Prevent Post-harvest Rots',
        objectiveUrdu: 'کڑواپن سے بچاؤ، ذخیرہ مدت بڑھانا اور برداشت کے بعد سڑن روکنا',
        chemical: 'Calcium Chloride 0.5% spray + Carbendazim (post-harvest dip optional)',
        chemicalUrdu: 'کیلشیم کلورائیڈ 0.5% فولیئر + کاربنڈازیم (برداشت کے بعد ڈپ)',
        dosage: '5 g Calcium Chloride per Litre + 1 g Carbendazim per Litre (separate applications)',
        dosageUrdu: '5 گرام کیلشیم کلورائیڈ فی لیٹر (پتوں پر) + 1 گرام کاربنڈازیم (الگ)',
        notes: 'Kashmir pears are highly susceptible to post-harvest brown rot. Calcium sprays starting 6 weeks before harvest significantly improve storage quality. Observe PHI strictly.',
        notesUrdu: 'کشمیری ناشپاتی برداشت کے بعد سڑنے کا شکار ہوتی ہے۔ برداشت سے 6 ہفتے پہلے کیلشیم سپرے شروع کریں۔',
        products: ['Green Valley (Calcium Liquid)', 'Sikri Vermicompost (Organic Fertilizer)']
      }
    ]
  },

  cherry: {
    name: 'Cherry / چیری',
    urduTitle: 'چیری کے باغات کا سالانہ سپرے شیڈول',
    icon: CherrySvg,
    stages: [
      {
        id: 'cherry0',
        title: 'Dormant Copper Spray',
        titleUrdu: 'خوابیدہ حالت — کاپر سپرے (فروری/مارچ)',
        timing: 'February to Early March',
        timingUrdu: 'فروری تا مارچ کا آغاز',
        season: 'winter',
        objective: 'Bacterial Canker (Pseudomonas), Brown Rot overwintering spores, Scale Insects',
        objectiveUrdu: 'بیکٹیریل کینکر، براؤن روٹ کے بیضے، اور چھال کے کیڑوں کی سردیوں میں روک تھام',
        chemical: 'Copper Oxychloride 50% WP 3 g/L or Bordeaux Mixture',
        chemicalUrdu: 'کاپر آکسی کلورائیڈ 50% ڈبلیو پی 3 گرام فی لیٹر یا بورڈیو مکسچر',
        dosage: '3 g Copper Oxychloride per Litre of water. Spray thorougly on all branches.',
        dosageUrdu: '3 گرام کاپر آکسی کلورائیڈ فی لیٹر پانی۔ تمام شاخوں پر مکمل سپرے کریں۔',
        notes: 'Bacterial Canker is rife in Kashmir\'s cool wet winters. This copper spray is the single most important disease prevention step for cherries. Apply before bud swell begins.',
        notesUrdu: 'کشمیر کی سرد و مرطوب سردیاں بیکٹیریل کینکر کے لیے موزوں ہیں۔ کلیاں پھولنے سے پہلے کاپر سپرے کریں۔',
        products: ['Bordeaux (Latex Paste)', 'Superstar Dodeine (Fungicide)']
      },
      {
        id: 'cherry1',
        title: 'Bud Burst / Green Tip',
        titleUrdu: 'شگوفے کھلنے پر (مارچ)',
        timing: 'Late March',
        timingUrdu: 'مارچ کے آخر',
        season: 'spring',
        objective: 'Brown Rot, Leaf Spot, Aphids — first green tissue protection',
        objectiveUrdu: 'براؤن روٹ (سڑن)، پتوں کے داغ اور کالی جووں کا علاج',
        chemical: 'Copper Oxychloride 50% WP or Captan + Imidacloprid for Aphids',
        chemicalUrdu: 'کاپر آکسی کلورائڈ 50% ڈبلیو پی یا کیپٹان + امیڈا کلوپرڈ (جووں کے لیے)',
        dosage: '2.5 g Copper Oxychloride + 0.5 ml Imidacloprid per Litre of water',
        dosageUrdu: '2.5 گرام کاپر آکسی کلورائڈ + 0.5 ملی لیٹر امیڈا کلوپرڈ فی لیٹر پانی',
        notes: 'Helps secure initial blossom set and stem integrity. Black Cherry Aphid builds rapidly in April — early Imidacloprid application is critical before colonies establish.',
        notesUrdu: 'چیری کی ابتدائی صحت کے لیے ضروری۔ کالی جووں کی کالونی بنانے سے پہلے سپرے کریں۔',
        products: ['Superstar Dodeine (Fungicide)', 'Adunik Starcare (Insecticide)']
      },
      {
        id: 'cherry1b',
        title: 'Pre-Blossom Fungicide',
        titleUrdu: 'پھول سے پہلے — فنگی سائیڈ (اپریل)',
        timing: 'Early to Mid April (pre-bloom)',
        timingUrdu: 'اپریل کے آغاز تا درمیان (پھول کھلنے سے پہلے)',
        season: 'spring',
        objective: 'Brown Rot Blossom Blight, Cherry Leaf Spot, Monilinia prevention',
        objectiveUrdu: 'چیری براؤن روٹ بلاسم بلائٹ اور پتوں کے داغوں کی روک تھام',
        chemical: 'Luna Experience (Fluopyram + Tebuconazole) or Fargo Super (Captan)',
        chemicalUrdu: 'لونا ایکسپیرینس (بائر) یا فارگو سپر (کیپٹان)',
        dosage: '1 ml Luna or 2 g Captan per Litre of water',
        dosageUrdu: '1 ملی لیٹر لونا یا 2 گرام فارگو سپر فی لیٹر پانی',
        notes: 'Kashmir cherries blossom in April — warm rainy days trigger Brown Rot Blossom Blight explosively. This pre-bloom spray is essential. DO NOT spray during full bloom (protects bees).',
        notesUrdu: 'کشمیر میں اپریل کی بارش اور گرمی براؤن روٹ بلائٹ پھیلانے کی موزوں حالت ہے۔ مکمل پھول کے دوران سپرے مت کریں (شہد کی مکھیوں کی حفاظت)۔',
        products: ['Luna (Bayer)', 'Fargo Super']
      },
      {
        id: 'cherry2',
        title: 'Fruit Setting / Red Stage',
        titleUrdu: 'پھل بننے اور لال ہونے پر (مئی)',
        timing: 'May',
        timingUrdu: 'مئی',
        season: 'summer',
        objective: 'Fruit Rot prevention, Sucking insects, Cherry Fruit Fly (first flight)',
        objectiveUrdu: 'پھل سڑنے سے بچاؤ، کیڑوں کا خاتمہ اور چیری فروٹ فلائی کی پہلی پرواز',
        chemical: 'Carbendazim or Dodine 65% WP + Tata Takumi for Fruit Fly',
        chemicalUrdu: 'کاربنڈازیم یا ڈوڈائن 65% ڈبلیو پی + ٹاٹا تاکومی',
        dosage: '1 g Dodine + 0.5 g Tata Takumi per Litre of water',
        dosageUrdu: '1 گرام ڈوڈائن + 0.5 گرام ٹاٹا تاکومی فی لیٹر پانی',
        notes: 'Cherry Fruit Fly (Rhagoletis cerasi) is a serious pest in Kashmir — females lay eggs just under skin of developing cherries. Traps + early insecticide sprays from late April are key.',
        notesUrdu: 'چیری فروٹ فلائی کشمیر میں بڑا مسئلہ ہے — مادہ مکھی پھل میں انڈے دیتی ہے۔ ٹریپ لگائیں اور اپریل کے آخر سے سپرے شروع کریں۔',
        products: ['Superstar Dodeine (Fungicide)', 'Luna (Bayer)', 'Tata Takumi (Insecticide)']
      },
      {
        id: 'cherry3',
        title: 'Pre-Harvest (14 days before pick)',
        titleUrdu: 'برداشت سے 14 دن پہلے — آخری سپرے',
        timing: 'Late May to June (14 days before harvest)',
        timingUrdu: 'مئی کے آخر تا جون (برداشت سے 14 دن پہلے)',
        season: 'summer',
        objective: 'Prevent pre-harvest rots, cracking from rain, final Brown Rot control',
        objectiveUrdu: 'برداشت سے پہلے سڑن، بارش سے پھٹنا اور آخری براؤن روٹ روکنا',
        chemical: 'Fargo Super (Captan 50% WP) — last spray before harvest',
        chemicalUrdu: 'فارگو سپر (Captan 50% WP) — برداشت سے پہلے آخری سپرے',
        dosage: '2 g Captan per Litre. Strict 14-day PHI must be observed.',
        dosageUrdu: '2 گرام کیپٹان فی لیٹر پانی۔ 14 دن کا وقفہ لازمی ہے۔',
        notes: 'Kashmir cherries (Makhmali, Mishri) ripen June–July. Pre-harvest rains cause cracking and mould. Captan provides broad-spectrum coverage with safe PHI. Harvest promptly when ripe to minimize losses.',
        notesUrdu: 'کشمیری چیری (مخملی، مشری) جون–جولائی میں پکتی ہے۔ برداشت سے پہلے بارش سے پھل پھٹتا ہے — کیپٹان سے تحفظ دیں۔ پکنے پر فوری توڑ لیں۔',
        products: ['Fargo Super', 'Captaf (Fungicide)']
      }
    ]
  },

  walnut: {
    name: 'Walnut / اخروٹ',
    urduTitle: 'اخروٹ کے باغات کا سالانہ سپرے شیڈول',
    icon: WalnutSvg,
    stages: [
      {
        id: 'walnut1',
        title: 'Bud Break / Catkin Emergence',
        titleUrdu: 'کلیاں کھلنا اور بالیاں نکلنا (اپریل)',
        timing: 'April (Bud Break)',
        timingUrdu: 'اپریل (کلیاں کھلنے پر)',
        season: 'spring',
        objective: 'Walnut Blight (Xanthomonas juglandis) Prevention — primary infection period',
        objectiveUrdu: 'اخروٹ بلائٹ (بیکٹیریل بیماری) کا ابتدائی تحفظ',
        chemical: 'Copper Hydroxide 77% WP or Bayer Antracol (Propineb)',
        chemicalUrdu: 'کاپر ہائیڈرو آکسائیڈ 77% ڈبلیو پی یا بائر اینٹراکول',
        dosage: '2.5 g Copper Hydroxide or 2.5 g Antracol per Litre of water',
        dosageUrdu: '2.5 گرام کاپر ہائیڈرو آکسائیڈ یا اینٹراکول فی لیٹر پانی',
        notes: 'Walnut Blight bacteria overwinter in infected buds and catkins. Kashmir\'s April rains are ideal for rapid spread. First spray at 10–20% bud break is critical.',
        notesUrdu: 'اخروٹ بلائٹ کے جراثیم کلیوں اور بالیوں میں سردیوں میں رہتے ہیں۔ اپریل کی بارش انہیں پھیلاتی ہے۔ 10–20% کلیاں کھلنے پر پہلا سپرے ضروری ہے۔',
        products: ['Antracol (Bayer)', 'Filpostar Proponib (Fungicide)']
      },
      {
        id: 'walnut2',
        title: 'Post-Bloom / Nut Development',
        titleUrdu: 'پھل بننا شروع ہونے پر (مئی/جون)',
        timing: 'May to June',
        timingUrdu: 'مئی تا جون',
        season: 'summer',
        objective: 'Walnut Blight 2nd spray, Walnut Weevil egg hatch, Anthracnose',
        objectiveUrdu: 'دوسرا بلائٹ سپرے، اخروٹ کیڑا (ویول) اور انتھراکنوز',
        chemical: 'Mancozeb 75% WP + Cyclone 505 (for Weevil adults)',
        chemicalUrdu: 'مینکوزیب 75% ڈبلیو پی + سائکلون 505 (ویول بالغ کیڑوں کے لیے)',
        dosage: '2.5 g Mancozeb + 1.5 ml Cyclone 505 per Litre when nuts reach pea-size',
        dosageUrdu: '2.5 گرام مینکوزیب + 1.5 ملی لیٹر سائکلون 505 فی لیٹر (مٹر دانے برابر اخروٹ پر)',
        notes: 'Walnut Weevil (Curculio nucum) lays eggs in young nuts at pea-size stage in Kashmir (typically May). Once larvae enter nuts, no cure is possible — preventive spray is essential.',
        notesUrdu: 'اخروٹ ویول مئی میں مٹر دانے جتنے اخروٹ میں انڈے دیتا ہے۔ جب سنڈی اندر جائے تو علاج ممکن نہیں — بروقت سپرے لازم ہے۔',
        products: ['Cyclone 505 (Insecticide)', 'Antracol (Bayer)']
      },
      {
        id: 'walnut3',
        title: 'Mid-Summer Nut Fill',
        titleUrdu: 'گرمی میں اخروٹ بھرنے کا مرحلہ (جولائی)',
        timing: 'July',
        timingUrdu: 'جولائی',
        season: 'summer',
        objective: 'Anthracnose, Bacterial Blight second wave, Leaf Spot defoliation prevention',
        objectiveUrdu: 'انتھراکنوز کی دوسری لہر، بیکٹیریل بلائٹ اور پتوں کا جھڑنا روکنا',
        chemical: 'Difenoconazole 25% EC + Copper Oxychloride',
        chemicalUrdu: 'ڈائفینوکونازول 25% ای سی + کاپر آکسی کلورائیڈ',
        dosage: '0.5 ml Difenoconazole + 2 g Copper Oxychloride per Litre of water',
        dosageUrdu: '0.5 ملی لیٹر ڈائفینوکونازول + 2 گرام کاپر آکسی کلورائیڈ فی لیٹر پانی',
        notes: 'Early defoliation in walnut reduces nut quality and next year\'s wood. July rains in Kashmir provide conditions for second Anthracnose wave — protect foliage at all costs.',
        notesUrdu: 'جلد پتے جھڑنے سے اخروٹ کا معیار اور اگلے سال کی لکڑی دونوں متاثر ہوتے ہیں۔ جولائی کی بارش سے دوسری انتھراکنوز لہر آتی ہے۔',
        products: ['Difenoconazole 25% (Willowood)', 'Willowood Carmel (Fungicide)']
      }
    ]
  },

  almond: {
    name: 'Almond / بادام',
    urduTitle: 'بادام کے باغات کا سالانہ سپرے شیڈول',
    icon: AlmondSvg,
    stages: [
      {
        id: 'almond1',
        title: 'Dormant / Pre-Bloom Copper Spray',
        titleUrdu: 'خوابیدہ حالت — کاپر سپرے (فروری/مارچ)',
        timing: 'February – Early March',
        timingUrdu: 'فروری تا مارچ کا آغاز',
        season: 'winter',
        objective: 'Shot Hole Disease (Wilsonomyces carpophilus), Bacterial Canker, Overwintering Scale',
        objectiveUrdu: 'شاٹ ہول بیماری، بیکٹیریل کینکر اور چھال کے کیڑوں کی روک تھام',
        chemical: 'Copper Oxychloride 50% WP',
        chemicalUrdu: 'کاپر آکسی کلورائڈ 50% ڈبلیو پی',
        dosage: '3 g per Litre of water. Apply before bud swell.',
        dosageUrdu: '3 گرام فی لیٹر پانی۔ کلیاں پھولنے سے پہلے سپرے کریں۔',
        notes: 'Almonds bloom very early in Kashmir (late February–March) before most insects are active. This dormant copper spray is essential to control Shot Hole which is prevalent in Kashmir valley almonds.',
        notesUrdu: 'کشمیر میں بادام سب سے پہلے پھولتا ہے (فروری/مارچ) — شاٹ ہول بیماری کشمیری بادام کا سب سے بڑا مسئلہ ہے۔ کاپر سپرے لازمی ہے۔',
        products: ['Superstar Dodeine (Fungicide)', 'Chaubatia Tree Paste']
      },
      {
        id: 'almond2',
        title: 'Pink Bud / Full Bloom',
        titleUrdu: 'پنک بڈ سے مکمل پھول (مارچ)',
        timing: 'March (Bloom period)',
        timingUrdu: 'مارچ (پھول کا موسم)',
        season: 'spring',
        objective: 'Brown Rot Blossom Blight prevention — highest risk period for almonds',
        objectiveUrdu: 'براؤن روٹ بلاسم بلائٹ — بادام کے پھول کا خطرناک ترین مرحلہ',
        chemical: 'Fargo Super (Captan 50% WP) or Luna Experience',
        chemicalUrdu: 'فارگو سپر (Captan 50% WP) یا لونا ایکسپیرینس',
        dosage: '2 g Captan per Litre at 10%, 50%, and 100% bloom stages',
        dosageUrdu: '2 گرام کیپٹان فی لیٹر پانی — 10%، 50% اور 100% پھول پر الگ الگ سپرے',
        notes: 'Kashmir\'s March is often cold and wet — ideal for Monilinia Brown Rot. Almond blossoms are very sensitive. Three sprays during bloom give best results. Bees are active — use bee-safe products.',
        notesUrdu: 'مارچ میں سردی اور بارش براؤن روٹ کے لیے موزوں ہیں۔ پھول بہت نازک ہوتا ہے۔ تین مرحلوں پر سپرے بہترین نتائج دیتا ہے۔ شہد کی مکھیاں فعال ہوتی ہیں — محفوظ دوا استعمال کریں۔',
        products: ['Fargo Super', 'Luna (Bayer)']
      },
      {
        id: 'almond3',
        title: 'Nut Development / Leaf Protection',
        titleUrdu: 'پھل بننا اور پتوں کی حفاظت (اپریل/مئی)',
        timing: 'April to May',
        timingUrdu: 'اپریل تا مئی',
        season: 'spring',
        objective: 'Shot Hole recurrence, Leaf Rust, Oriental Fruit Moth early generation',
        objectiveUrdu: 'شاٹ ہول کی واپسی، پتوں کا زنگ اور اورینٹل فروٹ موتھ کی پہلی نسل',
        chemical: 'Ziram 80% WP or Mancozeb + Kozen (Chlorantraniliprole) for Moths',
        chemicalUrdu: 'زیرام 80% ڈبلیو پی یا مینکوزیب + کوزن (Chlorantraniliprole) موتھ کے لیے',
        dosage: '2 g Ziram + 0.4 ml Kozen per Litre of water',
        dosageUrdu: '2 گرام زیرام + 0.4 ملی لیٹر کوزن فی لیٹر پانی',
        notes: 'Shot Hole recurs in wet spring — maintain spray coverage every 10–14 days in rainy periods. Oriental Fruit Moth can damage almond shoots seriously in May if untreated.',
        notesUrdu: 'گیلے موسم میں شاٹ ہول ہر 10–14 دن میں واپس آ سکتا ہے — باقاعدہ سپرے ضروری ہے۔',
        products: ['Kozen (Insecticide)', 'Antracol (Bayer)']
      }
    ]
  },

  saffron: {
    name: 'Saffron / زعفران',
    urduTitle: 'زعفران کا سالانہ سپرے اور افزائش شیڈول',
    icon: SaffronSvg,
    stages: [
      {
        id: 'saffron1',
        title: 'Pre-Planting Corm Treatment',
        titleUrdu: 'بیج (کارم) لگانے سے پہلے علاج (جولائی/اگست)',
        timing: 'July – August (before planting)',
        timingUrdu: 'جولائی تا اگست (لگانے سے پہلے)',
        season: 'summer',
        objective: 'Corm rot (Fusarium oxysporum), Dry Rot, Nematodes, surface pests',
        objectiveUrdu: 'کارم کی سڑن (فیوزیریم)، خشک سڑن، نیماٹوڈ اور سطحی کیڑے',
        chemical: 'Trichoderma viride (IPL Sanjeevni) + Carbendazim 2 g/L dip for 30 min',
        chemicalUrdu: 'ٹرائکوڈرما (IPL سنجیونی) + کاربنڈازیم 2 گرام فی لیٹر — 30 منٹ بھگوئیں',
        dosage: 'Dip corms in 2 g Carbendazim/L solution for 30 min before planting. Shade-dry.',
        dosageUrdu: 'کارم کو 2 گرام کاربنڈازیم فی لیٹر محلول میں 30 منٹ بھگوئیں پھر سایہ میں خشک کریں۔',
        notes: 'Pampore (Pulwama) is the world\'s finest saffron region. Corm rot (Fusarium) is the most devastating disease. Pre-planting biological + chemical dip dramatically reduces losses. Plant in well-drained karewa soil.',
        notesUrdu: 'پامپور (پلوامہ) دنیا کا بہترین زعفران خطہ ہے۔ فیوزیریم سڑن سب سے بڑا نقصان کرتی ہے۔ لگانے سے پہلے حیاتیاتی اور کیمیائی علاج نقصان بہت کم کر دیتا ہے۔',
        products: ['IPL Sanjeevni (Trichoderma Viride)', 'IPL Vamshakti (VAM)']
      },
      {
        id: 'saffron2',
        title: 'Vegetative Growth Protection',
        titleUrdu: 'پتوں کی افزائش کا مرحلہ (ستمبر/اکتوبر)',
        timing: 'September – October (leaf emergence)',
        timingUrdu: 'ستمبر تا اکتوبر (پتے نکلنے پر)',
        season: 'autumn',
        objective: 'Corm rot prevention, Aphids on foliage, Nutrient boost before flowering',
        objectiveUrdu: 'کارم سڑن، پتوں پر جووں اور پھول سے پہلے غذائی ضرورت',
        chemical: 'IPL 5G Neo+ (Bio-Stimulant) + Thiamethoxam 25% WG for Aphids',
        chemicalUrdu: 'آئی پی ایل 5جی نیو+ (حیاتیاتی محرک) + تھیامیتھوکسام 25% ڈبلیو جی',
        dosage: '2 ml IPL 5G Neo+ + 0.5 g Thiamethoxam per Litre as foliar spray',
        dosageUrdu: '2 ملی لیٹر IPL 5G نیو+ + 0.5 گرام تھیامیتھوکسام فی لیٹر (پتوں پر سپرے)',
        notes: 'Saffron flowers in October–November in Kashmir — a narrow 2-week window. Strong healthy foliage in September ensures maximum stigma production. Avoid any chemical spray during actual flowering — it ruins aroma and quality.',
        notesUrdu: 'زعفران اکتوبر–نومبر میں پھولتا ہے — صرف 2 ہفتے کا موقع۔ ستمبر میں مضبوط پتے اچھی پیداوار کی ضمانت ہیں۔ پھول کے دوران کوئی سپرے نہ کریں — خوشبو اور معیار خراب ہوتا ہے۔',
        products: ['IPL 5G Neo+', 'Thiamethoxam', 'Heinekey (Humic Acid)']
      },
      {
        id: 'saffron3',
        title: 'Post-Harvest Soil Enrichment',
        titleUrdu: 'برداشت کے بعد مٹی کی بہتری (نومبر/دسمبر)',
        timing: 'November – December (post flowering)',
        timingUrdu: 'نومبر تا دسمبر (پھول توڑنے کے بعد)',
        season: 'winter',
        objective: 'Replenish soil nutrients, suppress Fusarium, improve corm multiplication',
        objectiveUrdu: 'مٹی کی غذائیت بحال کرنا، فیوزیریم دبانا، کارم کی افزائش بڑھانا',
        chemical: 'Sikri Vermicompost 2 kg/m² + IPL Sanjeevni (Trichoderma) soil drench',
        chemicalUrdu: 'سکری ورمی کمپوسٹ 2 کلو فی مربع میٹر + IPL سنجیونی (ٹرائکوڈرما) مٹی میں',
        dosage: 'Broadcast 2 kg Vermicompost per m² and mix into top 10 cm soil. Drench with Trichoderma solution.',
        dosageUrdu: '2 کلو ورمی کمپوسٹ فی مربع میٹر بکھیر کر 10 سینٹی میٹر مٹی میں ملائیں۔ ٹرائکوڈرما سے بھگوئیں۔',
        notes: 'This organic enrichment step is what separates premium Pampore saffron from average. Do NOT use chemical fertilizers in saffron fields — it degrades the delicate aroma compounds (safranal, picrocrocin).',
        notesUrdu: 'یہ نامیاتی مرحلہ پامپور کے اعلیٰ زعفران کی پہچان ہے۔ زعفران میں کیمیائی کھاد استعمال نہ کریں — یہ زعفران کی خوشبو اور معیار کو نقصان دیتا ہے۔',
        products: ['Sikri Vermicompost (Organic Fertilizer)', 'IPL Sanjeevni (Trichoderma Viride)', 'IPL Vamshakti (VAM)']
      }
    ]
  }
};

// Season badge component with SVG Icons
const SeasonBadge = ({ season }) => {
  const s = KASHMIR_SEASONS[season];
  if (!s) return null;
  const colors = {
    winter: { bg: 'rgba(147,210,255,0.15)', color: '#2980b9' },
    spring: { bg: 'rgba(120,200,120,0.15)', color: '#27ae60' },
    summer: { bg: 'rgba(255,200,100,0.15)', color: '#e67e22' },
    autumn: { bg: 'rgba(230,140,60,0.15)', color: '#c0392b' },
  };
  const c = colors[season] || colors.spring;
  const SeasonIcon = s.icon;
  return (
    <span style={{
      fontSize: '0.72rem', fontWeight: '700',
      background: c.bg, color: c.color,
      padding: '3px 10px', borderRadius: '20px',
      display: 'inline-flex', alignItems: 'center', gap: '5px',
      border: `1px solid ${c.color}33`
    }}>
      <SeasonIcon size={13} color={c.color} />
      <span>{s.label}</span>
    </span>
  );
};

export default function SprayCalendar() {
  const [selectedCrop, setSelectedCrop] = useState('apple');
  const [langMode, setLangMode] = useState('both'); // 'both', 'en', 'ur'
  const [activeStageId, setActiveStageId] = useState(SPRAY_SCHEDULES.apple.stages[0].id);

  const cropData = SPRAY_SCHEDULES[selectedCrop];

  const getProductDetails = (productName) => {
    return products.find(p => p.name.toLowerCase().includes(productName.toLowerCase()) || productName.toLowerCase().includes(p.name.toLowerCase()));
  };

  const handleWhatsAppConsultation = (stage) => {
    const message = 
      `*Orchard Advisory Request — Crop Spray Calendar*\n\n` +
      `*Crop:* ${cropData.name}\n` +
      `*Stage:* ${stage.title}\n` +
      `*Timing:* ${stage.timing}\n` +
      `*Season:* ${KASHMIR_SEASONS[stage.season]?.label || ''}\n` +
      `*Recommended Formulation:* ${stage.chemical}\n` +
      `*Recommended Dosage:* ${stage.dosage}\n\n` +
      `I am preparing to spray my orchard at this stage. Please guide me with availability, price, or alternative recommendations.`;

    const url = `https://wa.me/919906541321?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div style={{ backgroundColor: 'var(--surface-canvas)', minHeight: '100vh' }} className="section-padding">
      <div className="page-container">
        <AnimatedSection style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 36px' }}>
          <span className="tag-label">SKUAST-K Extension Advisory</span>
          <h1 className="text-heading-lg" style={{ marginBottom: '12px' }}>
            Interactive Spray Timelines
          </h1>
          <p className="urdu-text" style={{ fontSize: '1.25rem', color: 'var(--color-sienna-brown)', margin: '0.4rem 0 0.8rem 0', fontWeight: 'bold' }}>
            باغات کے لیے مرحلہ وار سپرے کے رہنما اصول
          </p>
          <p className="text-body-lg" style={{ color: 'var(--color-slate-gray)' }}>
            Scientific SKUAST-K extension timelines tailored to <strong>Kashmir's climate</strong> — covering winter dormancy, spring scab season, summer mite pressure, and autumn harvest protection.
          </p>

          {/* Kashmir Climate Strip with SVG Season Icons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', justifyContent: 'center', marginTop: '1.2rem', marginBottom: '1.2rem' }}>
            {Object.entries(KASHMIR_SEASONS).map(([key]) => (
              <SeasonBadge key={key} season={key} />
            ))}
          </div>

          {/* Print Schedule Button */}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '0.5rem' }}>
            <button
              onClick={() => window.print()}
              className="pill-button-ghost pill-button-sm no-print"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <Printer size={15} />
              <span>Print / Save Schedule Cheat-Sheet (PDF)</span>
            </button>
          </div>
        </AnimatedSection>

        {/* Srinagar Live Weather & Spray Advisory */}
        <AnimatedSection delay={0.05} style={{ marginBottom: '2.5rem' }} className="no-print">
          <WeatherSprayAlert />
        </AnimatedSection>

        {/* Control Panel Card */}
        <AnimatedSection delay={0.1} className="card-neutral" style={{ 
          padding: '1.5rem', 
          marginBottom: '2.5rem'
        }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
            {/* Left Side: Crop Picker Buttons with SVG Crop Icons */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {Object.keys(SPRAY_SCHEDULES).map((cropKey) => {
                const CropIcon = SPRAY_SCHEDULES[cropKey].icon;
                const isSelected = selectedCrop === cropKey;
                return (
                  <button
                    key={cropKey}
                    onClick={() => {
                      setSelectedCrop(cropKey);
                      setActiveStageId(SPRAY_SCHEDULES[cropKey].stages[0].id);
                    }}
                    className={isSelected ? 'pill-button-filled pill-button-sm' : 'pill-button-ghost pill-button-sm'}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                  >
                    <CropIcon size={15} color={isSelected ? '#ffffff' : 'var(--color-sienna-brown)'} />
                    <span>{SPRAY_SCHEDULES[cropKey].name}</span>
                  </button>
                );
              })}
            </div>

            {/* Right Side: Language Mode Switcher */}
            <div style={{ display: 'flex', background: 'var(--surface-canvas)', padding: '4px', borderRadius: '9999px', border: '1px solid rgba(23, 25, 28, 0.1)' }}>
              {[
                { id: 'both', label: 'Dual View (EN + UR)' },
                { id: 'en', label: 'English' },
                { id: 'ur', label: 'اردو' }
              ].map(m => (
                <button
                  key={m.id}
                  onClick={() => setLangMode(m.id)}
                  style={{
                    background: langMode === m.id ? 'var(--color-ink-black)' : 'transparent',
                    color: langMode === m.id ? '#ffffff' : 'var(--color-slate-gray)',
                    border: 'none',
                    padding: '0.4rem 0.85rem',
                    borderRadius: '9999px',
                    fontWeight: '600',
                    fontSize: '0.78rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    fontFamily: m.id === 'ur' ? 'Noto Nastaliq Urdu, sans-serif' : 'inherit'
                  }}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Crop Urdu Title */}
          {langMode !== 'en' && (
            <p className="urdu-text" dir="rtl" style={{ margin: '1rem 0 0 0', fontSize: '1.1rem', color: 'var(--color-sienna-brown)', fontWeight: 'bold' }}>
              {cropData.urduTitle}
            </p>
          )}
        </AnimatedSection>

        {/* Main Timeline Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginBottom: '3.5rem' }}>
          
          {/* Left Side: Stages Timeline Map */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <h3 style={{ fontSize: '1.1rem', color: 'var(--color-slate-gray)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Calendar size={18} /> Schedule Stages / مراحل ({cropData.stages.length})
            </h3>

            {cropData.stages.map((stage, idx) => {
              const isActive = activeStageId === stage.id;
              return (
                <div
                  key={stage.id}
                  onClick={() => setActiveStageId(stage.id)}
                  className="card-neutral"
                  style={{
                    backgroundColor: isActive ? 'var(--surface-accent-blush)' : 'var(--surface-elevated-white)',
                    borderColor: isActive ? 'var(--color-sienna-brown)' : 'rgba(23, 25, 28, 0.08)',
                    padding: '1.2rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    position: 'relative'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '6px', flexWrap: 'wrap', marginBottom: '0.4rem' }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 'bold', color: 'var(--color-sienna-brown)', backgroundColor: 'rgba(93, 42, 26, 0.08)', padding: '2px 8px', borderRadius: '12px', display: 'inline-block' }}>
                      Stage {idx + 1} &bull; {stage.timing}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <SeasonBadge season={stage.season} />
                      {isActive && <ChevronRight size={16} color="var(--color-sienna-brown)" />}
                    </div>
                  </div>

                  {(langMode === 'both' || langMode === 'en') && (
                    <h4 style={{ margin: '4px 0 0 0', fontSize: '0.98rem', color: 'var(--color-ink-black)', fontFamily: 'var(--font-signifier)', fontWeight: 400 }}>{stage.title}</h4>
                  )}
                  {(langMode === 'both' || langMode === 'ur') && (
                    <h4 className="urdu-text" dir="rtl" style={{ margin: '4px 0 0 0', fontSize: '1rem', color: 'var(--color-sienna-brown)', fontWeight: 'bold' }}>
                      {stage.titleUrdu}
                    </h4>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Side: Detailed Stage Advisor Card */}
          <div>
            {cropData.stages.map((stage) => {
              if (stage.id !== activeStageId) return null;

              return (
                <AnimatedSection
                  key={stage.id}
                  className="card-neutral"
                  style={{
                    padding: '2rem',
                    boxShadow: 'var(--shadow-artifact)',
                    position: 'sticky',
                    top: '90px'
                  }}
                >
                  <div style={{ borderBottom: '1px solid rgba(23, 25, 28, 0.08)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', marginBottom: '0.6rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-sienna-brown)', fontWeight: 'bold', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        <Shield size={16} /> Recommended Stage Advisor
                      </div>
                      <SeasonBadge season={stage.season} />
                    </div>
                    
                    {(langMode === 'both' || langMode === 'en') && (
                      <h3 style={{ margin: 0, fontSize: '1.5rem', fontFamily: 'var(--font-signifier)', fontWeight: 400, color: 'var(--color-ink-black)' }}>{stage.title}</h3>
                    )}
                    {(langMode === 'both' || langMode === 'ur') && (
                      <h3 className="urdu-text" dir="rtl" style={{ margin: '6px 0 0 0', fontSize: '1.4rem', color: 'var(--color-sienna-brown)', fontWeight: 'bold' }}>
                        {stage.titleUrdu}
                      </h3>
                    )}
                    <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '6px', marginTop: '0.4rem' }}>
                      <Calendar size={14} color="var(--color-slate-gray)" />
                      <span style={{ fontSize: '0.85rem', color: 'var(--color-slate-gray)' }}>
                        <strong>{stage.timing}</strong>
                      </span>
                      {langMode !== 'en' && (
                        <span className="urdu-text" style={{ fontSize: '0.85rem', color: 'var(--color-slate-gray)' }}>
                          — {stage.timingUrdu}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Objectives */}
                  <div style={{ marginBottom: '1.2rem' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--color-slate-gray)', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Target Pest/Disease:</span>
                    {(langMode === 'both' || langMode === 'en') && (
                      <p style={{ margin: 0, fontSize: '0.95rem', fontWeight: '500', color: 'var(--color-ink-black)' }}>{stage.objective}</p>
                    )}
                    {(langMode === 'both' || langMode === 'ur') && (
                      <p className="urdu-text" dir="rtl" style={{ margin: '4px 0 0 0', fontSize: '1.05rem', color: 'var(--color-sienna-brown)', fontWeight: '600' }}>{stage.objectiveUrdu}</p>
                    )}
                  </div>

                  {/* Formulation & Chemistry */}
                  <div style={{ background: 'var(--surface-canvas)', border: '1px solid rgba(23, 25, 28, 0.08)', borderRadius: 'var(--radius-smallcards)', padding: '1rem', marginBottom: '1.2rem' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--color-sienna-brown)', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Formulation:</span>
                    
                    {(langMode === 'both' || langMode === 'en') && (
                      <p style={{ margin: 0, fontSize: '1.05rem', fontFamily: 'var(--font-signifier)', fontWeight: '500', color: 'var(--color-ink-black)' }}>{stage.chemical}</p>
                    )}
                    {(langMode === 'both' || langMode === 'ur') && (
                      <p className="urdu-text" dir="rtl" style={{ margin: '4px 0 0 0', fontSize: '1.1rem', color: 'var(--color-sienna-brown)', fontWeight: 'bold' }}>{stage.chemicalUrdu}</p>
                    )}

                    {/* Dosage */}
                    <div style={{ marginTop: '0.8rem', display: 'flex', gap: '8px', alignItems: 'flex-start', borderTop: '1px solid rgba(23, 25, 28, 0.08)', paddingTop: '0.8rem' }}>
                      <Droplets size={16} color="var(--color-pine-green)" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <div>
                        {(langMode === 'both' || langMode === 'en') && (
                          <div style={{ fontSize: '0.9rem', color: 'var(--color-ink-black)' }}><strong>SKUAST-K Dilution:</strong> {stage.dosage}</div>
                        )}
                        {(langMode === 'both' || langMode === 'ur') && (
                          <div className="urdu-text" dir="rtl" style={{ fontSize: '0.95rem', color: 'var(--color-sienna-brown)', marginTop: '3px' }}><strong>تجویز کردہ مقدار:</strong> {stage.dosageUrdu}</div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Technical Advisor Notes */}
                  <div style={{ background: 'rgba(196, 160, 84, 0.06)', border: '1px solid rgba(196, 160, 84, 0.25)', borderRadius: 'var(--radius-smallcards)', padding: '1rem', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#c4a054', fontWeight: 'bold', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '4px' }}>
                      <AlertTriangle size={14} /> Kashmir Climate Advisory
                    </div>
                    {(langMode === 'both' || langMode === 'en') && (
                      <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-ink-black)', lineHeight: '1.6' }}>{stage.notes}</p>
                    )}
                    {(langMode === 'both' || langMode === 'ur') && (
                      <p className="urdu-text" dir="rtl" style={{ margin: '4px 0 0 0', fontSize: '0.95rem', color: '#5d2a1a', lineHeight: '1.7' }}>{stage.notesUrdu}</p>
                    )}
                  </div>

                  {/* Available In-Store Products Matching */}
                  {stage.products && stage.products.length > 0 && (
                    <div style={{ marginBottom: '1.5rem' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--color-slate-gray)', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Available Product Match:</span>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                        {stage.products.map(pName => {
                          const matched = getProductDetails(pName);
                          if (!matched) return null;

                          return (
                            <div 
                              key={matched.id}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                background: 'var(--surface-canvas)',
                                border: '1px solid rgba(23, 25, 28, 0.08)',
                                padding: '8px 12px',
                                borderRadius: 'var(--radius-smallcards)'
                              }}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <img src={matched.image} alt={matched.name} style={{ width: '32px', height: '32px', borderRadius: '4px', objectFit: 'cover' }} />
                                <div>
                                  <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--color-ink-black)' }}>{matched.name}</span>
                                  <span style={{ fontSize: '0.75rem', color: 'var(--color-slate-gray)', display: 'block' }}>{matched.composition}</span>
                                </div>
                              </div>
                              <span className="badge-green">
                                20% OFF
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Direct Consult Button */}
                  <button
                    onClick={() => handleWhatsAppConsultation(stage)}
                    className="pill-button-filled"
                    style={{
                      width: '100%',
                      justifyContent: 'center'
                    }}
                  >
                    <MessageCircle size={18} />
                    <span>{langMode === 'ur' ? 'اس مرحلے کی دوا واٹس ایپ پر آرڈر کریں' : 'Consult Chemist / Order Spray'}</span>
                  </button>
                </AnimatedSection>
              );
            })}
          </div>

        </div>

        {/* Orchard Spray Dosage & Tank Calculator */}
        <AnimatedSection delay={0.2} style={{ marginTop: '3.5rem' }} className="no-print">
          <DosageCalculator />
        </AnimatedSection>
      </div>
    </div>
  );
}
