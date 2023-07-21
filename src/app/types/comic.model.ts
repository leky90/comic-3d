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
