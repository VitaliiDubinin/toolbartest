/**
 * Toolpad data provider file.
 * See: https://mui.com/toolpad/concepts/data-providers/
 */

import { createDataProvider } from "@mui/toolpad/server";

// import DATA  from '../../public/movies.json';
// export default createDataProvider({
//   async getRecords({ paginationModel: { start = 0, pageSize=3 } }) {
//     const records = DATA.movies.slice(start, start + pageSize);
//     return { records, totalCount: DATA.movies.length };
//   },
// });

//import { DATA } from './functions2';
import { getStopPointAll } from './functions2';


let DATA = []; 

getStopPointAll().then((data) => {
  DATA = data; 
});

export default createDataProvider({

  async getRecords({ paginationModel: { start = 0, pageSize=3 } }) {
    const records = DATA?.slice(start, start + pageSize);
    return { records, totalCount: DATA?.length };
  },
});



// export default createDataProvider({


//   async getRecords({ paginationModel: { start, pageSize } }) {
//     return {
//       records: [],
//     };
//   },
// });






// export default createDataProvider({
//   async getRecords({ paginationModel: { start = 0, pageSize=3 } }) {
//     const records = DATA?.slice(start, start + pageSize) || [];
//     return { records, totalCount: DATA?.length || null};
//   },
// });

// export default createDataProvider({
//   paginationMode: 'index',
//   async getRecords({ paginationModel: { start = 0, pageSize } }) {
//     const { page, totalCount } = await db.getRecords(start, pageSize);
//     return {
//       records: page,
//       totalCount,
//     };
//   },
// });