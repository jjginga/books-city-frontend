export const publishers = [
  { _id: '5b21ca3eeb7f6fbccd471918', name: 'Routledge' },
  { _id: '5b21ca3eeb7f6fbccd471914', name: 'Taylor & Francis' },
  { _id: '5b21ca3eeb7f6fbccd471920', name: 'Penguin Classics' },
];

export function getPublishers() {
  return publishers.filter((p) => p);
}
