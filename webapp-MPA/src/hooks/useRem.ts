/**
 * 移动端rem适配
 */
export default function useRem(designWidth: number = 375, doc: Document = document, win: Window = window) {
    const html = doc.documentElement;
    function refreshRem() {
        const clientWidth = html.clientWidth;
        if(clientWidth >= designWidth){
            html.style.fontSize = '100px';
        }else{
            html.style.fontSize = 100 * (clientWidth / designWidth) + 'px';
        }
    }
    doc.addEventListener('DOMContentLoaded', refreshRem);
}