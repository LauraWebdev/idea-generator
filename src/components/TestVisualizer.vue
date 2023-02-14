<template>
    <main>
        <div class="test">
            <TestItem
                :is-door="true"
            />
            <div
                v-for="(room, indexRoom) in test.rooms"
                :key="indexRoom"
                class="room"
            >
                <div class="elements">
                    <TestItem
                        v-for="(element, indexElement) in room.elements"
                        :key="indexElement"
                        :element="element"
                    />
                </div>
                <TestItem
                    v-if="indexRoom + 1 < test.rooms.length"
                    :is-door="true"
                />
            </div>
            <TestItem
                :is-door="true"
            />
        </div>
    </main>
</template>

<script setup lang="ts">
import {PropType} from 'vue';
import {TTest} from '../generator';
import TestItem from './TestItem.vue';

defineProps({
    test: {
        type: Object as PropType<TTest>,
        required: true,
    },
});
</script>

<style lang="scss" scoped>
main {
    overflow-y: scroll;

    & .test {
        margin: 50px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 50px;

        & .room {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 50px;

            & .elements {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                gap: 15px;
            }
        }
    }
}
</style>