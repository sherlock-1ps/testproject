import { z } from 'zod'

/**
 * Base for use inside rule of component `Form`
 */
export const zodParseAsync = async (schema: z.Schema, value: any) => {
  try {
    await schema.parseAsync(value)
  } catch (err) {
    if (err instanceof z.ZodError) {
      throw new Error(err.issues[0].message)
    }
  }
}
