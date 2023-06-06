import { styled } from "styled-components";
interface GridProps {
  item?: boolean;
  children: React.ReactNode;
  xs?: number;
  gap?: number;
  alignItems?:string;
  className?:string
}
const GridStyle = styled.div<{ $gap: number, $alignItems:string }>`
  display: flex;
  gap: ${(props) => props.$gap}rem;
  align-items: ${(props)=>props.$alignItems};
  flex-flow: wrap;
`;
const GridItem = styled.div<{ $xs: number, $gap: number }>`
  flex-basis: calc(${(props) => (100 / 12) * props.$xs}% - ${(props)=>props.$gap}rem);
`;
const Grid = (props: GridProps) => {
  const { item = false, children, xs = 6, gap = 0, alignItems="normal", className } = props;

  return <>{item ? <GridItem className={className} $gap={gap} $xs={xs}>{children}</GridItem> : <GridStyle className={className} $gap={gap} $alignItems={alignItems}>{children}</GridStyle>}</>;
};

export default Grid;