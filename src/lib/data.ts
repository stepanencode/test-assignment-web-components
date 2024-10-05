import ElementItem from '../types/element.type';

export function generateElements(): ElementItem[] {
  const array = new Array(300)
    .fill({ id: 0, name: '', isChecked: false })
    .map((item, index) => {
      const itemId = index + 1;
      return {
        ...item,
        id: itemId,
        name: 'Element ' + itemId,
      };
    });
  return array;
}

export const elementsArray: ElementItem[] = [
  {
    id: 1,
    name: 'Element 1',
    isChecked: false,
  },
  {
    id: 2,
    name: 'Element 2',
    isChecked: false,
  },
  {
    id: 3,
    name: 'Element 3',
    isChecked: false,
  },
  {
    id: 4,
    name: 'Element 4',
    isChecked: false,
  },
  {
    id: 5,
    name: 'Element 5',
    isChecked: false,
  },
  {
    id: 6,
    name: 'Element 6',
    isChecked: false,
  },
  {
    id: 7,
    name: 'Element 7',
    isChecked: false,
  },
  {
    id: 8,
    name: 'Element 8',
    isChecked: false,
  },
  {
    id: 9,
    name: 'Element 9',
    isChecked: false,
  },
  {
    id: 10,
    name: 'Element 10',
    isChecked: false,
  },
  {
    id: 11,
    name: 'Element 11',
    isChecked: false,
  },
  {
    id: 12,
    name: 'Element 12',
    isChecked: false,
  },
  {
    id: 13,
    name: 'Element 13',
    isChecked: false,
  },
  {
    id: 14,
    name: 'Element 14',
    isChecked: false,
  },
  {
    id: 15,
    name: 'Element 15',
    isChecked: false,
  },
  {
    id: 300,
    name: 'Element 300',
    isChecked: false,
  },
];
