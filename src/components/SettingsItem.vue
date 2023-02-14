<template>
    <div
        :class="`item ${active ? 'active' : ''}`"
        @click="handleClick"
    >
        <img
            :src="`elements/${element.key}.png`"
            :alt="element.name"
        />
        <!-- {{ element.name }} -->
    </div>
</template>

<script setup lang="ts">
import {TTestElement} from '../elements';
import {PropType} from 'vue';

const emit = defineEmits(['click']);

defineProps({
    element: {
        type: Object as PropType<TTestElement>,
        required: true,
    },
    active: {
        type: Boolean,
        required: true,
        default: false,
    },
});

const handleClick = () => {
    emit('click');
};
</script>

<style lang="scss" scoped>
.item {
    user-select: none;
    background: rgba(0,0,0,0.07);
    border-radius: 6px;
    aspect-ratio: 1 / 1;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 3px solid transparent;
    overflow: hidden;
    word-break: break-word;
    text-align: center;
    font-size: 10px;
    font-weight: 600;

    &:hover {
        background: rgba(0,0,0,0.14);
        cursor: pointer;
    }
    &.active {
        background: rgba(254, 125, 36, 0.2);
        border-color: #fe7d24;

        &:hover {
            background: rgba(254, 125, 36, 0.3);
        }
    }

    & img {
        max-width: 100%;
        max-height: 100%;
    }
}

body[theme='dark'] {
    & .item {
        background: rgba(255,255,255,0.07);
    }
}
</style>
