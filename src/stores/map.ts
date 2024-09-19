import { defineStore } from 'pinia';

export const useMapStore = defineStore('map', {
  state: () => ({
    hoveredObject: null,
    selectedObject: null,
    startingEvent: false,
  }),
  actions: {
    setHoveredObject(hoveredObject: any) {
      this.hoveredObject = hoveredObject;
    },

    clearHoveredObject() {
      this.hoveredObject = null;
    },

    setSelectedObject(selectedObject: any) {
      this.selectedObject = selectedObject;
    },

    clearSelectedObject() {
      this.selectedObject = null;
    },

    getSelectedObject() {
      return this.selectedObject;
    },

    startEvent() {
      this.startingEvent = true;
    },

    endEvent() {
      this.startingEvent = false;
    },
  },
});
