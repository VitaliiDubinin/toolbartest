

import axios from 'axios';
export let DATA = [];


export async function getStopPointAll() {
  try {
      const headers = {
        'Content-Type': 'application/json',
      };

      const response = await axios.get('http://localhost:4995/api/stop-point/find-all',{
        headers,
      });

      console.log('GET Request Response:', response.data);
    //   DATA=response.data
    // return DATA;
        return response.data.map((item) => ({

        id: item.persistent.id,
        name: item.persistent.name,
        description: item.persistent.description,
        creator: item.persistent.creator,
        locales: item.persistent.locales,
        active: item.persistent.active,
        x: item.point.x,
        y: item.point.y,
        number: item.number,
//        point: item.point,
      
    }));

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


export async function getStopAll() {
  try {
      const headers = {
        'Content-Type': 'application/json',
      };

      const response = await axios.get('http://localhost:4995/api/stop/find-all',{
        headers,
      });

      console.log('GET Request Response:', response.data);
  
        return response.data.map((item) => ({
          number: item.number,
          abbreviation: item.abbreviation,
          address: item.address,
          depot: item.depot,
          id: item.persistent.id,
          name: item.persistent.name,
          description: item.persistent.description,
          creator: item.persistent.creator,
             locales: item.persistent.locales,
          active: item.persistent.active,
        
        
      
    }));

  } catch (error) {
    console.error('Error getting stop point:', error);
    throw error;
  }
}




export async function updateStop(id, data) {
  try {
    const respoint = await axios.get(`http://localhost:4995/api/stop/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const item = respoint.data;
    //console.log("item",item)
    //console.log("data",data)




    // if (data.description !== undefined) {
    //   item.persistent.description = data.description;
    //   delete data.description; 
    // }

 const persistentKeys = ['description', 'name', 'creator', 'locales','active']; 
    for (const key of persistentKeys) {
      if (data[key] !== undefined) {
        item.persistent[key] = data[key];
        delete data[key];
      }
    }



        const updatedItem = {
      ...item,
      ...data,
    };

    const requestBody = JSON.stringify(updatedItem);
  //  console.log("requestBody",requestBody)
    const headers = {
      'Content-Type': 'application/json',
    };

    const response = await axios.put('http://localhost:4995/api/stop/edit', requestBody, {
      headers,
    });

  //  console.log('PUT Request Response:', response.data);

    return response.data;
  } catch (error) {
  //  console.error('Error updating stop:', error);
    throw error;
  }
}