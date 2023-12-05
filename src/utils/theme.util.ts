/**
 * 主题切换
 *
 * @author zys
 * @since 2022/9/19 20:17
 */
export class ThemeUtil {
    static darkTheme = 'rgb(51, 50, 50)';
    static lightTheme = '#FFF';
    static lightBorderTheme = 'lightblue';

    private static getThemeMap(isLight: boolean) {
        return {
            'theme-bg': isLight ? ThemeUtil.lightTheme : ThemeUtil.darkTheme,
            'theme-color': isLight ? ThemeUtil.darkTheme : ThemeUtil.lightTheme,
            'theme-boder-color': isLight ? ThemeUtil.lightBorderTheme : ThemeUtil.lightTheme,
        }
    }

    static setTheme(isLight: boolean) {
        const themeMap = ThemeUtil.getThemeMap(isLight)
        const body = document.body
        /* 实现方式一 */
        Object.keys(themeMap).forEach(key => {
            // @ts-ignore
            body.style.setProperty(`--${key}`, themeMap[key])
        })

        /* 实现方式二 */
        // body.style.setProperty('data-theme', isLight ? 'light' : 'dark')
    }
}
