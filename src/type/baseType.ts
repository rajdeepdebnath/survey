export interface BaseType {
  loading: boolean;
  error: string | undefined | null;
}

export enum API_STATUS {
  IDLE,
  PENDING,
  FULLFILED,
  REJECTED,
}
