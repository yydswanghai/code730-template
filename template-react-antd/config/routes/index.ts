import login from './login'
import personal from './personal'
import nest from './nest'
import { IRoute } from './types'

const index: IRoute = {
    path: "/",
    component: "./dashboard",
    name: '控制台',
    icon: 'local:dashboard',
    menuCode: '*'
}
const notFound: IRoute = {
    path: '/*',
    component: './404',
    name: 'notFound',
    layout: false
}

const routes: IRoute[] = [
    index,
    ...login,
    ...personal,
    ...nest,
    notFound
]

export default routes