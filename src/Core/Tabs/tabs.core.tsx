import React, { FC, ReactNode, useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import Style from "Sass/Core/_tabs.module.scss"
type ItemTab = { id: number; label: string; content: ReactNode };
export type ConfigTab = Array<ItemTab>;
interface TabsCoreProps {
  configTab: ConfigTab;
  defaultTab?: number;
}
interface TabsCoreState {
  borderItem: { left: number; width: number };
  defaultTab: number;
}
const BorderLabel = styled.div<{ $left: number; $width: number }>`
  background-color: #d2a8ff;
  transition: 0.5s;
  position: absolute;
  height: 100%;
  left: ${(props) => props.$left}px;
  width: ${(props) => props.$width}px;
`;
const TabsCore: FC<TabsCoreProps> = (props) => {
  const { configTab, defaultTab = 0 } = props;
  const labelRef = useRef<HTMLHeadingElement>(null);
  const current = labelRef.current;
  const [state, setState] = useState<TabsCoreState>({
    borderItem: {
      left: 0,
      width: 0,
    },
    defaultTab: 0,
  });
  useEffect(() => {
    const index = defaultTab;
    setState((state) => ({ ...state, ...{ defaultTab: index } }));
    if (current) {
      setState((state) => ({
        ...state,
        ...{
          borderItem: {
            left: current.children[index].getBoundingClientRect().left - current.offsetLeft + (index > 0 ? 28 : 0),
            width: current.children[index].getBoundingClientRect().width - (index > 0 ? 28 : 0),
          },
        },
      }));
    }
  }, [current, defaultTab]);
  const handleSelect = (index: number) => {
    if (current) {
      state.borderItem.left = current.children[index].getBoundingClientRect().left - current.offsetLeft + (index > 0 ? 28 : 0);
      state.borderItem.width = current.children[index].getBoundingClientRect().width - (index > 0 ? 28 : 0);
      state.defaultTab = index
    }
    setState({ ...state });
  };
  return (
    <div className={Style['container-tabs']}>
      {configTab.length > 0 && (
        <>
          <div ref={labelRef} className={Style['container-labels']}>
            {configTab.map((item, id) => (
              <div key={id} className={`${Style['label-tab']} ${id === state.defaultTab ? Style['label-tab--selected'] : ""}`}>
                <h1 onClick={() => handleSelect(id)}>
                  {item.label}
                </h1>
              </div>
            ))}
          </div>
          <div className="w-full h-0.5 bg-gray-500 relative my-4">
            <BorderLabel $left={state.borderItem.left} $width={state.borderItem.width} />
          </div>
          <div>{configTab[state.defaultTab].content}</div>
        </>
      )}
    </div>
  );
};

export default TabsCore;
