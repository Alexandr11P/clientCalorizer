import { useRef } from "react";

export function useDebounce() {
    const ref = useRef<number | null>(null)
    function debounce(action: () => void, delay: number): void {
        if (ref.current) { clearTimeout(ref.current) }
        ref.current = setTimeout(() => { action() }, delay)
    }
    return debounce
}