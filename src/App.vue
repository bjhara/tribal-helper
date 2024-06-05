<script setup>
import { RouterView, RouterLink } from 'vue-router';
import Button from 'primevue/button'
</script>

<template>
  <div class="container m-auto flex flex-col gap-2 p-2">
    <nav class="flex flex-row-reverse">
      <RouterLink to="/">
        <Button
          icon="pi pi-search"
          class="mr-2"
          severity="secondary"
          aria-label="Search"
        />
      </RouterLink>
      <RouterLink to="/list">
        <Button
          icon="pi pi-list"
          class="mr-2"
          severity="secondary"
          aria-label="Show list"
        />
      </RouterLink>
      <RouterLink to="/saved">
        <Button
          icon="pi pi-bookmark"
          class="mr-2"
          severity="secondary"
          aria-label="Saved bookmarks"
        />
      </RouterLink>
    </nav>

    <RouterView />
  </div>
</template>
