import './Details.css'
import { Image } from 'react-bootstrap'
export function Details ({ imagen, inicio, fin, usuario }) {
  const image = imagen
  return (
    <div className='containerDetails'>
      <div className='containerImage'>
        <Image src={image} roundedCircle />
      </div>
      <div className='franja'></div>
      <div className='scheduleContainer'>
        <h1 className='scheduleTitle'>Inicia</h1>
        <div className='hour'>
          <h3>{inicio}</h3>
        </div>
        <h1 className='scheduleTitle'>Termina</h1>
        <div className='hour'>
          <h3> {fin} </h3>
        </div>
        <div className='scheduleTitle'>
          <p> {usuario} </p>
        </div>
      </div>
    </div>
  )
}
