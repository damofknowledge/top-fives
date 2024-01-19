<template>
  <div
    class="modal opacity fixed top-0 left-0 z-10 flex h-full w-full overflow-y-auto overflow-x-hidden bg-slate-800/75 p-4 outline-none backdrop-blur-sm transition ease-in-out"
    tabindex="-1"
    aria-labelledby="modalLabel"
    aria-modal="true"
    role="dialog"
  >
    <UseFocusTrap :options="{ immediate: true }" class="relative flex h-full w-full">
      <OnClickOutside
        @trigger="$emit('closeModal')"
        @keyup.esc="$emit('closeModal')"
        class="container pointer-events-auto relative m-auto flex max-h-full w-full flex-col rounded-md border-none bg-slate-900 bg-clip-padding text-neutral-50 text-current shadow-lg outline-none"
      >
        <div
          class="modal-header flex flex-shrink-0 items-center justify-between rounded-t-md border-b border-slate-700 bg-cyan-900 p-4"
        >
          <h2 class="font-serif text-lg font-extrabold tracking-wide" id="modalLabel">
            <slot name="title">Title</slot>
          </h2>
          <button
            type="button"
            data-testid="close-button"
            @click="$emit('closeModal')"
            class="box-content flex items-center justify-center rounded-none border-none p-1 text-xl text-white hover:opacity-75 focus:opacity-75"
          >
            <font-awesome-icon :icon="icons.close" />
            <span class="sr-only">Close Window</span>
          </button>
        </div>
        <div class="modal-body relative overflow-y-auto p-4">
          <slot name="content"></slot>
        </div>
        <div
          v-if="slots.footer"
          class="flex flex-shrink-0 flex-wrap items-center justify-center rounded-b-md border-t border-slate-700 p-4"
        >
          <slot name="footer"> </slot>
        </div>
      </OnClickOutside>
    </UseFocusTrap>
  </div>
</template>

<script setup lang="ts">
import { useSlots } from 'vue';
import { UseFocusTrap } from '@vueuse/integrations/useFocusTrap/component';
import { OnClickOutside } from '@vueuse/components';
import { faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
const slots = useSlots();

const icons = {
  close: faXmarkCircle,
};
</script>

<style></style>
