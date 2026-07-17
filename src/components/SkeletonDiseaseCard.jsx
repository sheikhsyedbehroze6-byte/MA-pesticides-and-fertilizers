/**
 * SkeletonDiseaseCard — animated shimmer placeholder matching DiseaseCard layout.
 */
export default function SkeletonDiseaseCard() {
  return (
    <div className="skeleton-card">
      {/* Image area */}
      <div className="skeleton skeleton-image" />
      {/* Content area */}
      <div className="skeleton-body">
        {/* Crop badge */}
        <div className="skeleton skeleton-tag" style={{ width: '80px', marginBottom: '0.6rem' }} />
        {/* Title row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.8rem', marginBottom: '0.8rem' }}>
          <div className="skeleton skeleton-line" style={{ flex: 1 }} />
          <div className="skeleton skeleton-line" style={{ flex: 1 }} />
        </div>
        {/* Bilingual content */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '0.8rem' }}>
          <div>
            <div className="skeleton skeleton-line" />
            <div className="skeleton skeleton-line" style={{ width: '60%' }} />
          </div>
          <div>
            <div className="skeleton skeleton-line" />
            <div className="skeleton skeleton-line" style={{ width: '80%' }} />
          </div>
        </div>
        {/* Cure box */}
        <div className="skeleton skeleton-details-box">
          <div className="skeleton skeleton-line" style={{ width: '95%' }} />
          <div className="skeleton skeleton-line" style={{ width: '55%' }} />
        </div>
      </div>
    </div>
  );
}
