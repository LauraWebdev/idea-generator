<template>
    <div class="test-item">
        <img
            v-if="isDoor"
            class="door"
            :src="Door"
            alt="Door"
        />
        <img
            v-if="element"
            :src="`elements/${element.key}.png`"
            :alt="element.name"
        />
    </div>
</template>

<script setup lang="ts">
import {TTestElement} from '../elements';
import {PropType} from 'vue';
import Door from '../assets/door.svg';

defineProps({
    element: {
        type: Object as PropType<TTestElement>,
        required: false,
    },
    isDoor: {
        type: Boolean,
        required: false,
        default: false,
    },
});
</script>

<style lang="scss" scoped>
.test-item {
    user-select: none;
    background: rgba(0,0,0,0.07);
    border-radius: 6px;
    width: 100px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    word-break: break-word;
    text-align: center;
    font-size: 10px;
    font-weight: 600;

    & img {
        max-width: 100%;
        max-height: 100%;

        &.door {
            max-width: 75%;
            max-height: 75%;
        }
    }
}

body[theme='dark'] {
    & .test-item {
        background: rgba(255,255,255,0.07);
    }
}
</style>