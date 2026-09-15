export function findFlag(country) {
  return fetch(`https://api.api-ninjas.com/v1/countryflag?country=${country}`, {
    method: 'GET',
    headers: {
      'X-Api-Key': 'TRIljCXEzfX6rr3l4Dr5KdZQneLlbZhaEALypAS',
    },
  });
}
