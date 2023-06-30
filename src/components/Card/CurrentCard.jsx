import './CurrentCard.css'
export const CurrentCard = ({ imagen, materia, docente, inicio, fin, ocupado }) => {
  return (
    <div className='currentProperties container-fluid fondo'>
      <div className='image-container'>
        {ocupado ? <img className='image border-red container-fluid' src={imagen} alt='Perfil docente'/> : <img className='image border-green container-fluid' src={imagen} alt='Perfil docente'/>}
      </div>
      <div className='titulo fondo-titulo'>
        <p>{docente}</p>
      </div>
      <div className='titulo fondo-titulo'>
        <p>{materia}</p>
      </div>
      <div className='titulo fondo-titulo'>
        <p>{inicio} - {fin}</p>
      </div>
    </div>
  )
}
