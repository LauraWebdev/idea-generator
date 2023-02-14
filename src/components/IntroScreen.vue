<template>
    <transition>
        <div v-if="isVisible" class="intro-screen">
            <img :src="ApertureOnLight" class="on-light" alt="Aperture Science" />
            <img :src="ApertureOnDark" class="on-dark" alt="Aperture Science" />
        </div>
    </transition>
</template>

<script setup lang="ts">
import ApertureOnLight from '../assets/apertureOnLight.svg';
import ApertureOnDark from '../assets/apertureOnDark.svg';
import {ref} from 'vue';

const isVisible = ref(true);
setTimeout(() => {
    isVisible.value = false;
}, 1000);
</script>

<style lang="scss" scoped>
.intro-screen {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;

    & img {
        height: 70px;

        &.on-light {
            display: block;
        }
        &.on-dark {
            display: none;
        }
    }
}
.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}

body[theme='dark'] {
    & .intro-screen {
        background: #111;

        & .on-light {
            display: none;
        }
        & .on-dark {
            display: block;
        }
    }
}
</style>