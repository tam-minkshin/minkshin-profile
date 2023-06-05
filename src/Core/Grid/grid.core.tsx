import { styled } from "styled-components";
interface GridProps {
  item?: boolean;
  children: React.ReactNode;
  xs?: number;
  gap?: number;
}
const GridStyle = styled.div<{ $gap: number }>`
  display: flex;
  gap: ${(props) => props.$gap}rem;
`;
const GridItem = styled.div<{ $xs: number }>`
  flex-basis: ${(props) => (100 / 12) * props.$xs}%;
`;
const Grid = (props: GridProps) => {
  const { item = false, children, xs = 6, gap = 0 } = props;

  return <>{item ? <GridItem $xs={xs}>{children}</GridItem> : <GridStyle $gap={gap}>{children}</GridStyle>}</>;
};

export default Grid;
