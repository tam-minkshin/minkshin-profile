interface GridProps {
  item?: boolean;
  children: React.ReactNode;
  xs?: number;
  gap?:number;
}
const Grid = (props: GridProps) => {
  const { item = false, children, xs = 6, gap=0 } = props;
  return <div className={`${item ? `flex-auto ${xs === 12 ? "w-full" : `w-${xs}/>12`}` : `flex flex-wrap`}`} style={{columnGap:`${gap}rem`}}>{children}</div>;
};

export default Grid;
