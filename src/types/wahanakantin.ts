export interface Product {
  product_id: string;
  product_name: string;
  unit: string;
  price: number;
  is_active: boolean;
  created_at?: string;
}

export interface TransactionPayload {
  transaction_date: string;
  inputter_name: string;
  product_id: string;
  quantity: number;
  notes?: string;
}

export interface TransactionSuccessData {
  transaction_id: string;
  product_name: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  transaction_date?: string;
  inputter_name?: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}

