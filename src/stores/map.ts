import { defineStore } from 'pinia';

export const useMapStore = defineStore('map', {
  state: () => ({
    hoveredObject: null,
  }),
  getters: {},
  actions: {
    setHoveredObject(hoveredObject: any) {
      this.hoveredObject = hoveredObject;
    },

    clearHoveredObject() {
      this.hoveredObject = null;
    },
  },
});
