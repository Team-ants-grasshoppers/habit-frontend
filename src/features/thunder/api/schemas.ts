export interface CreateThunderRequest {
  title: string;
  description: string;
  category: string;
  region: string;
  time: string;
  img_id?: number;
}

/** ### 생성된 모임 ID
 */
export interface CreateThunderResponse {
  thunderId: number;
}

export type ThunderDetailResponse = {
  thunderName: string;
  description: string;
  category: string;
  region: string;
  dateTime: string;
  imageUrl: string;
};

export type ThunderListResponse = {
  thunderId: number;
  thunderName: string;
  category: string;
  region: string;
  dateTime: string;
  imageUrl: string;
}[];
