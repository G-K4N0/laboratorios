import React from 'react'
import './Card.scss'
import { Details } from './Details'
export function Card ({
  laboratorio,
  materia,
  inicio,
  fin,
  grupo,
  semestre,
  status,
  imagen,
  carrera,
  usuario
}) {
  const ocupado = (status === 0) ? 'Libre' : 'Ocupado'
  return (
    <div className='container-fluid cardContainer fondo'>
      <div className='nameLab'>
        <h1>{laboratorio}</h1>
      </div>
      <div className='materiaName'>
        <h3>{materia}</h3>
      </div>
      <Details
        inicio={inicio}
        fin={fin}
        grupo={grupo}
        semestre={semestre}
        status={status}
        usuario={usuario}
        imagen={imagen}
      />
      {ocupado === 'Libre'
        ? (
        <div className='desOcupado'>
          <p>{ocupado}</p>
        </div>
          )
        : (
        <div className='ocupado'>
          <p>{ocupado}</p>
        </div>
          )}
      <div className='cardCareer'>
        <p>{carrera}</p>
      </div>
    </div>
  )
}
