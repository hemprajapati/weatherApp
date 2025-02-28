<template>
  <div class="relative">
    <div class="bg-slate-200 rounded-md overflow-hidden flex" @click.stop="showOptions = true">
      <input
        type="text"
        v-model="text"
        @input="onInput"
        class="h-12 w-full border-white focus:outline-0 px-4 placeholder:font-semibold placeholder:text-slate-600/80"
        placeholder="Search your city..."
      />
      <div v-if="text.length" class="!h-12 flex justify-center items-center py-4" @click="handleClear"> 
        <Close />
      </div>
      <div class="flex justify-center items-center px-4 hover:cursor-pointer" @click.stop="showOptions = !showOptions">
        <div class="border-l border-slate-400 ps-4">
          <Arrow
            class="hover:scale-115 transition-all duration-300 ease-linear"
          />
        </div>
      </div>
    </div>
    <div v-if="showOptions" ref="optionContainer" class="w-full absolute !mt-2 rounded-md overflow-hidden bg-gray-300 z-10">
        <div v-if="loading" class="py-3 px-4 text-gray-500 !font-semibold text-center ">
            Loading...
        </div>
        <div v-else-if="text.length && options.length === 0" class="py-3 px-4 text-gray-900 !font-semibold">
            No Result Found
        </div>
        <div v-else-if="!text.length  &&  searchHistory.length>0" v-for="item in searchHistory" 
         :key="item.id"
            @click="handleCityClick(item)"
            class="py-3 px-4 text-gray-900 !font-semibold hover:cursor-pointer hover:bg-gray-500/20"
        >
            {{ item.name }}, {{ item.country }}
        </div>
        <div v-else-if="text.length && !selectedFromHistory" v-for="item in options" :key="item.id"
            @click="handleCityClick(item)"
            class="py-3 px-4 text-gray-900 !font-semibold hover:cursor-pointer hover:bg-gray-500/20"
        >
            {{ item.name }}, {{ item.country }}
        </div>
        
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, computed } from "vue";
import Arrow from "@/components/icons/Arrow.vue";
import Close from "./icons/Close.vue";
const emit = defineEmits(["update:search","onCitySelect"]);
const searchQuery = ref("");
const text = ref("");
const showOptions = ref(false);
const optionContainer = ref(null);
const loading = ref(false);
let debounceTimeout;
const recentSearch = ref([]);
const selectedFromHistory = ref(false);

const onInput = (event) => {
  selectedFromHistory.value = false
  text.value = text.value
    .replace(/[^a-zA-Z\s]/g, "")
    .replace(/\s+/g, " ")
    .trimStart();
  clearTimeout(debounceTimeout);
  loading.value = true;
  debounceTimeout = setTimeout(() => {
    emit("update:search", text.value);
  }, 700);
};

const props = defineProps({
  options: {
    type: Array,
    required: true,
  },
});

watch(() => props.options, () => {
  loading.value = false;
}, {
  deep: true,
  immediate: true
});

const handleClickOutside = (event) => {
  if (
    optionContainer.value &&
    showOptions.value &&
    !optionContainer.value.contains(event.target)
  ) {
    showOptions.value = false;
  }
};

const handleClear = () => {
  text.value= ''
  emit("update:search", text.value);
}


const handleCityClick = (item) => {
  const foundIndex = recentSearch.value.findIndex((i) => i.id === item.id);
  if (foundIndex === -1) {
    recentSearch.value.unshift(item);
  }
  showOptions.value = false;
  text.value = `${item.name}, ${item.country}`;
  selectedFromHistory.value = true;
  emit("onCitySelect", item);
};

const searchHistory = computed(() => {
  return recentSearch.value.slice(0, 5);
});

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style lang="scss" scoped></style>
