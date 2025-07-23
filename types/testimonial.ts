import { StaticImageData } from "next/image";

export type Testimonial = {
  id: string | number;
  name: string;
  designation: string;
  image: string | StaticImageData;
  content: string;
};
