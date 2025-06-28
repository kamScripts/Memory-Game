export default function Img({ imgLink, desc }) {
    return (
        <img
        url={imgLink}
        alt={desc}
        className="imgTile"
        />
    );
}