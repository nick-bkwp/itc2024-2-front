<template>
  <q-page class="row items-center justify-evenly">
    <button @click="toggleDrawingMode" class="absolute-button">
      {{ isDrawing ? 'Save' : 'Draw Line' }}
    </button>
    <div id="map" class="map"></div>
    <Popup />
    <q-fab
      class="absolute fab"
      color="purple"
      icon="keyboard_arrow_up"
      direction="up"
    >
      <q-fab-action
        external-label
        label-position="left"
        label="Создание объекта дороги"
        color="primary"
        icon="draw"
      />
      <q-fab-action
        external-label
        label-position="left"
        label="Создание события реконструкции"
        color="secondary"
        icon="architecture"
      />
    </q-fab>
  </q-page>
</template>
<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import OSM from 'ol/source/OSM';
import Draw from 'ol/interaction/Draw';
import useMap from 'src/hooks/useMap';
import { MultiLineString } from 'ol/geom';
import { Feature } from 'ol';
import usePoint from 'src/hooks/usePoint';
import useDrawing from 'src/hooks/useDrawing';

const { initMap } = useMap();
const { initDrawing } = useDrawing();
const { createPoint } = usePoint();
const map = ref();

const drawSource = new VectorSource({ wrapX: false });
const drawLayer = new VectorLayer({
  source: drawSource,
});

const vectorSource = new VectorSource({ wrapX: false });
const vectorLayer = new VectorLayer({
  source: vectorSource,
});

const { toggleDrawingMode, handleKeyDown, isDrawing } = initDrawing(
  map,
  drawSource,
  vectorSource
);

onMounted(() => {
  map.value = initMap('map', [vectorLayer, drawLayer]);
  vectorSource.addFeature(createPoint(60.56, 56.8, 'test'));

  window.addEventListener('keydown', handleKeyDown);
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown);
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

.fab {
  bottom: 20px;
  right: 20px;
}
</style>
