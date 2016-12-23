class OverlayModel {
    constructor(data, get, dataOrder) {
        this.get = get;
        this.data = data;
        this.dataOrder = dataOrder;

        this.init = this.init.bind(this);
        this.addEvents = this.addEvents.bind(this);
        this.createPopup = this.createPopup.bind(this);
        this.createNavigation = this.createNavigation.bind(this);
        this.nav = this.nav.bind(this);
        this.closeOverlay = this.closeOverlay.bind(this);
        this.insertData = this.insertData.bind(this);
        this.checkElemHeight = this.checkElemHeight.bind(this);

        // Class variables
        this.overlay = document.createElement('div');
        this.bodyElem = document.querySelector('body');

        // App variables
        this.fadeDuration = 1000;

        this.isBeingAdded = false;
        this.isCurrentlyClosing = false;

        this.index = this.objectedIndex(data, get);
        this.length = Object.keys(this.data).length - 1;

        this.init();
    }

    init() {
        this.overlay.classList.add('overlay-model');

        // Add first popup based on index
        this.createPopup(this.index);

        // Insert hidden overlay and fade in by adding class
        this.bodyElem.insertBefore(this.overlay, this.bodyElem.firstChild);

        setTimeout(() => {
            this.overlay.classList.add('overlay-model--visible');
        }, 100);

        // Check if elem is larger than window
        this.checkElemHeight();

        // Add navigation if more then 1 item
        if(this.length > 0) {
            this.createNavigation();
        }

        this.addEvents();
    }

    /** Add key and click events **/
    addEvents() {
        document.querySelector('.overlay-model__close').addEventListener('click', () => {
            this.closeOverlay();
        });
        document.querySelector('.overlay-model').addEventListener('click', () => {
            this.closeOverlay();
        });

        document.querySelector('.overlay-model__popup').addEventListener('click', () => {
            event.stopPropagation();
        });

        if(this.length > 0) {
            document.querySelector('.overlay-model__nav--left').addEventListener('click', () => {
                event.stopPropagation();
                this.nav('left');
            });

            document.querySelector('.overlay-model__nav--right').addEventListener('click', () => {
                event.stopPropagation();
                this.nav('right');
            });
        }

        // Key events
        document.onkeydown = (evt) => {
            if (evt.keyCode === 27 && this.overlay) { // ESC
                this.closeOverlay();
            }

            // Add navigation if more then 1 item exists
            if(this.length > 0) {
                if (evt.keyCode === 37 && this.overlay) { // Left
                    this.nav('left');
                } else if (evt.keyCode === 39 && this.overlay) { // Right
                    this.nav('right');
                }
            }
        };
    }

    /** Add pop-up elem to overlay top/left/right **/
    createPopup(index = false, type = null) {
        const popupElement = document.createElement('div');
        popupElement.classList.add('overlay-model__popup');

        // Create element to close
        const closeElem = document.createElement('span');
        closeElem.classList.add('overlay-model__close');
        popupElement.appendChild(closeElem);

        if(type === 'left') {
            popupElement.classList.add('fade', 'fade--in-left');
        } else if(type === 'right') {
            popupElement.classList.add('fade', 'fade--in-right');
        }

        this.overlay.appendChild(popupElement);

        // Get data for specific popup by index
        const popupData = this.objectedIndex(this.data, index);
        this.insertData(popupData, this.dataOrder);

        if(type) {
            this.animateElems(type);
        }
    }

    createNavigation() {
        const leftElem = document.createElement('span');
        leftElem.classList.add('overlay-model__nav', 'overlay-model__nav--left');
        this.overlay.appendChild(leftElem);

        const rightElem = document.createElement('span');
        rightElem.classList.add('overlay-model__nav', 'overlay-model__nav--right');
        this.overlay.appendChild(rightElem);
    }

    nav(type) {
        // Last action not finished yet
        if(!this.isBeingAdded) {
            this.isBeingAdded = true;

            if(type == 'left') {
                this.index =
                    this.index === 0
                        ? this.length
                        : this.index -= 1;
            } else if(type == 'right') {
                this.index =
                    this.index === this.length
                        ? 0
                        : this.index += 1;
            }

            this.createPopup(this.index, type);
        }
    }

    animateElems(type) {
        const popupElems = document.querySelectorAll('.overlay-model__popup');

        popupElems.forEach(elem => {
            if(elem.classList.contains('fade')) {
                setTimeout(function() {
                    if(type === 'left') {
                        elem.classList.remove('fade--in-left', 'fade');
                    } else if(type === 'right') {
                        elem.classList.remove('fade--in-right', 'fade');
                    }

                    // Check if elem is larger than window
                    this.checkElemHeight(elem);
                }.bind(this), 200);
            } else {
                const direction = type === 'left'
                    ? 'fade--out-right'
                    : 'fade--out-left';

                elem.classList.add('fade', direction);

                // Remove elem after fading
                setTimeout(function() {
                    this.overlay.removeChild(elem);
                }.bind(this), this.fadeDuration);
            }
        });

        // Can navigate again
        setTimeout(function() {
            this.isBeingAdded = false;
        }.bind(this), this.fadeDuration);
    }

    closeOverlay() {
        // Set currentlyClosing to true, so ESC can't error as long fadeDuration takes
        if(!this.isCurrentlyClosing) {
            this.isCurrentlyClosing = true;

            this.overlay.classList.remove('overlay-model--visible');

            setTimeout(() => {
                this.bodyElem.removeChild(this.overlay);
                this.overlay = null;
            }, this.fadeDuration);
        }
    }

    /** Insert specificied data elements to overlay **/
    insertData(data, dataOrder) {
        const addElements = [];

        for (let d in dataOrder) {
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
                    const elemsArr = [];

                    for (const i in images) {
                        const image = document.createElement('img');
                        image.classList.add('overlay-model__image');

                        image.setAttribute('src', images[i].src);
                        image.setAttribute('alt', images[i].title);

                        elemsArr.push(image);
                    }

                    addElements.push(elemsArr);
                    break;

                default: null;
            }
        }

        // Add elements to popup (lastChild) in overlay
        for (let a in addElements) {
            if(Array.isArray(addElements[a])) { //  instanceof HTMLImageElement
                data[dataOrder[a]].forEach((img, i) => {
                  this.overlay.lastChild.appendChild(addElements[a][i]);
                });
            } else {
                this.overlay.lastChild.appendChild(addElements[a]).innerHTML = data[dataOrder[a]];
            }
        }
    }

    /** If elem is larger then window, stick to bottom. Else center vertical **/
    checkElemHeight(elem = false) {
        const popupElem = elem ? elem : document.querySelector('.overlay-model__popup');
        if (popupElem.offsetHeight > window.innerHeight) {
            popupElem.classList.add('overlay-model__popup--stick');
        }
    }

    /** Return index of key or return value by index **/
    objectedIndex(data, get) {
        let i = 0;

        for(let key in data) {
            // return int, search by key
            if(typeof get === 'string' && key == get) {
                return i;
            } // return object, search by index
            else if(typeof get === 'number' && i === get) {
                return data[key];
            }

            i++;
        }
    }
}
