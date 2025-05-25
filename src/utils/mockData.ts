export interface IMostVisitedProfession {
  id: string;
  title: string;
  count: number;
  image: any; // Changed from imagePath to direct image reference
  suffixText: string;
  imageStyle?: 'default' | 'drywall';
}

export interface IExploreProfession {
  id: string;
  label: string;
  iconName: string;
}

export interface ITopCategory {
  id: string;
  label: string;
  iconName: string;
}

// Pre-load all images to avoid dynamic require
const PROFESSION_IMAGES = {
  plumber: require('../assets/images/MostVisitedProfessions/Plumber.png'),
  drywall: require('../assets/images/MostVisitedProfessions/Drywall.png'),
  electrician: require('../assets/images/MostVisitedProfessions/Electrician.png'),
};

export const mostVisitedProfessionsData: IMostVisitedProfession[] = [
  {
    id: 'mvp1',
    title: 'Plumber',
    count: 253,
    image: PROFESSION_IMAGES.plumber,
    suffixText: ' Plumbers',
    imageStyle: 'default',
  },
  {
    id: 'mvp2',
    title: 'Dry Wall',
    count: 518,
    image: PROFESSION_IMAGES.drywall,
    suffixText: ' Installers',
    imageStyle: 'drywall',
  },
  {
    id: 'mvp3',
    title: 'Electrician',
    count: 427,
    image: PROFESSION_IMAGES.electrician,
    suffixText: ' Electricians',
    imageStyle: 'default',
  },
  {
    id: 'mvp4',
    title: 'Carpenter',
    count: 315,
    image: PROFESSION_IMAGES.electrician, // Using electrician image as placeholder
    suffixText: ' Carpenters',
    imageStyle: 'default',
  },
  {
    id: 'mvp5',
    title: 'Painter',
    count: 183,
    image: PROFESSION_IMAGES.electrician,
    suffixText: ' Painters',
    imageStyle: 'default',
  },
  {
    id: 'mvp6',
    title: 'HVAC',
    count: 267,
    image: PROFESSION_IMAGES.electrician,
    suffixText: ' Technicians',
    imageStyle: 'default',
  },
  {
    id: 'mvp7',
    title: 'Roofer',
    count: 142,
    image: PROFESSION_IMAGES.electrician,
    suffixText: ' Professionals',
    imageStyle: 'default',
  },
];

export const exploreProfessionsData: IExploreProfession[] = [
  { id: 'ep1', label: 'Plumber', iconName: 'plusIcon' },
  { id: 'ep2', label: 'Electricians', iconName: 'plusIcon' },
  { id: 'ep3', label: 'Woodworkers', iconName: 'plusIcon' },
  { id: 'ep4', label: 'Masons', iconName: 'plusIcon' },
  { id: 'ep5', label: 'Tilers', iconName: 'plusIcon' },
  { id: 'ep6', label: 'Painters', iconName: 'plusIcon' },
  { id: 'ep7', label: 'Roofer', iconName: 'plusIcon' },
  { id: 'ep8', label: 'Door installers', iconName: 'plusIcon' },
  { id: 'ep9', label: 'Gardeners', iconName: 'plusIcon' },
  { id: 'ep10', label: 'Locksmiths', iconName: 'plusIcon' },
  { id: 'ep11', label: 'Handyman', iconName: 'plusIcon' },
  { id: 'ep12', label: 'Movers', iconName: 'plusIcon' },
  { id: 'ep13', label: 'Pests', iconName: 'plusIcon' },
  { id: 'ep14', label: 'HVAC', iconName: 'plusIcon' },
];

export const topCategoriesData: ITopCategory[] = [
  { id: 'tc1', label: 'Plumbing', iconName: 'plusIcon' },
  { id: 'tc2', label: 'Electrical', iconName: 'searchIcon' },
  { id: 'tc3', label: 'Carpenter', iconName: 'searchIcon' },
  { id: 'tc4', label: 'Painting', iconName: 'plusIcon' },
  { id: 'tc5', label: 'Roofing', iconName: 'searchIcon' },
  { id: 'tc_other', label: 'Other', iconName: 'plusIcon' },
]; 