document.addEventListener('alpine:init', () => {
  Alpine.data('dropdown', () => ({
    search: '',
    posts: [],
    get filteredItems() {
      return this.posts.filter(
        i => i.name.includes(this.search)
      )
    },
    async init() {
      this.posts = await (await fetch('http://localhost:1337/categories')).json()
    }
  }))
})
