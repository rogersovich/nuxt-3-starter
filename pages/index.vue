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

const isDarks = useDarkMode()
</script>

<template>
  <div class="background-app">
    <div
      class="navbar">
      <div class="font-bold text-xl">
        Nuxt 3 Starter
      </div>
      <div>
        <UButton color="primary" variant="ghost" @click="isDarks = !isDarks">
          <UIcon :name="isDarks ? 'i-la-moon' : 'i-la-sun'" class="w-6 h-6"></UIcon>
        </UButton>

      </div>
    </div>
    <div v-if="pending">
      Loading...
    </div>
    <div v-else>

      <div class="h-[400px] w-[100%] mt-4 px-6 overflow-y-auto">
        <ClientOnly>
          <EasyDataTable :headers="headers" :items="data?.results" hide-footer>
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
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
