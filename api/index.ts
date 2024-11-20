import axios from 'axios';

const API_URL = 'http://localhost:8000/planets';

export const getAllPlanets = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching planets:', error);
    throw error;
  }
};

export const getPlanetById = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching planet with id ${id}:`, error);
    throw error;
  }
};

export const addPlanet = async (planet: any) => {
  try {
    const response = await axios.post(API_URL, planet);
    return response.data;
  } catch (error) {
    console.error('Error adding planet:', error);
    throw error;
  }
};

export const deletePlanet = async (id: number) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error(`Error deleting planet with id ${id}:`, error);
    throw error;
  }
};

export const updatePlanet = async (id: number, planet: any) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, planet);
    return response.data;
  } catch (error) {
    console.error(`Error updating planet with id ${id}:`, error);
    throw error;
  }
};
