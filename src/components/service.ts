import axios from 'axios';
import { Onibus } from '../interfaces/onibus'
const API_URL = 'https://buslive-motorista.onrender.com';

export const getVehicleLocation = async (vehicleId : any) => {
  try {
    const response = await axios.get(`${API_URL}/location/${vehicleId}`);
    return response.data;
  } catch (error) {
    console.log("erro");
  }
};

export const postVehicleLocation = async (vehicleId : any, latitude:number, longitude:number) => {
    try {
        const bus: Onibus = {
            vehicleId: vehicleId,
            latitude: latitude,
            longitude: longitude
          };

      await axios.post(`${API_URL}/location`,bus);
      return "success";
    } catch (error) {
        return "failed";
    }
  };
