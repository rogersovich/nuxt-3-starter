<script setup lang="ts">
const isDarks = useDarkMode();

const route = useRoute();

useHead({
  title: `${route.meta.title}`,
  meta: [
    { name: "title", property: "og:title", content: `${route.meta.title}` },
  ],
});
</script>
<template>
  <div class="background-app">
    <div class="navbar">
      <div
        :class="
          route.meta.title != 'Home Page' ? 'flex items-center gap-3' : ''
        "
      >
        <NuxtLink no-prefetch class="flex items-center" to="/">
          <UIcon
            v-if="route.meta.title != 'Home Page'"
            name="i-heroicons-chevron-left-20-solid"
            class="w-7 h-7 cursor-pointer hover:bg-blue-500"
          >
          </UIcon>
        </NuxtLink>
        <div class="font-bold text-xl">
          {{ route.meta.title }}
        </div>
      </div>
      <div>
        <UButton color="primary" variant="ghost" @click="isDarks = !isDarks">
          <UIcon
            :name="isDarks ? 'i-la-moon' : 'i-la-sun'"
            class="w-6 h-6"
          ></UIcon>
        </UButton>
      </div>
    </div>
    <slot />
  </div>
</template>

<style scoped></style>
