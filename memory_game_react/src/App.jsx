import { useState, useEffect } from 'react';
import Header from './components/Header';
import './App.css';


function App() {
  const [isLoading, setIsLoading]=useState(true);
  const [error, setError]=useState(null);
  const [dogs, setDogs]=useState([]);
  const [score, setScore]=useState(0);
  const [bestScore, setBestScore]=useState(0);
  const [matched, setMatched]=useState([]);
  const [win, setWin]=useState(false);

  
  useEffect(()=>{    
    fetchDogs();    
  }, []);
  useEffect(()=>{
    if(score==dogs.length && !isLoading ){
      setWin(true)
    }
    setDogs(dogs=>shuffleArray(dogs));   

  }, [matched]);

    const url = "https://dog.ceo/api/breeds/image/random/12";
    const fetchDogs= async ()=>{
      try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Could not fetch data from API");
        }
        const data = await response.json();
        const dogsList = createList(data);
        setDogs(dogsList);       
        setIsLoading(false);
        

    } catch (err) {
        setError(err)
        setIsLoading(false)
    }
    };
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
    setMatched(prevMatched=>[...prevMatched, id])
    const check = matched.find((dog)=>dog===id)
    if (!check) {
      setScore(score => score + 1);
    }else {
      if (score > bestScore) {
        setBestScore(score);
      }
      setScore(0);
      setMatched([]);
    }
  }
  function newGame(){
    setWin(false)
    fetchDogs();
    setScore(0)
  }
  const gameTiles= dogs.map((dog)=>
            <img
              key={dog.id}
              src={dog.url}
              alt={dog.id}
              
              width="200px"
              height="200px"
              onClick={()=>play(dog.id)}
            />
          )

  return (
    <div className='container'>
      <Header score={score} bestScore={bestScore} handleClick={newGame} />
      
      {isLoading ? (
        <div>Loading <div className='loading'></div></div>
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : win ? (
        <div>
          <h2>You won!"</h2>
          <p>You matched all the dogs!</p>
          <button onClick={newGame}>Play Again</button>
        </div>

      ): (
        <div className='gameGrid'>
          {gameTiles}
        </div>
      )
      }
    </div>
  )
}

export default App
