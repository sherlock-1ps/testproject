'use client'

/* eslint-disable import/namespace */
import * as React from 'react'

import * as nProgress from 'nprogress'

export type NextNProgressProps = {
  /**
   * The initial position for the TopLoader in percentage, 0.08 is 8%.
   * @default 0.08
   */
  initialPosition?: number
  /**
   * The increament delay speed in milliseconds.
   * @default 200
   */
  crawlSpeed?: number
  /**
   * Auto increamenting behaviour for the TopLoader.
   * @default true
   */
  crawl?: boolean
  /**
   * To show spinner or not.
   * @default true
   */
  showSpinner?: boolean
  /**
   * Animation settings using easing (a CSS easing string).
   * @default "ease"
   */
  easing?: string
  /**
   * Animation speed in ms for the TopLoader.
   * @default 200
   */
  speed?: number
  /**
   * Defines a template for the TopLoader.
   * @default "<div class="bar" role="bar"><div class="peg"></div></div>
   * <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>"
   */
  template?: string
}

/**
 *
 * NextNProgress
 *
 */
const NextNProgress = ({
  showSpinner,
  crawl,
  crawlSpeed,
  initialPosition,
  easing,
  speed,
  template,
}: NextNProgressProps): JSX.Element => {
  /**
   * Convert the url to Absolute URL based on the current window location.
   * @param url {string}
   * @returns {string}
   */
  const toAbsoluteURL = (url: string): string => {
    return new URL(url, window.location.href).href
  }

  /**
   * Check if it is hash anchor or same page anchor
   * @param currentUrl {string} Current Url Location
   * @param newUrl {string} New Url detected with each anchor
   * @returns {boolean}
   */
  const isHashAnchor = (currentUrl: string, newUrl: string): boolean => {
    const current = new URL(toAbsoluteURL(currentUrl))
    const next = new URL(toAbsoluteURL(newUrl))
    return current.href.split('#')[0] === next.href.split('#')[0]
  }

  /**
   * Check if it is Same Host name
   * @param currentUrl {string} Current Url Location
   * @param newUrl {string} New Url detected with each anchor
   * @returns {boolean}
   */
  const isSameHostName = (currentUrl: string, newUrl: string): boolean => {
    const current = new URL(toAbsoluteURL(currentUrl))
    const next = new URL(toAbsoluteURL(newUrl))
    return current.hostname.replace(/^www\./, '') === next.hostname.replace(/^www\./, '')
  }

  // _Effect
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  React.useEffect((): ReturnType<React.EffectCallback> => {
    nProgress.configure({
      showSpinner: showSpinner ?? true,
      trickle: crawl ?? true,
      trickleSpeed: crawlSpeed ?? 200,
      minimum: initialPosition ?? 0.08,
      easing: easing ?? 'ease',
      speed: speed ?? 200,
      template:
        template ??
        '<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>',
    })

    /**
     * Check if the Current Url is same as New Url
     * @param currentUrl {string}
     * @param newUrl {string}
     * @returns {boolean}
     */
    function isAnchorOfCurrentUrl(currentUrl: string, newUrl: string): boolean {
      const currentUrlObj = new URL(currentUrl)
      const newUrlObj = new URL(newUrl)
      // Compare hostname, pathname, and search parameters
      if (
        currentUrlObj.hostname === newUrlObj.hostname &&
        currentUrlObj.pathname === newUrlObj.pathname &&
        currentUrlObj.search === newUrlObj.search
      ) {
        // Check if the new URL is just an anchor of the current URL page
        const currentHash = currentUrlObj.hash
        const newHash = newUrlObj.hash
        return (
          currentHash !== newHash && currentUrlObj.href.replace(currentHash, '') === newUrlObj.href.replace(newHash, '')
        )
      }
      return false
    }

    // deno-lint-ignore no-var
    const nProgressClass: NodeListOf<HTMLHtmlElement> = document.querySelectorAll('html')

    const removeNProgressClass = (): void =>
      nProgressClass.forEach((el: Element) => el.classList.remove('nprogress-busy'))

    /**
     * Find the closest anchor to trigger
     * @param element {HTMLElement | null}
     * @returns element {Element}
     */
    function findClosestAnchor(element: HTMLElement | null): HTMLAnchorElement | null {
      while (element && element.tagName.toLowerCase() !== 'a') {
        element = element.parentElement
      }
      return element as HTMLAnchorElement
    }

    /**
     *
     * @param event {MouseEvent}
     * @returns {void}
     */
    function handleClick(event: MouseEvent): void {
      try {
        const target = event.target as HTMLElement
        const anchor = findClosestAnchor(target)
        const newUrl = anchor?.href
        if (newUrl) {
          const currentUrl = window.location.href
          // const newUrl = (anchor as HTMLAnchorElement).href;
          const isExternalLink = (anchor as HTMLAnchorElement).target === '_blank'

          // Check for Special Schemes
          const isSpecialScheme = ['tel:', 'mailto:', 'sms:', 'blob:', 'download:'].some((scheme) =>
            newUrl.startsWith(scheme),
          )

          const isAnchor: boolean = isAnchorOfCurrentUrl(currentUrl, newUrl)
          const notSameHost = !isSameHostName(window.location.href, anchor.href)
          if (notSameHost) {
            return
          }
          if (
            newUrl === currentUrl ||
            isAnchor ||
            isExternalLink ||
            isSpecialScheme ||
            event.ctrlKey ||
            event.metaKey ||
            event.shiftKey ||
            event.altKey ||
            isHashAnchor(window.location.href, anchor.href) ||
            !toAbsoluteURL(anchor.href).startsWith('http')
          ) {
            nProgress.start()
            nProgress.done()
            removeNProgressClass()
          } else {
            nProgress.start()
          }
        }
      } catch (_err) {
        // Log the error in development only!
        // console.log('NextNProgress error: ', err);
        nProgress.start()
        nProgress.done()
      }
    }
    /**
     * Complete TopLoader Progress
     * @param {History}
     * @returns {void}
     */
    ;((history: History): void => {
      const { pushState } = history
      history.pushState = (...args) => {
        nProgress.done()
        removeNProgressClass()
        return pushState.apply(history, args)
      }
    })((window as Window).history)

    function handlePageHide(): void {
      nProgress.done()
      removeNProgressClass()
    }

    /**
     * Handle Browser Back and Forth Navigation
     * @returns {void}
     */
    function handleBackAndForth(): void {
      nProgress.done()
    }

    // Add the global click event listener
    window.addEventListener('popstate', handleBackAndForth)
    document.addEventListener('click', handleClick)
    window.addEventListener('pagehide', handlePageHide)

    // Clean up the global click event listener when the component is unmounted
    return (): void => {
      document.removeEventListener('click', handleClick)
      window.removeEventListener('pagehide', handlePageHide)
      window.removeEventListener('popstate', handleBackAndForth)
    }
  }, [])

  return null
}
export { NextNProgress }
