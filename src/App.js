import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import YouTube from 'react-youtube';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './App.css';
import logo from './assets/Logo-emtech.png';
import iconoPlay from './assets/play.svg';
import design from './assets/Dot Pattern.png';
import design2 from './assets/Dot Pattern2.png';
import logoFooter from './assets/logo-footer.png';
import facebook from './assets/facebook.svg';
import instagram from './assets/instagram.svg';
import menu from './assets/menu.svg';

Modal.setAppElement('#root');

function App() {

  const [hoveredCards, setHoveredCards] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalIsOpenMovil, setModalIsOpenMovil] = useState(false);
  const [characters, setCharacters] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [imagenes, setImagenes] = useState([]);
  const [imagenActual, setImagenActual] = useState(null);

  const [activeIndex2, setActiveIndex2] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex2(prevIndex => (prevIndex === index ? null : index));
  };

  useEffect(() => {
    fetch('https://rickandmortyapi.com/api/character/6,7,8,9,10,11,12,13,14,15,16,17')
      .then(response => response.json())
      .then(data => {
        setImagenes(data);
        setImagenActual(data[0]);
      })
      .catch(error => console.error('Error fetching images:', error));
  }, []);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await fetch(
          'https://rickandmortyapi.com/api/character/6,7,8,9,10,11,12,13,14,15,16,17'
        );
        const data = await response.json();
        setCharacters(data);
      } catch (error) {
        console.error('Error fetching characters:', error);
      }
    };

    fetchCharacters();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % (Math.ceil(characters.length / 3)));
    }, 5000);
    return () => clearInterval(interval);
  }, [characters]);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const openModalMovil = () => {
    setModalIsOpenMovil(true);
  };

  const closeModalMovil = () => {
    setModalIsOpenMovil(false);
  };

  const opts = {
    height: '480',
    width: '854',
    playerVars: {
      // https://www.youtube.com/watch?v=DlD2sZXR8RI
      autoplay: 1,
    },
  };

  const optsMovil = {
    height: '250',
    width: '350',
    playerVars: {
      // https://www.youtube.com/watch?v=DlD2sZXR8RI
      autoplay: 1,
    },
  };

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://rickandmortyapi.com/api/character/1,2,3,4,5')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className='loading'>
      <img src={logoFooter} alt="logo" />
    </div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleMouseEnter = (id) => {
    setHoveredCards((prevHoveredCards) => ({
      ...prevHoveredCards,
      [id]: true,
    }));
  };

  const handleMouseLeave = (id) => {
    setHoveredCards((prevHoveredCards) => ({
      ...prevHoveredCards,
      [id]: false,
    }));
  };

  const splitName = (name) => {
    const words = name.split(' ');

    if (words.length < 2) {
      return <span>{name}</span>;
    }

    const [firstWord, secondWord] = words;

    return (
      <>
        <span>{firstWord}</span> <span>{secondWord}</span>
      </>
    );
  };

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      }
    ],
    afterChange: (index) => {
      setImagenActual(imagenes[index]);
    }
  };

  const items = [
    {
      title: 'Inicio',
      content: '¿Quiénes somos?',
      content2: '¿Qué hacemos?',
      content3: '¿Cómo lo hacemos?'
    },
    {
      title: 'Cursos',
      content: 'Salesforce fos Success',
      content2: 'Salesforce Analyst',
      content3: 'Salesforce Administrator',
      content4: 'Salesforce Developer'
    },
    {
      title: 'El programa',
      content: 'Características',
      content2: 'Beneficios',
      content3: 'Testimoniales',
      content4: 'Nuestra Alianza'
    },
    {
      title: 'Contáctanos',
      content: 'Formulario de contacto',
      content2: 'Síguenos en todas nuestras redes sociales.'
    }
  ];

  return (
    <>
      <div className="background-container">
        <header>
          <img src={logo} alt="logo-emtech" className='img-nav' />
          <nav>
            <ul>
              <li>Inicio</li>
              <li>About us</li>
              <li>Programas</li>
              <li>Beneficios</li>
            </ul>
          </nav>
        </header>
        <div className="content">
          <div className='banner'>
            <div className='bienvenida'>
              <div className='container-play-button'>
                <button onClick={openModal}>
                  <img src={iconoPlay} alt="" />
                </button>
              </div>
              <label>Bienvenido a Lorem Ipsum</label>
            </div>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non est sed ante tempus egestas. Aliquam erat volutpat. Quisque commodo nisi vitae sapien fermentum.</p>
            <button className='btn-contactanos' id='contac'>Contáctanos</button>
          </div>
          <div className='design'>
            <img id='diseño1' src={design} alt="puntitos" />
          </div>
          <div className='section-personajes'>
            <label>Conoce a nuestros principales personajes</label>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non est sed ante tempus egestas. Aliquam erat volutpat. Quisque commodo nisi vitae sapien fermentum,</p>
            <section className='section-cards-personaje'>
              {data?.map((character) => (
                <div
                  key={character.id}
                  className='card-personaje'
                  onMouseEnter={() => handleMouseEnter(character.id)}
                  onMouseLeave={() => handleMouseLeave(character.id)}
                >
                  <div className='foto-personaje'>
                    <img src={character.image} alt="Foto" />
                  </div>
                  <label>
                    {hoveredCards[character.id] ? (
                      <>
                        <span>{character.species}</span>
                        <span>{character.status}</span>
                        <span>{character.gender}</span>
                      </>
                    ) : (
                      splitName(character.name)
                    )}
                  </label>
                </div>
              ))}
            </section>
            <button className='btn-contactanos' id='contac2'>Contáctanos</button>
          </div>
        </div>
        <div className='section-carousel'>
          <label>
            <span>Conoce nuestro</span>
            <span>carrusel de personajes</span>
          </label>
          <img id='left-points' src={design2} alt="puntitos" />
          <section className='container-carrousel'>
            <div className="carousel">
              {characters
                .slice(activeIndex * 3, activeIndex * 3 + 3)
                .map((character, index) => (
                  <div
                    key={index}
                    className={`carrusel-item ${index === 1 ? 'active' : ''}`}
                  >
                    <img src={character.image} alt={character.name} />
                  </div>
                ))}
            </div>
          </section>
          <section className='nombre-section'>
            <label>{characters[activeIndex * 3]?.name.split(' ')[0]}</label>
            <button>Ver más</button>
          </section>
          <img id='rigth-points' src={design2} alt="puntitos" />
        </div>
        <img id='bottom-points' src={design2} alt="puntitos" />
        <div className='info-company'>
          <div>
            <label>Inicio</label>
            <span>¿Quiénes somos?</span>
            <span>¿Qué hacemos?</span>
            <span>¿Cómo lo hacemos?</span>
          </div>
          <div>
            <label>Cursos</label>
            <span>Salesforce fos Success</span>
            <span>Salesforce Analyst</span>
            <span>Salesforce Administrator</span>
            <span>Salesforce Developer</span>
          </div>
          <div>
            <label>El programa</label>
            <span>Características</span>
            <span>Beneficios</span>
            <span>Testimoniales</span>
            <span>Nuestra Alianza</span>
          </div>
          <div>
            <label>Contáctanos</label>
            <span>Formulario de contacto</span>
            <span>Síguenos en todas nuestras redes sociales.</span>
            <section>
              <img src={facebook} alt="" />
              <img src={instagram} alt="" />
            </section>
          </div>
        </div>
        <footer>
          <img src={logoFooter} alt="logo" />
          <label>Emerging Technologies Institute | All Rights Reserved</label>
        </footer>
      </div>
      <div className='movil'>
        <header>
          <img src={logo} alt="" />
          <button>
            <img src={menu} alt="" />
          </button>
        </header>
        <main>
          <div className='bienvenida-movil'>
            <div className='button-play-video'>
              <button onClick={openModalMovil}>
                <img src={iconoPlay} alt="" />
              </button>
            </div>
            <h1>Bienvenido a Lorem Ipsum</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non est sed ante tempus egestas. Aliquam erat volutpat. Quisque commodo nisi vitae sapien fermentum.</p>
            <button id='contac-movil'>Contáctanos</button>
          </div>
          <img src={design} id='design' alt="puntitos" />
          <div className='personajes-movil'>
            <h1>Conoce a nuestros principales personajes</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non est sed ante tempus egestas. Aliquam erat volutpat. Quisque commodo nisi vitae sapien fermentum,</p>
            <section>
              {data?.map((character) => (
                <div
                  key={character.id}
                  onMouseEnter={() => handleMouseEnter(character.id)}
                  onMouseLeave={() => handleMouseLeave(character.id)}
                >
                  <div className={`card ${isFlipped ? 'flipped' : ''}`} onClick={handleClick}>
                    <div className="card-inner">
                      <div className="card-front">
                        <img src={character.image} alt="" />
                        <label>{splitName(character.name)}</label>
                      </div>
                      <div className="card-back">
                        <span>{character.species}</span>
                        <span>{character.status}</span>
                        <span>{character.gender}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </section>
            <button>Contáctanos</button>
          </div>
          <div className='carrusel-movil'>
            <label>
              <span>Conoce nuestro</span>
              <span>carrusel de personajes</span>
            </label>
            <div>
              <Slider {...settings}>
                {characters.map((character, index) => (
                  <div key={index} className='container-imagen-movil'>
                    <img src={character.image} alt={`Imagen ${index}`} />
                  </div>
                ))}
              </Slider>
            </div>
            <section>
              {imagenActual && <p>{imagenActual.name}</p>}
              <button>Ver más</button>
            </section>
          </div>
        </main>
        <footer>
          <div className="accordion">
            {items.map((item, index) => (
              <div key={index} className="accordion-item">
                <button
                  className={`accordion-header ${activeIndex2 === index ? 'active' : ''}`}
                  onClick={() => toggleAccordion(index)}
                >
                  {item.title}
                </button>
                {activeIndex2 === index && (
                  <div className="accordion-content">
                    <span>{item.content}</span>
                    <span>{item.content2}</span>
                    <span>{item.content3}</span>
                    <span>{item.content4}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </footer>
        <div className='footer-movil'>
          <img src={logoFooter} alt="" />
          <p>Emerging Technologies Institute | All Rights Reserved</p>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="YouTube Video Modal"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            zIndex: 1000,
          },
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'transparent',
            border: 'none',
            padding: '0',
            zIndex: 1001,
          },
        }}
      >
        <button
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            zIndex: 1002,
            background: 'white',
            border: 'none',
            padding: '5px 10px',
            cursor: 'pointer',
            backgroundColor: '#25C7D9',
            color: '#fff',
            borderRadius: '16px'
          }}
          onClick={closeModal}
        >
          Cerrar
        </button>
        <YouTube videoId='DlD2sZXR8RI' opts={opts} />
      </Modal>
      <Modal
        isOpen={modalIsOpenMovil}
        onRequestClose={closeModalMovil}
        contentLabel="YouTube Video Modal"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            zIndex: 1000,
          },
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'transparent',
            border: 'none',
            padding: '0',
            zIndex: 1001,
          },
        }}
      >
        <button
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            zIndex: 1002,
            background: 'white',
            border: 'none',
            padding: '5px 10px',
            cursor: 'pointer',
            backgroundColor: '#25C7D9',
            color: '#fff',
            borderRadius: '16px'
          }}
          onClick={closeModalMovil}
        >
          Cerrar
        </button>
        <YouTube videoId='DlD2sZXR8RI' opts={optsMovil} />
      </Modal>
    </>
  );
}



export default App;
