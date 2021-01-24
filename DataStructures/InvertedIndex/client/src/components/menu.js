import { BehaviorSubject } from 'rxjs'

const menuBox = document.getElementById('menu')

const centered$ = new BehaviorSubject(true)

centered$.subscribe((v) => {
  if (v) {
    menuBox.classList.add('menu--center')
  } else {
    menuBox.classList.remove('menu--center')
  }
})

function menuBindToCenter() {
  centered$.next(true)
}

function menuUnbindFromCenter() {
  centered$.next(false)
}

export { menuBindToCenter, menuUnbindFromCenter }
