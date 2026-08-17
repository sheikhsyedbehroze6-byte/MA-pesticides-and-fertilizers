import { useState } from 'react';
import WeatherSprayAlert from '../components/WeatherSprayAlert';
import { ArrowUpRight } from 'lucide-react';

const APPLE_STAGES = [
  {
    id: 'stage0',
    title: 'Dormant / Winter Spray',
    timing: 'January – February',
    objective: 'San Jose Scale, Overwintering Mites & Bark Crevice Pests',
    formulation: 'Horticultural Mineral Oil (HMO) 3-4% Solution',
    dosage: '30-40 ml HMO per Litre of water',
    notes: 'Spray during mild sunny winter days (> 4°C). Eliminates up to 80% of dormant pest populations.',
    product: 'HP HMO / Servo Mineral Oil'
  },
  {
    id: 'stage1',
    title: 'Delayed Dormancy / Green Tip',
    timing: 'Late March – Early April',
    objective: 'Primary Apple Scab Infection Barrier',
    formulation: 'Bayer Antracol 70% WP or Superstar Dodine 65% WP',
    dosage: '2.5g Antracol or 1g Dodine per Litre of water',
    notes: 'Critical rain-fast protective window. As temperatures rise above 10°C, overwintered scab spores discharge.',
    product: 'Bayer Antracol 70% WP'
  },
  {
    id: 'stage2',
    title: 'Pink Bud Stage',
    timing: 'Mid April',
    objective: 'Blossom Scab & Powdery Mildew Prevention',
    formulation: 'Syngenta Score (Difenoconazole) or Myclobutanil + Boron 20%',
    dosage: '0.5 ml Score + 1g Boron per Litre of water',
    notes: 'Protects emerging pink flower clusters. Boron addition improves pollen tube viability and fruit set.',
    product: 'Syngenta Score 25 EC'
  },
  {
    id: 'stage3',
    title: 'Petal Fall (10–15% Bloom)',
    timing: 'Late April – Early May',
    objective: 'Fruitlet Scab, Aphids & Sawfly Control',
    formulation: 'Captan 75 WP or Mancozeb 75 WP + Syngenta Alika',
    dosage: '2g Captan + 0.5ml Alika per Litre of water',
    notes: 'Do not spray chemical during 100% full bloom to protect pollinating bees.',
    product: 'Syngenta Alika'
  },
  {
    id: 'stage4',
    title: 'Fruit Walnut / Development',
    timing: 'May – June',
    objective: 'Codling Moth 1st Gen & Spider Mites',
    formulation: 'Bayer Luna Experience + Oberon Spiromesifen',
    dosage: '1ml Luna + 0.5ml Oberon per Litre of water',
    notes: 'Summer peak advisory window. Monitor pheromone traps for codling moth egg hatch peak.',
    product: 'Bayer Luna Experience'
  }
];

export default function SprayCalendar() {
  const [selectedStage, setSelectedStage] = useState(APPLE_STAGES[1]);

  return (
    <div style={{ backgroundColor: 'var(--surface-canvas)', minHeight: '100vh' }} className="section-padding">
      <div className="page-container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto 48px' }}>
          <span className="tag-label">SKUAST-K Orchard Analytics</span>
          <h1 className="text-heading-lg" style={{ marginBottom: '16px' }}>
            Kashmir apple spray calendar.
          </h1>
          <p className="text-body-lg" style={{ color: 'var(--color-slate-gray)' }}>
            Stage-by-stage chemical formulations, exact dosage rates per 200L barrel, and weather-synchronized windows.
          </p>
        </div>

        {/* Live Weather Artifact Bar */}
        <div style={{ marginBottom: '48px' }}>
          <WeatherSprayAlert />
        </div>

        {/* Stage Selection Pills Bar */}
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '48px' }}>
          {APPLE_STAGES.map((st, idx) => (
            <button
              key={st.id}
              onClick={() => setSelectedStage(st)}
              className={selectedStage.id === st.id ? 'pill-button-filled pill-button-sm' : 'pill-button-ghost pill-button-sm'}
            >
              Stage {idx + 1}: {st.title}
            </button>
          ))}
        </div>

        {/* Floating Product Artifact Table for Selected Stage */}
        <div className="floating-product-artifact" style={{ padding: '36px', marginBottom: '48px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <span className="tag-label" style={{ margin: 0 }}>Active Growth Stage</span>
              <h2 style={{ fontFamily: 'var(--font-signifier)', fontSize: '32px', fontWeight: 400, margin: '4px 0 0 0' }}>
                {selectedStage.title}
              </h2>
            </div>
            <div style={{
              fontSize: '14px',
              fontFamily: 'var(--font-sohne)',
              fontWeight: 500,
              backgroundColor: 'var(--surface-accent-blush)',
              color: 'var(--color-sienna-brown)',
              padding: '6px 16px',
              borderRadius: '9999px'
            }}>
              Window: {selectedStage.timing}
            </div>
          </div>

          <div className="spray-calendar-grid">
            {/* Left Technical Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ backgroundColor: 'var(--surface-card-mist)', padding: '20px', borderRadius: 'var(--radius-cards)' }}>
                <span style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--color-ash-gray)', display: 'block', marginBottom: '4px' }}>
                  Target Pests & Diseases
                </span>
                <p style={{ fontSize: '16px', color: 'var(--color-ink-black)', margin: 0, fontWeight: 450 }}>
                  {selectedStage.objective}
                </p>
              </div>

              <div style={{ backgroundColor: 'var(--surface-card-mist)', padding: '20px', borderRadius: 'var(--radius-cards)' }}>
                <span style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--color-ash-gray)', display: 'block', marginBottom: '4px' }}>
                  Recommended Formulation
                </span>
                <p style={{ fontSize: '18px', fontFamily: 'var(--font-signifier)', color: 'var(--color-sienna-brown)', margin: 0 }}>
                  {selectedStage.formulation}
                </p>
                <p style={{ fontSize: '14px', color: 'var(--color-slate-gray)', marginTop: '4px', margin: 0 }}>
                  Rate: {selectedStage.dosage}
                </p>
              </div>
            </div>

            {/* Right Advisory & Order Box */}
            <div style={{ backgroundColor: 'var(--surface-section-fog)', padding: '24px', borderRadius: 'var(--radius-cards)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <span className="tag-label" style={{ marginBottom: '8px' }}>Agronomy Advisory</span>
                <p style={{ fontSize: '15px', color: 'var(--color-slate-gray)', lineHeight: 1.5, margin: 0 }}>
                  {selectedStage.notes}
                </p>
              </div>

              <a
                href={`https://wa.me/919906541321?text=${encodeURIComponent(`Hello Sheikh Mohammad Ayoub, I need spray products for ${selectedStage.title} (${selectedStage.formulation}).`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="pill-button-filled"
                style={{ width: '100%', marginTop: '24px' }}
              >
                <span>Order Stage Chemical</span>
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
