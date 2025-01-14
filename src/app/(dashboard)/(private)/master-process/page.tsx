// Data Imports
import { Grid } from '@mui/material';

import { getData } from '@/app/server/masterProcessActions'
import ProcessListTable from './views/ProcessTableList';


const getTableData = async () => {
  return await getData()
}

const Page = async () => {
  const tableData = await getTableData()

  return <Grid container spacing={6}>
    <Grid item xs={12}>
      <ProcessListTable tableData={tableData} />
    </Grid>
  </Grid>
}

export default Page
