import { SelectType } from '../common/types';

export interface OrderTypeEntry {
    id: number;
    date: string;
    status: string;
    amount: number;
    location: SelectType;
  }