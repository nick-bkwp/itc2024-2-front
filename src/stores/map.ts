import { defineStore } from 'pinia';

export const useMapStore = defineStore('map', {
  state: () => ({
    hoveredObject: null,
    selectedObject: null,
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

    getSelectedObjectInfo() {
      debugger;
      return {
        title: (this.selectedObject as any)?.values_?.name,
      };
    },
  },
});
