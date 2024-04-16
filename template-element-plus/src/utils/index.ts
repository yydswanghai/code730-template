import { h } from 'vue'
import { ElIcon } from 'element-plus'
/**
 * render 图标
 * */
export function renderIcon(icon: any) {
    return () => h(ElIcon, null, { default: () => h(icon) });
}
/**
 * 是否为外部链接
 */
export function isExternal(path: string) {
    return /http(s)?:/.test(path);
}
/**
 * 获取assets目录静态资源
 */
export function getAssetsFile(url: string = '') {
    return new URL(`../assets/${url}`, import.meta.url).href
}
/**
 * 延迟加载
 */
export function delay(duration: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(true);
        }, duration);
    })
}
/**
 * 颜色辅助函数1
 */
function addLight(color: string, amount: number) {
    const cc = parseInt(color, 16) + amount;// 转16进制
    const c = cc > 255 ? 255 : cc;
    return c.toString(16).length > 1 ? c.toString(16) : `0${c.toString(16)}`;
}
/**
 * 颜色辅助函数2
 */
export function lighten(color: string, amount: number) {
    color = color.includes('#') ? color.substring(1, color.length) : color;// 去除#
    amount = Math.trunc((255 * amount) / 100);
    return `#${addLight(color.substring(0, 2), amount)}${addLight(color.substring(2, 4),amount)}${addLight(color.substring(4, 6), amount)}`
}
/**
 * 生成随机id
 */
export function randomId(length = 12) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let randomId = '';
    for (let i = 0; i < length; i++) {
        randomId += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return randomId;
}
/**
 * 深度克隆对象
 */
export function cloneDeep(obj: Record<string, any>) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    // 创建一个新的对象或数组
    const newObj: Record<string, any> = Array.isArray(obj) ? [] : {};
    // 遍历原始对象的属性或元素，并进行递归克隆
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = cloneDeep(obj[key]);
        }
    }
    return newObj;
}