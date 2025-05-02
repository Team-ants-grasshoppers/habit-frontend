// src/features/member/utils/separateMembersByRole.ts

/** ### 회원(운영진/멤버/대기자) 정보
 * - userId: 유저 ID (string)
 * - nickname: 닉네임 (string)
 */
export interface FormattedMember {
  userId: string;
  nickname: string;
}

export interface Member {
  memberId: number;
  nickname: string;
  role: 'admin' | 'member' | 'pending';
}

export interface SeparatedMembers {
  admins: FormattedMember[];
  members: FormattedMember[];
  pendingUsers: FormattedMember[];
  isAdmin: boolean;
  isMember: boolean;
  isPending: boolean;
}

export const separateMembersByRole = (memberList: Member[], userId: string): SeparatedMembers => {
  const format = (m: Member): FormattedMember => ({
    userId: String(m.memberId),
    nickname: m.nickname,
  });

  const admins = memberList
    .filter((m) => m.role === 'admin')
    .map(format)
    .filter(Boolean);

  const members = memberList
    .filter((m) => m.role === 'member')
    .map(format)
    .filter(Boolean);

  const pendingUsers = memberList
    .filter((m) => m.role === 'pending')
    .map(format)
    .filter(Boolean);

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
