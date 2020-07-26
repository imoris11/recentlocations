const openDataApi = 'https://api.opencagedata.com/geocode/v1/json?';
const apiKey = '09df7e133baa4a6bbb139796b1f9ceb7';
export default class OpenDataApi {
  static async fetchLocation(coords: string) {
    const url = `${openDataApi}q=${coords}&key=${apiKey}`;
    return fetch(url).then((response) => response.json());
  }
}
