// MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import CardInputSearch from '@/components/card-statistics/CardInputSearch'
import CardRoleList from '@/components/card-statistics/CardRoleList'

const Roles = () => {
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
      <Grid item xs={12} md={4}>
        <CardRoleList />
      </Grid>
      <Grid item xs={12} md={4}>
        <CardRoleList />
      </Grid>
      <Grid item xs={12} md={4}>
        <CardRoleList />
      </Grid>
      <Grid item xs={12} md={4}>
        <CardRoleList />
      </Grid>
    </Grid>
  )
}

export default Roles
