import { del, get, post, put } from '@/app/api/api';
import { IGetAllItemsResponse } from '@/types/ApiResponse';
import { IParamsGetItems, IPayloadCreateItem } from '@/types/paramTypes';

export async function getItems(params: IParamsGetItems) {
  return await get<IGetAllItemsResponse>('/admin/invoice/item', { params });
}

export async function postCreateItem(payload: IPayloadCreateItem) {
  return await post('/admin/invoice/item', payload);
}

export async function putUpdateItem(payload: IPayloadCreateItem) {
  return await put('/admin/invoice/item/' + payload.id, payload);
}

export async function deleteItem(id: number[]) {
  return await del('/admin/invoice/item/', {
    data: {
      ids: id,
    },
  });
}
