export type Hall = {
  id: string;
  name: string;
  image: string;
  area: string;
  capacity: string;
};

/** Четыре зала: бывший HALL №5 переименован в HALL №4 (hall-5.jpg). */
export const HALLS: Hall[] = [
  {
    id: '1',
    name: 'HALL №1',
    image: '/images/hall-1.jpg',
    area: '40 м²',
    capacity: 'До 20-ти человек',
  },
  {
    id: '2',
    name: 'HALL №2',
    image: '/images/hall-2.jpg',
    area: '35 м²',
    capacity: 'До 15-ти человек',
  },
  {
    id: '3',
    name: 'HALL №3',
    image: '/images/hall-3.jpg',
    area: '50 м²',
    capacity: 'До 25-ти человек',
  },
  {
    id: '4',
    name: 'HALL №4',
    image: '/images/hall-5.jpg',
    area: '60 м²',
    capacity: 'До 30-ти человек',
  },
];
