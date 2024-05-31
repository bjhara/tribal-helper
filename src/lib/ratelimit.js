export function ratelimit(delay) {
    const queue = []
    let busy = false

    const handleTimeout = function () {
        if (queue.length > 0) {
            setTimeout(handleTimeout, delay)
            const resolve = queue.shift()
            resolve()
        }
        else {
            busy = false
        }
    }

    const throttle = function() {
        if (!busy) {
            busy = true
            setTimeout(handleTimeout, delay)
            return Promise.resolve()
        }

		return new Promise((resolve) => {
            queue.push(resolve)
        })
	};
	
    return throttle
}
