<script setup>
import { useFetch } from '../components/composables/compose.js';
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const { dataFetch, error } = useFetch();
const router = useRouter();

// Initialize reactive variables
const data = ref([]);
const selectedYear = ref('All');
const searchInput = ref('');

console.log(searchInput.value)

// Function to handle navigation to SingleRepo
const handleSingleItem = (item) => {
  router.push({ name: 'SingleRepo', params: { id: item.name }, state: { item } });
};

// Function to get the year from a date string
const getYearFromDate = (dateString) => {
  const date = new Date(dateString);
  return date.getFullYear();
};

// Computed property to filter data based on selected year
const filteredData = computed(() => {
  let filtered = data.value = dataFetch.value;
  if (selectedYear.value !== 'All') {
    filtered = filtered.filter(item => getYearFromDate(item.created_at) === parseInt(selectedYear.value));
  }
  if (searchInput.value.trim() !== '') {
    filtered = filtered.filter(item => item.name.toLowerCase().includes(searchInput.value.trim().toLowerCase()));
  }
  return filtered;
});

// Fetch data on component mount
onMounted(() => {
    data.value = dataFetch.value;
});

</script>

<template>
  <div class="px-5">
    <div class="flex items-center justify-between">
      <button @click="clickFetchBtn" class="border-2 mb-[10px] border-black p-[10px] rounded-md">Fetch Repository</button>
      <input v-model.trim.lazy="searchInput" class="border w-[40%] h-[40px] border-black pl-2" placeholder="Search for Repo" type="text">
      <select v-model="selectedYear" class="w-[30%] cursor-pointer border-black h-[40px] border">
        <option value="All">All</option>
        <option value="2022">2022</option>
        <option value="2023">2023</option>
        <option value="2024">2024</option>
      </select>
    </div>
    <h2 v-if="filteredData.length === 0">No Data Yet</h2>
    <ul v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <li @click="handleSingleItem(item)" v-for="(item, index) in filteredData" :key="index" class="border-2 bg-slate-200 rounded-md p-4">
        <p class="border-2 border-white w-8 h-8 rounded-full text-center">{{ index + 1 }}</p>
        <h2 class="text-black text-center">{{ item.name }}</h2>
        <div class="flex justify-between mt-2">
          <p>{{ item.language }}</p>
          <p>created at: {{ getYearFromDate(item.created_at)}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>
