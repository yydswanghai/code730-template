/* 系统设置 */
export interface IProject {
    isMobile: boolean
    collapsed: boolean
    themeSetting: IThemeSetting
    headerSetting: IHeaderSetting
    tagsViewSetting: ITagsViewSetting
    menuSetting: IMenuSetting
    crumbsSetting: ICrumbsSetting
    animateSetting: IAnimateSetting
}
export interface IThemeSetting {
    primary: string
    isDark: boolean
    colorList: string[]
}
/* 顶栏 */
export interface IHeaderSetting {
    bg: string
    color: string
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
    bg: string
    color: string
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