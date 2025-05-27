<template>
  <nav class="text-zinc-300 relative grow min-h-10 flex items-center justify-end">
    <!-- Toggle Button (Visible on Mobile Only) -->
    <button
      class="cursor-pointer md:hidden z-50"
      @click="toggleOpen"
      :aria-expanded="isOpen"
      aria-controls="mobile-menu"
      aria-label="Toggle navigation menu"
    >
      <img :src="menuIcon" alt="Open Menu" width="32" height="32" class="invert" />
    </button>

    <!-- Overlay for mobile menu (prevents background scroll and darkens background) -->
    <div
      v-show="isOpen"
      @click="toggleOpen"
      class="fixed inset-0 bg-black/25 backdrop-blur-sm md:hidden z-40"
    ></div>

    <!-- Mobile Menu -->
    <ul
      id="mobile-menu"
      class="fixed top-0 right-0 h-full w-2/3 max-w-xs bg-black flex flex-col gap-4 p-6 pt-6 transition-transform duration-300 transform md:relative md:flex-row md:translate-x-0 md:p-0 md:h-auto md:w-auto md:bg-transparent md:items-center z-50"
      :class="{ 'translate-x-0': isOpen, 'translate-x-full': !isOpen }"
    >
      <!-- Close button inside menu (mobile only) -->
      <li class="self-end md:hidden mb-6">
        <button class="cursor-pointer" @click="toggleOpen" aria-label="Close Menu">
          <img :src="closeIcon" alt="Close Menu" width="32" height="32" class="invert" />
        </button>
      </li>

      <!-- Nav links -->
      <li v-for="link in links" :key="link.to">
        <RouterLink
          :to="link.to"
          class="block px-4 py-2 w-full md:w-fit text-xl md:text-lg underline-offset-4 hover:underline decoration-cyan-800 decoration-4 hover:decoration-zinc-600"
          :class="{ 'underline': $route.path === link.to }"
          @click="closeIfMobile"
        >
          {{ link.label }}
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import menuIcon from '@/assets/menu.svg';
import closeIcon from '@/assets/close.svg';

const isOpen = ref(false);

const toggleOpen = () => {
  isOpen.value = !isOpen.value;
};

const closeIfMobile = () => {
  if (window.innerWidth < 768) isOpen.value = false;
};

// Optional: prevent background scroll on mobile menu open
watch(isOpen, (open) => {
  if (open) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
});

const links = [
  { to: '/', label: 'Home' },
  { to: '/explore', label: 'Explore' },
  { to: '/about', label: 'About' },
];
</script>

<style scoped>
/* Ensure no scrollbars appear when menu is off-screen */
ul {
  will-change: transform;
}
</style>
