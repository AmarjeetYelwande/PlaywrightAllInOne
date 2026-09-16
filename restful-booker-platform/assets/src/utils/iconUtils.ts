/**
 * Translates a feature name to its corresponding Bootstrap icon name
 * @param feature The feature name to translate
 * @returns The Bootstrap icon name
 */
export const translateIcon = (feature: string): string => {
  feature = feature.toLowerCase();
  switch (feature) {
    case 'refreshments':
      return 'cup-hot';
    case 'radio':
      return 'speaker';
    case 'views':
      return 'eye';
    default:
      return feature;
  }
};