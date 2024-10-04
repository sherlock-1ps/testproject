import Color from 'color'

/**
 * Get rgba string color
 * @param color string
 * @param alpha number
 * @returns string
 */
export const rgba = (color: string, alpha: number): string => {
  return Color(color).alpha(alpha).toString()
}
