export function useScrollNavigation() {
  function scrollToElement(selector: string) {
    const element = document.querySelector(selector)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  function scrollToFeatures() {
    scrollToElement('#features')
  }

  function scrollToVisionMission() {
    scrollToElement('#vision-mission')
  }

  function scrollToAbout() {
    scrollToElement('#about')
  }

  function scrollToPortfolio() {
    scrollToElement('#portfolio')
  }

  function openGithub() {
    window.open('https://github.com', '_blank', 'noopener,noreferrer')
  }

  function openDocumentation() {
    window.open('https://vuetifyjs.com/', '_blank', 'noopener,noreferrer')
  }

  return {
    scrollToFeatures,
    scrollToVisionMission,
    scrollToAbout,
    scrollToPortfolio,
    openGithub,
    openDocumentation
  }
}
