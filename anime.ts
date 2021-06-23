export interface Test {
  data: Datum[];
  meta: TestMeta;
  links: TestLinks;
}

export interface Datum {
  id: string;
  type: string;
  links: DatumLinks;
  attributes: Attributes;
  relationships: { [key: string]: Relationship };
}

export interface Attributes {
  createdAt: string;
  updatedAt: string;
  slug: string;
  synopsis: string;
  description: string;
  coverImageTopOffset: number;
  titles: Titles;
  canonicalTitle: string;
  abbreviatedTitles: any[];
  averageRating: string;
  ratingFrequencies: { [key: string]: string };
  userCount: number;
  favoritesCount: number;
  startDate: string;
  endDate: null;
  nextRelease: null;
  popularityRank: number;
  ratingRank: number;
  ageRating: string;
  ageRatingGuide: null;
  subtype: string;
  status: string;
  tba: null;
  posterImage: PosterImage;
  coverImage: CoverImage;
  episodeCount: number;
  episodeLength: number;
  totalLength: number;
  youtubeVideoId: string;
  showType: string;
  nsfw: boolean;
}

export interface CoverImage {
  tiny: string;
  small: string;
  large: string;
  original: string;
  meta: CoverImageMeta;
}

export interface CoverImageMeta {
  dimensions: Dimensions;
}

export interface Dimensions {
  tiny: Large;
  small: Large;
  large: Large;
  medium?: Large;
}

export interface Large {
  width: number;
  height: number;
}

export interface PosterImage {
  tiny: string;
  small: string;
  medium: string;
  large: string;
  original: string;
  meta: CoverImageMeta;
}

export interface Titles {
  en: string;
  en_jp: string;
  ja_jp: string;
}

export interface DatumLinks {
  self: string;
}

export interface Relationship {
  links: RelationshipLinks;
}

export interface RelationshipLinks {
  self: string;
  related: string;
}

export interface TestLinks {
  first: string;
  next: string;
  last: string;
}

export interface TestMeta {
  count: number;
}
