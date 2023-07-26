<script setup lang="ts">
import { Header } from "vue3-easy-data-table";
import { reactive, ref } from "vue";

const pagination = reactive({
  page: 1,
});

const tables = ref<
  | {
      id: string;
      name: string;
      image: string;
      status: string;
      species: string;
      location: {
        name: string;
      };
    }[]
  | null
>(null);

const query = gql`
  query getCharacters($page: Int!) {
    characters(page: $page) {
      info {
        count
        pages
      }
      results {
        id
        name
        status
        species
        gender
        image
      }
    }
  }
`;

const { data } = await useAsyncQuery<CharactersResults>(query, pagination);

const onPrev = async () => {
  pagination.page += 1;

  const { data } = await useAsyncQuery<CharactersResults>(query, pagination);
  tables.value = data.value.characters.results;
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
  <div class="flex items-center justify-center py-4">
    <ClientOnly>
      <EasyDataTable
        class="w-[600px]"
        :headers="headers"
        :items="tables ?? data.characters.results"
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
      <button class="bg-blue-500 rounded text-white px-4 py-1 text-sm">
        Prev
      </button>
      <button
        class="bg-blue-500 rounded text-white px-4 py-1 text-sm"
        @click="onPrev"
      >
        Next
      </button>
    </div>
  </div>
</template>

<style scoped></style>
