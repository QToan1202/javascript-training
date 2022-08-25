export default class RegisterForm {
  static renderRegisterForm = () => (
    `<div class='card  card--background  card--hidden'>
      <div class='row'>
        <h1 class='title  title--login'>Register</h1>
        <button class='btn  push'>&times;</button>
      </div>
      <form class='form  form--login' action='#' method='post'>
        <label>User name</label>
        <input class='input' type='text' id='js-user-name' />
        <label>Password</label>
        <input class='input' type='password' id='js-user-password' />
        <label>Confirm Password</label>
        <input class='input' type='password'id='js-user-confirm-password' />
        <button class='btn  btn--form' type='submit'>
          Confirm
        </button>
      </form>
    </div>`
  );
}
