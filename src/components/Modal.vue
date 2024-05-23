<script setup>
import { ref } from 'vue';
import { useFetch } from './composables/compose.js';

const { apiToken } = useFetch();

const open = ref(false);
const repoName = ref('');
const repoDesc = ref('');

const handleSubmitData = async (e) => {
  const repoData = {
    name: repoName.value,
    description: repoDesc.value,
    private: false, // or true if you want to create a private repository
  };

  if (repoData.name && repoData.description) {
    try {
      const response = await fetch('https://api.github.com/user/repos', {
        method: 'POST',
        headers: {
          "Accept": "application/vnd.github+json",
          "Authorization": `Bearer ${apiToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(repoData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Repository created:', result);
      open.value = false; // Close the modal on success
    } catch (error) {
      console.error('Error creating repository:', error);
    }
    open.value = false;
  } else {
    open.value = true;
  }

  repoName.value = '';
  repoDesc.value = '';
};
</script>

<template>
  <div>
    <button class="border-2 mb-[10px] border-black p-[10px] rounded-md" @click="open = true">
      Add New Repo
    </button>

    <div v-if="open" class="modal p-[10px] rounded-md bg-gray-500">
      <form @submit.prevent="handleSubmitData">
        <div>
          <label for="name">Name Of Repo</label><br />
          <input v-model="repoName" class="w-full h-[35px] pl-2 outline-none" type="text" />
        </div>
        <div class="mt-[10px]">
          <label for="discription">Discription Of Repo</label><br />
          <input v-model="repoDesc" class="w-full h-[35px] pl-2 outline-none" type="text" />
        </div>
        <button
          class="mt-[10px] bg-green-400 mb-[5px] border px-[20px] py-[8px] rounded-md"
          type="submit"
        >
          Create Repo
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  z-index: 999;
  top: 20%;
  left: 50%;
  width: 400px;
  margin-left: -170px;
}
</style>
