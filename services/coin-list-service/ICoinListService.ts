import { BaseResponse } from '@/models';

export interface ICoinListService {
  coinList(): Promise<BaseResponse<any>>;
}