/** ### 모임 생성/수정 폼에서 사용
 * - mode: 생성('create') | 수정('edit')
 * - clubName: 모임명 (string)
 * - imageUrl?: 대표 이미지 URL (선택)
 * - description: 모임 소개글 (string)
 * - category: 관심사 카테고리 (string)
 * - region: 지역명 (string)
 * - onNameChange: 이름 입력 핸들러
 * - onImageChange: 이미지 업로드 핸들러
 * - onDescriptionChange: 소개 입력 핸들러
 * - onCategoryChange: 관심사 선택 핸들러
 * - onRegionChange: 지역 선택 핸들러
 * - onSubmit: 폼 제출 핸들러 (폼 데이터 전달)
 */
export interface ClubFormProps {
  mode: 'create' | 'edit';
  clubName: string;
  imageUrl?: string;
  description: string;
  category: string;
  region: string;
  onNameChange: (value: string) => void;
  onImageChange: (file: File | null) => void;
  onDescriptionChange: (value: string) => void;
  onCategoryChange: (value: string[]) => void;
  onRegionChange: (value: string[]) => void;
  onSubmit: (data: {
    clubName: string;
    description: string;
    region: string;
    category: string;
    image?: File | null;
  }) => void;
}

/** ### 클럽 회원(운영진/멤버/대기자) 정보 Props
 * - userId: 유저 ID (string)
 * - nickname: 닉네임 (string)
 * - profileImageUrl: 프로필 사진 URL (string)
 */
export interface ClubMemberProps {
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
  admins: ClubMemberProps[];
  members: ClubMemberProps[];
  isAdmin: boolean;
  onBan?: (userId: string) => void;
}

/** ### 클럽 상세 페이지 Props
 * - imageUrl?: 대표 이미지 URL (선택)
 * - clubName: 클럽 이름
 * - description: 클럽 소개
 * - admins: 운영진 리스트
 * - members: 멤버 리스트
 * - pendingUsers: 가입 대기자 리스트
 * - isAdmin: 현재 유저가 운영자인지 여부
 * - isMember: 현재 유저가 멤버인지 여부
 * - isPending: 현재 유저가 가입 대기 중인지 여부
 * - onJoin: 가입 요청 핸들러
 * - onApprove: 가입 승인 핸들러
 * - onReject: 가입 거절 핸들러
 * - onBan: 멤버 추방 핸들러
 */
export interface ClubDetailProps {
  imageUrl?: string;
  clubName: string;
  description: string;
  admins: ClubMemberProps[];
  members: ClubMemberProps[];
  pendingUsers: ClubMemberProps[];
  isAdmin: boolean;
  isMember: boolean;
  isPending: boolean;
  onJoin: () => void;
  onApprove: (userId: string) => void;
  onReject: (userId: string) => void;
  onBan: (userId: string) => void;
}

/** ### 클럽 데이터 모델 (DB 및 API 통신용)
 * - clubId: 클럽 고유 ID (number)
 * - clubName: 클럽 이름 (string)
 * - description: 클럽 소개 (string)
 * - category: 클럽 관심사 (string)
 * - region: 클럽 지역 (string)
 * - imageUrl: 클럽 대표 이미지 URL (선택)
 * - admins: 클럽 운영진 리스트
 * - members: 클럽 멤버 리스트
 */
export interface ClubDataProps {
  clubId: number;
  clubName: string;
  description: string;
  category: string;
  region: string;
  imageUrl?: string;
  admins: ClubMemberProps[];
  members: ClubMemberProps[];
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
  pendingUsers: ClubMemberProps[];
  onApprove: (userId: string) => void;
  onReject?: (userId: string) => void;
}

/** ### 클럽 리스트 Props
 * - clubListItems: 클럽 리스트 데이터 배열
 * - routePrefix: 라우트 경로 prefix
 */
export interface ClubListProps {
  clubListItems: ClubListdItemProps[];
  routePrefix: string;
}

/** ### 클럽 리스트 아이템 Props
 * - clubId: 클럽 ID (string)
 * - clubName: 클럽 이름 (string)
 * - imageUrl: 클럽 대표 이미지 URL (string)
 */
export interface ClubListdItemProps {
  clubId: string;
  clubName: string;
  imageUrl: string;
}
