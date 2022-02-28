import React, { useEffect, useState } from 'react'
import qs from 'qs'
import './style.css';
import Logo from '../../assets/imgs/logo.png'
import Input from '../../Component/Input/Input';
import Button from '../../Component/Button/Button';


function Home() {
  const [memesItens, setMemes] = useState([])
  const [select, setSelect] =  useState(null)
  const [contentInput, setContentInput ] = useState([])
  const [memeFinal, setMemeFinal] = useState(null)

  useEffect(() => {
    (async () => {
      const resp = await fetch('https://api.imgflip.com/get_memes');
      const { data: {memes} } = await resp.json()
      setMemes(memes)
    })();    
  }, [])

  function handleSelect(meme) {
    setSelect(meme)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    
    const parametros = qs.stringify({
      template_id: select.id,
      username: 'memeeduardo',
      password: 'MEMEs433',
      boxes: contentInput.map(text => ({ text })),
    })

    const resp = await fetch(`https://api.imgflip.com/caption_image?${parametros}`)
    const { data: { url } } = await resp.json();
    setMemeFinal(url)
  }

  const handleChange = (index) => (e) => {
    const novoValor = contentInput
    novoValor[index] = e.target.value;
    setContentInput(novoValor)
  }

  return (
    <>
      <h1><img src={Logo} alt="Gerador de Meme" /></h1>
      <div className='ItensMemes'>
        <ul>
          { memesItens.map(meme => (
              <li key={meme.id}>
                <img src={meme.url} alt="memeimg" onClick={() => handleSelect(meme)} />
              </li>
            ))
          }
        </ul>
      </div>

      {select &&
        <form onSubmit={handleSubmit}>
          {(new Array(select.box_count)).fill('').map((_, index) => (
              <input 
              type='text'
                key={String(Math.random())} 
               
                onChange={handleChange(index)}
              />
          ))}
          <button type="submit">Gerar Meme 🤪</button>
        </form>
      }

      {!memeFinal ? '' :  <div className='MemeFinal'><img src={memeFinal} alt="MEME" /></div> }
    </>
  )
}

export default Home