interface Iprops {
color:string;
onClick?:()=>void;
}


export default function Colors(props :Iprops) {
    const { color,onClick } = props;
  return (
    <span onClick={onClick}
      className={`block w-5 h-5 rounded-full cursor-pointer `}
      style={{ backgroundColor: color }}
    />
  );

}