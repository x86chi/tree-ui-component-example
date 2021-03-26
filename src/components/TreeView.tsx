import React, { useState } from "react";

import styled from "styled-components";

import type { Tree } from "../utils/tree";
import { useSelectedPath } from "../state/selectedPath";

interface TreeProps {
  data: Tree;
}

const Wrapper = styled.ul`
  width: 100%;
  line-height: 1.5;
  overflow-y: auto;
  list-style: none;
  padding: 1em;
`;

export default function TreeView(props: TreeProps) {
  return (
    <Wrapper>
      {/* @ts-ignore */}
      <Nodes {...props} />
    </Wrapper>
  );
}

function Nodes({ data }: TreeProps) {
  const setSelectedPath = useSelectedPath();

  return data.map((node) => {
    if (node.type === "file")
      return (
        <File
          key={node.fullPath}
          onClick={(event) => {
            // @ts-ignore
            event.stopPropagation();
            setSelectedPath(node.fullPath);
          }}
          name={node.name}
        />
      );

    return (
      <Folder key={node.fullPath} name={node.name}>
        {/* @ts-ignore */}
        <Nodes data={node.children} />
      </Folder>
    );
  });
}

const NodeStyled = styled.li`
  list-style-position: inside;

  ::before {
    display: inline-block;
    margin-left: -1em;
  }

  ::hover {
    color: rgba(0, 0, 0, 0.75);
  }
`;

const Styled = {
  File: styled(NodeStyled)`
    ::before {
      content: "📄";
    }
  `,
  Ul: styled.ul`
    padding-left: 1em;
    list-style: none;
  `,
  // hack: 속성 전달로 제어가 불가능해서 하드코딩 했습니다.
  // \1F4C1-2 유니코드도 시도해봤습니다.
  OpenFolder: styled(NodeStyled)`
    ::before {
      content: "📂";
    }
  `,
  ClosedFolder: styled(NodeStyled)`
    ::before {
      content: "📁";
    }
  `
} as const;

interface NodeProps {
  name: string;
}

type FileProps = NodeProps &
  Pick<React.LiHTMLAttributes<HTMLLIElement>, "onClick">;

const File = ({ name, onClick }: FileProps) => (
  <Styled.File onClick={onClick}>{name}</Styled.File>
);

const Folder: React.FC<NodeProps> = ({ name, children }) => {
  const [isOpen, setOpen] = useState(false);

  function handleToggle(event: unknown) {
    // @ts-ignore
    event.stopPropagation();
    setOpen((isOpen) => !isOpen);
  }

  const body = (
    <>
      <span>{name}</span>
      {isOpen && <Styled.Ul>{children}</Styled.Ul>}
    </>
  );

  return isOpen ? (
    <Styled.OpenFolder onClick={handleToggle}>{body}</Styled.OpenFolder>
  ) : (
    <Styled.ClosedFolder onClick={handleToggle}>{body}</Styled.ClosedFolder>
  );
};
