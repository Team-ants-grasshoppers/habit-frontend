import { FormattedMember, SeparatedMembers } from '../utils/separateMembersByRole';

/** ### 모임 생성/수정 폼
 * - clubName: 모임명 (string)
 * - description: 모임 소개글 (string)
 * - category: 관심사 카테고리 (string)
 * - region: 지역명 (string)
 * - image.url?: 대표 이미지 URL (선택)
 * - image.file?: 대표 이미지 file (선택)
 */
export interface ClubFormData {
  name: string;
  description: string;
  category: string;
  region: string;
  image: {
    url?: string;
    file?: File;
  };
}

/** ### 클럽 상세 정보
 * - imageUrl?: 대표 이미지 URL (선택)
 * - clubName: 클럽 이름
 * - description: 클럽 소개
 */
export interface ClubDetailModel extends SeparatedMembers {
  imageUrl?: string;
  clubName: string;
  description: string;
  category: string;
  region: string;
}

/** ### 클럽 가입 요청
 * - pendingUsers: 가입 대기자 리스트
 * - onApprove: 가입 승인 핸들러
 * - onReject: 가입 거절 핸들러 (선택)
 */
export interface ClubRequestProps {
  pendingUsers: FormattedMember[];
  onApprove: (userId: string) => void;
  onReject?: (userId: string) => void;
}

/** ### 클럽 리스트 아이템
 * - clubId: 클럽 ID (string)
 * - clubName: 클럽 이름 (string)
 * - imageUrl: 클럽 대표 이미지 URL (string)
 */
export interface ClubListItem {
  clubId: string;
  clubName: string;
  clubCategory: string;
  imageUrl: string;
}

/** ### 클럽 리스트
 * - clubListItems: 클럽 리스트 데이터 배열
 * - routePrefix: 라우트 경로 prefix
 */
export interface ClubList {
  clubListItems: ClubListItem[];
}
