import { StaticImageData } from "next/image";

export type MapGameImage = {
  imageSrc: StaticImageData;
  imageAlt: string;
  lng: number;
  lat: number;
  errorThresholdMeters: number;
  clue: string;
}
