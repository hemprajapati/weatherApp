<template>
    <div class="w-full border bg-gray-900 flex justify-between items-center py-3">

        <div
        class="flex-1 border-r border-gray-500  px-8"
        v-for="(item, index) in prices"
        :key="index"
        >
        <div class="flex justify-between items-center">
            <h1 class="text-slate-100 text-xl !font-bold">
                {{ getStockName(index) }} 
            </h1>
            <h1 class="text-xl !font-extrabold text-green-700">
                {{ item }}
            </h1>
        </div>
    </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { getStockName } from "@/utils/getConvertedName";
const socket = ref(null);
const cuurentLog = ref([]);
const previousLog = ref([]);
const prices = ref({});

const initWebSocket = () => {
  socket.value = new WebSocket(
    "wss://ws.finnhub.io?token=cuvvb39r01qub8tvrn50cuvvb39r01qub8tvrn5g"
  );

  socket.value.addEventListener("open", () => {
    socket.value.send(
      JSON.stringify({ type: "subscribe", symbol: "BINANCE:BTCUSDT" })
    );
    socket.value.send(
      JSON.stringify({ type: "subscribe", symbol: "BINANCE:XRPUSDT" })
    );
    socket.value.send(
      JSON.stringify({ type: "subscribe", symbol: "BINANCE:DOGEUSDT" })
    );
    socket.value.send(
      JSON.stringify({ type: "subscribe", symbol: "IC MARKETS:1" })
    );
    socket.value.send(
      JSON.stringify({ type: "subscribe", symbol: "BINANCE:SOLUSDT" })
    );
    
  });

  socket.value.addEventListener("message", (event) => {
    const data = JSON.parse(event.data);
    if (data.type === "trade" && data.data) {
      data.data.forEach((trade) => {
        prices.value[trade.s] = trade.p;
      });
    }
  });
};

const unsubscribe = (symbol) => {
  if (socket.value) {
    socket.value.send(JSON.stringify({ type: "unsubscribe", symbol }));
  }
};

onMounted(() => {
  initWebSocket();
});

onUnmounted(() => {
  if (socket.value) {
    socket.value.close();
  }
});
</script>

<style scoped>

</style>