<script setup lang="ts">
definePageMeta({
  title: "Home Page",
  desc: "This is Description of Home Page",
  auth: false,
});

const hello = [
  {
    name: "hello",
  },
];
</script>

<template>
  <div class="p-6">
    <div>
      {{
       JSON.stringify(hello)
      }}
    </div>
    <div class="grid-12 gap-4">
      <div
        class="col-span-3"
        v-for="{ key, icon, title, route } in OPTION_CARDS"
        :key="key"
      >
        <NuxtLink :to="route">
          <UCard
            :ui="{
              ring: 'ring-1 ring-gray-200 dark:ring-gray-700',
            }"
          >
            <div class="fc gap-4">
              <UIcon :name="icon" class="w-8 h-8 text-green-600"></UIcon>
              <div class="text-xl font-semibold hover:text-green-600">
                {{ title }}
              </div>
            </div>
          </UCard>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
