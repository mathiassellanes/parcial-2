import { Destination } from '@/types/destination';
import axios from 'axios';

const API_URL = 'http://161.35.143.238:8000/msellanes';

const api = axios.create({
  baseURL: API_URL,
});

export const getAllDestinations = async () => {
  try {
    const response = await api.get('');

    return response.data as Destination[];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getDestinationById = async (id: string) => {
  try {
    const response = await api.get(`/${id}`);

    return response.data;
  } catch (error) {
    console.error(`Error fetching Destination with id ${id}:`, error);
    throw error;
  }
};

export const addDestination = async (Destination: any) => {
  try {
    const response = await api.post('', Destination);

    return response.data;
  } catch (error) {
    console.error('Error adding Destination:', error);
    throw error;
  }
};

export const deleteDestination = async (id: string) => {
  try {
    await api.delete(`/${id}`);
  } catch (error) {
    console.error(`Error deleting Destination with id ${id}:`, error);
    throw error;
  }
};

export const updateDestination = async (id: number, Destination: any) => {
  try {
    const response = await api.put(`/${id}`, Destination);
    return response.data;
  } catch (error) {
    console.error(`Error updating Destination with id ${id}:`, error);
    throw error;
  }
};

export const patchDestination = async (id: string, Destination: any) => {
  try {
    const response = await api.patch(`/${id}`, Destination);
    return response.data;
  } catch (error) {
    console.error(`Error updating Destination with id ${id}:`, error);
    throw error;
  }
};
