import type { NextApiRequest, NextApiResponse } from 'next'

import httpProxyMiddleware from 'next-http-proxy-middleware'

import { ENV } from '@/constants/env'

export const config = {
  api: {
    // Enable `externalResolver` option in Next.js
    externalResolver: true,
    bodyParser: false,
  },
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const proxyOptions = [
    {
      target: ENV.API_URL,
      pathRewrite: [
        {
          patternStr: `^/api`,
          replaceStr: '',
        },
      ],
    },
  ]

  const proxyOption = proxyOptions.find(({ pathRewrite }) => {
    return pathRewrite.some(({ patternStr }) => RegExp(patternStr).test(req?.url))
  })

  if (proxyOption) {
    return httpProxyMiddleware(req, res, proxyOption)
  } else {
    return res.status(404).send(null)
  }
}

export default handler
