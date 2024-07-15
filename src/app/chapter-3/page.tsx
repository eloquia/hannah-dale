import { MapGameImage } from '@/models/map.models';
import belmontPark from '../../../public/chapter-3/belmont-park.jpg'
import flowerFields from '../../../public/chapter-3/flower-fields.jpg'

const texts = [
  "I know I asked you in the past many times.",
  "So I will ask you again,",
  "Will you marry me?",
]

export const BELMONT_PARK: MapGameImage = {
  imageSrc: belmontPark,
  imageAlt: 'Belmont Park',
  lng: -117.251754,
  lat: 32.771363,
  errorThresholdMeters: 1000,
  clue: 'Belmont Park',
};

export const FLOWER_FIELDS: MapGameImage = {
  imageSrc: flowerFields,
  imageAlt: 'Flower Fields',
  lng: -117.318151,
  lat: 33.123835,
  errorThresholdMeters: 1000,
  clue: 'Flower Fields',
};


export default function Chapter3() {
  return (
    <div>
      <h1>Chapter 3</h1>
    </div>
  );
}
