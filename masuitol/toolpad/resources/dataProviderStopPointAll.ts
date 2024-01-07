
import { createDataProvider } from "@mui/toolpad/server";
import axios from "axios";


// import DATA  from '../../public/movies.json';
// export default createDataProvider({
//   async getRecords({ paginationModel: { start = 0, pageSize=3 } }) {
//     const records = DATA.movies.slice(start, start + pageSize);
//     return { records, totalCount: DATA.movies.length };
//   },
// });

//import { DATA } from './functions2';
import { getStopPointAll, deleteStopPoint } from './functions2';


let DATA = []; 

getStopPointAll().then((data) => {
  DATA = data; 
});

// import { getStopPointAll, updateStop } from './functions2';
import {  updateStopPoint } from './functions2';

export default createDataProvider({

  async getRecords({ paginationModel: { start = 0, pageSize=3 } }) {
    // const records = DATA?.slice(start, start + pageSize);
    // return { records, totalCount: DATA?.length };

          const response = await axios.get('http://localhost:4995/api/stop-point/find-all',{
        headers: {
          'Content-Type': 'application/json',
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



