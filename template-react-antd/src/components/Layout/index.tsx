import React, { useState, useEffect } from 'react'
import IProvider, { config } from './Provider'
import './index.less'
import { Layout, theme, Button, Menu, Breadcrumb, Dropdown } from 'antd'
import type { MenuProps } from 'antd'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import { Link, useLocation, history } from 'umi'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import "animate.css"
import type { TagItem } from '@/models/tagsView'
import { clone } from '@/utils/index'

export type MenuOptions = {
    label: React.ReactNode
    key: React.Key
    icon?: React.ReactNode
    children?: MenuItem[]
    type?: 'group'
}
export type MenuItem = Required<MenuProps>['items'][number];

export interface  ILayoutProps {
    children: React.ReactNode
    menus: MenuItem[]
    tagsList: TagItem[]
    BreadList: TagItem[]
    onDelTags: (arg: string) => void
    onDelOther: (arg: string) => void
    onDelAll: () => void
}

const { Sider, Header, Content } = Layout;

const ILayout: React.FC<ILayoutProps> = (props) => {
    const location = useLocation();
    const token = theme.getDesignToken(config);
    const [, forceUpdate] = useState({});
    const [collapsed, setCollapsed] = useState(false);
    const [defaultKeys, setDefaultKeys] = useState<{
        openkeys: string[]
        selectKey: string[]
    }>({
        openkeys: [],
        selectKey: []
    });

    useEffect(() => {
        let len = props.BreadList.length;
        const openkeys = props.BreadList.slice(0, len -1).map(it => it.key);
        const selectKey = props.BreadList.slice(len -1).map(it => it.key);
        setDefaultKeys({
            openkeys,
            selectKey
        })
    }, [props.BreadList])

    useEffect(() => {
        console.log(props.tagsList, location.pathname)
        const list = clone(props.tagsList);
        const len = list.length;
        if(len >= 1){// 其他=0的情况在仓库处理
            let path = list.pop().to;
            if(location.pathname !== path){
                history.replace({ pathname: path });
            }
        }
    },[props.tagsList])

    const contextMenus = [
        { key: '1', label: '刷新当前'},
        { key: '2', label: '关闭当前'},
        { key: '3', label: '关闭其他'},
        { key: '4', label: '关闭全部'}
    ]
    let currentCtxItem: any;
    const onClick: MenuProps['onClick'] = ({ key }) => {
        switch (key) {
            case '1':
                forceUpdate({});
                return;
            case '2':
                props.onDelTags && props.onDelTags(currentCtxItem.key);
                return;
            case '3':
                props.onDelOther && props.onDelOther(currentCtxItem.key);
                return;
            case '4':
                props.onDelAll && props.onDelAll();
                return;
            default:
                return;
        }
    }
    const tags = props.tagsList.map(it => {
        return <Dropdown key={it.key} destroyPopupOnHide trigger={['contextMenu']}
            menu={{items: contextMenus, onClick}}>
            <div>
                <Button className='tag-item'
                        type={location.pathname === it.to ? 'primary' : 'default'}
                        onContextMenu={e => {
                            e.preventDefault();
                            currentCtxItem = it;
                        }}
                        >
                    <Link to={it.to}>{it.name}</Link>
                </Button>
            </div>
        </Dropdown>
    })

    return <IProvider>
        <Layout className='layout' hasSider>
            <Sider trigger={null} collapsible collapsed={collapsed} style={{
                background: token.colorBgContainer
            }}>
                <div className='silde-title' style={{
                    background: token.colorPrimary
                }}>
                    {collapsed ? 'title' : 'slide-title'}
                </div>
                <div className='silde-content'>
                    <Menu
                        mode='inline'
                        defaultOpenKeys={defaultKeys.openkeys}
                        selectedKeys={defaultKeys.selectKey}
                        items={props.menus}
                    />
                </div>
            </Sider>
            <Layout>
                <Header className='layout-header' style={{
                    background: token.colorBgContainer
                }}>
                    <Button
                        type='text'
                        icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/> }
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64
                        }}
                    />
                    <Breadcrumb className="breadcrumb" items={props.BreadList.map(it => ({
                        title: it.to ? (<Link to={it.to} key={it.key}>{it.name}</Link>) : (<span key={it.key}>{it.name}</span>)
                    }))} />
                </Header>
                <div className='tag-view-container'>
                    {tags}
                </div>
                <Content className='layout-content'>
                    <TransitionGroup component={null}>
                        <CSSTransition timeout={500} key={location.key} classNames={{
                            exit: 'animate__bounceInRight',
                            enter: 'animate__fadeOut'
                            }} unmountOnExit>
                            <div className="layout-animate animate__animated animate__fast">
                                {props.children}
                            </div>
                        </CSSTransition>
                    </TransitionGroup>
                </Content>
            </Layout>
        </Layout>
    </IProvider>
}

export default ILayout