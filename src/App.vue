<template>
    <IntroScreen />
    <SettingsSidebar
        :elements="allElements"
        @clear="clear"
        @generate="generate"
        @toggle-theme="toggleTheme"
    />
    <TestVisualizer
        :test="generatedTest"
    />
</template>

<script setup lang="ts">
import SettingsSidebar from './components/SettingsSidebar.vue';
import DefaultElements from './elements';
import {ref} from 'vue';
import {Test} from './generator';
import TestVisualizer from './components/TestVisualizer.vue';
import IntroScreen from './components/IntroScreen.vue';

const allElements = ref([...DefaultElements]);
const generatedTest = ref(new Test());


const getMediaPreference = () => {
  const hasDarkPreference = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  if (hasDarkPreference) {
    return "dark";
  } else {
    return "light";
  }
};

const theme = ref(localStorage.getItem('theme') ?? getMediaPreference());

const clear = () => {
    generatedTest.value.generate([], 1, 3);
};

const generate = (options: any) => {
    generatedTest.value.generate(
        options.elements,
        options.rooms,
        options.elementsPerRoom,
    );
};

const toggleTheme = () => {
    if(theme.value === 'light') {
        theme.value = 'dark';
    } else {
        theme.value = 'light';
    }

    localStorage.setItem('theme', theme.value);
    document.body.setAttribute('theme', theme.value);
};


document.body.setAttribute('theme', theme.value);


</script>

<style scoped>
</style>
