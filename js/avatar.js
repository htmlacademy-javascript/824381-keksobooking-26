/**
 * Avatar data variable
 */
const IMAGE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

/**
 * Function that enable avatar photo previews
 */
const enableAvatarPreviews = () => {
  /**
   * Avatar variables
   */
  const photoAvatarChoser = document.querySelector('.ad-form-header__input');
  const photoAvatarPreview = document.querySelector('.ad-form-header__preview');
  const photoHousingChoser = document.querySelector('.ad-form__input');
  const photoHousingPreview = document.querySelector('.ad-form__photo');

  /**
   * Function that set photo to preview element
   * @param {*} choser - input element for choose image
   * @param {*} preview - container element for preview
   */
  const setPhotoPreview = (choser, preview) => {
    const file = choser.files[0];
    const fileName = file.name.toLowerCase();

    const matches = IMAGE_TYPES.some((format) => fileName.endsWith(format));
    if (matches) {
      const image = document.createElement('div');
      if (preview.querySelector('img')) {
        image.classList.add('preview-container', 'preview-container_small');
      } else {
        image.classList.add('preview-container');
      }
      image.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
      preview.append(image);
    }
  };

  /**
   * Avatar event listeners
   */
  photoAvatarChoser.addEventListener('change', (e) => {
    setPhotoPreview(e.target, photoAvatarPreview);
  });

  photoHousingChoser.addEventListener('change', (e) => {
    setPhotoPreview(e.target, photoHousingPreview);
  });
};

/**
 * Function that remove avatar images
 */
const removeAvatarPreviews = () => {
  const photoPreviews = document.querySelectorAll('.preview-container ');
  if (photoPreviews) {
    photoPreviews.forEach((item) => item.remove());
  }
};

export { enableAvatarPreviews, removeAvatarPreviews };
