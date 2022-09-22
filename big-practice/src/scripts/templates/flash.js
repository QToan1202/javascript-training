import errorIcon from '../../assets/images/error-icon.svg';

export default class Flash {
  static renderFlashMessage = (content) => (`
    <div class="flash  row  row--center  show  js-flash" id="js-flash-message">
      <img class="flash__icon" src="${errorIcon}" alt="error-icon" />
      <p>${content}</p>
      <button class="btn  offset-left" id="js-flash-close">&times;</button>
    </div>
  `);
}