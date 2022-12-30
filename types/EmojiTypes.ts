export type emojiType = {
  aliases: string[];
  category: string | null;
  host: string | null;
  id: string;
  name: string;
  url: string;
  isFavorited: boolean;
  lastUsedDate: Date;
};

export type emojisType = Map<string, emojiType[]>;
