## OverlayModel

Plain Javascript class using ES6 to create an overlay model / popup.
Styling available in CSS and SCSS. Class uses FontAwesome to create a close button. Include this in your project or change the code.

## Usage

Add an event listener to toggle the overlay.
First parameter should be an object containing overlay data. Currently limited to title, subtitle, content and images.
Second parameter is the order in which the data should be presented. Rearrange if necessary.

```javascript
document.querySelector('.js-toggle-overlay').addEventListener('click', () => {
	new OverlayModel({
		"title": "Example title",
		"content": "Nullam quis risus eget urna mollis ornare vel eu leo. Donec ullamcorper nulla non metus auctor fringilla.",
		"images": [
			{
				"src": "https://placehold.it/350x150",
				"title": "Example alt text"
			},
			{
				"src": "https://placehold.it/350x150",
				"title": "Example alt text"
			},
		]
	}, ['title', 'content', 'images']);
});
```
