import type { Component } from "vue"

export interface AppSession {
  access_token: string
  refresh_token: string
  expires_at: number
}


export enum AppStatus {
  UNAUTHENTICATED,
  AUTHENTICATED,
  LOADING,
}

export enum ModalType {
  GoalEditModal = "GoalEditModal",
}

export type ModalOptions = {
  props?: {
    [key: string]: unknown;
  }
  events?: {
    [key: string]: unknown;
  }
}

export type Modal = {
  component: Component
  options: ModalOptions
}

export type StoreActionOptions = {
  refreshAll?: boolean
}