<script setup lang="ts">
const query = gql`
  query getCharacters {
    characters(page: 2, filter: { name: "morty" }) {
      info {
        count
      }
      results {
        name
        status
      }
    }
    location(id: 1) {
      id
    }
    episodesByIds(ids: [1, 2]) {
      id
    }
  }
`;

const { data } = await useAsyncQuery<CharactersResults>(query);
</script>

<template>
  <div class="text-red-500">helloow</div>
  <div>
    <ul>
      <li v-for="{ name, id } in data.characters.results" :key="id">
        {{ name }}
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
