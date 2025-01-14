// Data Imports
import { Grid } from '@mui/material';

import { getData } from '@/app/server/masterStatusActions'
import StatusListTable from './views/StatusTableList';


const getRcData = async () => {
  return await getData()
}

const Page = async () => {
  const tableData = await getRcData()

  return <Grid container spacing={6}>
    <Grid item xs={12}>
      <StatusListTable tableData={tableData} />
    </Grid>
  </Grid>
}

export default Page
