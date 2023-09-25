<template>
    <div class="flex gap-5 items-center">
        <button :disabled="currentPage <= 1" class="text-e-orange px-3 py-2" :class="currentPage === 1 ? 'text-e-orange-blur':''" @click="changePage(currentPage - 1)">
            <Icon name="material-symbols:arrow-back-ios-rounded" />
        </button>
        <div class="flex gap-5">
            <button class="bg-transparent text-white font-semibold w-6 h-6" :class="page === currentPage?'border-b-2 border-e-orange':''" v-for="page of pageNumbers" @click="changePage(page)">{{ page }}</button>
        </div>
        <button :disabled="currentPage >= n" class="text-e-orange px-3 py-2" @click="changePage(currentPage + 1)" :class="currentPage >= n ? 'text-e-orange-blur':''" >
            <Icon name="material-symbols:arrow-forward-ios-rounded" />
        </button>
    </div>
</template>

<script setup lang="ts">
const {n} = defineProps<{
    n:number
}>();
const emits = defineEmits(['page-change'])

type Page = number | '...';
let pageNumbers:Page[] = [1,2,3,4,'...', n];
const currentPage = ref(1)
const changePage = (page:Page | number)=>{
    if (typeof page === 'number'){
        if (page > currentPage.value){
            if (pageNumbers.length === 6 && page === 4){
                pageNumbers = [1, '...', 3, 4, 5, '...', n]
            }
            else if (page >= (n - 2)){
                pageNumbers = [1, '...', n-3, n-2, n-1, n ]
            }
            else if (pageNumbers.indexOf(page) === 4){
                pageNumbers[2] = currentPage.value;
                pageNumbers[3] = page;
                pageNumbers[4] = page + 1;
            }
        }
        else {
            if ((page - 1) <= 2){
                pageNumbers = [1, 2, 3, 4,'...', n]
            }
            else if((n - page) === 3){
                pageNumbers = [1, '...', n-4, n-3, n-2, '...', n]
            }
            else if (page === 1){
                pageNumbers = [1, 2, 3, 4, '...', n]
            }
            else if (pageNumbers.indexOf(page) === 2){
                pageNumbers[2] = page - 1;
                pageNumbers[3] = page;
                pageNumbers[4] = currentPage.value;
            }
        }
        emits('page-change', currentPage.value, page)
        currentPage.value = page;
        
    }
}
</script>
