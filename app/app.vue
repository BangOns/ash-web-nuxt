<script setup lang="ts">
useHead({
  meta: [
    {
      name: 'google-site-verification',
      content: 'hligCcWWDDhfPqc5dDbnIMkQxABEX_NlVlEcDaLa4qk'
    }
  ]
})

// Force light mode globally to prevent dark mode/contrast issues
const colorMode = useColorMode();
colorMode.preference = 'light';
</script>

<template>
    <NuxtLoadingIndicator />
    <main>
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </main>
</template>
