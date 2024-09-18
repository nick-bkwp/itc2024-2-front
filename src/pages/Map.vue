<template>
  <q-page class="row items-center justify-evenly">
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
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import { Style, Stroke } from 'ol/style';
import useMap from 'src/hooks/useMap';
import usePoint from 'src/hooks/usePoint';
import { useMapStore } from 'src/stores/map';

const { initMap } = useMap();
const { createPoint } = usePoint();
const mapStore = useMapStore();

const map = ref<Map>();
const vectorLayer = ref<VectorLayer>();

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
      map.value.forEachFeatureAtPixel(event.pixel, (feature) => {
        alert(`Clicked on: ${feature.get('name')}`);
      });
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

.fab {
  bottom: 20px;
  right: 20px;
}
</style>
