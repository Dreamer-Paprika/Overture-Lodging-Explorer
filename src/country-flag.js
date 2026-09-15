export function findFlag(country) {
  return fetch(`https://api.api-ninjas.com/v1/countryflag?country=${country}`, {
    method: 'GET',
    headers: {
      'x-api-key': 'gdvQqEx3KBpR51ZfOeJgIA==10aHi9pat7JXS0OQ',
    },
  });
}
