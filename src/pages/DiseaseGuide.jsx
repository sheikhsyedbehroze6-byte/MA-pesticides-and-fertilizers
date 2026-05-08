import AnimatedSection from '../components/AnimatedSection';
import { diseases } from '../data/agricultureData';
import { AlertTriangle, CheckCircle, Leaf } from 'lucide-react';
import { motion } from 'framer-motion';
import './urdu.css'; // Import special styles for Urdu fonts

export default function DiseaseGuide() {
  return (
    <div className="container">
      <div className="section-header">
        <h2>Plant Disease & Solution Guide</h2>
        <p className="urdu-text" style={{ fontSize: '1.4rem', color: 'var(--primary-color)' }}>
          پودوں کی بیماریوں اور علاج کی رہنمائی
        </p>
        <p>Identify common crop diseases in Kashmir and find the exact cure and dosage.</p>
        <p className="urdu-text">
          کشمیر کی عام فصلوں کی بیماریوں کی شناخت کریں اور ان کا درست علاج اور دوا کی مقدار جانیں۔
        </p>
      </div>

      <div className="diseases-grid">
        {diseases.map((disease, index) => (
          <div 
            key={disease.id} 
            className={`disease-card bilingual-card ${disease.severity === 'High' ? 'severity-high' : ''}`}
          >
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              {disease.image && (
                <div 
                  className="disease-image-container" 
                  style={{ margin: '-1.5rem -1.5rem 1.5rem -1.5rem', maxHeight: '300px', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                >
                  <img 
                    src={disease.image} 
                    alt={disease.name} 
                    style={{ maxWidth: '100%', height: 'auto', objectFit: 'contain' }} 
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                </div>
              )}
              
              <div className="disease-header">
                <span className="crop-badge"><Leaf size={14} style={{marginRight: '4px'}}/> {disease.crop}</span>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', gap: '1rem' }}>
                  <h3 style={{ margin: 0 }}><AlertTriangle size={20} style={{marginRight: '8px'}}/> {disease.name}</h3>
                  <h3 className="urdu-text" dir="rtl" style={{ margin: 0 }}>{disease.nameUrdu}</h3>
                </div>
              </div>

              <div className="disease-content" style={{ flex: 1 }}>
                <div className="english-side">
                  <p><strong>Symptoms:</strong> {disease.symptoms}</p>
                  <p><strong>Severity:</strong> <span style={{ 
                    color: disease.severity === 'High' ? '#ff1744' : 'orange',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    fontSize: '0.85rem',
                    letterSpacing: '0.5px'
                  }}>{disease.severity}</span></p>
                </div>
                <div className="urdu-side urdu-text" dir="rtl">
                  <p><strong>علامات:</strong> {disease.symptomsUrdu}</p>
                </div>
              </div>
              
              <div 
                className="disease-cure" 
                style={{ background: 'rgba(26, 93, 26, 0.03)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(26, 93, 26, 0.1)' }}
              >
                <div className="english-side">
                  <p><CheckCircle size={16} color="var(--primary-color)" style={{ verticalAlign: 'middle', marginRight: '5px' }}/>
                  <strong>Recommended Cure:</strong> {disease.cure}</p>
                  <p style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}><strong>Dosage:</strong> {disease.dosage}</p>
                </div>
                <div className="urdu-side urdu-text" dir="rtl">
                  <p><CheckCircle size={16} color="var(--primary-color)" style={{ verticalAlign: 'middle', marginLeft: '5px' }}/>
                  <strong>علاج:</strong> {disease.cureUrdu}</p>
                  <p style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}><strong>مقدار:</strong> {disease.dosageUrdu}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
