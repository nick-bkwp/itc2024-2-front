<template>
  <q-page class="row items-center justify-evenly">
    <div id="map" class="map"></div>
    <Popup />
    <q-fab
      v-if="!isDrawing"
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
        @click="toggleDrawingMode"
      />
      <q-fab-action
        external-label
        label-position="left"
        label="Создание события реконструкции"
        color="secondary"
        icon="architecture"
      />
    </q-fab>
    <template v-else>
      <q-btn
        class="absolute-bottom-right q-ma-md"
        round
        color="negative"
        icon="cancel"
        style="margin-bottom: 80px"
        @click="cancelDrawing"
        ><q-tooltip
          :offset="[10, 10]"
          class="overflow-hidden"
          self="center left"
          anchor="center right"
          ><p style="margin: 0; font-size: 16px; text-align: center">
            Отменить создание
          </p></q-tooltip
        ></q-btn
      >
      <q-btn
        class="absolute-bottom-right q-ma-md"
        round
        color="primary"
        icon="save"
        @click="toggleDrawingMode"
        ><q-tooltip
          :offset="[10, 10]"
          class="overflow-hidden"
          self="center left"
          anchor="center right"
          ><p style="margin: 0; font-size: 16px; text-align: center">
            Сохранить объект дороги
          </p></q-tooltip
        ></q-btn
      >
    </template>
  </q-page>
</template>
<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import 'ol/ol.css';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import useMap from 'src/hooks/useMap';
import usePoint from 'src/hooks/usePoint';
import useDrawing from 'src/hooks/useDrawing';
import GeoJSON from 'ol/format/GeoJSON';
import { Style, Stroke } from 'ol/style';
import { useMapStore } from 'src/stores/map';
import Popup from 'src/components/Popup.vue';
import getRoads from 'src/api/getRoads';
import Feature from 'ol/Feature';
import { MultiLineString } from 'ol/geom';
import lineStyle from 'src/assets/style';

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

const { toggleDrawingMode, handleKeyDown, isDrawing, cancelDrawing } =
  initDrawing(map, drawSource, vectorSource);

const getRoadsData = () => {
  getRoads().then((res) => {
    res.map(({ geodata, id, ...obj }) => {
      const commonData = obj['common-data'];
      const allCoordinates = geodata.map(
        ({ geometry }) => geometry.coordinates
      )[0];
      const multiLineString = new MultiLineString(allCoordinates);

      const feature = new Feature({
        geometry: multiLineString,
        ...commonData,
      });

      feature.setId(id);
      feature.setStyle(lineStyle);
      feature.set('common-data', commonData);
      vectorSource.addFeature(feature);
    });
  });
};

onMounted(() => {
  getRoadsData();
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
        // TODO: исключить из обработки новую feature
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
  position: absolute;
  top: -50px;
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
