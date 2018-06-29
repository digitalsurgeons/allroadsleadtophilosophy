const ui = {
  canvas: document.querySelector('[data-canvas]'),
  initBtns: document.querySelector('[data-init]')
}

console.log(ui)

ui.initBtns.addEventListener('click', e => init(ui))

function init(ui) {
  console.log(ui)
  const loading = `
    Calculating mad science...
  `
  ui.canvas.innerHTML = loading
}
