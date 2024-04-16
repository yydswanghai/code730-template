import { ElMessage } from 'element-plus'
import { authEnum, userEnum } from '@/enums/userEnum'
import { getStorage, setStorage, delStorage } from '@/utils/auth'
import { login as fetchLogin, getUserInfo, logout as fetchLogout } from '@/api/user'
import { useTagsViewStore } from './tagsView'
import { statusCodeEnum } from '@/enums/statusCodeEnum'

type IUserInfo = {
    id?: string
    phone?: string
    username?: string
}

export type IState = {
    user_type: userEnum | undefined
    access_token: string | undefined
    refresh_token: string | undefined
    user_info: IUserInfo | null
    permissions: string[] | null
}

/**
 * 用户状态
 */
export const useUserStore = defineStore('app-user', () => {
    const state = reactive<IState>({
        user_type: getStorage(authEnum.USER_TYPE) as userEnum | undefined,
        access_token: getStorage(authEnum.ACCESS_TOKEN),
        refresh_token: getStorage(authEnum.REFRESH_TOKEN),
        user_info: null,
        permissions: null
    });
    function setAccessToken(token: string | undefined) {
        state.access_token = token;
        if (token) {
            setStorage(authEnum.ACCESS_TOKEN, token);
        } else {
            delStorage(authEnum.ACCESS_TOKEN);
        }
    }
    function setRefreshToken(token: string | undefined) {
        state.refresh_token = token;
        if(token){
            setStorage(authEnum.REFRESH_TOKEN, token);
        }else{
            delStorage(authEnum.REFRESH_TOKEN);
        }
    }
    /* 设置用户类型 */
    function setUserType(type: userEnum) {
        state.user_type = type;
        setStorage(authEnum.USER_TYPE, type);
    }
    /* 设置权限列表 */
    function setPermissions(prem: string[] | null) {
        state.permissions = prem;
    }
    /* 设置用户信息 */
    function setUserInfo(info: object | null) {
        state.user_info = info;
    }
    /* 登录 */
    async function login(params: { loginId: string, loginPwd: string }, type: userEnum) {
        try {
            const resp: any = await fetchLogin(params, type);
            if(resp.code === statusCodeEnum.success){
                const { access_token, refresh_token } = resp.data;
                setAccessToken(access_token);
                setRefreshToken(refresh_token);
                return true;
            }else{
                ElMessage.error(resp.msg || '登录失败');
                return false;
            }
        } catch (error) {
            return Promise.reject(error);
        }
    }
    /* 获取用户信息 */
    async function getInfo() {
        try {
            const resp = await getUserInfo({ type: state.user_type! });
            if(resp.code === statusCodeEnum.success){
                const { info, permissions } = resp.data;
                setUserInfo(info);
                setPermissions(permissions);
                return { info, permissions }
            }else{
                ElMessage.error(resp.msg || '获取用户信息失败');
                return {}
            }
        } catch (error) {
            return Promise.reject(error);
        }
    }
    /* 登出 */
    async function logout() {
        await fetchLogout();
        setAccessToken(undefined);
        setRefreshToken(undefined);
        setUserInfo(null);
        setPermissions(null);
        // 清除tags-views
        const tagsViewStore = useTagsViewStore();
        tagsViewStore.closeAllTags();
        return Promise.resolve(true);
    }
    return {
        ...toRefs(state),
        setUserType,
        login,
        getInfo,
        logout
    }
})