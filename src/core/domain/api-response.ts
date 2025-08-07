

export interface ApiResponse<T = any> {
  traceId: string;
  message?: string;
  additionalData: Map<string, any>;
  content?: T;
}

export interface ApiPagedResponse<T = any>{
  message?: string;
  additionalData: Map<string, any>;
  content?: T[];
  rowsCount: number;
  pagesCount: number;
}


