<template>
  <transition
    appear
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
  >
    <q-card v-show="isPopupShowed" class="popup" flat bordered>
      <q-card-section horizontal>
        <q-card-section class="q-pt-xs">
          <div class="text-overline">Паспорт объекта {{ objectId }}</div>
          <div class="text-h6 q-mt-sm q-mb-xs">
            Реконструкция автомобильной дороги на участке км. 3 + 300 - км. 41 +
            150
          </div>
          <div class="text-caption text-darkgrey">
            Заказчик: КУ "Управление автомобильных дорог Брянской области"
          </div>
        </q-card-section>
      </q-card-section>
    </q-card>
  </transition>
</template>
<script setup lang="ts">
import { useMapStore } from 'src/stores/map';
import { computed, ref, watch } from 'vue';

defineOptions({
  name: 'Popup',
});

const mapStore = useMapStore();

const objectId = ref('');

const isPopupShowed = computed(() => !!mapStore.hoveredObject);
watch(isPopupShowed, () => {
  if (mapStore.hoveredObject) {
    console.log(mapStore.hoveredObject);
    objectId.value = (mapStore.hoveredObject as any).values_.name;
  }
});
</script>
<style lang="scss" scoped>
.popup {
  position: absolute;
  background-color: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  width: 40vw;
}
</style>
