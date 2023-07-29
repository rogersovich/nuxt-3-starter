<script setup lang="ts">
definePageMeta({
  title: "Server Side Page",
  desc: "This is Description of Server Side Page",
})

const page = ref(1)

const { data, pending, onChangePaginate } = await fetchCharacters({
  pages: page.value,
  server: true,
})
</script>
<template>
  <div class="p-6">
    <div class="grid-12 gap-4">
      <div class="col-span-4" v-for="{ name, id, species, gender } in data?.results" :key="id">
        <UCard>
          <template #header>
            {{ name }}
          </template>
          <div>
            <div>
              Species : {{ species }}
            </div>
            <div>
              Gender : {{ gender }}
            </div>
          </div>
        </UCard>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
