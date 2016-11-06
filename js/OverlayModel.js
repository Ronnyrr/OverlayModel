class OverlayModel {
  constructor(data, get, dataOrder) {
    this.get = get;
    this.data = data;
    this.dataOrder = dataOrder;

    this.init = this.init.bind(this);
    this.addEvents = this.addEvents.bind(this);
    this.createPopup = this.createPopup.bind(this);
    this.nav = this.nav.bind(this);
    this.closeOverlay = this.closeOverlay.bind(this);
    this.insertData = this.insertData.bind(this);

    // Class variables
    this.overlay = document.createElement('div');
    this.bodyElement = document.querySelector('body');

    // App variables
    this.fadeDuration = 1000;
    this.isBeingAdded = false;

    this.index = this.objectedIndex(data, get);
    this.length = Object.keys(this.data).length - 1;

    this.init();
  }

  init() {
    this.overlay.classList.add('overlay-model');

    // Add items to initial fade
    const closeElement = document.createElement('span');
    closeElement.classList.add('overlay-model__close', 'fa', 'fa-close');
    this.overlay.appendChild(closeElement);

    this.createPopup(this.index);

    // Insert hidden overlay and fade in
    this.bodyElement.insertBefore(this.overlay, this.bodyElement.firstChild);

    setTimeout(() => {
      this.overlay.classList.add('overlay-model--visible');
    }, 100);

    this.addEvents();
  }

  /** Add key and click events **/
  addEvents() {
    document.querySelector('.overlay-model').addEventListener('click', () => {
      this.closeOverlay();
    });

    document.querySelector('.overlay-model__popup').addEventListener('click', () => {
      event.stopPropagation();
    });

    document.onkeydown = (evt) => {
      if (evt.keyCode === 27 && this.overlay) { // ESC
        this.closeOverlay();
      } else if (evt.keyCode === 37 && this.overlay) { // Left
        this.nav('left');
      } else if (evt.keyCode === 39 && this.overlay) { // Right
        this.nav('right');
      }
    };
  }

  /** Add pop-up elem to overlay top/left/right **/
  createPopup(index = false, type = null) {
    // @TODO popup vanaf links, link laten infaden huidige rechts eruit en visa versa
    const popupElement = document.createElement('div');
    popupElement.classList.add('overlay-model__popup');

    if(type === 'left') {
      popupElement.classList.add('fade', 'fade--in-left');
    } else if(type === 'right') {
      popupElement.classList.add('fade', 'fade--in-right');
    }

    this.overlay.appendChild(popupElement);

    // Get data for specific popup by index
    const popupData = this.objectedIndex(data, index);
    this.insertData(popupData, this.dataOrder);

    if(type) {
      this.animateElems(type);
    }
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
        }, 200);
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

  // Return index of key or return value by index
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
