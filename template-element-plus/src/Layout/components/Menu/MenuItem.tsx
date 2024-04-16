import { IRouteRecordRaw } from '@/router/types'
import { ElMenuItem, ElSubMenu } from 'element-plus'
import { resolve } from 'path-browserify'
import { isExternal } from '@/utils/'

const MenuItem = defineComponent({
  name: 'MenuItem',
  props: {
    option: {
      type: Object as PropType<IRouteRecordRaw>,
      required: true,
    },
    isRoot: {// true 表示一级路由 false 表示非一级路由
      type: Boolean,
      default: true
    },
    basePath: String,
    location: String
  },
  setup(props){
    /**
     * 一级路由确定有children，子路由不确定有children
     * 1. 一级路由，设置了"alwaysShow"，有children（1个或0个）渲染：<el-menu-item>
     * 2. 子路由，但是没有children 渲染：<el-menu-item>
     * 3. 一级路由，仅有一个children，但是children还有children 渲染：<el-sub-menu>
     * 4. 其他渲染：<el-sub-menu>
     */
    function isRootRouter(router: IRouteRecordRaw) {
      if(props.isRoot && !router.meta?.alwaysShow){
          if(router.children?.length === 0){
              return true;
          }
          if(router.children?.length === 1){
              if(router.children[0].children?.length){
                  return false;
              }else{
                  return true;
              }
          }
      }
      if(!props.isRoot && !router.children){
          return true;
      }
      return false;
    }
    function getIndex(path: string) {
      if(isExternal(path)){
          return path.replace(/(^\/*)|(\/*$)/g, '');// 去除字符串最前面的'/’
      }
      if(props.isRoot){
          return resolve(props.basePath!)
      }else{
          return resolve(props.basePath!, path)
      }
    }
    const renderNotSubItem = (router: IRouteRecordRaw) => (
      <ElMenuItem
        index={getIndex(router.path)}
        data-index={getIndex(router.path)}
        v-slots={{ 
          'title': () => (<><span>{router.meta?.title}</span></>) 
        }}>
        {router.meta?.icon && (router.meta?.icon as () => VNode)()}
      </ElMenuItem>
    );
    const renderSubItem = (router: IRouteRecordRaw) => (
      <ElSubMenu 
        class="i-menu" popperClass="i-popper-menu" 
        data-url={getIndex(router.path)} 
        index={getIndex(router.path)} 
        v-slots={{ 
          'title': () => (<>
            {router.meta?.icon && (router.meta?.icon as () => VNode)()}
            <span>{router.meta?.title}</span>
          </>)
        }}>
          {
            router.children?.map(child => {
              return <MenuItem key={child.path} option={child} isRoot={false} basePath={getIndex(router.path)} />
            })
          }
      </ElSubMenu>
    );
    return () => {
      let currentRouter = props.option!;// 当前路由
      return isRootRouter(currentRouter) ? renderNotSubItem(currentRouter) : renderSubItem(currentRouter)
    }
  }
})

export default MenuItem