import capitalize from '../utilities/capitalize';

export default class StateOption {
  static renderState = (state) => (
    `<option value="${state}">
      ${capitalize(state)}
    </option>`
  );
}
