const Card = ({ data }) => {
  if (!data) return null;

  return (
    <div className="card">
      <img src={data.image} alt={data.name} />
      <h3>{data.name}</h3>
      <p>{data.status} - {data.species}</p>
    </div>
  );
};

export default Card;