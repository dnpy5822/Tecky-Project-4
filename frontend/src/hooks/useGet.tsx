import { useEffect, useState } from "react"
import { useToken } from "../store/selector"

export function useGet<T extends { error?: string }>(
    pathname: string,
    // query?: Record<string, string>
    initialState: T
) {
    const [loading, setLoading] = useState(true)
    const [state, setState] = useState<T>(initialState)
    const token = useToken()
    const [count, setCount] = useState(0)

    // const url =  query
    // ? pathname + '?' + new URLSearchParams(Object.entries(query))
    // : pathname
    const url = import.meta.env.VITE_SERVER_API + pathname

    useEffect(() => {
        setLoading(true)
        fetch(url, {
            headers: { Authorization: "Bearer " + token }
        })
            .then(res => res.json())
            .then(json => setState(json))
            .catch(
                error => setState({ error: String(error) } as T)
            ).finally(() => setLoading(false))
    }, [url, token, count])

    function refresh() {
        setCount(count => count + 1)
    }

    return { state, loading, refresh, setState }
}