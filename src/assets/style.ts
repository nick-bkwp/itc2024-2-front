import { Style, Stroke } from 'ol/style';

const lineStyle = new Style({
  stroke: new Stroke({
    color: '#0000CC', // Red color
    width: 4, // Line width
  }),
});

export default lineStyle;
