/* eslint-disable react-hooks/exhaustive-deps */
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import { BarraNavegacion } from "./components/Navbar";
import { Card } from "./components/Card/Card";
import { Slides } from "./components/Slide/Slides";
import { CurrentCard } from "./components/Card/CurrentCard";
import { peticionAvisos } from "./api/api.js";
import { useState, useEffect, useContext } from "react";
import peticionContext from "./utilities/contextPeticion.js";
import {
  convertStringToTime,
  deleteElementTimePass,
} from "./utilities/convertStringToTime";

function App() {
  const [time, setTime] = useState("");
  const [avisos, setAvisos] = useState([]);
  const { horarios } = useContext(peticionContext);
  const [horarioFiltrado, setHorarioFiltrado] = useState([]);
  const [horarioSiguiente, setHorarioSiguiente] = useState([]);
  useEffect(() => {
    const interval = setInterval(() => {
      const hora = new Date();
      setTime(hora.toLocaleTimeString("es-MX"));
    }, 10000);
    return () => clearInterval(interval);
  }, []);


  const filtrarHorario = () => {
    if (Object.keys(horarios).length !== 0) {
      const filter = horarios.filter((horario) => {
        return (
          time > convertStringToTime(horario.inicia) &&
          time < convertStringToTime(horario.finaliza)
        );
      });
      setHorarioFiltrado(filter);
    }
  };

  const horaSiguiente = () => {
    if (Object.keys(horarios).length !== 0) {
      setHorarioSiguiente(deleteElementTimePass(horarios));
    }
  };

  useEffect(() => {
    filtrarHorario();
    horaSiguiente();
  }, [time]);

  useEffect(() => {
    peticionAvisos()
      .then((response) => {
        if (Object.keys(response.data).length !== 0) {
          setAvisos(response.data);
        }
      })
      .catch((error) => {});
  }, []);


  console.log(horarioSiguiente)
  return (
    <div className="App">
      <BarraNavegacion />
      <div className="containerInicio">
        <div className="news">
          <div className="cards">
          {horarioSiguiente !== null && horarioSiguiente.length > 0 ? (
            <div className="cards-disposicion">
              {horarioSiguiente.map((horaNext,index) =>(
                   <Card
                   key={index}
                   laboratorio={horaNext.laboratorio}
                   materia={horaNext.materia}
                   inicio={horaNext.inicia}
                   fin={horaNext.finaliza}
                   status={horaNext.ocupado}
                   imagen={horaNext.image.url}
                   carrera={horaNext.carrera}
                   usuario={horaNext.docente}
                   />
              ))}
            </div>
          ) : (
            <div className="sinHorarioSiguiente">
              <span>No hay mas horarios asignados</span>
            </div>
          )}
          </div>

          <div className="aviso">
            <Slides data={avisos} />
          </div>
        </div>
        <div className="card">
          {horarioFiltrado !== null && horarioFiltrado.length > 0 ? (
            <CurrentCard
              materia={horarioFiltrado[0].materia}
              docente={horarioFiltrado[0].docente}
              inicio={horarioFiltrado[0].inicia}
              fin={horarioFiltrado[0].finaliza}
              imagen={horarioFiltrado[0].image.url}
            />
          ) : (
            <div className="sinHorarioActual"><span>No hay horario asignado</span></div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
