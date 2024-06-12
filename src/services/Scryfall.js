import { ratelimit } from '@/lib/ratelimit.js'

const throttle = ratelimit(100)

async function getMatch(url) {
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

const Scryfall = {
    async get(query, encoded = false) {
        const encodedQuery = encoded ? query : encodeURIComponent(query)
        const url = `https://api.scryfall.com/cards/search?q=${encodedQuery}&order=edhrec&dir=asc`
        
        let result = await getMatch(url)
        const data = result?.data

        while (result?.has_more === true) {
            result = await getMatch(result.next_page)
            if (result?.data != null) {
                data.push(...result.data)
            }
        }

        return data
    }
}

export default Scryfall
