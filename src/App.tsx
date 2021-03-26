import { useState } from "react";

import { Provider } from "./state/selectedPath";

import { Tree } from "./utils/tree";
import TreeView from "./components/TreeView";

const treeData: Tree = [
  {
    type: "folder",
    name: "outputs",
    fullPath: "outputs/",
    children: [
      {
        type: "folder",
        name: "test",
        fullPath: "outputs/test/",
        children: [
          {
            type: "file",
            name: "내국인_업종별_방문.png",
            fullPath: "outputs/test/내국인_업종별_방문.png"
          }
        ]
      }
    ]
  }
];

export default function App() {
  const [, setSelectedPath] = useState("/");

  return (
    <Provider value={setSelectedPath}>
      <TreeView data={treeData} />
    </Provider>
  );
}
