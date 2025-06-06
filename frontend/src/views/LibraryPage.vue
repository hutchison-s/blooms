<template>
    <div v-if="books" class="flex flex-col h-[88dvh]">
        <section class="flex items-end md:items-center justify-between sm:justify-start w-full px-4 pb-2 gap-y-2 gap-x-4 bg-black">
                <div class="max-w-[400px] flex items-center my-2">
                    <div class="group flex border-1 border-zinc-300/25 bg-zinc-300/10 rounded outline-2 outline-transparent focus-within:outline-blue-400">
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
                            class="w-full md:w-[350px] duration-300 h-9 px-1 py-1 text-zinc-300 inline  focus:outline-none placeholder:text-zinc-300/80"
                        />
                    </div>
                </div>

            <div class="flex items-center min-w-28 gap-4">

                <label for="sortby" class="text-zinc-300 text-sm hidden sm:block md:text-base w-full text-left">Sort by</label>
                <DropDown
                    v-model="sort"
                    :options="sortOptions"
                    aria-label="Sort Books By"
                />
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
import DropDown from '@/components/DropDown.vue';
import { useRouter } from 'vue-router';

const apiBase = import.meta.env.VITE_API_BASE + '/books';
const router = useRouter();
const page = ref<number>(1);
const books = ref<BookSummary[]>([]);
const hasMore = ref<boolean>(false);
const search = ref<string>('');
const searchTimeout = ref<number | null>(null);
const sort = ref<{sortby: string, ascending: string}>({sortby: 'title', ascending: 'true'});

const sortOptions = [
  { label: 'Title &darr;', value: { sortby: 'title', ascending: 'true' } },
  { label: 'Title &uarr;', value: { sortby: 'title', ascending: 'false' } },
  { label: 'Author &darr;', value: { sortby: 'author', ascending: 'true' } },
  { label: 'Author &uarr;', value: { sortby: 'author', ascending: 'false' } },
  { label: 'Genre &darr;', value: { sortby: 'genre', ascending: 'true' } },
  { label: 'Genre &uarr;', value: { sortby: 'genre', ascending: 'false' } },
]

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
    try {
        const url = new QueryURLBuilder(apiBase)
            .addParam('limit', '20')
            .addParam('page', page.value.toString())
            .addParam('search', search.value)
            .addParam('sortby', sort.value.sortby)
            .addParam('ascending', sort.value.ascending)
            .build();
    
        const response = await fetch(url).then(res => res.json()).catch(error => {
            console.error(error);
            router.push({name: 'Error'});
        });
        books.value = [...books.value, ...response.data as BookSummary[]];
        hasMore.value = response.pagination.nextPage ? true : false;
    } catch (error) {
        console.error(error);
        router.push({name: 'Error'})
    }
}
</script>