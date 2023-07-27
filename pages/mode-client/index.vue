<script setup lang="ts">
import { Header } from 'vue3-easy-data-table';

definePageMeta({
  title: "Client Side Page",
  desc: "This is Description of Client Side Page",
});

const page = ref(1);

const { data, pending, onChangePaginate } = await fetchCharacters({
  pages: page.value,
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

</script>
<template>
  <div>
    <div>
      <div v-if="pending">Loading...</div>
      <div v-else>
        <div class="h-[400px] w-[100%] mt-4 px-6 overflow-y-auto">
          <ClientOnly>
            <EasyDataTable
              :headers="headers"
              :items="data?.results"
              hide-footer
            >
              <template #item-image="{ image }">
                <nuxt-img :src="image" height="100" width="100"></nuxt-img>
              </template>
            </EasyDataTable>
          </ClientOnly>
        </div>
        <div class="p-4">
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
      </div>
    </div>
  </div>
</template>

<style scoped></style>
