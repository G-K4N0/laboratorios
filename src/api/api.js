 import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

export const peticionHorarios = async (id) => {
  let response
  try {
    response = await axios.get(`${apiUrl}/horarios/dias/${id}/labs`);
  } catch (error) {
   response = error
  }

  return response
};

export const peticionAvisos = async () => {
  let response
  try {
    response = await axios.get(`${apiUrl}/avisos`)
    } catch (error) {
   response = error
  }
  
  return response
}