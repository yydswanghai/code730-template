<template>
    <AppProvider>
        <Header />
        <RouterView />
        <Footer :category="pageEnum.video" />
    </AppProvider>
</template>

<script lang="ts" setup>
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { pageEnum } from '@/enums/pageEnum'
import { AppProvider } from '@/components/AppProvider'

</script>