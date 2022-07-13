const axios = require('axios').default;

export default class ImageApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.totalHitsApi = '';
    this.receivedHitsApi = 0;
  }

  async getArticles(searchQuery) {
    const URL = 'https://pixabay.com/api/';
    const options = new URLSearchParams({
      key: '28235725-b16522b9eec7ff45ba66b04d5',
      q: this.searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      page: this.page,
      per_page: '40',
    });

    const response = await axios.get(`${URL}?${options}`);

    this.setTotalHitsApi(response.data.totalHits);
    this.addReceivedHitsApi(response.data.hits);
    this.incrementPage();

    return response.data.hits;
  }

  setTotalHitsApi(newTotalHits) {
    this.totalHitsApi = newTotalHits;
  }

  addReceivedHitsApi(arr) {
    this.receivedHitsApi += arr.length;
  }

  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
    this.receivedHitsApi = 0;
  }
  resetTotalHitsApi() {
    this.totalHitsApi = 0;
  }

  get query() {
    return this.searchQuery;
  }
  set query(newSearchQuery) {
    this.searchQuery = newSearchQuery;
  }
}
