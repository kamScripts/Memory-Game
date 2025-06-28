export default function Header({score, bestScore, handleClick}){
return (
    <header className="head">
        <div className="menu">
            <button onClick={handleClick}>New Dog Pics</button>
        </div>
        <h1>
            Dogs Memory Game
        </h1>
        <div className="scores
        ">
            <p className="results">Score: {score}</p>
            <p className="results">Best Score: {bestScore}</p>
        </div>
    </header>
);
}