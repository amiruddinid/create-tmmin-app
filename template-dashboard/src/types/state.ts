export type BaseStateEntity = {
  status: 'idle' | 'loading' | 'success' | 'error';
  lastUpdated: null | number;
  lastAction: null | string;
};

export type StateEntity<T> = {
  [K in keyof T]: T[K];
} & BaseStateEntity;
