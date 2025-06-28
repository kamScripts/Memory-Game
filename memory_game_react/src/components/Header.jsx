export default function Header({score, bestScore,}){
return (
    <header className="head">
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