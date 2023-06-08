import { styled } from "styled-components";
interface GridProps {
  item?: boolean;
  children: JSX.Element | JSX.Element[];
  xs?: number;
  gap?: number;
  alignItems?: string;
  className?: string;
}
const GridStyle = styled.div<{ $gap: number; $alignItems: string }>`
  display: flex;
  gap: ${(props) => props.$gap}rem;
  align-items: ${(props) => props.$alignItems};
  flex-flow: wrap;
`;
const GridItem = styled.div<{ $xs: number; $gap: number }>`
  flex-basis: calc(${(props) => (100 / 12) * props.$xs}% - ${(props) => props.$gap}rem);
`;
const Grid = (props: GridProps) => {
  const { item = false, children, xs = 6, gap = 0, alignItems = "normal", className } = props;
  return (
    <>
      {Array.isArray(children) && (
        <GridStyle $gap={gap} $alignItems={alignItems}>
          {children.map((ele,id) => (
            <GridItem key={id} $xs={xs} $gap={gap/children.length}>
              {ele.props.children}
            </GridItem>
          ))}
        </GridStyle>
      )}
    </>
  );
};

export default Grid;
