import { Card, CardContent, Grid, Typography, Avatar, AvatarGroup, Tooltip, Button } from '@mui/material'

import CustomAvatar from '@core/components/mui/Avatar'
import OptionMenu from '@/@core/components/option-menu'
import { TeamsTabType } from '@/types/pages/profileTypes'

const CardRoleList = ({ data }: { data?: TeamsTabType[] }) => {
  const mockUpUser = data && data.length > 0 ? data[0] : null

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

        {mockUpUser && (
          <div className='flex items-center justify-between flex-wrap gap-4'>
            <AvatarGroup
              total={mockUpUser.extraMembers ? mockUpUser.extraMembers + 3 : 3}
              max={6}
              sx={{ '& .MuiAvatar-root': { width: '2rem', height: '2rem', fontSize: '1rem' } }}
              className='items-center pull-up'
            >
              {mockUpUser.avatarGroup.map((person, index) => {
                return (
                  <Tooltip key={index} title={person.name}>
                    <Avatar src={person.avatar} alt={person.name} />
                  </Tooltip>
                )
              })}
            </AvatarGroup>
          </div>
        )}
        <Button variant='outlined' color='secondary'>
          Set Permissions
        </Button>
      </CardContent>
    </Card>
  )
}

export default CardRoleList
