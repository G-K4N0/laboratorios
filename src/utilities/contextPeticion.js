import { createContext, useState } from 'react'

const PeticionContext = createContext({})

export const PeticionProvider = ({ children }) => {
  const [horarios, setHorarios] = useState([])

  return (
    <PeticionContext.Provider value={{ horarios, setHorarios }}>
    {children}
    </PeticionContext.Provider>
  )
}

export default PeticionContext
