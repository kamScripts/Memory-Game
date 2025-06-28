export default function Instructions({ onClose }) {
  return (
    <div className="modal">
      <div className="textContent">
        <h3>Game Rules</h3>
        <p>To win the game select all 12 dogs,
            You can select each dogs only once,
            otherwise games starts over again, 
            Also, you can choose a new pack of dogs
            by selecting appropriate button.
            Good Luck ! 
        </p>        
      </div>
      <button onClick={onClose}>Close</button>
    </div>
  );
}