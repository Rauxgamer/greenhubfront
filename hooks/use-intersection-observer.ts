"use client"

import { useEffect, useState, useRef } from "react"

interface UseIntersectionObserverOptions {
  threshold?: number | number[]
  root?: Element | null
  rootMargin?: string
  triggerOnce?: boolean
}

export function useIntersectionObserver(options?: UseIntersectionObserverOptions) {
  const [isInView, setIsInView] = useState(false)
  const [hasBeenInView, setHasBeenInView] = useState(false) // Tracks if the element has ever been in view
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          if (!hasBeenInView) {
            // Set hasBeenInView only once if it's the first time
            setHasBeenInView(true)
          }
          if (options?.triggerOnce && entry.isIntersecting) {
            // Check entry.isIntersecting for triggerOnce
            observer.unobserve(element)
          }
        } else {
          if (!options?.triggerOnce) {
            setIsInView(false)
          }
        }
      },
      {
        threshold: options?.threshold || 0.1, // Default threshold
        root: options?.root,
        rootMargin: options?.rootMargin || "0px",
      },
    )

    observer.observe(element)

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
    // Ensure options object is stable or memoized if passed from parent to avoid re-running effect unnecessarily
    // For this general hook, stringifying simple options or deep comparison might be needed if options change frequently and are complex.
    // However, for typical usage (stable options), this is fine.
  }, [options, hasBeenInView]) // Added hasBeenInView to deps to ensure state updates correctly with triggerOnce

  // If triggerOnce is true, isInView will remain true after the first intersection.
  // If you need isInView to reflect current viewport status even with triggerOnce,
  // then hasBeenInView should be used for the data-attribute for one-time animation.
  return { ref, isInView, hasBeenInView }
}
