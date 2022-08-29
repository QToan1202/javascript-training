import deleteIcon from '../../assets/images/delete-icon.svg';

export default class Comments {
  static renderRegisterForm = (avatar, userName, comment) => (
    `<div class="row  row--center">
        <img class="avatar" src="${avatar}" alt="avatar" />
        <div class="row row--direction">
          <h3 class="name">${userName}</h3>
          <p>${comment}</p>
        </div>
        <img class="offset-left" src="${deleteIcon}" alt="delete-icon" />
    </div>`
  );
}
