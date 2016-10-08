class OverlayModel {
	constructor(data, dataOrder) {
		this.data = data;
		this.dataOrder = dataOrder;

		this.init = this.init.bind(this);
		this.addEvents = this.addEvents.bind(this);
		this.insertData = this.insertData.bind(this);
		this.closeOverlay = this.closeOverlay.bind(this);

		// Class variables
		this.overlay = document.createElement('div');
		this.bodyElement = document.querySelector('body');

		this.fadeDuration = 1000;

		this.init();
	}

	init() {
		this.overlay.classList.add('overlay-model');

		const popupElement = document.createElement('div');
		popupElement.classList.add('overlay-model__popup');

		const closeElement = document.createElement('span');
		closeElement.classList.add('overlay-model__close', 'fa', 'fa-close');

		this.overlay.appendChild(closeElement);
		this.overlay.appendChild(popupElement);

		// Insert hidden overlay and fade in
		this.bodyElement.insertBefore(this.overlay, this.bodyElement.firstChild);
		setTimeout(() => {
			this.overlay.classList.add('overlay-model--visible');
		}, 100);

		this.addEvents();
	}

	addEvents() {
		document.querySelector('.overlay-model__close').addEventListener('click', () => {
			this.closeOverlay();
		});

		document.onkeydown = (evt) => {
			if (evt.keyCode === 27 && this.overlay) {
				this.closeOverlay();
			}
		};

		this.insertData(this.data, this.dataOrder);
	}

	closeOverlay() {
		this.overlay.classList.remove('overlay-model--visible');

		setTimeout(() => {
			this.bodyElement.removeChild(this.overlay);
			this.overlay = null;
		}, this.fadeDuration);
	}

	insertData(data, dataOrder) {
		const addElements = [];
		for (const d in dataOrder) {
			switch (dataOrder[d]) {
				case 'title':
					const title = document.createElement('h1');
					title.classList.add('overlay-model__title');

					addElements.push(title);
					break;

				case 'subtitle':
					const subtitle = document.createElement('h2');
					subtitle.classList.add('overlay-model__subtitle');

					addElements.push(subtitle);
					break;

				case 'content':
					const content = document.createElement('p');
					content.classList.add('overlay-model__content');

					addElements.push(content);
					break;

				case 'images':
					const images = data[dataOrder[d]];
					for (const i in images) {
						const image = document.createElement('img');
						image.classList.add('overlay-model__image');

						image.setAttribute('src', images[i].src);
						image.setAttribute('alt', images[i].title);

						addElements.push(image);
					}
					break;

				default: null;
			}
		}

		for (const a in addElements) {
			if (addElements[a] instanceof HTMLImageElement) {
				this.overlay.lastChild.appendChild(addElements[a]);
			} else {
				this.overlay.lastChild.appendChild(addElements[a]).innerHTML = data[dataOrder[a]];
			}
		}
	}
}
