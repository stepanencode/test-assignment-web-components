import ElementItem from '../types/element.type';

export function generateElements(): ElementItem[] {
  const array = new Array(150)
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
