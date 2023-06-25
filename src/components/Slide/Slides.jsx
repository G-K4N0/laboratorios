import { useState, useEffect } from 'react';
import './Slides.scss';

export const Slides = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % data.length);
    }, 30000);

    return () => {
      clearInterval(timer);
    };
  }, [data.length]);

  const handleSelect = (selectedIndex) => {
    setActiveIndex(selectedIndex);
  };

  return (
    <div className="carousel">
      <div className="carousel-inner">
        {data.map((item, index) => (
          <div
            key={index}
            className={`carousel-item ${index === activeIndex ? 'active' : ''}`}
          >
            <div className="carousel-caption">
              <div className="titulo-aviso">
                <h3>{item.titulo}</h3>
              </div>

              <div className="detalles-aviso">
                <p>{item.detalles}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        className="carousel-control-prev"
        onClick={() => handleSelect((activeIndex - 1 + data.length) % data.length)}
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        onClick={() => handleSelect((activeIndex + 1) % data.length)}
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};
