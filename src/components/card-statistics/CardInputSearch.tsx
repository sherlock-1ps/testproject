'use client'
import * as React from 'react'

import { useEffect, useState } from 'react'

import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

import type { TextFieldProps } from '@mui/material/TextField'

import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'

import Button from '@mui/material/Button'

import Grid from '@mui/material/Grid'

import CardHeader from '@mui/material/CardHeader'

import CustomTextField from '@/@core/components/mui/TextField'

const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounce = 500,
  isIcon,
  ...props
}: {
  value: string | number
  onChange: (value: string | number) => void
  debounce?: number
  isIcon?: boolean
} & Omit<TextFieldProps, 'onChange'>) => {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
  }, [value, debounce, onChange])

  return (
    <CustomTextField
      {...props}
      value={value}
      onChange={e => setValue(e.target.value)}
      InputProps={{
        endAdornment: isIcon ? (
          <InputAdornment position='end'>
            <IconButton onClick={() => {}}>
              <i className='tabler-search' />
            </IconButton>
          </InputAdornment>
        ) : null
      }}
    />
  )
}

export default function CardInputSearch() {
  const [inputSearch, setInputSearch] = useState('')

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant='h6'>Role Name</Typography>
        <Grid container spacing={2} alignItems='center'>
          <Grid item xs={12} sm>
            <DebouncedInput
              value={inputSearch ?? ''}
              onChange={value => setInputSearch(String(value))}
              placeholder='Search Roles'
              className='w-full'
              isIcon={true}
            />
          </Grid>
          <Grid item xs='auto' textAlign='right'>
            <Button variant='contained' startIcon={<i className='tabler-plus' />} className='max-sm:is-full'>
              Create Role
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}
