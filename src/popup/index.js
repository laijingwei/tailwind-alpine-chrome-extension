import Alpine from 'alpinejs'
import axios from 'axios'

window.Alpine = Alpine
window.axios = axios

let limit = 5;
let QueryBsgExtUrls = `
    query ($limit: Int!) {
      bsgExtUrls(limit: $limit, sort: "sort:desc") {
        id
        title
        url
        sort
      }
    }
  `;
let SearchBsgExtUrls = `
    query ($limit: Int!, $keywords: String!) {
      bsgExtUrls(limit: $limit, sort: "sort:desc", where: { _q: $keywords }) {
        id
        title
        url
        sort
      }
    }
  `;
let AddCountBsgExtUrls = `
    mutation ($input: updateBsgExtUrlInput!) {
      updateBsgExtUrl(input: $input) {
        bsgExtUrl {
          id
          title
          url
          sort
        }
      }
    }
  `;

window.execQueryBsgExtUrls = async function execQueryBsgExtUrls() {
  let {data} = await axios.post('http://api.local.laijw.com/graphql', {query: QueryBsgExtUrls, variables: {limit}})
  return data.data.bsgExtUrls
}

window.execSearchBsgExtUrls = async function execSearchBsgExtUrls(keywords) {
  let {data} = await axios.post('http://api.local.laijw.com/graphql', {query: SearchBsgExtUrls, variables: {keywords,limit}})
  return data.data.bsgExtUrls
}

window.execAddCountBsgExtUrls = async function execAddCountBsgExtUrls(id, sort, url) {
  let input = {
    where: { id },
    data: { sort: sort + 1 },
  }
  let {data} = await axios.post('http://api.local.laijw.com/graphql', {query: AddCountBsgExtUrls, variables: {input}})
  window.open(url, '_blank')
  return data.data.bsgExtUrls
}


Alpine.start()
