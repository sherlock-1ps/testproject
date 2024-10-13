import { Card, CardContent, Grid, Typography } from '@mui/material'

import CustomAvatar from '@core/components/mui/Avatar'
import OptionMenu from '@/@core/components/option-menu'

const CardRoleList = () => {
  return (
    <Card>
      <CardContent className='flex flex-col gap-4'>
        <Grid container alignItems={'center'}>
          {/* Grid Item */}
          <Grid item xs={'auto'}>
            <CustomAvatar color={'primary'} variant='rounded' size={60} skin='light'>
              <i className='tabler-search' />
            </CustomAvatar>
          </Grid>

          {/* Grid Item - Typography will take the remaining width */}
          <Grid item xs>
            <Typography variant='h6' textAlign={'center'}>
              Administrator
            </Typography>
          </Grid>

          {/* Grid Item */}
          <Grid item xs={'auto'}>
            <OptionMenu options={['Edit Role Profile', 'Manage Assistant', 'Delete']} />
          </Grid>
        </Grid>

        {/* Additional Typography content within Grid */}
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography variant='body2'>
              Managing and maintaining the underlying infrastructure and operations of the website.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant='body2'>
              Managing and maintaining the underlying infrastructure and operations of the website.
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default CardRoleList
