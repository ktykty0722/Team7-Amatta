import { SERVER_URL } from '@/constants/constant';
import { navigate } from '@/core/router';
import { logoutU } from '@/apis/auth';
import { _ } from '@/utils/customFx';
import { IO, $ } from '@/utils';
import { sideMenu, modal } from '@/components/common';
// search-button //
const header = (props) => {
  const { color, label, path } = props;
  const MINT_LOGO_URL = `${SERVER_URL.IMG}logo/logo-mint.png`;
  const WHITE_LOGO_URL = `${SERVER_URL.IMG}logo/logo-white.png`;
  const LEFT_ARROW_URL = `${SERVER_URL.IMG}icon/left-arrow.svg`;
  const SEARCH_ICON_URL = `${SERVER_URL.IMG}icon/search.svg`;

  const mintTemp = `
    <img class='small-logo-white' src='${WHITE_LOGO_URL}' alt='amatta-small-logo'/>
    <section class='header-button-section'>
      <img class="search-button" src='${SEARCH_ICON_URL}' alt='search-button' />
      <section class="trigger">
        <span></span>
        <span></span>
        <span></span>
      </section>
    </section>
  `;

  const whiteTemp = `
    <section class="white-header-section">
      <img class="left-arrow-button" src="${LEFT_ARROW_URL}" alt="back-button" />
        ${
          label
            ? `<h4 class="header-label">${label}</h4>`
            : `<img class="small-logo-mint" src="${MINT_LOGO_URL}" alt="small-logo-mint" />`
        }
    </section>
  `;

  const headerTemp = `
      <header class = 'header-main ${color}'>
        ${color === 'mint' ? mintTemp : whiteTemp}
      </header>
    `;

  const toggleModal = () => {
    const logoutModal = $.qs('.outside-modal-container');
    toggleActive(logoutModal);
  };

  const closeModal = () => {
    const cancelButton = $.qs('.cancel-button');
    cancelButton.addEventListener('click', toggleModal);
  };

  const logoutModal = () => {
    const logoutButton = $.qs('.modal-button');
    logoutButton.addEventListener('click', () => {
      toggleModal();
      navigate('/');
      logoutU();
    });
  };

  const logoutEvent = () => {
    modal('로그아웃', 'logout')();

    toggleModal();
    closeModal();
    logoutModal();
  };

  const mypageEvent = () => navigate('/mypage');

  const usedPageEvent = () => navigate('/used');

  // async
  const openMenuEvent = () => {
    const trigger = $.qs('.trigger');
    // await
    toggleActive(trigger);
    const menuTarget = $.qs('.menu-section');
    toggleActive(menuTarget);

    _.go(
      $.qs('.logout-button'),
      $.on('click', logoutEvent),
      () => $.qs('.mypage-button'),
      $.on('click', mypageEvent),
      () => $.qs('.usedList-button'),
      $.on('click', usedPageEvent),
    );
  };
  // async
  const toggleActive = (target) => target.classList.toggle('active');

  const navigatePath = (fragment, target, path) =>
    _.go(
      fragment,
      $.find(target),
      $.on('click', () => navigate(path)),
    );

  const handleEvent = (fragment) => {
    if (!label) return navigatePath(fragment, '.small-logo-white', '/card');
    return navigatePath(fragment, '.left-arrow-button', path);
  };

  const eventTrigger = (type, target, fn) => () => $.on(type, fn)(target);
  const setEvent = (type, fn) => (target) => IO.of(eventTrigger(type, target, fn));
  const findTarget = (child, parent) => () => $.qs(child, parent);
  const handleClickSearchIcon = (target) => (e) => {
    target.style.filter =
      'invert(0%) sepia(0%) saturate(7445%) hue-rotate(197deg) brightness(86%) contrast(93%)';
    target.style.transform = 'translateY(50px)';
  };

  const addEvents = (target) => {
    IO.of(findTarget('.search-button', target))
      .chain(setEvent('click', handleClickSearchIcon($.qs('.search-button'))))
      .run();
  };

  // prettier-ignore
  const appendHeader = () => {
    _.go(
      headerTemp,
      $.el,
      (fragment) => $.prepend(fragment, $.qs('#root')),
      handleEvent);

    color === 'mint' && 
    _.go(
      //sideMenu(),
      sideMenu(),
      $.el,
      $.append($.qs('.header-main')),
      () => $.qs('.trigger'),
      $.on('click', openMenuEvent));
    //addEvents(document);
  }
  return appendHeader;
};

export default header;
