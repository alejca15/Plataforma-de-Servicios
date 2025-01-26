import React from 'react'
import  Navbar_cliente from '../componentes/Cliente_home/Navbar_cliente'
import  Sidebar_cliente  from '../componentes/Cliente_home/Sidebar_cliente'
import  SearchForm   from '../componentes/Cliente_home/search_cliente'
const Cliente_page= () => {
  return (
    <div>
        <Navbar_cliente/>
        <Sidebar_cliente/>
        <SearchForm/>
    </div>
  )
}

export default Cliente_page