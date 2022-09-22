import deleteIcon from '../../assets/images/delete-icon.svg';

export default class Comment {
  static renderComment = (avatar, userName, content, id) => (
    `<div class="row  row--center  js-comment-field  spacing">
        <img class="avatar  clear-left" src="${avatar}" alt="avatar" />
        <div class="row row--direction">
          <h3 class="name">${userName}</h3>
          <p>${content}</p>
        </div>
        <img class="offset-left" src="${deleteIcon}" alt="delete-icon" id="comment-${id}" />
    </div>`
  );
}
