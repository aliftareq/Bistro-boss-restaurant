const MenuItem = ({ item }) => {
  const { name, recipe, image, price } = item;
  return (
    <div className="flex space-x-2">
      <img
        style={{ borderRadius: "0 200px 200px 200px" }}
        className="w-[100px]"
        src={image}
        alt={image}
      />
      <div>
        <h3 className="uppercase">{name}______________</h3>
        <p>{recipe}</p>
        <p className="text-yellow-500">${price}</p>
      </div>
    </div>
  );
};

export default MenuItem;
