// MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import CardInputSearch from '@/components/card-statistics/CardInputSearch'
import CardRoleList from '@/components/card-statistics/CardRoleList'
import { getProfileData } from '@/app/server/actions'

const MOCKUP_CARD_LENGTH = 6
const Roles = async () => {
  const data = await getProfileData()
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h4' className='mbe-1'>
          Roles List
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <CardInputSearch />
      </Grid>
      {Array.from({ length: MOCKUP_CARD_LENGTH }).map((_, index) => (
        <Grid item xs={12} md={4} key={index}>
          <CardRoleList data={data?.users?.teams} />
        </Grid>
      ))}
    </Grid>
  )
}

export default Roles
