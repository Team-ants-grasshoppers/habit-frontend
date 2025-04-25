export type ClubListResponse = {
  clubId: number;
  clubName: string;
  category: string;
}[];

export type ClubDetailResponse = {
  clubName: string;
  description: string;
  category: string;
  region: string;
  imageUrl: string;
};
