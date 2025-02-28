<template>
  <div class="w-full !mt-2 p-2 flex justify-between items-start !space-x-12">
    <div class="flex-1">
      <h2 class="text-center !font-extrabold !text-xl text-gray-400">
        CURRENT WEATHER
      </h2>
      <div class="flex justify-between items-start !mt-8 !mb-12">
        <div class="flex-1 !space-x-2">
          <h2 class="text-4xl !font-extrabold text-gray-300 tracking-wider">
            {{ weather.main.temp }}°c
          </h2>
          <div class="text-gray-400 !font-semibold">
            Feels like:
            <span class="!font-extrabold text-lg inline-block px-0.5">
              {{ weather.main.feels_like }}°c
            </span>
          </div>
        </div>
        <div class="flex-1 !space-x-2 flex justify-center items-center">
          <div>
            <h1 class="text-2xl !font-extrabold text-slate-300">
              {{ weather.name }}, {{ weather.sys.country }}
            </h1>
            <span class="!text-slate-400 !font-extrabold block py-2">{{
              formatedDate(weather.dt)
            }}</span>
          </div>
        </div>
        <div class="flex-1 flex justify-end items-end">
          <img
            :src="getIconPath(weather.weather[0].icon)"
            class="h-20 w-20 object-fill"
            alt="Weather Icon"
          />
        </div>
      </div>

      <h2 class="text-center !font-extrabold !text-xl text-gray-400">
        AIR CONDITIONS
      </h2>
      <div class="flex justify-between items-start !mt-8 !mb-12">
        <div>
          <div class="flex !space-x-1 justify-center items-center">
            <Thermometer class="size-6 !fill-slate-400" />
            <span class="text-slate-400 !font-semibold">Real Feel </span>
          </div>
          <span
            class="block text-center text-slate-300 text-[21px] !font-extrabold !mt-2"
            >{{ weather.main.feels_like }} °c</span
          >
        </div>

        <div>
          <div class="flex !space-x-1 justify-center items-center">
            <Wind class="size-6 !fill-slate-400" />
            <span class="text-slate-400 !font-semibold">Wind</span>
          </div>
          <span
            class="block text-center text-slate-300 text-[21px] !font-extrabold !mt-2"
            >{{ weather.wind.speed }} m/s</span
          >
        </div>
        <div>
          <div class="flex !space-x-1 justify-center items-center">
            <Cloud class="size-6 !fill-slate-400" />
            <span class="text-slate-400 !font-semibold">Clouds </span>
          </div>
          <span
            class="block text-center text-slate-300 text-[21px] !font-extrabold !mt-2"
            >{{ Math.round(weather.clouds.all) }} %</span
          >
        </div>

        <div>
          <div class="flex !space-x-1 justify-center items-center">
            <Huminity class="size-6 !fill-slate-400" />
            <span class="text-slate-400 !font-semibold">Humidity</span>
          </div>
          <span
            class="block text-center text-slate-300 text-[21px] !font-extrabold !mt-2"
            >{{ Math.round(weather.main.humidity) }} %</span
          >
        </div>
      </div>

      <h2 class="text-center !font-extrabold !text-xl text-gray-400">
        TODAY'S FORECAST
      </h2>
      <span class="text-sky-400 block text-center">
        5 available forecasts
      </span>
      <div class="flex !space-x-4 !mt-6">
        <div
          class="flex-1 flex flex-col items-center py-4 rounded-2xl hover:bg-sky-900/90 bg-sky-900/65 hover:cursor-pointer"
          v-for="(item, index) in all_today_forecasts_list"
          :key="index"
        >
          <span class="!font-bold text-slate-400">{{ item.time }}</span>
          <img :src="getIconPath(item.icon)" class="w-10 h-10 !my-4" />
          <span class="text-slate-300 font-semibold"
            >{{ item.temperature }}
          </span>
        </div>
      </div>
    </div>
    <div class="flex-1">
      <h2 class="text-center !font-extrabold !text-xl text-gray-400">
        CURRENT WEEK'S FORECAST
      </h2>
      <div v-for="(item, index) in all_week_forecasts_list" :key="index" 
      class="flex justify-between items-start px-4 py-2 !my-2 rounded-lg bg-sky-700/20 hover:cursor-pointer"
      >
        <div class="flex-1">
            <h5 class="text-slate-300 !font-semibold text-[18px]">{{GetWeekDay(item.date)}}</h5>
            <div class="flex !mt-2">
                <img :src="getIconPath(item.icon)" class="w-8 h-8"/>
                <span class= "block px-2 text-slate-400 !font-semibold !mt-1">{{ item.description }}</span>
            </div>
        </div>
        <div class="flex-1 !ps-10">
           <div class="flex items-center">
            <Thermometer class="fill-slate-300 size-6"/>
            <span class="block px-3 text-slate-300 !font-semibold !mt-2">{{ item.temp }}°c</span>
           </div>
           <div class="flex items-center">
            <Cloud class="fill-slate-300 size-6"/>
            <span class="block px-3 text-slate-300 !font-semibold !mt-2">
                {{ item.clouds }} %
            </span>
           </div>
        </div>
        <div class="flex-1">
            <div class="flex items-center">
            <Wind class="fill-slate-300 size-6"/>
            <span class="block px-3 text-slate-300 !font-semibold !mt-2">{{ item.wind }} m/s</span>
           </div>
           <div class="flex items-center">
            <Huminity class="fill-slate-300 size-6"/>
            <span class="block px-3 text-slate-300 !font-semibold !mt-2">
                {{ item.humidity }} %
            </span>
           </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { formatedDate, GetWeekDay, transformDateFormat } from "@/utils/lib/time";
import Thermometer from "./icons/Thermometer.vue";
import Wind from "./icons/Wind.vue";
import Cloud from "./icons/Cloud.vue";
import {
  getTodayForecastWeather,
  getWeekForecastWeather,
} from "@/utils/lib/forcastFilter";
import Huminity from "./icons/Huminity.vue";

const all_today_forecasts_list = ref([]);
const all_week_forecasts_list = ref([]);

const props = defineProps({
  weather: {
    type: Object,
    required: true,
  },
  forcast: {
    type: Object,
    required: true,
  },
});

const images = import.meta.glob("@/assets/icons/*.png", { eager: true });

const getIconPath = (icon) => {
  return images[`/src/assets/icons/${icon}.png`]?.default || "";
};
watch(()=>[props.weather,props.forcast],()=>{
    const currentDate = transformDateFormat();
  const date = new Date();
  let dt_now = Math.floor(date.getTime() / 1000);
  all_today_forecasts_list.value = getTodayForecastWeather(
    props.forcast,
    currentDate,
    dt_now
  );
  all_week_forecasts_list.value = getWeekForecastWeather(props.forcast);
},{
    immediate:true,
    deep:true
})
onMounted(() => {
 
});

</script>

<style lang="scss" scoped></style>
