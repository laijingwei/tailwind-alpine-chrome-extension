import Alpine from 'alpinejs'
import axios from 'axios'

window.Alpine = Alpine
window.axios = axios

let limit = 5;
let QueryBsgExtAnnouncement = `
    query {
      bsgExtAnnouncement {
        title
      }
    }
  `;
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

window.execQueryBsgExtAnnouncement = async function execQueryBsgExtAnnouncement() {
  try {
    let {data} = await axios.post('http://api.local.laijw.com/graphql', {query: QueryBsgExtAnnouncement})
    return data.data.bsgExtAnnouncement.title
  } catch (e) {
    return '无法连接至服务器'
  }
}

window.execQueryBsgExtUrls = async function execQueryBsgExtUrls() {
  try {
    let {data} = await axios.post('http://api.local.laijw.com/graphql', {query: QueryBsgExtUrls, variables: {limit}})
    return data.data.bsgExtUrls
  } catch (e) {
    return [{ id: 0, title: '无法连接至服务器', url: '', sort: 0 }]
  }
}

window.execSearchBsgExtUrls = async function execSearchBsgExtUrls(keywords) {
  try {
    let {data} = await axios.post('http://api.local.laijw.com/graphql', {query: SearchBsgExtUrls, variables: {keywords,limit}})
    return data.data.bsgExtUrls
  } catch (e) {
    return [{ id: 0, title: '无法连接至服务器', url: '', sort: 0 }]
  }
}

window.execAddCountBsgExtUrls = async function execAddCountBsgExtUrls(id, sort, url) {
  let input = {
    where: { id },
    data: { sort: sort + 1 },
  }
  try {
    let {data} = await axios.post('http://api.local.laijw.com/graphql', {query: AddCountBsgExtUrls, variables: {input}})
    window.open(url, '_blank')
    return data.data.bsgExtUrls
  } catch (e) {
    return { id: 0, title: '无法连接至服务器', url: '', sort: 0 }
  }
}


Alpine.start()
