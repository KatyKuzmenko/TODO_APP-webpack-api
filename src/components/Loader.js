import Component from '../utils/Component'

export default class Loader extends Component {
  render() {
    const loader = document.createElement('div')
    loader.classList.add('loader')
    loader.innerText = 'Loading'
    const span = document.createElement('span')
    span.classList.add('loader-span')
    loader.appendChild(span)

    return loader
  }

  showLoader() {
    const loader = document.querySelector('.loader')
    loader.hidden = false
  }

  hideLoader() {
    const loader = document.querySelector('.loader')
    loader.hidden = true
  }
}
