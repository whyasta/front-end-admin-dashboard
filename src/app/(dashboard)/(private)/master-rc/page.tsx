// Data Imports
import { Grid } from '@mui/material'

import { getData } from '@/app/server/masterRcActions'
import RcListTable from './views/RcTableList'

/**
 * ! If you need data using an API call, uncomment the below API code, update the `process.env.API_URL` variable in the
 * ! `.env` file found at root of your project and also update the API endpoints like `/pages/faq` in below example.
 * ! Also, remove the above server action import and the action itself from the `src/app/server/actions.ts` file to clean up unused code
 * ! because we've used the server action for getting our static data.
 */

/* const getFaqData = async () => {
  // Vars
  const res = await fetch(`${process.env.API_URL}/pages/faq`)

  if (!res.ok) {
    throw new Error('Failed to fetch faqData')
  }

  return res.json()
} */

const getRcData = async () => {
  return await getData()
}

const Page = async () => {
  const tableData = await getRcData()

  return <Grid container spacing={6}>
    <Grid item xs={12}>
      <RcListTable tableData={tableData} />
    </Grid>
  </Grid>
}

export default Page
