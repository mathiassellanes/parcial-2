import axios from 'axios';

const API_URL = 'http://localhost:8000/planets';

const api = axios.create({
  baseURL: API_URL,
});

export const getAllPlanets = async () => {
  try {
    const response = await api.get('');

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getPlanetById = async (id: number) => {
  try {
    const response = await api.get(`/${id}`);

    return response.data;
  } catch (error) {
    console.error(`Error fetching planet with id ${id}:`, error);
    throw error;
  }
};

export const addPlanet = async (planet: any) => {
  try {
    const response = await api.post('', planet);

    return response.data;
  } catch (error) {
    console.error('Error adding planet:', error);
    throw error;
  }
};

export const deletePlanet = async (id: number) => {
  try {
    await api.delete(`/${id}`);
  } catch (error) {
    console.error(`Error deleting planet with id ${id}:`, error);
    throw error;
  }
};

export const updatePlanet = async (id: number, planet: any) => {
  try {
    const response = await api.put(`/${id}`, planet);
    return response.data;
  } catch (error) {
    console.error(`Error updating planet with id ${id}:`, error);
    throw error;
  }
};
