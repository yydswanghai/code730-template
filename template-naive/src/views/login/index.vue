<template>
    <div class="login-container">
        <div class="content">
            <div class="top">
                <div class="logo">
                    <img src="~@/assets/logo-1.svg?url" alt="" />
                </div>
                <div class="desc">
                    {{ siteTitle }}
                </div>
            </div>
            <div class="form">
                <n-card>
                    <n-tabs
                        class="card-tabs"
                        :default-value="defaultTab"
                        size="large"
                        animated
                        justify-content="space-evenly"
                        style="margin: 0 -4px"
                        pane-style="padding-left: 4px; padding-right: 4px; box-sizing: border-box;"
                        @update:value="handleUpdateTab"
                        >
                        <n-tab-pane v-for="item in tabs" :key="item.id" :name="item.name" :tab="item.tab" />
                    </n-tabs>
                    <n-form
                        ref="formRef"
                        label-placement="left"
                        size="large"
                        :model="formValue"
                        :rules="rules"
                        >
                        <n-form-item path="loginId">
                            <n-input v-model:value="formValue.loginId" placeholder="请输入用户名">
                                <template #prefix>
                                    <n-icon size="18" color="#808695">
                                        <PersonOutline />
                                    </n-icon>
                                </template>
                            </n-input>
                        </n-form-item>
                        <n-form-item path="loginPwd">
                            <n-input v-model:value="formValue.loginPwd" type="password" placeholder="请输入密码" showPasswordOn="click">
                                <template #prefix>
                                    <n-icon size="18" color="#808695">
                                        <LockClosedOutline />
                                    </n-icon>
                                </template>
                            </n-input>
                        </n-form-item>
                        <n-form-item class="default-color" style="display: flex;">
                            <n-checkbox v-model:checked="autoLogin">自动登录</n-checkbox>
                        </n-form-item>
                        <n-form-item class="default-color" style="display: flex;" v-if="defaultTab != userEnum.system">
                            <div style="display: flex;justify-content: space-between;width: 100%;">
                                <a href="javascript:">忘记密码</a>
                                <a href="javascript:">注册</a>
                            </div>
                        </n-form-item>
                        <n-form-item class="default-color">
                            <div class="flex justify-between">
                                <div class="flex-initial">
                                    <span>账号：admin，密码随便填</span>
                                </div>
                            </div>
                        </n-form-item>
                        <n-form-item>
                            <n-button type="primary" @click="handleSubmit" size="large" :loading="loading" block>
                                登录
                            </n-button>
                        </n-form-item>
                    </n-form>
                </n-card>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed } from 'vue'
import { useMessage, FormInst } from 'naive-ui'
import type { MessageReactive } from 'naive-ui'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/store/modules/user'
import { PersonOutline, LockClosedOutline } from '@vicons/ionicons5'
import { userEnum } from '@/enums/userEnum'

export default defineComponent({
    name: 'Login',
    components: {
        PersonOutline,
        LockClosedOutline,
    },
    setup(){
        const $route = useRoute()
        const $router = useRouter()
        const $message = useMessage()
        let messageReactive: MessageReactive | null = null
        const userStore = useUserStore()
        const { VITE_APP_TITLE } = import.meta.env;
        const siteTitle = VITE_APP_TITLE || '';
        const formRef = ref<FormInst | null>(null)
        const formValue = reactive({
            loginId: 'admin',
            loginPwd: '123456',
            isCaptcha: true,
        })
        const rules = {
            loginId: { required: true, message: '请输入用户名', trigger: 'blur' },
            loginPwd: { required: true, message: '请输入密码', trigger: 'blur' },
        }
        const autoLogin = ref(true)// 自动登录
        const loading = ref(false)
        const tabs = [
            { id: '001', name: userEnum.user1, tab: '普通用户' },
            { id: '002', name: userEnum.user2, tab: '组织用户' },
            { id: '003', name: userEnum.system, tab: '后台' }
        ]
        const defaultTab = computed({// 默认选择
            get: () => userStore.user_type,
            set: (val) => userStore.setUserType(val as userEnum)
        })
        if(!defaultTab.value){// 先默认设置为用户类型1，保证只要登录过后，一定有值
            userStore.setUserType(userEnum.user1)
        }
        function handleUpdateTab(tabName: userEnum) {
            defaultTab.value = tabName;
        }
        function handleSubmit(e: MouseEvent) {
            e.preventDefault()
            formRef.value?.validate(async (errors) => {
                if(!errors){
                    const { loginId, loginPwd } = formValue
                    messageReactive = $message.loading('登录中...', { duration: 0 })
                    loading.value = true
                    try {
                        const res = await userStore.login({
                            loginId,
                            loginPwd
                        }, defaultTab.value!)
                        if(res){
                            const path = decodeURIComponent($route.query?.redirect as string || '/');
                            $message.success('登录成功，即将进入系统');
                            $router.replace(path);
                        }
                    } finally {
                        loading.value = false
                        messageReactive.destroy()
                        messageReactive = null
                    }
                }else{
                    $message.warning("请填写完整信息，并且进行验证码校验");
                    console.log(errors);
                }
            })
        }

        return {
            userEnum,
            siteTitle,
            formRef,
            formValue,
            rules,
            autoLogin,
            loading,
            tabs,
            defaultTab,
            handleSubmit,
            handleUpdateTab,
        }
    }
})
</script>

<style lang="scss">
.login-container{
    .n-form-item-blank{
        width: 100%;
    }
}
</style>
<style lang="scss" scoped>
.login-container{
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: auto;
    .content{
        flex: 1;
        padding: 32px 0;
        width: 384px;
        margin: 0 auto;
    }
    .top{
        padding: 32px 0;
        text-align: center;
        .logo{
            img{
                margin: 1rem auto;
                width: 46px;
            }
        }
        .desc{
            font-size: 18px;
            color: #fff;
            text-shadow: 1px 1px 1px rgba(1,1,1,.5);
        }
    }
    .form{
        .default-color{
            color: #515a6e;
        }
    }
}
@media (min-width: 768px) {
    .login-container {
        background-image: url('../../assets/confetti-doodles.svg');
        background-repeat: no-repeat;
        background-position: 50%;
        background-size: cover;
        .content {
            padding: 32px 0 24px 0;
        }
    }
}
</style>