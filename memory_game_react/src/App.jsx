import { useState, useEffect } from 'react'

import Header from './components/header';
import './App.css'

function App() {
  const [isLoading, setIsLoading]=useState(true);
  const [error, setError]=useState(null);
  const [dogs, setDogs]=useState([]);
  const [score, setScore]=useState(0);
  const [bestScore, setBestScore]=useState(0);
  const [matched, setMatched]=useState([]);
  const [win, setWin] =useState(false);
  const [defeat, setDefeat]=useState(false);
  
  useEffect(()=>{
    const url = "https://dog.ceo/api/breeds/image/random/12"
    const fetchDogs= async ()=>{
      try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Could not fetch data from API");
        }
        const data = await response.json();
        const dogsList = createList(data);
        console.log(dogsList);
        setDogs(dogsList);  
        console.log(dogs)      
        setIsLoading(false);
        

    } catch (err) {
        setError(err)
        setIsLoading(false)
    }
    };
    fetchDogs()
    
  }, []);
  useEffect(()=>{
    setDogs(shuffleArray(dogs))
  }, [matched])
  
// fisher-yates shuffle algorithm
  function shuffleArray(arr) {
    let copy = [...arr];
    let currentIdx= copy.length;

    while (currentIdx !=0){
      let randomIdx = Math.floor(Math.random()*currentIdx);
      currentIdx--;
      [copy[currentIdx], copy[randomIdx]]=[copy[randomIdx], copy[currentIdx]]
    }
  
    return copy
  }

  function createList(data) {
  const arr = []
  for (let i=0; i<data.message.length; i++ ) {    
      arr.push({url: data.message[i], id: data.message[i].substring(30)})
  }
  
  return arr
  }
  function play(id) {
    setScore(score=>score+1);
    setMatched(prevMatched=>[...prevMatched, id])
  }
  const gameTiles= dogs.map((dog)=>
            <img
              key={dog.id}
              src={dog.url}
              alt={dog.id}
              sizes="(max-width: 600px) 100px, (max-width: 1000px) 150px, 200px"
              width="200"
              height="200"
              onClick={()=>play(dog.id)}
            />
          )

  return (
    <div className='container'>
      <Header score={score} bestScore={bestScore}></Header>
      {isLoading ? (
        <div>Loading <div className='loading'></div></div>
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : (
        <div className='gameGrid'>
          {gameTiles}
        </div>
      )
      }
    </div>
  )
}

export default App
