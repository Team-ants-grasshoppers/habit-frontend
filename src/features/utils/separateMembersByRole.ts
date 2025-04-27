// src/features/member/utils/separateMembersByRole.ts

/** ### 회원(운영진/멤버/대기자) 정보
 * - userId: 유저 ID (string)
 * - nickname: 닉네임 (string)
 * - profileImageUrl: 프로필 사진 URL (string)
 */
export interface FormattedMember {
  userId: string;
  nickname: string;
  profileImageUrl: string;
}

export interface Member {
  memberId: number;
  nickname: string;
  profileImageUrl: string;
  role: 'admin' | 'member' | 'pending';
}

/**
 * - admins: 운영진 리스트 FormattedMember[]
 * - members: 멤버 리스트 FormattedMember[]
 * - pendingUsers: 가입 대기자 리스트 FormattedMember[]
 * - isAdmin: 현재 유저가 운영자인지 여부
 * - isMember: 현재 유저가 멤버인지 여부
 * - isPending: 현재 유저가 가입 대기 중인지 여부
 */
export interface SeparatedMembers {
  admins: FormattedMember[];
  members: FormattedMember[];
  pendingUsers: FormattedMember[];
  isAdmin: boolean;
  isMember: boolean;
  isPending: boolean;
}

export const separateMembersByRole = (
  memberList: Member[],
  userId: string,
  defaultProfile: string,
): SeparatedMembers => {
  const format = (m: Member): FormattedMember => ({
    userId: String(m.memberId),
    nickname: m.nickname,
    profileImageUrl: defaultProfile,
  });

  const admins = memberList.filter((m) => m.role === 'admin').map(format);
  const members = memberList.filter((m) => m.role === 'member').map(format);
  const pendingUsers = memberList.filter((m) => m.role === 'pending').map(format);

  const isAdmin = admins.some((a) => a.userId === userId);
  const isMember = members.some((m) => m.userId === userId);
  const isPending = pendingUsers.some((p) => p.userId === userId);

  return {
    admins,
    members,
    pendingUsers,
    isAdmin,
    isMember,
    isPending,
  };
};
