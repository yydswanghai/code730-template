/**
 * 获取assets目录静态资源
 */
export function getAssetsFile(url: string = '') {
    return new URL(`../assets/${url}`, import.meta.url).href
}