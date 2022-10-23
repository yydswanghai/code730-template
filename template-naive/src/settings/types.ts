/* 系统设置 */
export interface IProject {
    navMode: 'vertical' | 'horizontal' | 'horizontal-mix'
    navTheme: 'dark' | 'light' | 'mix-dark'
    isMobile: boolean
    collapsed: boolean
    themeSetting: IThemeSetting
    headerSetting: IHeaderSetting
    tagsViewSetting: ITagsViewSetting
    menuSetting: IMenuSetting
    crumbsSetting: ICrumbsSetting
    animateSetting: IAnimateSetting
}
/* 导航模式 */
export type INavMode = 'vertical' | 'horizontal' | 'horizontal-mix'
/* 导航风格 */
export type INavTheme = 'dark' | 'light' | 'mix-dark'
export interface IThemeSetting {
    primary: string
    success: string
    waring: string
    error: string
    info: string
    isDark: boolean
    colorList: string[]
}
/* 顶栏 */
export interface IHeaderSetting {
    fixed: boolean
    isReload: boolean
}
/* 标签 */
export interface ITagsViewSetting{
    show: boolean
    fixed: boolean
}
/* 菜单 */
export interface IMenuSetting{
    minMenuWidth: number
    menuWidth: number
    fixed: boolean
    mobileWidth: number
}
/* 面包屑 */
export interface ICrumbsSetting{
    show: boolean
    showIcon: boolean
}
export interface IAnimateSetting {
    open: boolean,
    type: string
}