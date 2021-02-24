<template>
  <div class="bg-white p-3 rounded shadow space-y-3 max-w-md">
    <p class="text-gray-800 font-bold text-lg leading-5 col-span-2">
      {{ title }}
    </p>
    <div class="flex flex-row space-x-2">
      <label class="flex flex-col space-y-1 w-full">
        <span class="text-gray-700">Start</span>
        <input
          v-model="start"
          type="number"
          class="border border-gray-400 rounded p-1 block"
          :min="actualMin"
          :max="actualMax"
        />
      </label>
      <label class="flex flex-col space-y-1 w-full">
        <span class="text-gray-700">End</span>
        <input
          v-model="end"
          type="number"
          class="border border-gray-400 rounded p-1 block"
          :min="actualMin"
          :max="actualMax"
        />
      </label>
    </div>
    <div class="flex flex-row space-x-4">
      <svg class="shadow-inner bg-gray-100 w-40 h-40" viewbox="0 0 160 160">
        <defs>
          <marker
            id="dot"
            viewBox="0 0 10 10"
            refX="5"
            refY="5"
            markerWidth="5"
            markerHeight="5"
          >
            <circle cx="5" cy="5" r="5" class="fill-current text-green-800" />
          </marker>
        </defs>
        <path ref="path" :d="d" stroke="black" stroke-width="3px" fill="none" />
        <line
          x1="0"
          y1="0"
          :x2="x1 * 1.6"
          :y2="y1 * 1.6"
          stroke-width="2px"
          class="stroke-current text-green-500"
          marker-end="url(#dot)"
        />
        <line
          x1="160"
          y1="160"
          :x2="(100 - x2) * 1.6"
          :y2="(100 - y2) * 1.6"
          stroke-width="2px"
          class="stroke-current text-green-500"
          marker-end="url(#dot)"
        />
      </svg>
      <div class="flex flex-col space-y-2 items-stretch flex-grow">
        <label class="flex flex-row space-x-2 items-center">
          <span class="text-gray-700">x1</span>
          <input
            v-model="x1"
            type="number"
            class="border border-gray-400 rounded p-1 flex-grow block"
            min="0"
            max="100"
          />
        </label>
        <label class="flex flex-row space-x-2 items-center">
          <span class="text-gray-700">y1</span>
          <input
            v-model="y1"
            type="number"
            class="border border-gray-400 rounded p-1 flex-grow block"
            min="0"
            max="100"
          />
        </label>
        <label class="flex flex-row space-x-2 items-center">
          <span class="text-gray-700">x2</span>
          <input
            v-model="x2"
            type="number"
            class="border border-gray-400 rounded p-1 flex-grow block"
            min="0"
            max="100"
          />
        </label>
        <label class="flex flex-row space-x-2 items-center">
          <span class="text-gray-700">y2</span>
          <input
            v-model="y2"
            type="number"
            class="border border-gray-400 rounded p-1 flex-grow block"
            min="0"
            max="100"
          />
        </label>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'CurveEditor',
  props: {
    title: {
      type: String,
      required: true,
    },
    min: {
      type: Number,
      required: true,
    },
    max: {
      type: Number,
      required: true,
    },
    defaultStart: {
      type: Number,
      required: true,
    },
    defaultEnd: {
      type: Number,
      required: true,
    },
  },
  setup(props, { emit }) {
    const path = ref(null)

    const start = ref<number>(props.defaultStart)
    const end = ref<number>(props.defaultEnd)

    const x1 = ref(25)
    const y1 = ref(0)
    const x2 = ref(25)
    const y2 = ref(0)
    const d = computed(
      () =>
        `M 0 0 C ${x1.value * 1.6} ${y1.value * 1.6}, ${
          (100 - x2.value) * 1.6
        } ${(100 - y2.value) * 1.6}, 160, 160`
    )

    watch(
      [x1, y1, x2, y2, start, end],
      () => {
        emit('input', {
          // x1: x1.value * 0.01,
          // y1: (100 - y1.value) * 0.01,
          // x2: x2.value * 0.01,
          // y2: (100 - y2.value) * 0.01,
          curve: [
            x1.value * 0.01,
            y1.value * 0.01,
            x2.value * 0.01,
            y2.value * 0.01,
          ],
          start: start.value,
          end: end.value,
        })
      },
      { immediate: true }
    )

    const actualMin = computed(() => Math.min(props.min, props.max))
    const actualMax = computed(() => Math.max(props.min, props.max))

    return {
      actualMin,
      actualMax,
      start,
      end,
      x1,
      y1,
      x2,
      y2,
      d,
      path,
    }
  },
})
</script>
