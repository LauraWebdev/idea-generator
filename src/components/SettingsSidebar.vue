<template>
    <aside>
        <div class="branding">
            <img :src="ApertureOnLight" class="on-light" alt="Aperture Science" />
            <img :src="ApertureOnDark" class="on-dark" alt="Aperture Science" />
            <button
                @click="handleToggleThemeClick"
            >
                <span class="mdi mdi-theme-light-dark"></span>
            </button>
        </div>

        <section class="options">
            <div class="tabs">
                <div
                    :class="`tab ${activeTab === 'elements' ? 'active' : ''}`"
                    @click="handleTabClick('elements')"
                >
                    <div class="label">Elements</div>
                    <div class="active-indicator"></div>
                </div>
                <div
                    :class="`tab ${activeTab === 'options' ? 'active' : ''}`"
                    @click="handleTabClick('options')"
                >
                    <div class="label">Options</div>
                    <div class="active-indicator"></div>
                </div>
            </div>
            <section
                v-if="activeTab === 'elements'"
                class="tab-elements"
            >
                <div class="quick-filters">
                    <button @click="filterElements('all')">All</button>
                    <button @click="filterElements('none')">None</button>
                    <button @click="filterElements('portal1')">Portal 1</button>
                    <button @click="filterElements('portal2')">Portal 2</button>
                </div>
                <SettingsItem
                    v-for="(element, index) in elements"
                    :key="index"
                    :element="element"
                    :active="activeElements.includes(element)"
                    @click="toggleElement(element)"
                />
            </section>
            <section
                v-if="activeTab === 'options'"
                class="tab-options"
            >
                <div class="option">
                    <label
                        for="optionRooms"
                    >
                        Rooms
                    </label>
                    <input
                        id="optionRooms"
                        v-model="optionRooms"
                        type="range"
                        min="1"
                        max="10"
                    />
                    <div class="value">{{ optionRooms }}</div>
                </div>
                <div class="option">
                    <label
                        for="optionElementsPerRoom"
                    >
                        Elements per room
                    </label>
                    <input
                        id="optionElementsPerRoom"
                        v-model="optionElementsPerRoom"
                        type="range"
                        min="1"
                        max="20"
                    />
                    <div class="value">{{ optionElementsPerRoom }}</div>
                </div>
            </section>
        </section>

        <section class="actions">
            <button
                @click="handleClearClick"
            >
                <span class="mdi mdi-trash-can-outline"></span>
                <span>Clear</span>
            </button>
            <button
                class="primary"
                @click="handleGenerateClick"
            >
                <span class="mdi mdi-shuffle"></span>
                <span>Generate</span>
            </button>
        </section>
    </aside>
</template>

<script setup lang="ts">
import {ref} from 'vue';

const emit = defineEmits(['generate', 'clear', 'toggleTheme']);

import ApertureOnLight from '../assets/apertureOnLight.svg';
import ApertureOnDark from '../assets/apertureOnDark.svg';
import SettingsItem from './SettingsItem.vue';
import {TTestElement} from '../elements';

const props = defineProps({
    elements: {
        type: Array,
        required: true,
    },
});

const activeElements = ref([...props.elements] as TTestElement[]);
const activeTab = ref('elements');

const toggleElement = (element: TTestElement) => {
    let index = activeElements.value.indexOf(element);
    if(index !== -1) {
        activeElements.value.splice(index, 1);
    } else {
        activeElements.value.push(element);
    }
};

const optionRooms = ref(1);
const optionElementsPerRoom = ref(3);

const handleToggleThemeClick = () => {
    emit('toggleTheme');
};

const handleClearClick = () => {
    emit('clear');
};

const handleGenerateClick = () => {
    emit('generate', {
        elements: activeElements.value,
        rooms: optionRooms.value,
        elementsPerRoom: optionElementsPerRoom.value,
    });
};

const handleTabClick = (newTab: string) => {
    activeTab.value = newTab;
};

const filterElements = (filter: string) => {
    switch(filter) {
    default:
    case 'all':
        activeElements.value = [...props.elements] as TTestElement[];
        break;
    case 'none':
        activeElements.value = [];
        break;
    case 'portal1':
        activeElements.value = [...props.elements.filter((item: TTestElement) => item.games.includes('portal1'))] as TTestElement[];
        break;
    case 'portal2':
        activeElements.value = [...props.elements.filter((item: TTestElement) => item.games.includes('portal2'))] as TTestElement[];
        break;
    }
};
</script>

<style lang="scss" scoped>
aside {
    background: #fff;
    box-shadow: 10px 0 40px rgba(0,0,0,0.07);
    display: grid;
    grid-template-rows: auto 1fr auto;
    height: 100vh;

    & .branding {
        display: grid;
        padding: 25px;
        grid-template-columns: 1fr auto;
        align-items: center;
        gap: 15px;

        & img {
            height: 30px;

            &.on-light {
                display: block;
            }
            &.on-dark {
                display: none;
            }
        }

        & button {
            border: 0;
            background: rgba(0,0,0,0.14);
            font-family: 'Work SansVariable', sans-serif;
            font-size: 16px;
            font-weight: 500;
            height: 40px;
            width: 40px;
            border-radius: 100px;
            display: flex;
            gap: 7px;
            align-items: center;
            justify-content: center;

            & .mdi {
                font-size: 18px;
            }

            &:hover {
                background: rgba(0,0,0,0.21);
                cursor: pointer;
            }
            &:active {
                background: rgba(0,0,0,0.28);
            }
        }
    }

    & .options {
        display: grid;
        grid-template-rows: auto 1fr;
        overflow: hidden;

        & .tabs {
            display: flex;
            border-bottom: 1px solid rgba(0,0,0,0.14);

            & .tab {
                flex-grow: 1;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                font-size: 18px;

                & .label {
                    padding: 14px 10px 10px;
                }
                & .active-indicator {
                    height: 4px;
                    background: transparent;
                    width: 70px;
                    border-top-left-radius: 6px;
                    border-top-right-radius: 6px;
                }

                &:hover {
                    background: rgba(0,0,0,0.07);
                    cursor: pointer;
                }
                &:active {
                    background: rgba(0,0,0,0.14);
                }
                &.active {
                    color: #fe7d24;

                    & .active-indicator {
                        background: #fe7d24;
                    }
                }
            }
        }

        & .tab-elements {
            padding: 25px;
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 15px;
            align-content: flex-start;
            height: 100%;
            overflow-y: auto;

            & .quick-filters {
                grid-column: 1 / span 5;
                display: flex;
                gap: 10px;

                & button {
                    border: 0;
                    background: rgba(0,0,0,0.14);
                    font-family: 'Work SansVariable', sans-serif;
                    font-size: 14px;
                    font-weight: 500;
                    height: 25px;
                    padding: 0 15px;
                    border-radius: 100px;
                    display: flex;
                    align-items: center;

                    &:hover {
                        background: rgba(0,0,0,0.21);
                        cursor: pointer;
                    }
                    &:active {
                        background: rgba(0,0,0,0.28);
                    }
                }
            }
        }
        & .tab-options {
            padding: 25px;
            display: flex;
            flex-direction: column;
            gap: 25px;

            & .option {
                display: grid;
                grid-template-columns: 1fr 60px;
                gap: 5px 15px;
                align-items: center;

                & label {
                    grid-column: 1 / span 2;
                    font-weight: 600;
                }

                & input[type='range'] {
                    overflow: hidden;
                    width: 100%;
                    height: 12px;
                    border-radius: 100px;
                    -webkit-appearance: none;
                    background-color: rgba(0,0,0,0.07);

                    &::-webkit-slider-runnable-track {
                        height: 10px;
                        -webkit-appearance: none;
                        color: #fe7d24;
                        margin-top: -1px;
                    }

                    &::-webkit-slider-thumb {
                        width: 10px;
                        -webkit-appearance: none;
                        height: 10px;
                        cursor: ew-resize;
                        background: #fe7d24;
                        box-shadow: -1000px 0 0 1000px #fe7d24;
                    }
                }

                & .value {
                    background: rgba(0,0,0,0.07);
                    height: 30px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 6px;
                }
            }
        }
    }

    & .actions {
        border-top: 1px solid rgba(0,0,0,0.14);
        padding: 25px;
        display: flex;
        gap: 15px;
        justify-content: flex-end;

        & button {
            border: 0;
            background: rgba(0,0,0,0.14);
            font-family: 'Work SansVariable', sans-serif;
            font-size: 16px;
            font-weight: 500;
            height: 40px;
            padding: 0 20px;
            border-radius: 100px;
            display: flex;
            gap: 7px;
            align-items: center;

            & .mdi {
                width: 24px;
                height: 24px;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 22px;
            }

            &:hover {
                background: rgba(0,0,0,0.21);
                cursor: pointer;
            }
            &:active {
                background: rgba(0,0,0,0.28);
            }

            &.primary {
                background: #fe7d24;
                color: #222;

                &:hover {
                    background: darken(#fe7d24, 10);
                    cursor: pointer;
                }
                &:active {
                    background: darken(#fe7d24, 20);
                }
            }
        }
    }
}

body[theme='dark'] {
    aside {
        background: #222;
        box-shadow: none;
        border-right: 1px solid rgba(255, 255, 255, 0.14);

        & .branding {
            & button {
                background: rgba(255, 255,255, 0.14);
                color: #fff;

                &:hover {
                    background: rgba(255, 255,255, 0.21);
                }

                &:active {
                    background: rgba(255, 255,255, 0.28);
                }
            }
        }

        & .tabs {
            border-bottom: 1px solid rgba(255, 255, 255, 0.14);

            & .tab {
                &:hover {
                    background: rgba(255,255,255,0.07);
                }
            }
        }

        & .tab-elements {
            & .quick-filters {
                & button {
                    background: rgba(255,255,255,0.14);
                    color: #fff;

                    &:hover {
                        background: rgba(255,255,255,0.21);
                    }
                    &:active {
                        background: rgba(255,255,255,0.28);
                    }
                }
            }
        }

        & .tab-options {
            & .option {
                & input[type='range'] {
                    background-color: rgba(255, 255, 255,0.07);
                }

                & .value {
                    background: rgba(255,255,255,0.07);
                }
            }
        }

        & .actions {
            border-top: 1px solid rgba(255,255,255,0.14);

            & button {
                background: rgba(255,255,255,0.14);
                color: #fff;

                &:hover {
                    background: rgba(255,255,255,0.21);
                }
                &:active {
                    background: rgba(255,255,255,0.28);
                }

                &.primary {
                    background: #fe7d24;
                    color: #222;

                    &:hover {
                        background: darken(#fe7d24, 10);
                        cursor: pointer;
                    }
                    &:active {
                        background: darken(#fe7d24, 20);
                    }
                }
            }
        }

        & .on-light {
            display: none;
        }
        & .on-dark {
            display: block;
        }
    }
}
</style>
