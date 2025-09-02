import type { AxiosRequestConfig } from "axios";
import { api } from "../../boot/axios";
import type { ActivitiesFiltering, Activity } from "../types/activity.type";

export class ActivitiesClient {
  static async getAll(filtering: ActivitiesFiltering = {}): Promise<Activity[]> {
    const params: AxiosRequestConfig['params'] = {};

    if (filtering.planned_after) {
      params.planned_after = filtering.planned_after;
    }

    if (filtering.planned_before) {
      params.planned_before = filtering.planned_before;
    }

    const response = await api.get<Activity[]>('/activities', { params });

    return response.data;
  }
}
