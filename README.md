## OverlayModel

Plain Javascript class using ES6 to create an overlay model / popup. Possible to create an array of overlay models so you can navigate between.

## Usage

Add an event listener to toggle the overlay.
First parameter should be an object containing all data that needs to be displayed.
There a few datatypes available, currently limited to title, subtitle, content and images.
Second parameter is the order in which the data should be presented. Rearrange if necessary.

```
## Dynamic data example

```html
<div class="js-toggle-overlay" data-get="get-this-data" data-image="/img/example.jpg" data-title="Example title" data-content="Put here any content you want">
  Click Me
</div>
```

```javascript
const toggleElems = document.querySelectorAll('.js-open-overlay');

toggleElems.forEach(elem => {
  data[elem.dataset.get] = {
    'title': elem.dataset.title,
    'content': elem.dataset.content,
    'images': [
        {
            'src': elem.dataset.image,
            'title': elem.dataset.title
        }
    ]
  };
});

toggleElems.forEach(elem => {
 elem.addEventListener('click', () => {
   event.preventDefault();
   new OverlayModel(data, elem.dataset.get, ['title', 'images', 'content']);
 });
});
```

Needed feature: more dynamic images available.

## Single

```javascript
document.querySelector('.js-toggle-overlay').addEventListener('click', () => {
  new OverlayModel(data, 'get-this-data', ['title', 'content', 'images']);
});
```

## Multiple

```javascript
const toggleBtns = document.querySelectorAll('.js-toggle-overlay');
toggleBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    new OverlayModel(data, btn.getAttribute('data-get'), ['title', 'content', 'images']);
  });
});
```
