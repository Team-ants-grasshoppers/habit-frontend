/** ### 모임 생성
 * - clubName: 모임명 (string)
 * - description: 모임 소개글 (string)
 * - category: 관심사 카테고리 (string)
 * - region: 지역명 (string)
 * - imgId?: 대표 이미지 ID (선택)
 */
export interface CreateClubRequest {
  name: string;
  description: string;
  category: string;
  region: string;
  image_id?: number;
}

/** ### 생성된 모임 ID
 */
export interface CreateClubResponse {
  clubId: number;
}

export type ClubDetailResponse = {
  club_id: number;
  name: string;
  description: string;
  category: string;
  region: string;
  imgUrl: string[];
};

export type ClubListResponse = {
  imgUrl: string;
  club_id: number;
  name: string;
  category: string;
}[];
