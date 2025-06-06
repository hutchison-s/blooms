    <template>
        <div v-if="topic" style="scroll-snap-type: y mandatory;" class="h-[88dvh] flex flex-col">
            <section>
                <div class="relative min-h-[10dvh] px-4 py-2 bg-cyan-800 text-2xl md:text-3xl lg:text-4xl text-zinc-300 w-full flex gap-y-4 gap-x-20 flex-wrap items-center leading-tight">
                    <div class="w-full">
                        <h2 class="font-black uppercase min-w-[300px] text-cyan-200 ">{{ slugToTitle(topic.concept) }}</h2>
                        <div class="flex gap-6 justify-between w-full items-center">
                            <div class="flex gap-6 items-center w-fit">
                                <p class="italic font-light text-lg" ><GradePill :grade="topic.gradeLevel" /></p>
                                <SubjectIcon :subject="topic.subjectArea" class="opacity-70"/>
                            </div>
                            <button @click="router.back()" class=" block font-light text-sm md:text-xl border-1 border-zinc-300 rounded px-3 py-1">
                            &larr;&nbsp;Go&nbsp;back
                        </button>
                        </div>
                    </div>
                </div>
            </section>
            <section class="overflow-y-auto grow" style="scroll-snap-type: y mandatory;">
                <TopicLevel v-for="level of bloomLevels" :key="level" :title="level" :question="topic[level]"/>
            </section>
        </div>
        <section v-else class="w-full h-full">
            <LogoLoader />
        </section>
    </template>


<script setup lang="ts">
    import {ref, onMounted} from 'vue';
    import {useRoute, useRouter} from 'vue-router';
    import { slugToTitle } from '@/assets/helpers';
    import type {BookBloomLevel, Topic} from '@/types/global';
    import TopicLevel from '@/components/topics/TopicLevel.vue';
    import SubjectIcon from '@/components/SubjectIcon.vue';
    import LogoLoader from '@/components/LogoLoader.vue';
    import GradePill from '@/components/GradePill.vue';
    const route = useRoute();
    const router = useRouter();
    const {grade, subject, slug} = route.params;
    const topic = ref<Topic>();

    const baseURL = import.meta.env.VITE_API_BASE + '/concepts';

    const bloomLevels: BookBloomLevel[] = [
        "knowledge",
        "comprehension",
        "application",
        "analysis",
        "synthesis",
        "evaluation"
        ];

    onMounted(async ()=>{
        const result = await fetch(`${baseURL}/${grade}/${subject}/${slug}`).then(res => res.json()).catch(err => {
            console.error(err);
            return router.push({name: 'NotFound'});
        });
        if (result.success) {
            topic.value = result.data;
        } else {
            console.error(result.error);
            router.push({name: 'Error'});
        }
    })
</script>