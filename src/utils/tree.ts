interface FileInfo {
  type: "file";
  name: string;
  fullPath: string;
}

interface Folder {
  type: "folder";
  name: string;
  fullPath: string;
  children: Tree;
}

type TreeNode = FileInfo | Folder;

export type Tree = TreeNode[];

export interface Item {
  path: string;
  type: "folder" | "file";
}

export function mapper(items: Item[]) {
  return items.reduce((reducing, { path, type }) => {
    const names = path.match(/[^/]+/g);

    const createNode = (name: string): TreeNode =>
      type === "folder"
        ? { name, type, fullPath: path, children: [] }
        : { name, type, fullPath: path };

    if (names === null)
      throw Error("예기치 않은 경우입니다. 경로 패턴을 찾을 수 없습니다.");

    if (names.length === 1) {
      reducing.push(createNode(names[0]));
      return reducing;
    }

    const [parentName, ...childrenNames] = names;
    const node = reducing.find(({ name }) => name === parentName);

    if (node === undefined || node.type === "file")
      throw Error("예기치 않은 흐름입니다.");

    DFS(node, childrenNames);
    return reducing;

    function DFS(folder: Folder, names: string[]) {
      if (names.length === 1) {
        folder.children.push(createNode(names[0]));
        return;
      }

      const [parent, ...children] = names;

      const node = folder.children.find(({ name }) => name === parent);

      if (node === undefined || node.type === "file")
        throw Error("예기치 않은 흐름입니다.");

      DFS(node, children);
    }
  }, [] as Tree);
}
