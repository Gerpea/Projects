import { fromEvent } from 'rxjs'
import { map, debounceTime, distinctUntilChanged, filter, tap } from 'rxjs/operators'

const searchInput = document.getElementById('search-input')
const searchValue$ = fromEvent(searchInput, 'input').pipe(
  map((e) => e.target.value.trim()),
  debounceTime(500),
  distinctUntilChanged()
)

export { searchValue$ }
