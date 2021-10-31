import Head from 'next/head'

import Search from '../components/Search'
import SymbolList from '../components/SymbolList'

export default function Home() {
  return (
    <div className='p-3'>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Search className='mbf-3' />
      <SymbolList />
    </div>
  )
}
