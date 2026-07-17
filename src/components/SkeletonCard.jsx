/**
 * SkeletonCard — animated shimmer placeholder matching ProductCard layout.
 */
export default function SkeletonCard() {
  return (
    <div className="skeleton-card">
      {/* Image area */}
      <div className="skeleton skeleton-image" />
      {/* Content area */}
      <div className="skeleton-body">
        <div className="skeleton skeleton-line skeleton-title" />
        <div className="skeleton skeleton-line" style={{ width: '70%' }} />
        <div className="skeleton skeleton-line" style={{ width: '85%' }} />
        {/* Details box */}
        <div className="skeleton skeleton-details-box">
          <div className="skeleton skeleton-line" style={{ width: '90%' }} />
          <div className="skeleton skeleton-line" style={{ width: '75%' }} />
        </div>
        {/* Tags */}
        <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.6rem' }}>
          <div className="skeleton skeleton-tag" />
          <div className="skeleton skeleton-tag" style={{ width: '70px' }} />
          <div className="skeleton skeleton-tag" style={{ width: '50px' }} />
        </div>
      </div>
    </div>
  );
}
