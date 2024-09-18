import { Map, View } from 'ol';
import Layer from 'ol/layer/Layer';
import TileLayer from 'ol/layer/Tile';
import { fromLonLat } from 'ol/proj';
import { OSM } from 'ol/source';
import { ref } from 'vue';

const useMap = () => {
  const initMap = (id: string, layers: Layer[]) => {
    const map = new Map({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        ...layers,
      ],
      target: id,
      view: new View({
        center: fromLonLat([34.56, 53.2], 'EPSG:3857'),
        zoom: 10,
        projection: 'EPSG:3857',
      }),
    });

    return map;
  };

  return { initMap };
};

export default useMap;
