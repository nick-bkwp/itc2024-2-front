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
import useMap from 'src/hooks/useMap';
import usePoint from 'src/hooks/usePoint';
import useDrawing from 'src/hooks/useDrawing';
import GeoJSON from 'ol/format/GeoJSON';
import { Style, Stroke } from 'ol/style';
import { useMapStore } from 'src/stores/map';
import Popup from 'src/components/Popup.vue';

const geojsonData = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'MultiLineString',
        coordinates: [
          [
            [-10, 40],
            [-20, 45],
            [-30, 50],
          ],
          [
            [-15, 35],
            [-25, 40],
            [-35, 45],
          ],
        ],
      },
      properties: {
        name: 'Example MultiLineString',
      },
    },
  ],
};

const mapStore = useMapStore();

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
  map.value.getLayers().push(
    new VectorLayer({
      source: new VectorSource({
        // TODO: отрисовывать попап/открывать диалог по точкам. научиться вытаскивать их position
        features: [
          createPoint(34.56, 53.2, 'Объект 1'),
          createPoint(34.59, 53.19, 'Замена дорожного полотна'),
          createPoint(34.56, 53.1, 'Расширение полосы'),
          createPoint(34.68, 53.5, 'Ремонт повреждений'),
        ],
      }),
    })
  );

  vectorLayer.value = new VectorLayer({
    source: new VectorSource({
      features: new GeoJSON().readFeatures(geojsonData, {
        featureProjection: 'EPSG:3857',
      }),
    }),
    style: new Style({
      stroke: new Stroke({
        color: 'blue',
        width: 2,
      }),
    }),
  });

  map.value?.addLayer(vectorLayer.value);

  map.value.on('click', (event) => {
    if (map.value) {
      const feature = map.value.forEachFeatureAtPixel(
        event.pixel,
        (feature) => {
          return feature;
        }
      );

      if (feature) {
        mapStore.setSelectedObject(feature);
      }
    }
  });

  map.value.on('pointermove', (e) => {
    const feature = map.value?.forEachFeatureAtPixel(
      e.pixel,
      function (feature, layer) {
        return feature;
      }
    );
    if (feature) {
      mapStore.setHoveredObject(feature);
      console.log(feature.get('name'));
    } else {
      mapStore.clearHoveredObject();
    }
  });

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
