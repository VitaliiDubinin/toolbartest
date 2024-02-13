import axios from 'axios';
//export let DATA = [];


export async function getStopPointAll() {
  try {
      const headers = {
        'Content-Type': 'application/json',
      };

      const response = await axios.get('http://localhost:4995/api/stop-point/find-all?api_key=KrtKNkLNGcwKQ56la4jcHwxF',{
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

export async function updateStopPoint(id, data) {
  try {
    const respoint = await axios.get(`http://localhost:4995/api/stop-point/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const item = respoint.data;
    //console.log("item",item)
    //console.log("data",data)



 const persistentKeys = ['description', 'name', 'creator', 'locales','active']; 
    for (const key of persistentKeys) {
      if (data[key] !== undefined) {
        item.persistent[key] = data[key];
        delete data[key];
      }
    }
  
   const pointKeys = ['x', 'y']; 
    for (const key of pointKeys) {
      if (data[key] !== undefined) {
        item.point[key] = data[key];
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

    const response = await axios.put('http://localhost:4995/api/stop-point/edit', requestBody, {
      headers,
    });

  //  console.log('PUT Request Response:', response.data);

    return response.data;
  } catch (error) {
  //  console.error('Error updating stop:', error);
    throw error;
  }
}
 
export async function deleteStopPoint(id) {
  try {
    
    const resdel = await axios.delete(`http://localhost:4995/api/stop-point/${id}?api_key=KrtKNkLNGcwKQ56la4jcHwxF`, {
  headers: {
    'Content-Type': 'application/json',
  },
});




    console.log('DEL Request Response:', resdel.status);

    return resdel;
  } catch (error) {
  //  console.error('Error updating stop:', error);
    throw error;
  }
}


export async function updateStopPointForm(values) {
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

      const response = await axios.put('http://localhost:4995/api/stop-point/edit?api_key=KrtKNkLNGcwKQ56la4jcHwxF', requestBody, {
        headers,
      });

      console.log('PUT Request Response:', response.data);

      return response.data;

  } catch (error) {
    console.error('Error updating stop point:', error);
    throw error;
  }
}


export async function createStopPointForm(values) {
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

      const response = await axios.post('http://localhost:4995/api/stop-point/create?api_key=KrtKNkLNGcwKQ56la4jcHwxF', requestBody, {
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

      const response = await axios.get('http://localhost:4995/api/stop/find-all?api_key=KrtKNkLNGcwKQ56la4jcHwxF',{
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
    const respoint = await axios.get(`http://localhost:4995/api/stop/${id}?api_key=KrtKNkLNGcwKQ56la4jcHwxF`, {
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

    const response = await axios.put('http://localhost:4995/api/stop/edit?api_key=KrtKNkLNGcwKQ56la4jcHwxF', requestBody, {
      headers,
    });

  //  console.log('PUT Request Response:', response.data);

    return response.data;
  } catch (error) {
  //  console.error('Error updating stop:', error);
    throw error;
  }
}

export async function deleteStop(id) {
  try {
    console.log("id to delete",id)
    // const resdel = await axios.delete(`http://localhost:4995/api/stop/${id}`, {
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // });


    const resdel = await axios.delete(`http://localhost:4995/api/stop/${id}?api_key=KrtKNkLNGcwKQ56la4jcHwxF`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });




    console.log('DEL Request Response:', resdel);

    return resdel;
  } catch (error) {
  //  console.error('Error updating stop:', error);
    throw error;
  }
}


export async function updateStopForm(values) {
  try {
 
    const transformedValues = {
      persistent: {
        id: values.ids,
        name: values.names,
        description: values.descr || null,
        creator: values.creator || 100, 
        locales: [],
        active: true,
      },
      number: values.number || 999,
      abbreviation: values.abbr,
      address: values.address,
      depot:values.depot || true,
    };



    const requestBody = JSON.stringify(transformedValues);
    
    console.log("stop requestBODY",requestBody);

      const headers = {
        'Content-Type': 'application/json',
      };

      const response = await axios.put('http://localhost:4995/api/stop/edit?api_key=KrtKNkLNGcwKQ56la4jcHwxF', requestBody, {
        headers,
      });

      console.log('PUT Request Response:', response.data);

      return response.data;

  } catch (error) {
    console.error('Error updating stop point:', error);
    throw error;
  }
}


export async function createStopForm(values) {
  try {
 
    const transformedValues = {
      persistent: {
        id: values.ids,
        name: values.names,
        description: values.descr || null,
        creator: values.creator || 100, 
        locales: [],
        active: true,
      },
      number: values.number || 999,
      abbreviation: values.abbr,
      address: values.address,
      depot:values.depot || true,
    };
      const requestBody = JSON.stringify(transformedValues);

      const headers = {
        'Content-Type': 'application/json',
      };

      const response = await axios.post('http://localhost:4995/api/stop/create?api_key=KrtKNkLNGcwKQ56la4jcHwxF', requestBody, {
        headers,
      });

      console.log('POST Request Response:', response.data);

      return response.data;

  } catch (error) {
    console.error('Error updating stop point:', error);
    throw error;
  }
}