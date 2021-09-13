import Alpine from 'alpinejs'
import axios from 'axios'

window.Alpine = Alpine
window.axios = axios

let server = 'http://api.local.laijw.com/graphql';
let limit = 5;

async function http(query, variables) {
  try {
    let {data} = await axios.post(server, {query, variables})
    return data.data.bsgExtUrls
  } catch (e) {
    return [{ id: 0, title: '无法连接至服务器', url: '', sort: 0 }]
  }
}

window.queryBsgExtAnnouncement = async function queryBsgExtAnnouncement() {
  let query = `
    query {
      bsgExtAnnouncement {
        title
      }
    }
  `;
  try {
    let {data} = await axios.post(server, {query})
    return data.data.bsgExtAnnouncement.title
  } catch (e) {
    return '无法连接至服务器'
  }
}

window.queryBsgExtUrls = async function queryBsgExtUrls() {
  let query = `
    query ($limit: Int!) {
      bsgExtUrls(limit: $limit, sort: "sort:desc") {
        id
        title
        url
        sort
      }
    }
  `;
  return await http(query, {limit})
}

window.searchBsgExtUrls = async function searchBsgExtUrls(keywords) {
  let query = `
    query ($limit: Int!, $keywords: String!) {
      bsgExtUrls(limit: $limit, sort: "sort:desc", where: { _q: $keywords }) {
        id
        title
        url
        sort
      }
    }
  `;
  return await http(query, {keywords,limit})
}

window.addCountBsgExtUrls = async function addCountBsgExtUrls(id, sort, url) {
  let query = `
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
  let input = {
    where: { id },
    data: { sort: sort + 1 },
  }
  try {
    let {data} = await axios.post(server, {query, variables: {input}})
    window.open(url, '_blank')
    return data.data.bsgExtUrls
  } catch (e) {
    return { id: 0, title: '无法连接至服务器', url: '', sort: 0 }
  }
}


Alpine.start()
