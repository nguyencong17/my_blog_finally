
  // handle click for all imgs --> Event Delegation
  // img Click --> find all imgs with the same album / gallery
  // determine index of seleted img
  // show modal with selected img
  // hadle prev / next click

function showModal(modalElement) {
  const modal = new window.bootstrap.Modal(modalElement)
  if(modal) modal.show();
}

export function RegisterLightBox({modalId, imgSelector, prevSelector, nextSelector}) {
  const modalElement = document.getElementById(modalId);
  if(!modalId) return;

  if(Boolean(modalElement.dataset.registered)) return;

  //selector

  const imageElement = modalElement.querySelector(imgSelector);
  const prevButton = modalElement.querySelector(prevSelector);
  const nextButton = modalElement.querySelector(nextSelector);

  if(!imageElement || !prevButton || !nextButton) return;

  let imgList = [];
  let currentIndex  = 0;

  function showImageAtIndex(index) {
    imageElement.src = imgList[index].src;
  }

  document.addEventListener('click', (event) => {
    const {target} = event;
    if(target.tagName !== "IMG" || !target.dataset.album) return;

    //img with data-album
    imgList = document.querySelectorAll(`img[data-album="${target.dataset.album}"`);
    currentIndex = [...imgList].findIndex((x) => x===target);

    // show image at index
    showImageAtIndex(currentIndex);
    // show modal
    showModal(modalElement);
  })

  prevButton.addEventListener('click', () => {
    // show prev image of current album
    currentIndex = (currentIndex - 1 + imgList.length) % imgList.length;
    showImageAtIndex(currentIndex);
  })

  nextButton.addEventListener('click', () => {
    // show next image of current album
    currentIndex = (currentIndex + 1) % imgList.length;
    showImageAtIndex(currentIndex);
  })

  //mark this modal is already registered
  modalElement.dataset.registered = 'true';
}