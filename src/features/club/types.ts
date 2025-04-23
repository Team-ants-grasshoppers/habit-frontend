/** ### 모임 생성/수정 폼에서 사용
 * - mode: 생성('create') | 수정('edit')
 * - clubName: 모임명 (string)
 * - imageUrl?: 대표 이미지 URL (선택)
 * - description: 모임 소개글 (string)
 * - category: 관심사 카테고리 (string)
 * - region: 지역명 (string)
 */
export interface ClubFormValues {
  mode: 'create' | 'edit';
  clubName: string;
  imageUrl?: string;
  description: string;
  category: string;
  region: string;
}

/** ### 클럽 회원(운영진/멤버/대기자) 정보 Props
 * - userId: 유저 ID (string)
 * - nickname: 닉네임 (string)
 * - profileImageUrl: 프로필 사진 URL (string)
 */
export interface ClubMember {
  userId: string;
  nickname: string;
  profileImageUrl: string;
}

/** ### 클럽 운영진/멤버 리스트 출력용 Props
 * - admins: 운영진 리스트
 * - members: 멤버 리스트
 * - isAdmin: 현재 유저가 운영자인지 여부
 * - onBan: 멤버 추방 핸들러 (선택)
 */
export interface ClubMemberListProps {
  admins: ClubMember[];
  members: ClubMember[];
  isAdmin: boolean;
  onBan?: (userId: string) => void;
}

/** ### 클럽 상세 정보
 * - imageUrl?: 대표 이미지 URL (선택)
 * - clubName: 클럽 이름
 * - description: 클럽 소개
 * - admins: 운영진 리스트
 * - members: 멤버 리스트
 * - pendingUsers: 가입 대기자 리스트
 * - isAdmin: 현재 유저가 운영자인지 여부
 * - isMember: 현재 유저가 멤버인지 여부
 * - isPending: 현재 유저가 가입 대기 중인지 여부
 */
export interface ClubDetailModel {
  imageUrl?: string;
  clubName: string;
  description: string;
  admins: ClubMember[];
  members: ClubMember[];
  pendingUsers: ClubMember[];
  isAdmin: boolean;
  isMember: boolean;
  isPending: boolean;
}

/** ### 모임 생성
 * - clubName: 모임명 (string)
 * - description: 모임 소개글 (string)
 * - category: 관심사 카테고리 (string)
 * - region: 지역명 (string)
 * - imgId?: 대표 이미지 ID (선택)
 */
export interface CreateClubRequest {
  clubName: string;
  description: string;
  category: string;
  region: string;
  imgId?: number;
}

/** ### 생성된 모임 ID
 */
export interface CreateClubResponse {
  clubId: number;
}

/** ### 클럽 가입 요청
 * - pendingUsers: 가입 대기자 리스트
 * - onApprove: 가입 승인 핸들러
 * - onReject: 가입 거절 핸들러 (선택)
 */
export interface ClubRequestProps {
  pendingUsers: ClubMember[];
  onApprove: (userId: string) => void;
  onReject?: (userId: string) => void;
}

/** ### 클럽 리스트 Props
 * - clubListItems: 클럽 리스트 데이터 배열
 * - routePrefix: 라우트 경로 prefix
 */
export interface ClubList {
  clubListItems: ClubListItem[];
}

/** ### 클럽 리스트 아이템 Props
 * - clubId: 클럽 ID (string)
 * - clubName: 클럽 이름 (string)
 * - imageUrl: 클럽 대표 이미지 URL (string)
 */
export interface ClubListItem {
  clubId: string;
  clubName: string;
  imageUrl: string;
}
