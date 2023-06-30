import { useState, useContext } from "react";
import peticionContext from "../utilities/contextPeticion.js";
import { Button, Form, FormControl, Navbar } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import pantera from "../imgs/pantera.png";
import "./BarraNavegacion.scss";
import { peticionHorarios } from "../api/api.js";

export function BarraNavegacion() {
  const [numeroLaboratorio, setNumeroLaboratorio] = useState("");
  const { horarios, setHorarios } = useContext(peticionContext);
  const handleNumberChange = (e) => {
    e.preventDefault();
    const regex = /^[0-9\b]+$/;
    if (regex.test(e.target.value)) {
      setNumeroLaboratorio(e.target.value);
    } else {
      setNumeroLaboratorio("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  };

  const handleButtonClick = (e) => {
    e.preventDefault();
    peticionHorarios(numeroLaboratorio)
      .then((response) => {
        if (Object.keys(response.data).length !== 0) {
          setHorarios(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Navbar className="nav_container" variant="dark" expand="sm">
      <Container fluid>
        <Navbar.Brand>
          <div className="brand-container">
            <img
              src={pantera}
              width="50"
              className="d-inline-block align-left"
              alt=""
            />
            <h3 className="text-lab">Centro de Cómputo</h3>
          </div>
        </Navbar.Brand>
        {horarios && horarios.length > 0 ? (
          <div className="input-button-container">
            <h3 className="text-lab">Laboratorio {numeroLaboratorio}</h3>
          </div>
        ) : (
          <div className="input-button-container">
            <Form inline={"true"}>
              <FormControl
                type="text"
                placeholder="Número de laboratorio"
                value={numeroLaboratorio}
                onChange={handleNumberChange}
                onKeyDown={handleKeyPress}
                className="size-input"
              />
            </Form>
            <Button
              variant="success"
              onClick={handleButtonClick}
              className="ml-2"
              disabled={!numeroLaboratorio}
            >
              Ingresar
            </Button>
          </div>
        )}
      </Container>
    </Navbar>
  );
}
