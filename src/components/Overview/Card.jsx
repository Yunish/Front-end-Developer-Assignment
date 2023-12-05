import "./styles.css";

function Card({ title, children }) {
  return (
    <div className='card'>
      <h3 className='card_title'>{title}</h3>
      {children}
    </div>
  );
}

export default Card;
