'use client'

import { redirect } from 'next/navigation'
import type { FC } from 'react'

interface INotFoundProps {}

const NotFound: FC<INotFoundProps> = () => {
  return redirect('/')
}

export default NotFound
