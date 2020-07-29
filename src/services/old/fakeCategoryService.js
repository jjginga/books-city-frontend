export const categories = [
  { _id: '5b21ca3eeb7f6fbccd471818', name: 'Philosophy' },
  { _id: '5b21ca3eeb7f6fbccd471814', name: 'Politics' },
  { _id: '5b21ca3eeb7f6fbccd471820', name: 'Journalism' },
];

export function getCategories() {
  return categories.filter((c) => c);
}
