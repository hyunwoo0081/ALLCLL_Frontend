import API from "./API.ts";

export default {
  setRandomSubject() {
    return API.fetch2Json('/api/v2/mock/random', 'POST', {}, [], () => {});
  }
}