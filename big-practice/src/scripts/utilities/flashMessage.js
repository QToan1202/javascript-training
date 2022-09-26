import Flash from '../templates/flash';

export default class FlashMessage {
  /**
   * Create an flash message error
   * @param {String} error
   */
  static showMessage(error) {
    const flashMessages = document.getElementsByClassName('js-flash');

    // Clear all flash message before create a new one
    [...flashMessages].map((msg) => msg.remove());

    const flashMessage = document.createElement('template');

    flashMessage.innerHTML = Flash.renderFlashMessage(error);
    document.body.appendChild(flashMessage.content.firstElementChild);

    const message = document.getElementById('js-flash-message');
    const clearMessageBtn = document.getElementById('js-flash-close');

    // Auto close flash message after 3 seconds
    setTimeout(() => this.closeMessage(message), 3000);

    // Add event for closing message button
    clearMessageBtn.addEventListener('click', () => this.closeMessage(message));
  }

  /**
   * Closing element after the animation ended
   * @param {Element} msg
   */
  static closeMessage(msg) {
    msg.classList.add('hide');
    Promise.all(msg.getAnimations().map((animate) => animate.finished)).then(() => msg.remove());
  }
}
