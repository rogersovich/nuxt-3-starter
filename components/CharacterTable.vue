<script setup lang="ts">
import { Header } from "vue3-easy-data-table";

const page = ref(1);

const { data, pending, onChangePaginate } = await fetchCharacters({
  pages: page.value,
  server: true,
});

const onPrev = () => {
  page.value--;
  onChangePaginate(page.value);
};

const onNext = () => {
  page.value++;
  onChangePaginate(page.value);
};

const headers: Header[] = [
  { text: "Image", value: "image" },
  { text: "Name", value: "name" },
  { text: "Status", value: "status", sortable: true },
  { text: "Species", value: "species" },
  { text: "Gender", value: "gender" },
];

const isDarks = useDarkMode();
</script>
<template>
  <div v-if="pending">Loading...</div>
  <div v-else>
    <div class="h-[400px] w-[100%] mt-4 px-6 overflow-y-auto">
      <ClientOnly fallback-tag="span" fallback="Loading Tables...">
        <EasyDataTable
          :headers="headers"
          :items="data?.results"
          :table-class-name="isDarks ? 'dark-table' : ''"
          hide-footer
        >
          <template #item-image="{ image }">
            <nuxt-img :src="image" height="100" width="100"></nuxt-img>
          </template>
        </EasyDataTable>
      </ClientOnly>
    </div>
    <div class="p-4"></div>
    <div class="flex flex-row gap-2 items-center justify-center">
      <UButton
        icon="i-heroicons-chevron-left-20-solid"
        color="gray"
        :disabled="!!!data?.info.prev"
        @click="onPrev"
      ></UButton>
      <UButton
        icon="i-heroicons-chevron-right-20-solid"
        color="gray"
        :disabled="!!!data?.info.next"
        @click="onNext"
      ></UButton>
    </div>
  </div>
</template>

<style scoped>
.dark-table {
  --easy-table-border: 1px solid #1f2937;
  --easy-table-row-border: 1px solid #1f2937;

  --easy-table-header-font-size: 14px;
  --easy-table-header-height: 50px;
  --easy-table-header-font-color: #fff;
  --easy-table-header-background-color: #111827;

  --easy-table-header-item-padding: 10px 15px;

  --easy-table-body-row-font-color: #fff;
  --easy-table-body-row-background-color: #111827;
  --easy-table-body-row-height: 50px;
  --easy-table-body-row-font-size: 14px;

  --easy-table-body-row-hover-font-color: #fff;
  --easy-table-body-row-hover-background-color: #1f2937;

  --easy-table-body-item-padding: 10px 15px;

  --easy-table-scrollbar-track-color: #111827;
  --easy-table-scrollbar-color: #111827;
  --easy-table-scrollbar-thumb-color: #4c5d7a;
  --easy-table-scrollbar-corner-color: #111827;

  --easy-table-loading-mask-background-color: #111827;
}
</style>
