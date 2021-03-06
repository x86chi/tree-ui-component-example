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
      content: "π";
    }
  `,
  Ul: styled.ul`
    padding-left: 1em;
    list-style: none;
  `,
  // hack: μμ± μ λ¬λ‘ μ μ΄κ° λΆκ°λ₯ν΄μ νλμ½λ© νμ΅λλ€.
  // \1F4C1-2 μ λμ½λλ μλν΄λ΄€μ΅λλ€.
  OpenFolder: styled(NodeStyled)`
    ::before {
      content: "π";
    }
  `,
  ClosedFolder: styled(NodeStyled)`
    ::before {
      content: "π";
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
