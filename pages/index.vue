<script setup lang="ts">
import { Header } from "vue3-easy-data-table";
import { reactive, ref } from "vue";

const pagination = reactive({
  page: 1,
});

const { data, pending, status } = await fetchCharacters({ page: pagination.page });

const headers: Header[] = [
  { text: "Image", value: "image" },
  { text: "Name", value: "name" },
  { text: "Status", value: "status", sortable: true },
  { text: "Species", value: "species" },
  { text: "Gender", value: "gender" },
];

const colorMode = useColorMode()
const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  }
})
</script>

<template>
  <div class="bg-white dark:bg-slate-900">
    <div class="flex items-center justify-between bg-white dark:bg-slate-900 p-3 shadow sticky top-0 left-0 z-10">
      <div class="font-bold text-xl">
        Nuxt 3 Starter
      </div>
      <div>
        <UButton color="primary" variant="ghost" @click="isDark = !isDark">
          <UIcon :name="isDark ? 'i-la-moon' : 'i-la-sun'" class="w-6 h-6"></UIcon>
        </UButton>

      </div>
    </div>
    <div v-if="pending">
      Loading...
    </div>
    <div v-else>

      <div class="flex items-center justify-center py-4">
        <ClientOnly>
          <EasyDataTable class="w-[600px]" :headers="headers" :items="data?.results" hide-footer>
            <template #item-image="{ image }">
              <nuxt-img :src="image" height="100" width="100"></nuxt-img>
            </template>
          </EasyDataTable>
        </ClientOnly>
      </div>
      <div class="p-4">
        <div class="flex flex-row gap-2 items-center justify-center">
          <button class="bg-blue-500 rounded text-white px-4 py-1 text-sm">
            Prev
          </button>
          <button @click="() => {
            pagination.page = 2;
          }
            " class="bg-blue-500 rounded text-white px-4 py-1 text-sm">
            Next {{ pagination.page }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
