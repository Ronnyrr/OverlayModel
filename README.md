## OverlayModel

Plain Javascript class using ES6 to create an overlay model / popup. Possible to create an array of overlay models so you can navigate between.

## Usage

Add an event listener to toggle the overlay.
First parameter should be an object containing all data that needs to be displayed.
There a few datatypes available, currently limited to title, subtitle, content and images.
Second parameter is the order in which the data should be presented. Rearrange if necessary.

## Data example

```javascript
const data = {
  'get-this-data': {
    'title': 'Example title',
    'content': 'Nullam quis risus eget urna mollis ornare vel eu leo. Donec ullamcorper nulla non metus auctor fringilla.',
    'images': [
      {
        'src': 'https://placehold.it/350x150',
        'title': 'Example alt text'
      },
      {
        'src': 'https://placehold.it/350x150',
        'title': 'Example alt text'
      }
    ]
  },
  'or-another-data': {
    'title': 'Last title',
    'images': [
      {
        'src': 'https://placehold.it/350x150',
        'title': 'Example alt text'
      }
    ]
  }
};
```

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
