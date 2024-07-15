import { MapGameImage } from "@/models/map.models";
import balboaNights from '../../public/chapter-2/balboa-nights.jpg'
import santaBarbara from '../../public/chapter-2/santa-barbara.jpg'
import torreyPines from '../../public/chapter-2/torrey-pines.jpg'
import ensenada from '../../public/chapter-2/ensenada.jpg'
import carlsbad from '../../public/chapter-2/carlsbad.jpg'
import coacchella from '../../public/chapter-2/coacchella.jpg'
import universalStudios from '../../public/chapter-2/universal-studios.jpg'
import griffithObservatory from '../../public/chapter-2/griffith-observatory.jpg'
import iowaStateFair from '../../public/chapter-2/iowa-state-fair.jpg'
import pilates from '../../public/chapter-2/pilates.jpg'
import salzburg from '../../public/chapter-2/salzburg.jpg'
import wien from '../../public/chapter-2/wien.jpg'
import madrid from '../../public/chapter-2/madrid.jpg'
import cancun from '../../public/chapter-2/cancun.jpg'
import getty from '../../public/chapter-2/getty.jpg'
import denver from '../../public/chapter-2/denver.jpg'
import missionBeach from '../../public/chapter-2/mission-beach.jpg'
import decorah from '../../public/chapter-2/decorah.jpg'
import laJollaSwing from '../../public/chapter-2/la-jolla-swing.jpg'
import joshuaTree from '../../public/chapter-2/joshua-tree.jpg'
import flowerFields from '../../public/chapter-3/flower-fields.jpg'

export const RADIUS_OF_ERROR = 0;

// Map Game
export const BALBOA_NIGHTS: MapGameImage = {
  imageSrc: balboaNights,
  imageAlt: 'Balboa Nights',
  lng: -117.151532,
  lat: 32.731822,
  errorThresholdMeters: 3000,
  clue: 'Balboa Nights',
}
export const SANTA_BARBARA: MapGameImage = {
  imageSrc: santaBarbara,
  imageAlt: 'Santa Barbara',
  lng: -119.700720,
  lat: 34.420230,
  errorThresholdMeters: 2000,
  clue: 'Santa Barbara',
};
export const TORREY_PINES: MapGameImage = {
  imageSrc: torreyPines,
  imageAlt: 'Torrey Pines',
  lng: -117.259454,
  lat: 32.925258,
  errorThresholdMeters: 1500,
  clue: 'Torrey Pines',
};
export const ENSENADA: MapGameImage = {
  imageSrc: ensenada,
  imageAlt: 'Ensenada',
  lng: -116.656659,
  lat: 31.863149,
  errorThresholdMeters: 1000,
  clue: 'Ensenada',
};
export const CARLSBAD: MapGameImage = {
  imageSrc: carlsbad,
  imageAlt: 'Carlsbad',
  lng: -117.348768,
  lat: 33.159341,
  errorThresholdMeters: 3000,
  clue: 'Carlsbad',
};
export const COACHELLA: MapGameImage = {
  imageSrc: coacchella,
  imageAlt: 'Coachella',
  lng: -116.246035,
  lat: 33.679378,
  errorThresholdMeters: 10000,
  clue: 'Coachella',
};
export const UNIVERSAL_STUDIOS: MapGameImage = {
  imageSrc: universalStudios,
  imageAlt: 'Universal Studios',
  lng: -118.353280,
  lat: 34.137786,
  errorThresholdMeters: 5000,
  clue: 'Universal Studios',
};
export const GRIFFITH_OBSERVATORY: MapGameImage = {
  imageSrc: griffithObservatory,
  imageAlt: 'Griffith Observatory',
  lng: -118.300392,
  lat: 34.118435,
  errorThresholdMeters: 2000,
  clue: 'Griffith Observatory',
};
export const IOWA_STATE_FAIR: MapGameImage = {
  imageSrc: iowaStateFair,
  imageAlt: 'Iowa State Fair',
  lng: -93.553262,
  lat: 41.597433,
  errorThresholdMeters: 300,
  clue: 'Iowa State Fair',
};
export const PILATES: MapGameImage = {
  imageSrc: pilates,
  imageAlt: 'Pilates',
  lng: -117.152412,
  lat: 32.768940,
  errorThresholdMeters: 100,
  clue: 'Pilates',
};
export const SALZBURG: MapGameImage = {
  imageSrc: salzburg,
  imageAlt: 'Salzburg',
  lng: 13.0263306,
  lat: 47.8019550,
  errorThresholdMeters: 3000,
  clue: 'Salzburg',
};
export const WIEN: MapGameImage = {
  imageSrc: wien,
  imageAlt: 'Wien',
  lng: 16.377753,
  lat: 48.208593,
  errorThresholdMeters: 1000,
  clue: 'Wien',
};
export const MADRID: MapGameImage = {
  imageSrc: madrid,
  imageAlt: 'Madrid',
  lng: -3.7010750,
  lat: 40.4146050,
  errorThresholdMeters: 1000,
  clue: 'Madrid',
};
export const CANCUN: MapGameImage = {
  imageSrc: cancun,
  imageAlt: 'Cancun',
  lng: -86.818384,
  lat: 21.274930,
  errorThresholdMeters: 1500,
  clue: 'Cancun',
};
export const GETTY: MapGameImage = {
  imageSrc: getty,
  imageAlt: 'Getty',
  lng: -118.4738000,
  lat: 	34.0766972,
  errorThresholdMeters: 1000,
  clue: 'Getty',
};
export const DENVER: MapGameImage = {
  imageSrc: denver,
  imageAlt: 'Denver',
  lng: -105.015147,
  lat: 39.740212,
  errorThresholdMeters: 1000,
  clue: 'Denver',
};
export const MISSION_BEACH: MapGameImage = {  
  imageSrc: missionBeach,
  imageAlt: 'Mission Beach',
  lng: -117.2532500,
  lat: 32.7615967,
  errorThresholdMeters: 500,
  clue: 'Mission Beach',
};
export const DECORAH: MapGameImage = {
  imageSrc: decorah,
  imageAlt: 'Decorah',
  lng: -91.7956783,
  lat: 43.2898250,
  errorThresholdMeters: 500,
  clue: 'Decorah',
};
export const LA_JOLLA_SWING: MapGameImage = {
  imageSrc: laJollaSwing,
  imageAlt: 'La Jolla Swing',
  lng: -117.247958,
  lat: 32.864789,
  errorThresholdMeters: 300,
  clue: 'La Jolla Swing',
};
export const JOSHUA_TREE: MapGameImage = {
  imageSrc: joshuaTree,
  imageAlt: 'Joshua Tree',
  lng: -116.1868050,
  lat: 34.0326694,
  errorThresholdMeters: 20000,
  clue: 'Joshua Tree',
};
