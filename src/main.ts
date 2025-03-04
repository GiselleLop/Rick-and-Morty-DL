import { homePage } from './pages/Home/index.js';

const routes = [
  { path: '/', component: homePage },
];

const mainPage: HTMLElement | null  = document.querySelector('.root');
const defaultRoute = '/';

export function navigateTo(hash: string) {
  const route = routes.find((r) => r.path === hash);

  if (route && route.component) {
    window.history.pushState(
      {},
      route.path,
      window.location.origin + route.path,
    );

    if (mainPage?.firstChild) {
      mainPage.removeChild(mainPage.firstChild);
      mainPage.append(route.component(navigateTo));
    } else {
      navigateTo('/error');
    }
  }
}

  
window.addEventListener('popstate', () => {
  navigateTo(defaultRoute);
});

function initRouter() {
  navigateTo(window.location.pathname || defaultRoute);
}

initRouter();
export default navigateTo;
