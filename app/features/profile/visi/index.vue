<script setup lang="ts">
const { data: profile } = await useProfileApi().getProfile();
</script>

<template>
  <article class="space-y-8">
    <VisiComponentsDetailVisi :visi="profile?.visi" />
    <VisiComponentsDetailMisi :misi="profile?.misi" />
  </article>
</template>
