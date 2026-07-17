export default function Footer() {
  return (
    <footer>
      <div className="container" style={{ padding: '1rem', margin: '0 auto' }}>
        <h2 style={{ color: 'white' }}>www.MA pesticides.ac.in</h2>
        <p>Your Trusted Agricultural Partner in Kashmir</p>
        <p>📍 Near, Exhibition Road, opposite High Court Complex, Hari Singh High Street, Shergarhi, Srinagar, 190001</p>
        <p>&copy; {new Date().getFullYear()} MA Pesticides. All rights reserved.</p>
      </div>
    </footer>
  );
}
