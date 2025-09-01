import { defineStore } from "pinia";
import type { Modal, ModalOptions, ModalType } from "./models";
import GoalEditModal from "../components/modals/GoalEditModal.vue";
import { markRaw } from "vue";

const modalTypeToComponent = {
  'GoalEditModal': markRaw(GoalEditModal),
};

export const useModalsStore = defineStore('modals', {
  state: () => ({
    currentModal: null  as Modal | null,
  }),
  actions: {
    open(type: ModalType, options: ModalOptions = {}) {
      if (options.props === undefined) {
        options.props = {};
      }
      if (options.events === undefined) {
        options.events = {};
      }
      const component = modalTypeToComponent[type];
      this.currentModal = { component, options };
    },
    closeCurrent() {
      this.currentModal = null;
    }
  }
})