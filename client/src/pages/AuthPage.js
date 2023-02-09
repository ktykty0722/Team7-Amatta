import { SERVER_URL } from '@/constants/constant';
import { loginTemplate, register } from '@/components/auth';
import { _ } from '@/utils/customFx';
import { $ } from '@/utils';

const AuthPage = {};
const logoUrl = `${SERVER_URL.IMG}logo/logo-pink.png`;
const mintLogoUrl = `${SERVER_URL.IMG}logo/logo-mint.png`;
const backIconUrl = `${SERVER_URL.IMG}icon/left-arrow.svg`;

// const status = (componentName) => {
//   if (componentName === 'register') {
//     const signupInputs = [inputs[0], inputs[1], inputs[3], inputs[4]];

//     // return registerTemplate(inputs);
//     return registerTemplate(signupInputs);
//   }
//   if (componentName === 'login') {
//     const loginInputs = [inputs[0], inputs[3]];

//     return loginTemplate(loginInputs);
//   }

//   return 0;
// };

AuthPage.temp = `
  <article class="auth-article">
    <section class="white-header-section">
      <img class="back-button" src="${backIconUrl}" alt="back-button" /> 
      <section class="logo-section">
        <img class="small-logo-mint" src="${mintLogoUrl}" alt="small-logo-mint" />
      </section>
    </section>
    <section class="auth-form-section">
      <form class="auth-form">
        <div class="auth-button-container">
          <input type="submit" class="auth-button" name="auth-button" value="완료" />
        </div>
      </form>
    </section>
  </article>
`;

// prettier-ignore
AuthPage.render = () =>
  _.go(
    AuthPage.temp, 
    $.el, 
    $.replace($.qs('#root')),
    register({target: '.auth-form'}));

// prettier-ignore
const navigateAuth = () =>
    _.go(
      AuthPage.render());

export default navigateAuth;
