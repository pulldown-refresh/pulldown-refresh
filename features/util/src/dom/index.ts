export const checkElement = (elem: Element | null) => {
  if (!(elem instanceof HTMLElement)) {
    throw Error(`${elem} is not a HTMLElement.`);
  }
  return elem;
};

export const checkElementBySelector = (selector: string) => {
  const elem = document.querySelector(selector);
  if (!elem) {
    throw Error(`Please check your selector. Can not find an element by ${selector}.`);
  }
  return checkElement(elem);
};
