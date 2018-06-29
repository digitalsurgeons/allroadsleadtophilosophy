const ui = {
  canvas: document.querySelector('[data-canvas]'),
  initBtns: document.querySelector('[data-init]')
}

ui.initBtns.addEventListener('click', e => init(e, ui))

function init(e, ui) {
  const target = e.target
  const type = target.getAttribute('data-init')
  const loading = `
    Calculating mad science...
  `
  ui.canvas.innerHTML = loading

  if (type === 'url') {
    
  } else if (type === 'lucky') {
    fire()
  }
}

function fire() {
  alert('Fire!!')
}
