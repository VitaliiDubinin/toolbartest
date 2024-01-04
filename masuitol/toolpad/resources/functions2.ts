

import axios from 'axios';
export let DATA = [];


export async function getStopPoint() {
  try {
      const headers = {
        'Content-Type': 'application/json',
      };

      const response = await axios.get('http://localhost:4995/api/stop-point/find-all',{
        headers,
      });

      console.log('GET Request Response:', response.data);
DATA=response.data
      return DATA;

  } catch (error) {
    console.error('Error getting stop point:', error);
    throw error;
  }
}






  

export async function updateStopPoint(values) {
  try {
 
    const transformedValues = {
      persistent: {
        id: values.idsp,
        name: values.namesp,
        description: values.descrsp || null,
        creator: values.creator || 100, 
        locales: [],
        active: true,
      },
      number: values.idsp,
      point: {
        x: values.xlat,
        y: values.xlong,
      },
      stopId: values.refstopid || null,
    };



      const requestBody = JSON.stringify(transformedValues);

      const headers = {
        'Content-Type': 'application/json',
      };

      const response = await axios.put('http://localhost:4995/api/stop-point/edit', requestBody, {
        headers,
      });

      console.log('PUT Request Response:', response.data);

      return response.data;

  } catch (error) {
    console.error('Error updating stop point:', error);
    throw error;
  }
}



export async function createStopPoint(values) {
  try {
 
    const transformedValues = {
      persistent: {
      //  id: values.idsp,
             id: null,
        name: values.namesp,
        description: values.descrsp || null,
        creator: values.creator || 100, 
        locales: [],
        active: true,
      },
      number: values.idsp,
      point: {
        x: values.xlat,
        y: values.xlong,
      },
    //  stopId: values.refstopid || null,
    };






      const requestBody = JSON.stringify(transformedValues);

      const headers = {
        'Content-Type': 'application/json',
      };

      const response = await axios.post('http://localhost:4995/api/stop-point/create', requestBody, {
        headers,
      });

      console.log('POST Request Response:', response.data);

      return response.data;

  } catch (error) {
    console.error('Error updating stop point:', error);
    throw error;
  }
}