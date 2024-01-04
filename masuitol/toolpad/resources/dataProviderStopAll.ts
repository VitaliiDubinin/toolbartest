/**
 * Toolpad data provider file.
 * See: https://mui.com/toolpad/concepts/data-providers/
 */

import { createDataProvider } from "@mui/toolpad/server";

import { getStopAll } from './functions2';


let DATA = []; 

getStopAll().then((data) => {
  DATA = data; 
});

export default createDataProvider({

  async getRecords({ paginationModel: { start = 0, pageSize=3 } }) {
    const records = DATA?.slice(start, start + pageSize);
    return { records, totalCount: DATA?.length };
  },
});
