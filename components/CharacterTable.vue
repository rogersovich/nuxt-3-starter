<script setup lang="ts">
import { Header } from "vue3-easy-data-table"

const page = ref(1)

const { data, pending, onChangePaginate } = await fetchCharacters({
  pages: page.value,
  server: true,
})

watch(page, async (news, olds) => {
  onChangePaginate(news)
})

const headers: Header[] = [
  { text: "Image", value: "image" },
  { text: "Name", value: "name" },
  { text: "Status", value: "status", sortable: true },
  { text: "Species", value: "species" },
  { text: "Gender", value: "gender" },
]

const isDarks = useDarkMode()
</script>
<template>
  <div v-if="pending">Loading...</div>
  <div v-else>
    <div class="h-[400px] w-[100%] mt-4 px-6 pb-4 overflow-y-auto">
      <ClientOnly fallback-tag="span" fallback="Loading Tables...">
        <EasyDataTable
          :headers="headers"
          :items="data?.results"
          :table-class-name="isDarks ? 'dark-table' : 'light-table'"
          hide-footer
        >
          <template #item-image="{ image, name }">
            <nuxt-img
              :alt="name"
              :key="name"
              :src="image"
              loading="lazy"
              placeholder="This Image still loading"
              width="100"
              height="100"
            ></nuxt-img>
          </template>
        </EasyDataTable>
      </ClientOnly>
    </div>
    <div class="mt-4 px-6">
      <div class="flex flex-row gap-2 items-center justify-end">
        <UPagination
          v-model="page"
          :page-count="20"
          :max="7"
          :total="data?.info.count ?? 0"
          :ui="{
            wrapper: 'flex items-center gap-1',
            rounded: 'rounded min-w-[32px] justify-center',
          }"
        >
          <template #prev="{ onClick }">
            <UTooltip text="Previous page">
              <UButton
                icon="i-heroicons-arrow-small-left-20-solid"
                color="gray"
                @click="onClick"
                :disabled="!!!data?.info.prev"
              />
            </UTooltip>
          </template>
          <template #next="{ onClick }">
            <UTooltip text="Next page">
              <UButton
                icon="i-heroicons-arrow-small-right-20-solid"
                color="gray"
                @click="onClick"
                :disabled="!!!data?.info.next"
              />
            </UTooltip>
          </template>
        </UPagination>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dark-table {
  --easy-table-border: 0px solid #1f2937;
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

.light-table {
  --easy-table-border: none;
}
</style>
