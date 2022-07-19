/**
 * Avatar data variable
 */
const FILES_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

/**
 * Function that enable avatar photo previews
 */
const enableAvatarPreviews = () => {
  /**
   * Avatar variables
   */
  const avatarChoserElement = document.querySelector('.ad-form-header__input');
  const avatarPreviewElement = document.querySelector('.ad-form-header__preview');
  const housePhotoChoserElement = document.querySelector('.ad-form__input');
  const housePhotoPreviewElement = document.querySelector('.ad-form__photo');

  /**
   * Function that set photo to preview element
   * @param {*} choser - input element for choose image
   * @param {*} preview - container element for preview
   */
  const setPhotoPreview = (choser, preview) => {
    const file = choser.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILES_TYPES.some((format) => fileName.endsWith(format));
    if (matches) {
      const imageElement = document.createElement('div');
      if (preview.querySelector('img')) {
        imageElement.classList.add('preview-container', 'preview-container_small');
      } else {
        imageElement.classList.add('preview-container');
      }
      imageElement.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
      preview.append(imageElement);
    }
  };

  /**
   * Avatar event listeners
   */
  avatarChoserElement.addEventListener('change', (e) => {
    setPhotoPreview(e.target, avatarPreviewElement);
  });

  housePhotoChoserElement.addEventListener('change', (e) => {
    setPhotoPreview(e.target, housePhotoPreviewElement);
  });
};

/**
 * Function that remove avatar images
 */
const removeAvatarPreviews = () => {
  const photoPreviewElements = document.querySelectorAll('.preview-container ');
  if (photoPreviewElements) {
    photoPreviewElements.forEach((item) => item.remove());
  }
};

export { enableAvatarPreviews, removeAvatarPreviews };
