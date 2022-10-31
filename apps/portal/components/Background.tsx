const Splotch = (props: { x: number; y: number; color: string }) => {
  return (
    <div
      className=" blur-[100px] rounded-full absolute h-[15%] w-[15%] overflow-hidden -z-40"
      style={{ backgroundColor: props.color, top: `${props.x}%`, left: `${props.y}%` }}
    ></div>
  );
};

const Background = (props: { splotches: number }) => {
  // todo: generate splotch position better
  let splotchMap: Array<[number, number, string]> = [
    [3, 50, 'rgba(201, 215, 97, 0.4)'],
    [67, 14, 'rgba(51, 209, 93, 0.4)'],
    [50, 73, 'rgba(129, 85, 190, 0.4)'],
  ];

  return (
    <div className="absolute h-screen w-screen bg-zinc-900 -z-50 overscroll-hidden">
      {splotchMap.map((pos, idx) => (
        <Splotch key={idx} x={pos[0]} y={pos[1]} color={pos[2]} />
      ))}
    </div>
  );
};

export default Background;
