import React, { useEffect, useState } from 'react'
import './style.css';
import Logo from '../../assets/imgs/logo.png'
import Input from '../../Component/Input/Input';
import Button from '../../Component/Button/Button';


function Home() {
  const [memesItens, setMemes] = useState([])
  const [select, setSelect] =  useState(null)
  const [contentInput, setContentInput ] = useState('')

  useEffect(() => {
    (async () => {
      const resp = await fetch('https://api.imgflip.com/get_memes');
      const { data: {memes} } = await resp.json()
      setMemes(memes)
      console.log(memes)
    })();    
  }, [])

  function handleSelect(meme) {
    setSelect(meme)
  }
  return (
    <>
    
      <h1>
        <img src={Logo} alt="Gerador de Meme" />
      </h1>
      <div className='ItensMemes'>
        <ul>
          {
            memesItens.map(meme => (
              <li key={meme.id}>
                <img src={meme.url} alt="memeimg" onClick={() => handleSelect(meme)} />
              </li>
            ))
          }
        </ul>
      </div>

      {select &&
        <form action="">
        {(new Array(select.box_count)).fill('').map((_, index) => (
            <Input key={String(Math.random())} text={`Text ${index + 1}`} />
          ))}
        
          <Button />
        </form>
      }
    </>
  )
}

export default Home