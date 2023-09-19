import React, { useEffect } from 'react';
import { Outlet, Link, useAppData, connect, Icon, useLocation } from 'umi'
import Layout, { MenuItem, ILayoutProps } from '@/components/Layout'
import { resolve } from 'path'
import { plainArray } from '@/utils/index'
import type { TagItem } from '@/models/tagsView'
import type { ConnectProps } from 'umi'

interface IProps extends ILayoutProps {
  onAsyncGetMenus: (arg: any[]) => void
  onAddTags: (arg: TagItem) => void
  onChangeBread: (arg: TagItem[]) => void
  setDefaultTag: (arg: TagItem) => void
}

const mapStateToProps = (state: any) => ({
  menus: state.asyncRoute.menus,
  tagsList: state.tagsView.tagsList,
  BreadList: state.tagsView.BreadList
})
const mapDispatchToProps = (dispatch: ConnectProps['dispatch']) => ({
  onAsyncGetMenus(routes: any[]){
    dispatch!({ type: 'asyncRoute/setRoutes', payload: routes })
    dispatch!({ type: 'asyncRoute/generateRoutes' })
  },
  onAddTags(item: TagItem){
    dispatch!({ type: 'tagsView/addTags', payload: item })
  },
  onDelTags(key: TagItem['key']){
    dispatch!({ type: 'tagsView/delTags', payload: key })
  },
  onDelOther(key: TagItem['key']){
    dispatch!({ type: 'tagsView/delOther', payload: key })
  },
  onDelAll(){
    dispatch!({ type: 'tagsView/delAll' })
  },
  onChangeBread(items: TagItem[]){
    dispatch!({ type: 'tagsView/changeBread', payload: items })
  },
  setDefaultTag(item: TagItem){
    dispatch!({ type: 'tagsView/setDefaultTag', payload: item })
  },
})

// todo
let icon = <Icon icon="local:apple" />
/**
 * 获取格式化后的菜单
 * @param {*} menus 仓库里的菜单数据
 * @param {string} basePath 基础路径，用于拼接路由的路径
 */
function getFormatMenus(menus: any[], basePath = ''): MenuItem[] {
  return menus.map(menu => {
    let path = resolve(basePath, menu.path);
    const newMenu: any = {
      label: menu.children ? (<span key={menu.id}>{menu.name}</span>) :(<Link to={path} key={menu.id}>{menu.name}</Link>),
      key: menu.id,
      icon: menu.icon ? (<Icon icon={menu.icon} />) : null
    }
    if(menu.children){
      newMenu.children = getFormatMenus(menu.children, path)
    }
    return newMenu;
  })
}
/**
 * 将菜单格式化为tag数据类型
 */
function getFormatTags(menus: any[], parentKey = null): TagItem[] {
  return menus.map((it) => {
    let menuInfo: any = {
      key: it.key,
      parentKey,
      to: it.label.props.to,
      name: it.label.props.children
    };
    if(it.children){
      menuInfo.children = getFormatTags(it.children, it.key)
    }
    return menuInfo;
  })
}
/**
 * 根据当前路由匹配的菜单，递归获取到它的父级
 */
function getParents(plainTags: any[], current: any) {
  const parents: any[] = [];
  function add(_parent_key: string) {
    const parent = plainTags.find(it => it.key === _parent_key);
    if(parent.parentKey === null){
      parents.push(parent);
    }else{
      add(parent.parentKey);
      parents.push(parent);
    }
  }
  if(current.parentKey === null){
    parents.push(current);
  }else{
    add(current.parentKey);
    parents.push(current);
  }
  return parents;
}

const BasicLayout: React.FC<IProps> = (props) => {
  const appData = useAppData();
  const location = useLocation();
  useEffect(() => {
    props.onAsyncGetMenus && props.onAsyncGetMenus(Object.values(appData.clientRoutes));
  }, [])

  const menus = getFormatMenus(props.menus)

  useEffect(() => {
    if(props.menus.length){
      const tags = getFormatTags(menus);
      const plainTags = plainArray(tags);
      // 设置全部关闭后跳转的tag
      const dashboard = plainTags.find(tag => tag.to === '/');
      props.setDefaultTag(dashboard!);
      const currentRoutMenu = plainTags.find(it => it.to === location.pathname);
      if(currentRoutMenu){
        const pats = getParents(plainTags, currentRoutMenu);
        props.onChangeBread(pats)
        props.onAddTags(currentRoutMenu);
      }
    }
  }, [props.menus, location.pathname])

  console.log('layout')

  return (
    <Layout {...props} menus={menus}>
      <Outlet />
    </Layout>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(BasicLayout);