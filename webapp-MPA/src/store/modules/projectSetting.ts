import { defineStore } from 'pinia'
import styles from '@/styles/var.module.scss'

export const useProjectSettingStore = defineStore({
    id: 'project-setting',
    state: () => ({
        theme: {
            primary: styles.primaryColor
        },
        footerHeight: styles.footerHeight,
        headerHeight: styles.headerHeight
    }),
})