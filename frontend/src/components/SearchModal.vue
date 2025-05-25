<template>
    <div class="group flex border-1 border-zinc-600 rounded outline-2 outline-transparent focus-within:outline-blue-400">
        <label for="search" aria-hidden="true" class="size-8 grid place-items-center opacity-50 group-focus-within:opacity-100">
            <img :src="searchIcon" width="20px" height="20px" class="invert inset-8 object-contain w-1/2 h-1/2 inline">
        </label>
        <input type="search" name="search" id="search" v-model="query" aria-label="Keyword Search" placeholder="Keyword Search..." class="origin-left peer overflow-x-hidden transition-all duration-300 px-4 py-1 text-zinc-300 inline focus:outline-none">            
    </div>
</template>

<script setup lang="ts">
    import searchIcon from '@/assets/searchIcon.svg';
    import { ref, watch } from 'vue';
    const $emits = defineEmits<{update: [string]}>();

    const query = ref<string>('');
    const timeoutID = ref<number | undefined>()
    
    watch(query, ()=>{
        clearTimeout(timeoutID.value)
        timeoutID.value = setTimeout(()=>{
            $emits('update', query.value)
        }, 200)
        
    })
    




</script>