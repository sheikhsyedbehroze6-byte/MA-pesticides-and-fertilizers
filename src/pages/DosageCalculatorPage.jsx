import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bug, ArrowLeft, ShieldCheck, Droplets, Sparkles } from 'lucide-react';
import DosageCalculator from '../components/DosageCalculator';
import Breadcrumb from '../components/Breadcrumb';

export default function DosageCalculatorPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Dosage & Tank Calculator | MA Pesticides & Fertilizers';
  }, []);

  return (
    <div style={{ backgroundColor: 'var(--surface-canvas)', minHeight: '100vh' }} className="section-padding">
      <div className="page-container">
        <Breadcrumb />

        {/* Header with Editorial Context */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 36px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <span className="tag-label-green">SKUAST-K Standardized Formulations</span>
          </div>

          <h1 className="text-heading-lg" style={{ marginBottom: '16px', color: 'var(--color-ink-black)' }}>
            Orchard spray dosage & tank calculator.
          </h1>

          <p className="text-body-lg" style={{ color: 'var(--color-slate-gray)', marginBottom: '24px' }}>
            Compute exact chemical volumes and water ratios for standard Kashmiri 200L, 500L, and 1000L spray motors, or calculate by kanal acreage and mature tree count.
          </p>

          {/* Cross-link to Disease Guide */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <Link
              to="/disease-guide"
              className="pill-button-ghost pill-button-sm"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                borderColor: 'rgba(28, 71, 42, 0.25)',
                color: 'var(--color-pine-green)'
              }}
            >
              <Bug size={15} />
              <span>Diagnose Symptoms in Crop Disease Guide</span>
              <span className="arrow">→</span>
            </Link>
            <Link
              to="/spray-calendar"
              className="pill-button-ghost pill-button-sm"
            >
              <span>View SKUAST Spray Calendar</span>
              <span className="arrow">→</span>
            </Link>
          </div>
        </div>

        {/* The Calculator Component */}
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <DosageCalculator />
        </div>

        {/* Chemical Safety & Precision Advisory */}
        <div
          style={{
            maxWidth: '1000px',
            margin: '40px auto 0',
            padding: '24px',
            backgroundColor: 'var(--surface-paper)',
            borderRadius: 'var(--radius-cards)',
            border: '1px solid rgba(23, 25, 28, 0.08)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: 'rgba(28, 71, 42, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-pine-green)',
                flexShrink: 0
              }}
            >
              <ShieldCheck size={20} />
            </div>
            <div>
              <h3 style={{ fontFamily: 'var(--font-sohne)', fontSize: '16px', fontWeight: 600, color: 'var(--color-ink-black)', margin: '0 0 6px' }}>
                Chemist Mixing Notice — Sheikh Mohammad Ayoub (M.Sc.)
              </h3>
              <p style={{ fontSize: '13.5px', color: 'var(--color-slate-gray)', lineHeight: 1.5, margin: 0 }}>
                Never mix Dodine with mineral oils, sulfur, or solvent-based EC formulations. Pre-dissolve WP powders in a 10L bucket of lukewarm water before adding to the main tank. If you are unsure of physical or chemical compatibility, call our Srinagar store desk at <a href="tel:+919906541321" style={{ color: 'var(--color-pine-green)', fontWeight: 500 }}>+91 99065 41321</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
