import { useState } from 'react';
import AnimatedSection from '../components/AnimatedSection';
import { products } from '../data/agricultureData';
import { Calendar, CheckCircle2, MessageCircle, AlertTriangle, ChevronRight, Droplets, Shield } from 'lucide-react';
import './urdu.css';

// Rich SKUAST-K Stage-wise Spray Schedule Data
const SPRAY_SCHEDULES = {
  apple: {
    name: 'Apple / سیب',
    urduTitle: 'سیب کے باغات کا سالانہ سپرے شیڈول',
    stages: [
      {
        id: 'stage1',
        title: 'Delayed Dormancy / Green Tip',
        titleUrdu: 'گرین ٹپ مرحلہ (شروع بہار)',
        timing: 'Late March to Early April',
        objective: 'San Jose Scale, Mites, Scab Prevention',
        objectiveUrdu: 'سان جوز سکیل، مائٹس اور سکاب سے تحفظ',
        chemical: 'Horticultural Mineral Oil (HMO) + Copper Oxychloride or Superstar Dodine',
        chemicalUrdu: 'ہارٹیکلچرل منرل آئل + کاپر آکسی کلورائڈ یا سپر سٹار ڈوڈائن',
        dosage: '20 ml HMO + 1.5 g Dodine per Litre of water',
        dosageUrdu: '20 ملی لیٹر منرل آئل + 1.5 گرام ڈوڈائن فی لیٹر پانی',
        notes: 'Thorough coverage of bark is essential. Do not spray if freezing temperatures are expected.',
        notesUrdu: 'درخت کی چھال کا مکمل بھیگنا ضروری ہے۔ سردی یا کورے کے دوران سپرے نہ کریں۔',
        products: ['Cyclone 505 (Insecticide)', 'Superstar Dodeine (Fungicide)']
      },
      {
        id: 'stage2',
        title: 'Pink Bud Stage',
        titleUrdu: 'پنک بڈ مرحلہ (شگوفے نکلنے پر)',
        timing: 'Mid April',
        objective: 'Apple Scab Protection, Powdery Mildew, Sucking Pests',
        objectiveUrdu: 'سیب کی خارش (سکاب)، سفیدی اور چوسنے والے کیڑے',
        chemical: 'Bayer Luna Experience or Filpostar Proponib (Antracol)',
        chemicalUrdu: 'بائر لونا ایکسپیرینس یا فلپوسٹار پروپونیب (اینٹراکول)',
        dosage: '1 ml Luna or 2.5 g Antracol per Litre of water',
        dosageUrdu: '1 ملی لیٹر لونا یا 2.5 گرام اینٹراکول فی لیٹر پانی',
        notes: 'Highly critical stage for scab prevention. Ensure uniform spray distribution on fresh pink buds.',
        notesUrdu: 'سکاب کی روک تھام کے لیے یہ سب سے اہم مرحلہ ہے۔ شگوفوں پر یکساں سپرے کریں۔',
        products: ['Luna (Bayer)', 'Antracol (Bayer)']
      },
      {
        id: 'stage3',
        title: 'Petal Fall / Pea Stage',
        titleUrdu: 'پھل بننے کا ابتدائی مرحلہ (مٹر کے دانے برابر)',
        timing: 'Early May',
        objective: 'Scab Protection, Aphids, Mites control',
        objectiveUrdu: 'سیب کی خارش، چست تیلہ اور سرخ مائٹس کی روک تھام',
        chemical: 'Hexaconazole (Contaf) + Imidacloprid',
        chemicalUrdu: 'ہیکسا کونازول + امیڈا کلوپرڈ (کیڑے مار دوا)',
        dosage: '0.5 ml Hexaconazole + 0.5 ml Imidacloprid per Litre of water',
        dosageUrdu: '0.5 ملی لیٹر ہیکسا کونازول + 0.5 ملی لیٹر امیڈا کلوپرڈ فی لیٹر پانی',
        notes: 'Helps in keeping leaves and young fruitlets safe from early sucking pests.',
        notesUrdu: 'پتوں اور چھوٹے پھلوں کو ابتدائی رس چوسنے والے کیڑوں سے محفوظ رکھتا ہے۔',
        products: ['Governor (Systemic Insecticide)', 'Superstar Dodeine (Fungicide)']
      },
      {
        id: 'stage4',
        title: 'Fruit Development (Size Enhancement)',
        titleUrdu: 'پھل کی افزائش کا مرحلہ (جون / جولائی)',
        timing: 'June to July',
        objective: 'Secondary Scab, Sooty Blotch, Alternaria Leaf Spot, Red Mites',
        objectiveUrdu: 'دوسری باری کا سکاب، پتوں کے دھبے اور مائٹس کا خاتمہ',
        chemical: 'Propineb (Antracol) + Propargite (Mite control)',
        chemicalUrdu: 'پروپینیب (اینٹراکول) + پروپارگائٹ (مائٹس کی خاص دوا)',
        dosage: '2 g Antracol + 1 ml Miteicide per Litre of water',
        dosageUrdu: '2 گرام اینٹراکول + 1 ملی لیٹر مائٹیسائیڈ فی لیٹر پانی',
        notes: 'Spray in the early morning or late evening hours to avoid crop phytotoxicity.',
        notesUrdu: 'گرمی کے دوران سپرے سے گریز کریں۔ صبح سویرے یا شام کے وقت سپرے کریں۔',
        products: ['Antracol (Bayer)', 'Novathion (Insecticide)']
      },
      {
        id: 'stage5',
        title: 'Pre-Harvest (Color & Quality Upgrade)',
        titleUrdu: 'برداشت سے پہلے کا مرحلہ (اگست / ستمبر)',
        timing: 'Late August to September',
        objective: 'Sooty Blotch, Fly Speck, Fruit Rot, Color Enhancement',
        objectiveUrdu: 'پھل کی سڑن سے بچاؤ، رنگ اور چمک میں بہتری',
        chemical: 'Ziram 80% WP or Calcium Nitrate Spray',
        chemicalUrdu: 'زائرم 80% ڈبلیو پی یا کیلشیم نائٹریٹ سپرے',
        dosage: '2 g Ziram or 10 g Calcium Nitrate per Litre of water',
        dosageUrdu: '2 گرام زائرم یا 10 گرام کیلشیم نائٹریٹ فی لیٹر پانی',
        notes: 'Improves shelf life and color uniformity of Delicious and Kulu apples.',
        notesUrdu: 'سیب کے معیار، چمک اور پھل کی اسٹوریج لائف کو بڑھانے میں مددگار ہے۔',
        products: ['Sikri Vermicompost (Organic Fertilizer)']
      }
    ]
  },
  pear: {
    name: 'Pear / ناشپاتی',
    urduTitle: 'ناشپاتی کے باغات کا سالانہ سپرے شیڈول',
    stages: [
      {
        id: 'pear1',
        title: 'Dormant Spray',
        titleUrdu: 'خوابیدہ حالت کا سپرے',
        timing: 'Late February',
        objective: 'Pear Psylla, Scale Insects',
        objectiveUrdu: 'سیلا اور چھال کے کیڑوں کی روک تھام',
        chemical: 'Horticultural Mineral Oil (HMO)',
        chemicalUrdu: 'ہارٹیکلچرل منرل آئل',
        dosage: '30 ml per Litre of water',
        dosageUrdu: '30 ملی لیٹر فی لیٹر پانی',
        notes: 'Critical for pear orchards in Kashmir to control overwintering Psylla.',
        notesUrdu: 'کشمیر میں ناشپاتی کے کیڑے سیلا کے خاتمے کے لیے نہایت ضروری سپرے۔',
        products: ['Cyclone 505 (Insecticide)']
      },
      {
        id: 'pear2',
        title: 'White Bud / Blossom',
        titleUrdu: 'سفید شگوفے نکلنے کا مرحلہ',
        timing: 'Late March to April',
        objective: 'Pear Scab Prevention, Leaf Spot',
        objectiveUrdu: 'ناشپاتی کا سکاب اور پتوں کے دھبے',
        chemical: 'Bayer Antracol (Propineb) or Mancozeb',
        chemicalUrdu: 'بائر اینٹراکول (پروپینیب) یا مینکوزیب',
        dosage: '2.5 g per Litre of water',
        dosageUrdu: '2.5 گرام فی لیٹر پانی',
        notes: 'Keep a close watch on weather alerts; scab spreads fast during spring rains.',
        notesUrdu: 'بہار کی بارشوں کے دوران بیماری تیزی سے پھیلتی ہے، حفاظتی سپرے بروقت کریں۔',
        products: ['Antracol (Bayer)', 'Filpostar Proponib (Fungicide)']
      }
    ]
  },
  cherry: {
    name: 'Cherry / چیری',
    urduTitle: 'چیری کے باغات کا سالانہ سپرے شیڈول',
    stages: [
      {
        id: 'cherry1',
        title: 'Bud Burst',
        titleUrdu: 'شگوفے کھلنے پر',
        timing: 'Late March',
        objective: 'Brown Rot, Leaf Spot, Aphids',
        objectiveUrdu: 'براؤن روٹ (سڑن) اور کالی جووں کا علاج',
        chemical: 'Copper Oxychloride 50% WP or Captan',
        chemicalUrdu: 'کاپر آکسی کلورائڈ 50% ڈبلیو پی یا کیپٹان',
        dosage: '2.5 g per Litre of water',
        dosageUrdu: '2.5 گرام فی لیٹر پانی',
        notes: 'Helps secure initial blossom set and stem integrity.',
        notesUrdu: 'چیری کی ابتدائی صحت اور پھولوں کے جھڑنے کو روکنے کے لیے موثر ہے۔',
        products: ['Superstar Dodeine (Fungicide)']
      },
      {
        id: 'cherry2',
        title: 'Fruit Setting / Red Stage',
        titleUrdu: 'پھل بننے اور لال ہونے پر',
        timing: 'May',
        objective: 'Fruit Rot prevention, Sucking insects',
        objectiveUrdu: 'پھل سڑنے سے بچاؤ اور کیڑوں کا خاتمہ',
        chemical: 'Carbendazim or Dodine 65% WP',
        chemicalUrdu: 'کاربنڈازیم یا ڈوڈائن 65% ڈبلیو پی',
        dosage: '1 g per Litre of water',
        dosageUrdu: '1 گرام فی لیٹر پانی',
        notes: 'Crucial for avoiding spot blemishes and soft fruit textures.',
        notesUrdu: 'پھل پر نشانات سے بچاؤ اور چیری کو مضبوط اور تازہ رکھنے کے لیے۔',
        products: ['Superstar Dodeine (Fungicide)', 'Luna (Bayer)']
      }
    ]
  }
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
      `🌿 *Orchard Advisory Request — Crop Spray Calendar*\n\n` +
      `*Crop:* ${cropData.name}\n` +
      `*Stage:* ${stage.title}\n` +
      `*Timing:* ${stage.timing}\n` +
      `*Recommended Formulation:* ${stage.chemical}\n` +
      `*Recommended Dosage:* ${stage.dosage}\n\n` +
      `I am preparing to spray my orchard at this stage. Please guide me with availability, price, or alternative recommendations.`;

    const url = `https://wa.me/919906541321?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="container" style={{ paddingBottom: '5rem' }}>
      <AnimatedSection className="section-header">
        <h2>Interactive Spray Timelines</h2>
        <p className="urdu-text" style={{ fontSize: '1.25rem', color: 'var(--primary-color)', margin: '0.4rem 0 0.8rem 0', fontWeight: 'bold' }}>
          باغات کے لیے مرحلہ وار سپرے کے رہنما اصول
        </p>
        <p>Scientific SKUAST-K extension timelines for disease prevention, insect control, and maximum orchard yields.</p>
      </AnimatedSection>

      {/* Control Panel Card */}
      <AnimatedSection delay={0.1} style={{ 
        background: 'var(--bg-card)', 
        borderRadius: '14px', 
        padding: '1.5rem', 
        boxShadow: '0 8px 30px rgba(0,0,0,0.02)',
        border: '1px solid var(--border-color)',
        marginBottom: '2rem'
      }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
          {/* Left Side: Crop Picker Buttons */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {Object.keys(SPRAY_SCHEDULES).map((cropKey) => (
              <button
                key={cropKey}
                onClick={() => {
                  setSelectedCrop(cropKey);
                  setActiveStageId(SPRAY_SCHEDULES[cropKey].stages[0].id);
                }}
                style={{
                  background: selectedCrop === cropKey ? 'var(--primary-color)' : 'var(--bg-main)',
                  color: selectedCrop === cropKey ? '#ffffff' : 'var(--text-main)',
                  border: selectedCrop === cropKey ? '1px solid var(--primary-color)' : '1px solid var(--border-color)',
                  padding: '0.6rem 1.4rem',
                  borderRadius: '30px',
                  fontWeight: '600',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease'
                }}
              >
                {SPRAY_SCHEDULES[cropKey].name}
              </button>
            ))}
          </div>

          {/* Right Side: Language Mode Switcher */}
          <div style={{ display: 'flex', background: 'var(--bg-main)', padding: '4px', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
            {[
              { id: 'both', label: 'Dual View (EN + UR)' },
              { id: 'en', label: 'English' },
              { id: 'ur', label: 'اردو' }
            ].map(m => (
              <button
                key={m.id}
                onClick={() => setLangMode(m.id)}
                style={{
                  background: langMode === m.id ? 'var(--primary-color)' : 'transparent',
                  color: langMode === m.id ? '#ffffff' : 'var(--text-muted)',
                  border: 'none',
                  padding: '0.45rem 0.85rem',
                  borderRadius: '7px',
                  fontWeight: '600',
                  fontSize: '0.8rem',
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
      </AnimatedSection>

      {/* Main Timeline Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
        
        {/* Left Side: Stages Timeline Map */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          <h3 style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Calendar size={18} /> Schedule Stages / مراحل
          </h3>

          {cropData.stages.map((stage, idx) => {
            const isActive = activeStageId === stage.id;
            return (
              <div
                key={stage.id}
                onClick={() => setActiveStageId(stage.id)}
                style={{
                  background: isActive ? 'rgba(22, 62, 36, 0.04)' : 'var(--bg-card)',
                  border: isActive ? '1.5px solid var(--primary-color)' : '1px solid var(--border-color)',
                  borderRadius: '12px',
                  padding: '1.2rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  position: 'relative'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--primary-color)', background: 'var(--primary-glow)', padding: '2px 8px', borderRadius: '12px', marginBottom: '0.4rem', display: 'inline-block' }}>
                    Stage {idx + 1} &bull; {stage.timing}
                  </span>
                  {isActive && <ChevronRight size={18} color="var(--primary-color)" />}
                </div>

                {(langMode === 'both' || langMode === 'en') && (
                  <h4 style={{ margin: '4px 0 0 0', fontSize: '1rem', color: 'var(--text-main)' }}>{stage.title}</h4>
                )}
                {(langMode === 'both' || langMode === 'ur') && (
                  <h4 className="urdu-text" dir="rtl" style={{ margin: '4px 0 0 0', fontSize: '1.05rem', color: 'var(--primary-color)', fontWeight: 'bold' }}>
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
                style={{
                  background: 'var(--bg-card)',
                  border: '1.5px solid var(--border-color)',
                  borderRadius: '16px',
                  padding: '2rem',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.03)',
                  position: 'sticky',
                  top: '100px'
                }}
              >
                <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary-color)', fontWeight: 'bold', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.4rem' }}>
                    <Shield size={16} /> Recommended Stage Advisor
                  </div>
                  
                  {(langMode === 'both' || langMode === 'en') && (
                    <h3 style={{ margin: 0, fontSize: '1.4rem' }}>{stage.title}</h3>
                  )}
                  {(langMode === 'both' || langMode === 'ur') && (
                    <h3 className="urdu-text" dir="rtl" style={{ margin: '6px 0 0 0', fontSize: '1.5rem', color: 'var(--primary-color)', fontWeight: 'bold' }}>
                      {stage.titleUrdu}
                    </h3>
                  )}
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginTop: '0.2rem' }}>
                    Typical Spray Window: <strong>{stage.timing}</strong>
                  </span>
                </div>

                {/* Objectives */}
                <div style={{ marginBottom: '1.2rem' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Target Pest/Disease:</span>
                  {(langMode === 'both' || langMode === 'en') && (
                    <p style={{ margin: 0, fontSize: '0.95rem', fontWeight: '600', color: 'var(--text-main)' }}>{stage.objective}</p>
                  )}
                  {(langMode === 'both' || langMode === 'ur') && (
                    <p className="urdu-text" dir="rtl" style={{ margin: '4px 0 0 0', fontSize: '1.05rem', color: '#163e24', fontWeight: '600' }}>{stage.objectiveUrdu}</p>
                  )}
                </div>

                {/* Formulation & Chemistry */}
                <div style={{ background: 'var(--bg-main)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '1rem', marginBottom: '1.2rem' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--primary-color)', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Formulation:</span>
                  
                  {(langMode === 'both' || langMode === 'en') && (
                    <p style={{ margin: 0, fontSize: '1rem', fontWeight: 'bold', color: 'var(--text-main)' }}>{stage.chemical}</p>
                  )}
                  {(langMode === 'both' || langMode === 'ur') && (
                    <p className="urdu-text" dir="rtl" style={{ margin: '4px 0 0 0', fontSize: '1.1rem', color: 'var(--primary-color)', fontWeight: 'bold' }}>{stage.chemicalUrdu}</p>
                  )}

                  {/* Dosage */}
                  <div style={{ marginTop: '0.8rem', display: 'flex', gap: '8px', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '0.8rem' }}>
                    <Droplets size={16} color="var(--primary-color)" />
                    <div>
                      {(langMode === 'both' || langMode === 'en') && (
                        <div style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}><strong>SKUAST-K Dilution:</strong> {stage.dosage}</div>
                      )}
                      {(langMode === 'both' || langMode === 'ur') && (
                        <div className="urdu-text" dir="rtl" style={{ fontSize: '0.95rem', color: '#163e24' }}><strong>تجویز کردہ مقدار:</strong> {stage.dosageUrdu}</div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Technical Advisor Notes */}
                <div style={{ background: 'rgba(196, 160, 84, 0.05)', border: '1px solid rgba(196, 160, 84, 0.2)', borderRadius: '12px', padding: '1rem', marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#c4a054', fontWeight: 'bold', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '4px' }}>
                    <AlertTriangle size={14} /> Critical Guidelines
                  </div>
                  {(langMode === 'both' || langMode === 'en') && (
                    <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-main)', lineHeight: '1.5' }}>{stage.notes}</p>
                  )}
                  {(langMode === 'both' || langMode === 'ur') && (
                    <p className="urdu-text" dir="rtl" style={{ margin: '4px 0 0 0', fontSize: '0.95rem', color: '#163e24', lineHeight: '1.6' }}>{stage.notesUrdu}</p>
                  )}
                </div>

                {/* Available In-Store Products Matching */}
                {stage.products && stage.products.length > 0 && (
                  <div style={{ marginBottom: '1.5rem' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Available Product Match:</span>
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
                              background: 'var(--bg-main)',
                              border: '1px solid var(--border-color)',
                              padding: '8px 12px',
                              borderRadius: '8px'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <img src={matched.image} alt={matched.name} style={{ width: '32px', height: '32px', borderRadius: '4px', objectFit: 'cover' }} />
                              <div>
                                <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-main)' }}>{matched.name}</span>
                                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>{matched.composition}</span>
                              </div>
                            </div>
                            <span style={{ fontSize: '0.75rem', color: 'var(--primary-color)', fontWeight: 'bold', background: 'var(--primary-glow)', padding: '2px 6px', borderRadius: '4px' }}>
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
                  style={{
                    width: '100%',
                    background: '#25D366',
                    color: '#ffffff',
                    border: 'none',
                    padding: '0.8rem 1.2rem',
                    borderRadius: '10px',
                    fontWeight: 'bold',
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 15px rgba(37, 211, 102, 0.2)'
                  }}
                >
                  <MessageCircle size={18} />
                  {langMode === 'ur' ? 'اس مرحلے کی دوا واٹس ایپ پر آرڈر کریں' : 'Consult Advisor / Order Spray'}
                </button>
              </AnimatedSection>
            );
          })}
        </div>

      </div>
    </div>
  );
}
