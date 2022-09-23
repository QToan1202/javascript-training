import deleteIcon from '../../assets/images/delete-icon.svg';
import date from '../utilities/date';

export default class Comment {
  static renderComment = (avatar, userName, content, id, createdDate) => (
    `<div class="row  row--center  js-comment-field  spacing">
        <img class="avatar  clear-left" src="${avatar}" alt="avatar" />
        <div class="row row--direction">
          <div class="row  row--center">
            <h3 class="name">${userName}</h3>
            <p class="time">(${date.timeElapse(createdDate)})</p>
          </div>
          <p>${content}</p>
        </div>
        <img class="offset-left" src="${deleteIcon}" alt="delete-icon" id="comment-${id}" />
    </div>`
  );
}
