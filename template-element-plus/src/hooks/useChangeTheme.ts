import { lighten } from '@/utils/'
/**
 * 修改主题变量
 */
export function useChangeTheme(color: string = '#D53C49') {

    const el = document.documentElement;
    el.style.setProperty('--el-color-primary', color);
    el.style.setProperty('--el-color-primary-light-1', lighten(color, 6.5));
    el.style.setProperty('--el-color-primary-light-2', lighten(color, 12.8));
    el.style.setProperty('--el-color-primary-light-3', lighten(color, 19));
    el.style.setProperty('--el-color-primary-light-4', lighten(color, 25.2));
    el.style.setProperty('--el-color-primary-light-5', lighten(color, 31.5));
    el.style.setProperty('--el-color-primary-light-6', lighten(color, 38));
    el.style.setProperty('--el-color-primary-light-7', lighten(color, 44));
    el.style.setProperty('--el-color-primary-light-8', lighten(color, 50.5));
    el.style.setProperty('--el-color-primary-light-9', lighten(color, 56.5));
    el.style.setProperty('--el-color-primary-dark-2', lighten(color, -20));
    el.style.setProperty('--el-color-primary-darken-1', lighten(color, -10));
}