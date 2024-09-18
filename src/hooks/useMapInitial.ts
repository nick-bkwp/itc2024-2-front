import { ref } from 'vue';
import { Map, View } from 'ol';

export default function useMapInitial() {
  const map = ref<Map>();

  return {
    map,
  };
}
