import { defineStore } from "pinia";
import type { Goal } from "../api/types/goal.type";
import { GoalsClient } from "../api/clients/goals.client";
import type { StoreActionOptions } from "./models";

export const useGoalsStore = defineStore('goals', {
  state: () => ({
    goals: [] as Goal[],
  }),
  getters: {
    hasAnyCurrentGoal(): boolean {
      return this.goals.length > 0;
    }
  },
  actions: {
    async fetchGoals() {
      this.goals = await GoalsClient.getAll();
    },
    async updateGoal(goal: Goal, options: StoreActionOptions = {}) {
      const updatedGoal = await GoalsClient.updateOne(goal.id, goal);
  
      if (options.refreshAll) {
        await this.fetchGoals();
      } else {
        this.findAndReplaceGoal(goal.id, updatedGoal);
      }
      return updatedGoal;
    },
    findAndReplaceGoal(id: number, updatedGoal: Goal) {
      const index = this.goals.findIndex(g => g.id === id);
      if (index !== -1) {
        this.goals[index] = updatedGoal;
      }
    }
  },
});
