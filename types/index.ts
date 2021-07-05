export type APIProps = {
  id: string;
  title: string;
  image: string;
  averageRating: string;
  episodeLength: number;
  status: string;
  createdAt: string;
};

export type DetailProps = {
  id: string;
  title: string;
  image: string;
  averageRating: string;
  episodeLength: number;
  status: string;
  createdAt: string;
  startDate: string;
  youtubeVideoId: string;
};

export type DetailList = {
  result: DetailProps[];
};

export type HeroIcon = (props: React.ComponentProps<"svg">) => JSX.Element;
