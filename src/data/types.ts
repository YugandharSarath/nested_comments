export interface CommentType {
  id: number;
  text: string;
  replies: CommentType[];
}
