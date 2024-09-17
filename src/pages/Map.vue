<template>
  <q-page class="row items-center justify-evenly">
    <div id="map" class="map"></div>
  </q-page>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import useMap from 'src/hooks/useMap';
import usePoint from 'src/hooks/usePoint';
import { Map } from 'ol';

const map = ref<Map>();

const { initMap } = useMap();
const { createPoint } = usePoint();

onMounted(() => {
  map.value = initMap('map');

  map.value.getLayers().push(
    new VectorLayer({
      source: new VectorSource({
        // TODO: отрисовывать попап/открывать диалог по точкам. научиться вытаскивать их position
        features: [createPoint(60.56, 56.8, 'test')],
      }),
    })
  );

  map.value.on('pointermove', (e) => {
    const feature = map.value?.forEachFeatureAtPixel(
      e.pixel,
      function (feature, layer) {
        return feature;
      }
    );
    if (feature) {
      console.log(feature.get('name'));
    }
  });
});
</script>
<style lang="scss" scoped>
.map {
  width: 100%;
  height: 100vh;
}

:deep {
  .ol-attribution {
    display: none;
  }
}
</style>
