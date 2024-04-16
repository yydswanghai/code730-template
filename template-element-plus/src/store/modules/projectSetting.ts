import settings from '@/settings/project'
import { IProject } from '@/settings/types'
import styles from '@/styles/var.module.scss'

/**
 * 系统设置
 */
export const useProjectSettingStore = defineStore('project-setting' , () => {
    const state = reactive<IProject>({
        ...settings
    });
    function setDark(value: boolean){
        state.themeSetting.isDark = value;
        _autoTheme(value);
    }
    // 设置手机端
    function setIsMobile(value: boolean){
        state.isMobile = value;
    }
    // 设置系统主题
    function setAppTheme(value: string){
        state.themeSetting.primary = value;
    }
    // 切换菜单折叠
    function toggleCollapse(){
        state.collapsed = !state.collapsed;
    }
    function setCollapse(value: boolean){
        state.collapsed = value;
    }
    function _autoTheme(isDark: boolean) {
        const { whiteTheme, blackTheme } = styles;
        if (isDark) {
            state.headerSetting.bg = blackTheme;
            state.headerSetting.color = whiteTheme;
            state.menuSetting.bg = blackTheme;
            state.menuSetting.color = whiteTheme;
        } else {
            state.headerSetting.bg = whiteTheme;
            state.headerSetting.color = blackTheme;
            state.menuSetting.bg = whiteTheme;
            state.menuSetting.color = blackTheme;
        }
    }
    function setAnimateType(type: string) {
        state.animateSetting.type = type;
    }
    return {
        ...toRefs(state),
        setDark,
        setIsMobile,
        setAppTheme,
        toggleCollapse,
        setCollapse,
        setAnimateType
    }
})