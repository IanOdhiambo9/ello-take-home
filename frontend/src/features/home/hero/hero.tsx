import './hero.css';

function Hero() {
  return (
    <div className="hero-section primary-bg-color">
      <div className="hero">
        <img src="https://books.ello.com/static/media/summer-icon.bcf576872ef448e77ffe5178a9438f64.svg" alt="Accent Image" />
        <h1>Ello Book Assignment</h1>
        <p className='secondary-bg-color'>Empowering teachers to share the joy of reading with children</p>
      </div>
    </div>
  );
}

export default Hero;