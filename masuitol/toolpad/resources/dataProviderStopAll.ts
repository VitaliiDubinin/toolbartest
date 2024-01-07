import { createDataProvider } from "@mui/toolpad/server";
import { getStopAll, updateStop, deleteStop } from './functions2';
import axios from "axios";
//import { getStopAll } from './functions2';

// let DATA = []; 
// getStopAll().then((data) => {
//   DATA = data; 
// });

export default createDataProvider({

  // async getRecords({ paginationModel: { start = 0, pageSize = 3 } }) {
  //   console.log(DATA);
  //   const records = DATA?.slice(start, start + pageSize);
  //   return { records, totalCount: DATA?.length };
  // },
  

   async getRecords({ paginationModel: { start = 0, pageSize=10 } }) {
       
      const response = await axios.get('http://localhost:4995/api/stop/find-all',{
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
    }));
 const totalCount = records.length;

    return { records, totalCount };
  },



  async updateRecord(id, data) {
    const stopupdres = await updateStop(id,data)
 //     console.log("test")

     //return console.log( {id , data });
     return stopupdres
  },

  async deleteRecord(id) {
    console.log("id to delete",id)
    // await db.query(`DELETE FROM users WHERE id = ?`, [id]);
     const stopdeldres = await deleteStop(id)
    //console.log("id to delete",id)
  },

});
