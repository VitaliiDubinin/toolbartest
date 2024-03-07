import { createDataProvider } from '@mui/toolpad-core/server';
import axios from "axios";
import { getStopPointAll, updateStopPoint, deleteStopPoint } from './functions2';
const apiKey = process.env.API_KEY


// let DATA = []; 

// getStopPointAll().then((data) => {
//   DATA = data; 
// });


export default createDataProvider({
  
  async getRecords({sid=6, paginationModel: { start = 0, pageSize=3 } }) {
    console.log("sid",sid)


          // const response = await axios.get('http://localhost:4995/api/stop-point/find-all?api_key=KrtKNkLNGcwKQ56la4jcHwxF',{
   //       const response = await axios.get(`http://localhost:4995/api/stop/fetch-stop-points/5?api_key=KrtKNkLNGcwKQ56la4jcHwxF`,{
          const response = await axios.get(`http://localhost:4995/api/stop/fetch-stop-points/${sid}`,{
        headers: {
          'Content-Type': 'application/json',
          'api_key': apiKey,
         }
      });
  
        const records = response.data.map((item) => ({
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
          x: item.point.x,
          y:item.point.y,
    }));
 const totalCount = records.length;
console.log("records", records)
console.log("totalCount",totalCount)
    return { records, totalCount };
  },

  // },

  async updateRecord(id, data) {
 //   console.log( {id , data });
    const stopupdres = await updateStopPoint(id,data)
 //     console.log("test")

     //return console.log( {id , data });
     return stopupdres
  },

  async deleteRecord(id) {
 //   console.log("id to delete",id)

     const spdeldres = await deleteStopPoint(id)
    //console.log("id to delete",id)
  },


});



