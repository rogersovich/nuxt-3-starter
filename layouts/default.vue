<script setup lang="ts">
const isDarks = useDarkMode();

const route = useRoute();
const authStore = useAuthStore();

useHead({
  title: `${route.meta.title}`,
  meta: [
    { name: "title", property: "og:title", content: `${route.meta.title}` },
  ],
});

const { signOut } = useAuth();

const toggleDarkMode = () => {
  return useDarkMode();
};

const items = [
  [
    {
      label: authStore.user.name ?? "Not Login",
      slot: "account",
      disabled: true,
    },
  ],
  [
    {
      label: "Settings",
      icon: "i-heroicons-cog-8-tooth",
    },
    {
      label: "Dark Mode",
      icon: isDarks ? "i-la-moon" : "i-la-sun",
      click: () => {
        toggleDarkMode().value = !isDarks;
      },
    },
  ],
  [
    {
      label: "Sign out",
      icon: "i-heroicons-arrow-left-on-rectangle",
      click: () => {
        if (!!authStore.user.token) {
          authStore.removeToken();
          authStore.removeUser();
          signOut({
            callbackUrl: "/auth",
          });
        }
      },
    },
  ],
];
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
      <div class="fcc gap-3">
        <UDropdown
          :items="items"
          :ui="{ item: { disabled: 'cursor-text select-text opacity-50' } }"
          :popper="{ placement: 'bottom-start' }"
        >
          <UAvatar size="sm" alt="Benjamin Canac"> </UAvatar>

          <template #account="{ item }">
            <div class="text-left">
              <p>Signed in as</p>
              <p class="truncate font-medium text-gray-900 dark:text-white">
                {{ item.label }}
              </p>
            </div>
          </template>

          <template #item="{ item }">
            <span class="truncate text-gray-900 dark:text-white">{{
              item.label
            }}</span>

            <UIcon
              :name="item.icon"
              class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto"
            />
          </template>
        </UDropdown>
      </div>
    </div>
    <slot />
  </div>
</template>

<style scoped></style>
