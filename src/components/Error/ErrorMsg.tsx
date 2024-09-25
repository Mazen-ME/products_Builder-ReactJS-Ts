interface Iprops {
  msg: string;
}

export default function Alert(props: Iprops) {
  const { msg } = props;
  return (
    msg && (
      <span className="block mt-[5px] ms-[5px] text-sm font-semibold text-red-600">
        {msg}
      </span>
    )
  );
}
