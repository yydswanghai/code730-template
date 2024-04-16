import { ElMessage } from "element-plus"
import { statusCodeEnum } from '@/enums/statusCodeEnum'
import { getUserMenu } from '@/api/user'
import { Layout } from '@/router/constant'
import { renderIcon } from '@/utils/'
import * as $icons from '@/icons/'
import { isExternal } from '@/utils/'
import { IRouteRecordRaw } from '@/router/types'
/**
 * 请求接口获取菜单
 */
export async function fetchMenu(){
  try {
      const resp = await getUserMenu();
      if(resp.code === statusCodeEnum.success){
          const routerList = formatRouter(resp.data)
          const routerTree = convert(routerList)
          const routerMap = addSelf(routerTree)
          asyncImportRoute(routerMap);
          return routerMap;
      }else{
          ElMessage.error(resp.msg || '请求获取菜单失败');
          return [];
      }
  } catch (error) {
      ElMessage.error('请求获取菜单发生了错误');
  }
}
/**
* 1. 格式化接口数据
*/
function formatRouter(resData: any[]) {
  return resData.map(item => {
      let icon = null;
      if(item.meta_icon){// 处理icon
          // 如果icons目录下能找到这个icon名的组件就返回，否则返回null
          const iconComponent = renderIcon(($icons as any)[item.meta_icon]);
          if(Boolean(iconComponent)){
              icon = iconComponent;
          }
      }
      const meta = {// 处理meta
          title: item.meta_title,
          icon: icon,
          sort: item.meta_sort,
          hidden: item.meta_hidden,
          keepAlive: item.meta_keep_alive,
          alwaysShow: item.meta_always_show,
          affix: item.meta_affix
      }
      const routerInfo = {
          id: item.id,
          parent_id: item.parent_id,
          path: isExternal(item.path) ? `/${item.path}` : item.path,// 外部链接
          name: item.name,
          permission: item.permission,
          type: item.type,
          meta,
          component: item.component,
          children: []
      }
      return routerInfo;
  })
}
/**
* 2. 将一维数组转换成树形数组
*/
function convert(list: any[]) {
  const newList = []
  const map = list.reduce((pre, cur) => {
      pre[cur.id] = cur
      return pre
  }, {})
  for (const item of list) {
      if(item.parent_id === '-1'){
          newList.push(item)
          continue
      }
      if(item.parent_id in map){
          const parent = map[item.parent_id]
          parent.children = parent.children || []
          parent.children.push(item)
      }
  }
  return newList
}
/**
* 3. 给parent_id为-1并且没有子路由，用于显示自己本身
*/
function addSelf(list: any[]): IRouteRecordRaw[] {
  return list.map(item => {
      if(item.parent_id === '-1' && item.children.length === 0){
          item.children = item.children || []
          item.children.push({
              id: Number(`${item.id}10`),
              parent_id: item.id,
              path: '',
              name: `${item.name}Index`,
              component: `${item.path}/index`,
              permission: item.permission,
              type: item.type,
              meta: item.meta,
          })
      }
      return item;
  })
}
/**
* 4. 查找views中对应的组件文件
*/
const viewsModules: Record<string, any> = import.meta.glob('@/views/menus/**/*.{vue,tsx}', { eager: true });
function asyncImportRoute(routers: IRouteRecordRaw[]) {
  if (!routers) return
  routers.forEach(it => {
      const { component, children } = it;
      if(component){
          if(component === 'LAYOUT'){
              it.component = Layout;
          }else{
              it.component = dynamicImport(viewsModules, component as string);
          }
      }
      children?.length && asyncImportRoute(children)
  })
}
/**
* 4. 动态导入组件
*/
function dynamicImport(viewsModules: Record<string, any>, component: string) {
  const matchKeys = Object.keys(viewsModules).filter(key => {
      // 去除首 '/src/views/menus/' 和尾 '.vue' 字符
      const k = key.replace('/src/views/menus', '').replace('.vue', '');
      return k === component;
  });
  if(matchKeys?.length === 1){
      const matchKey = matchKeys[0];
      return viewsModules[matchKey].default
  }
  if(matchKeys?.length > 1){
      console.warn(
          '请不要创建.vue，和在views/menus文件夹下的相同层次目录中，具有相同文件名的tsx文件。这将导致动态引入失败'
      )
      return;
  }
}

/**
* 将menus里的children空数组删除
*/
export function formatMenus(routes: IRouteRecordRaw[]) {
  for (const item of routes) {
      if(item.children){
          if(item.children.length === 0){
              delete item.children
              continue
          }
          if(item.children.length > 0){
              formatMenus(item.children)
          }
      }
  }
  return routes
}