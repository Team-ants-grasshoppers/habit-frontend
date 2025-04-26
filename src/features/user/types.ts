export interface MyPageItem {
  Club_id: number;
  title: string;
  imgUrl: string | null;
}

export type MyPageList = MyPageItem[];

export interface JoinedClubItem {
  Club_id: number;
  title: string;
  imgUrl: string | null;
}

export type JoinedClubList = JoinedClubItem[];

export interface ManagedClubItem {
  Club_id: number;
  title: string;
  imgUrl: string | null;
}

export type ManagedClubList = ManagedClubItem[];

export interface JoinedThunderItem {
  Club_id: number;
  title: string;
  imgUrl: string | null;
}

export type JoinedThunderList = JoinedThunderItem[];
