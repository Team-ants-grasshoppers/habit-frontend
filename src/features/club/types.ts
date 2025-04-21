export interface ClubMember {
  id: string;
  name: string;
  profileImageUrl: string;
}

export interface ClubDetailProps {
  id: number;
  name: string;
  description: string;
  category: string;
  region: string;
  imageUrl?: string;
  admins: ClubMember[];
  members: ClubMember[];
}
