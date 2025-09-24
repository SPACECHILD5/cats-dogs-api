export type Animal = "cat" | "dog";
export type Media = {
  id: string;
  animal: Animal;
  path: string; // public 기준 경로
  format: "jpg" | "png" | "webp" | "gif";
  tags?: string[];
};

export const media: Media[] = [
  {
    id: "cat-001",
    animal: "cat",
    path: "/images/cats/cat1.jpg",
    format: "jpg",
  },
  {
    id: "cat-002",
    animal: "cat",
    path: "/images/cats/cat2.jpg",
    format: "jpg",
  },
  {
    id: "dog-001",
    animal: "dog",
    path: "/images/dogs/dog1.jpg",
    format: "jpg",
  },
  {
    id: "dog-002",
    animal: "dog",
    path: "/images/dogs/dog2.jpg",
    format: "jpg",
  },
];
