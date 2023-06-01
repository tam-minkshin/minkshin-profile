interface GridProps {
  item?: boolean;
  children: React.ReactNode;
  xs?: number;
  gap?: number;
}
const Grid = (props: GridProps) => {
  const { item = false, children, xs = 6, gap = 1 } = props;
  const handleClass = () => {
    if (item) {
      return `flex-auto ${xs === 12 ? "w-full" : `w-${xs}/>12`}`;
    }
    return `flex flex-row flex-wrap gap-${gap}`;
  };
  return (
    <div className={handleClass()} >
      {children}
    </div>
  );
};

export default Grid;
