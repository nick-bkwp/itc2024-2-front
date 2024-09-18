import { Map } from 'ol';
import VectorSource from 'ol/source/Vector';
import { Ref, ref } from 'vue';
import { LineString, MultiLineString } from 'ol/geom';
import Draw from 'ol/interaction/Draw';
import Feature from 'ol/Feature';

const useDrawing = () => {
  const initDrawing = (
    map: Ref<Map>,
    drawSource: VectorSource,
    vectorSource: VectorSource
  ) => {
    const isDrawing = ref(false);
    const drawInteraction = ref();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && drawInteraction) {
        drawInteraction.value.finishDrawing();
      }
    };

    const toggleDrawingMode = () => {
      if (isDrawing.value) {
        if (drawInteraction.value) {
          drawInteraction.value.finishDrawing();
          map.value.removeInteraction(drawInteraction.value);
          drawInteraction.value = null;
        }

        const features = drawSource.getFeatures();
        if (features.length > 0) {
          const coordinates = features.map((feature) => {
            const geom = feature.getGeometry() as LineString;
            return geom!.getCoordinates();
          });
          const multiLineString = new MultiLineString(coordinates);
          const multiLineFeature = new Feature(multiLineString);
          vectorSource.addFeature(multiLineFeature);
          drawSource.clear();
        }
      } else {
        drawInteraction.value = new Draw({
          source: drawSource,
          type: 'LineString',
          stopClick: true,
          finishCondition: (event) => false,
        });
        if (map.value) {
          map.value.addInteraction(drawInteraction.value);
        }
      }
      isDrawing.value = !isDrawing.value;
    };
    return { handleKeyDown, toggleDrawingMode, isDrawing };
  };
  return { initDrawing };
};

export default useDrawing;
