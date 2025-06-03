<template>
    <div v-if="books" class="flex flex-col h-[88dvh]">
        <section class="flex items-end md:items-center justify-between sm:justify-start w-full px-4 pb-2 gap-y-2 gap-x-4 bg-black">
                <div class="max-w-[400px] flex items-center my-2">
                    <div class="group flex border-1 border-zinc-600 rounded outline-2 outline-transparent focus-within:outline-blue-400">
                        <label for="search" aria-hidden="true" class="size-8 grid place-items-center opacity-50 group-focus-within:opacity-100">
                            <img :src="searchIcon" width="20px" height="20px" class="invert inset-8 object-contain w-1/2 h-1/2 inline">
                        </label>
                        <input
                            type="search"
                            name="search"
                            id="search"
                            v-model="search"
                            aria-label="Keyword Search"
                            placeholder="Keyword Search..."
                            class="w-full md:w-[350px] duration-300 h-9 px-1 py-1 text-zinc-300 inline focus:outline-none"
                        />
                    </div>
                </div>

            <div class="flex items-center min-w-28 gap-4">

                <label for="sortby" class="text-zinc-300 text-sm hidden sm:block md:text-base w-full text-left">Sort by</label>
                <select
                    name="sortby"
                    id="sortby"
                    v-model="sort"
                    aria-label="sort results by"
                    class="w-fit my-2 border-1 border-zinc-300/25 px-2 h-9 rounded bg-zinc-300/10 text-zinc-300/50"
                >
                    <option :value="{sortby: 'title', ascending: 'true'}">Title &darr;</option>
                    <option :value="{sortby: 'title', ascending: 'false'}">Title &uarr;</option>
                    <option :value="{sortby: 'author', ascending: 'true'}">Author &darr;</option>
                    <option :value="{sortby: 'author', ascending: 'false'}">Author &uarr;</option>
                    <option :value="{sortby: 'genre', ascending: 'true'}">Genre &darr;</option>
                    <option :value="{sortby: 'genre', ascending: 'false'}">Genre &uarr;</option>
                </select>
            </div>
        </section>
        <section class="w-full h-full overflow-y-auto mask-y-95%">
            <BookList :books="books" :has-next="hasMore" @next="handleNextPage"/>
        </section>
    </div>
    <div v-else class="w-full h-[88dvh] grid place-items-center">
        <LogoLoader />
    </div>
</template>

<script setup lang="ts">
import { QueryURLBuilder } from '@/assets/helpers';
import BookList from '@/components/BookList.vue';
import type { BookSummary } from '@/types/global';
import { onMounted, ref, watch } from 'vue';
import searchIcon from '@/assets/searchIcon.svg';
import LogoLoader from '@/components/LogoLoader.vue';

const apiBase = import.meta.env.VITE_API_BASE + '/books';

const page = ref<number>(1);
const books = ref<BookSummary[]>([]);
const hasMore = ref<boolean>(false);
const search = ref<string>('');
const searchTimeout = ref<number | null>(null);
const sort = ref<{sortby: string, ascending: string}>({sortby: 'title', ascending: 'true'});

watch(search, () => {
    if (searchTimeout.value) {
        clearTimeout(searchTimeout.value);
    }
    searchTimeout.value = setTimeout(async () => {
        page.value = 1;
        books.value = [];
        await fetchBooks();
    }, 500);
})

watch(sort, async () => {
    page.value = 1;
    books.value = [];
    await fetchBooks();
})

const handleNextPage = async () => {
    page.value++;
    await fetchBooks();
}

onMounted(async () => {
  await fetchBooks();
})

const fetchBooks = async () => {
    const url = new QueryURLBuilder(apiBase)
        .addParam('limit', '20')
        .addParam('page', page.value.toString())
        .addParam('search', search.value)
        .addParam('sortby', sort.value.sortby)
        .addParam('ascending', sort.value.ascending)
        .build();

    const response = await fetch(url).then(res => res.json());
    books.value = [...books.value, ...response.data as BookSummary[]];
    hasMore.value = response.pagination.nextPage ? true : false;
}
</script>