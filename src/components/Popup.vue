<template>
  <q-card v-show="isPopupShowed" class="popup" flat bordered>
    <q-card-section horizontal>
      <q-card-section class="q-pt-xs">
        <div class="text-overline">Паспорт объекта</div>
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
</template>
<script setup lang="ts">
import { useMapStore } from 'src/stores/map';
import { computed } from 'vue';

defineOptions({
  name: 'Popup',
});

const mapStore = useMapStore();

const isPopupShowed = computed(() => !!mapStore.hoveredObject);
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
