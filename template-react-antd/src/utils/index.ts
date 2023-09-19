export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * @name 拷贝
 * @param {*} origin 原数据
 */
export function clone(origin: any) {
    return JSON.parse(JSON.stringify(origin));
}
/**
 * @name 根据数组每一项的对象里指定的'fieldName'字段，将该数组转换成一维数组
 * @param {object[]} originArray 原数组
 */
export function plainArray<T = any>(originArray: T[], fieldName = 'children') {
    const cloneArray: T[] = clone(originArray);
    let newArray: T[] = [];
    function add(arr: any[]) {
        for (const item of arr) {
            newArray.push(item);
            if(item[fieldName]){// 如果有该字段
                add(item[fieldName]);// 前提是该字段类型也是数组
                delete item[fieldName];
            }else{
                continue;
            }
        }
    }
    add(cloneArray)
    return newArray;
}
/**
 * @name 将一维数组，转换成树形数组，根据对象里的某个字段(parentId)
 */
export function convert(list: any[]) {
    const newList = [];
    const map = list.reduce((pre, cur) => {
        pre[cur.id] = cur;
        return pre;
    }, {})
    for (const item of list) {
        if(item.parentId === '@@/global-layout'){
            newList.push(item);
            continue;
        }
        if(item.parentId in map){
            const parent = map[item.parentId];
            parent.children = parent.children || [];
            parent.children.push(item);
        }
    }
    return newList;
}