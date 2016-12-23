## OverlayModel

Plain Javascript class using ES6 to create an overlay model / popup. Possible to create an array of overlay models so you can navigate between.

## Usage

Add an event listener to toggle the overlay.
First parameter should be an object containing all data that needs to be displayed.
There a few datatypes available, currently limited to title, subtitle, content and images.
Second parameter is the order in which the data should be presented. Rearrange if necessary.

## Dynamic data example

```html
<div class="js-toggle-overlay" data-get="trigger" data-image="https://placehold.it/350x150,https://placehold.it/350x150" data-title="Example title" data-content="Put here any content you want">
  Click Me
</div>
```

```javascript
const toggleElems = document.querySelectorAll('.js-open-overlay');

toggleElems.forEach((elem, i) => {
  const images = [];

  if(elem.dataset.images) {
    const imgSrc = elem.dataset.images.split(',');

    imgSrc.forEach((img, i) => {
      images.push({
        'src': img,
        'title': `Images ${i}`
      })
    });
  }

  data[elem.dataset.get] = {
    'title': elem.dataset.title,
    'content': elem.dataset.content,
    images
  };
});

toggleElems.forEach(elem => {
 elem.addEventListener('click', () => {
   event.preventDefault();
   new OverlayModel(data, elem.dataset.get, ['title', 'images', 'content']);
 });
});
```

## Single model

```javascript
document.querySelector('.js-toggle-overlay').addEventListener('click', () => {
  new OverlayModel(data, 'get-this-data', ['title', 'content', 'images']);
});
```
