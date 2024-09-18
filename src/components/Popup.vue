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
          <q-btn
            unelevated
            class="q-mt-md"
            color="primary"
            label="Подробнее"
            align="center"
            @click="openObject"
          />
        </q-card-section>
      </q-card-section>
    </q-card>
  </transition>
</template>
<script setup lang="ts">
import useMap from 'src/hooks/useMap';
import { useMapStore } from 'src/stores/map';
import { computed, ref, watch } from 'vue';

defineOptions({
  name: 'Popup',
});

const mapStore = useMapStore();
const { map } = useMap();

const objectId = ref('');
const popupCords = ref([0, 0]);

const isPopupShowed = computed(() => !!mapStore.hoveredObject);

const openObject = () => {
  mapStore.setSelectedObject(mapStore.hoveredObject);
};

watch(isPopupShowed, () => {
  if (mapStore.hoveredObject) {
    popupCords.value = map.value?.getPixelFromCoordinate(
      (mapStore.hoveredObject as any).getGeometry().getCoordinates()
    ) as Array<number>;
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
  top: v-bind('(popupCords[1] - 55) + "px"');
  left: v-bind('popupCords[0] + 5 + "px"');
}
</style>
