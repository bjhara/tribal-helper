import { ratelimit } from '@/lib/ratelimit.js'

const throttle = ratelimit(100)

const Scryfall = {
    async get(query) {
        const encodedQuery= encodeURIComponent(query)
        const url = `https://api.scryfall.com/cards/search?q=${encodedQuery}&order=eur&dir=desc`
        const resp = await throttle().then(() => fetch(url))
        if (!resp.ok) {
            if (resp.status === 404) {
                // no matches were found
                return null
            }

            throw new Error(resp.statusText)
        }
        
        return resp.json()
    }
}

export default Scryfall
