<template>
    <AppProvider>
        <Header />
        <RouterView />
        <Footer />
    </AppProvider>
</template>

<script lang="ts" setup>
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { AppProvider } from '@/components/AppProvider'
</script>