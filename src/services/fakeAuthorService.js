export const authors = [
  { _id: '5b21ca3eeb7f6fbccd471718', firstName: 'Karl', lastName: 'Popper' },
  { _id: '5b21ca3eeb7f6fbccd471714', firstName: 'Hannah', lastName: 'Arendt' },
  { _id: '5b21ca3eeb7f6fbccd471720', firstName: 'Carl', lastName: 'Schmitt' },
  { _id: '5b21ca3eeb7f6fbccd471731', firstName: 'Chantal', lastName: 'Mouffe' },
];

export function getAuthors() {
  return authors.filter((a) => a);
}
