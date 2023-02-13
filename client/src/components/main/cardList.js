import { SERVER_URL } from '@/constants/constant.js';

const cardList = (props) => {
  const { image, shopName, itemName, dateOfUse, required } = props;

  const moreIconUrl = `${SERVER_URL.IMG}icon/dots.svg`;

  const cardListTemplate = `
    <section class='one-list-section'>
      <img class='card-list-image' src="${image}" alt='card-list-image' />
      <section class='card-list-text'>
        <img class='more-dots-button' src='${moreIconUrl}' alt='more-dots-button' />
        <div class='list-d-day'> ${dateOfUse} </div>
        <div class='list-shop-name'> ${shopName} </div>
        <div class='list-item-name'> ${itemName} </div>
        <div class='list-date-of-use'> ${dateOfUse} </div>
      </section>
    </section>
    `;

  return cardListTemplate;
};

export default cardList;