<template>
  <q-page class="row items-center justify-evenly">
    <div id="map" class="map"></div>
  </q-page>
</template>
<script setup lang="ts">
import Map from 'ol/Map.js';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile.js';
import View from 'ol/View.js';
import { onMounted, ref } from 'vue';
import { fromLonLat } from 'ol/proj';

const map = ref<Map>();

onMounted(() => {
  map.value = new Map({
    layers: [
      new TileLayer({
        source: new OSM(),
      }),
    ],
    target: 'map',
    view: new View({
      center: fromLonLat([60.56, 56.8], 'EPSG:3857'),
      zoom: 10,
      projection: 'EPSG:3857',
    }),
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
