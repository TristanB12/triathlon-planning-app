import { api } from "../../boot/axios";
import type { Goal } from "../types/goal.type";

export class GoalsClient {
  static async getAll(): Promise<Goal[]> {
    const response = await api.get<Goal[]>('/goals');

    return response.data;
  }

  static async getOne(id: number): Promise<Goal> {
    const response = await api.get<Goal>(`/goals/${id}`);

    return response.data;
  }

  static async updateOne(id: number, data: Goal): Promise<Goal> {
    const response = await api.put<Goal>(`/goals/${id}`, data);

    return response.data;
  }
}
