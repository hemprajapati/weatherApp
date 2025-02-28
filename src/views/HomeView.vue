<template>
  <div
    class="bg-img container border border-slate-50/5 shadow-md shadow-sky-700/5 rounded-lg !pt-12 !mx-auto p-4 h-4/5">
    <Searchbar :options="option" @update:search="handleUpdate" @onCitySelect="handleCitySelect" />
    <DetailView v-if="showDetailView" :forcast="forcast" :weather="weather" />
    <Moon v-else/>
  </div>
</template>
<script setup>
import Searchbar from "@/components/Searchbar.vue";
import DetailView from "@/components/DetailView.vue";
import { onMounted, ref } from "vue";
import { fetchCities } from "@/utils/API/GetCities";
import { fetchWeatherData } from "@/utils/API/GetWhether";
import Moon from "@/components/icons/Moon.vue";
const option = ref([]);
const weather = ref({});
const forcast = ref({});
const showDetailView = ref(false)
const handleUpdate = (text) => {
  if (!text.length) {
    showDetailView.value = false
  }
  fetchCities(text.toLowerCase()).then((data) => (option.value = data.data));
};
const handleCitySelect = (item) => {
  const { latitude, longitude } = item;
  fetchWeatherData(latitude, longitude).then((data) => {
    showDetailView.value = true;
    weather.value = data[0];
    forcast.value = data[1];
  });
};
onMounted(async () => { });
</script>

<style>
.bg-img {
  background-image: url("../assets/bg.png");
}
</style>
