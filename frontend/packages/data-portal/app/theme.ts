import { makeThemeOptions, SDSLightAppTheme, SDSDarkAppTheme } from '@czi-sds/components'
import { createTheme } from '@mui/material/styles'

const appTheme = makeThemeOptions(SDSLightAppTheme, 'light')

export const theme = createTheme(appTheme)

export const getAppTheme = (mode: 'light' | 'dark') => {
    const baseTheme = mode === 'dark' ? SDSDarkAppTheme : SDSLightAppTheme
    const themeOptions = makeThemeOptions(baseTheme, mode)
    return createTheme(themeOptions)
}