export interface MyPageItem {
  id: string;
  name: string;
  category: string;
  imageUrl: string;
}

export type MyPageList = MyPageItem[];

export interface JoinedClubItem {
  id: string;
  name: string;
  category: string;
  imageUrl: string;
}

export type JoinedClubList = JoinedClubItem[];

export interface ManagedClubItem {
  id: string;
  name: string;
  category: string;
  imageUrl: string;
}

export type ManagedClubList = ManagedClubItem[];

export interface JoinedThunderItem {
  id: string;
  name: string;
  imageUrl: string;
}

export type JoinedThunderList = JoinedThunderItem[];

// 모임(클럽) 타입
export interface Club {
  id: string;
  name: string;
  imageUrl: string;
  category: string;
}

// 번개모임(썬더) 타입
export interface Thunder {
  id: string;
  name: string;
  imageUrl: string | undefined;
  region: string;
  category: string;
  time: string;
}
