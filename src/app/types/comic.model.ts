export type RecommendComic = {
  id: string;
  lastest_chapter: Chapter;
  thumbnail: string;
  title: string;
  updated_at: string;
};

export interface Comic {
  thumbnail: string;
  title: string;
  id: string;
  is_trending: boolean;
  short_description: string;
  lastest_chapters: Chapter[];
  genres: Genre[];
  other_names: string[] | string;
  status: string;
  total_views: string;
  total_comments: string;
  followers: string;
  updated_at: string;
  authors: string;
}

export interface Chapter {
  id: number;
  name: string;
  updated_at?: string;
}

export interface Genre {
  id: string;
  name: string;
}

export interface DetailComic {
  title: string;
  thumbnail: string;
  description: string;
  authors: string[];
  status: string;
  genres: Genre[];
  total_views: number;
  average: number;
  rating_count: number;
  followers: number;
  chapters: Chapter[];
  id: string;
  is_adult: boolean;
  other_names: string[];
}

export interface DetailComicChapter {
  images: Image[];
  chapters: Chapter[];
  chapter_name: string;
  comic_name: string;
}

export interface Image {
  page: number;
  src: string;
  backup_url_1: string;
  backup_url_2: string;
}
