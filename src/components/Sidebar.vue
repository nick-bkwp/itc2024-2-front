<template>
  <transition
    appear
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
  >
    <div class="sidebar" v-show="isSidebarShowed">
      <div class="row">
        <q-btn
          flat
          icon="close"
          @click="() => mapStore.clearSelectedObject()"
        />
        <div v-if="objectInfo" class="text-h6 q-mt-sm q-mb-xs">
          {{ objectInfo.title }}
        </div>
      </div>
      <div class="column q-pa-md q-pt-md">
        <div class="column q-gutter-sm">
          <div class="row">
            <span class="text-dark col-3">Описание:</span>
            <div class="col-9">{{ objectInfo?.description }}</div>
          </div>
          <div class="row">
            <div class="text-dark col-3">Заказчик:</div>
            <div class="col-9">{{ objectInfo?.customer }}</div>
          </div>
          <div class="row">
            <span class="text-dark col-3">Исполнитель:</span>
            <div class="col-9">{{ objectInfo?.contractor }}</div>
          </div>
          <div class="row">
            <span class="text-dark col-3">Ответственный:</span>
            <div class="col-9">{{ objectInfo?.responsible }}</div>
          </div>
          <div class="row">
            <span class="text-dark col-3">Дата начала работ:</span>
            <div class="col-9">{{ objectInfo?.startDate }}</div>
          </div>
          <div class="row">
            <span class="text-dark col-3">Дата окончания работ:</span>
            <div class="col-9">{{ objectInfo?.endDate }}</div>
          </div>
        </div>
      </div>
      <!-- <div class="text-h3">Диаграмма процесса</div> -->
    </div>
  </transition>
</template>
<script setup lang="ts">
import { useMapStore } from 'src/stores/map';
import { computed, onMounted, ref, watch } from 'vue';
import getRoadInfo from 'src/api/getRoadInfo';
import Feature from 'ol/Feature';

const mapStore = useMapStore();

const objectInfo = ref();

const isSidebarShowed = computed(() => !!mapStore.selectedObject);

const loadData = () => {
  return {
    title: 'Ремонт дороги',
    description:
      'Реконструкция автомобильной дороги на участке км. 3 + 300 - км. 41 + 150',
    customer:
      'КУ "Управление автомобильных дорог Брянской области" г. Брянска ул. Дуки 80',
    contractor: 'АО Брянскавтодор т. (056) 123-45-67',
    responsible: 'Брянскавтодор, Михайлов Михайл Михайлович',
    startDate: '01.01.2022',
    endDate: '31.12.2022',
  };
};

watch(isSidebarShowed, () => {
  if (mapStore.selectedObject) {
    const feature = mapStore.getSelectedObject() as unknown as Feature;
    getRoadInfo(feature.getId() as string).then((res) => {
      console.log(res);
    });
  }
});
</script>
<style lang="scss" scoped>
.sidebar {
  position: absolute;
  background-color: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  padding: 10px;
  right: 0;
  top: 100px;
  z-index: 1000;
  max-width: 500px;
}
</style>
