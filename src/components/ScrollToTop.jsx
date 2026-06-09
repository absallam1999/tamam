import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * ScrollToTop Component
 * @param {Object} props
 * @param {string} props.behavior - Scroll behavior ('smooth' or 'auto')
 * @param {number} props.delay - Delay in milliseconds before scrolling
 * @param {Array} props.excludePaths - Paths to exclude from auto-scroll
 * @param {Array} props.excludePatterns - Regex patterns to exclude from auto-scroll
 * @param {boolean} props.preserveHash - Whether to preserve hash links
 * @param {Function} props.onScrollStart - Callback when scroll starts
 * @param {Function} props.onScrollComplete - Callback when scroll completes
 * @param {number} props.offset - Offset from top in pixels (for fixed headers)
 */
const ScrollToTop = ({ 
  behavior = 'smooth',
  delay = 0,
  excludePaths = [],
  excludePatterns = [],
  preserveHash = true,
  offset = 0,
  onScrollStart = null,
  onScrollComplete = null
}) => {
  const { pathname, hash, key } = useLocation()
  const isScrolling = useRef(false)
  const timeoutRef = useRef(null)

  // Check if path should be excluded
  const shouldExclude = () => {
    if (excludePaths.includes(pathname)) return true
    return excludePatterns.some(pattern => pattern.test(pathname))
  }

  // Smooth scroll with offset (for fixed headers)
  const smoothScrollTo = (element) => {
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - offset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }

  // Handle scroll completion
  const handleScrollComplete = () => {
    isScrolling.current = false
    if (onScrollComplete) onScrollComplete()
  }

  // Main scroll effect
  useEffect(() => {
    // Clear any pending timeouts
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    // Don't scroll if path is excluded
    if (shouldExclude()) {
      return
    }

    // Handle hash links (anchor navigation)
    if (preserveHash && hash) {
      const element = document.querySelector(hash)
      if (element) {
        const executeScroll = () => {
          if (onScrollStart) onScrollStart()
          isScrolling.current = true
          
          if (offset > 0) {
            smoothScrollTo(element)
          } else {
            element.scrollIntoView({ behavior, block: 'start' })
          }
          
          // Set timeout for scroll completion
          setTimeout(handleScrollComplete, behavior === 'smooth' ? 500 : 100)
        }

        if (delay > 0) {
          timeoutRef.current = setTimeout(executeScroll, delay)
        } else {
          executeScroll()
        }
        return
      }
    }

    // Default scroll to top
    const scrollToTop = () => {
      if (onScrollStart) onScrollStart()
      isScrolling.current = true

      if (offset > 0) {
        // If offset is specified, scroll to offset position
        window.scrollTo({
          top: offset,
          left: 0,
          behavior
        })
      } else {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior
        })
      }

      // Set timeout for scroll completion
      setTimeout(handleScrollComplete, behavior === 'smooth' ? 500 : 100)
    }

    if (delay > 0) {
      timeoutRef.current = setTimeout(scrollToTop, delay)
    } else {
      // Use requestAnimationFrame for better performance
      requestAnimationFrame(() => {
        scrollToTop()
      })
    }

    // Cleanup
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [pathname, hash, key, behavior, delay, excludePaths, excludePatterns, preserveHash, offset])

  return null
}

export default ScrollToTop