import { mapper } from "./tree";
import type { Item, Tree } from "./tree";

interface Case {
  items: Item[];
  expectValue: Tree;
}

const cases: Case[] = [
  {
    items: [
      { path: "box_plot_by_state.py", type: "file" },
      { path: "maps/", type: "folder" },
      { path: "maps/내국인 관광객 3위.png", type: "file" }
    ],
    expectValue: [
      {
        type: "file",
        name: "box_plot_by_state.py",
        fullPath: "box_plot_by_state.py"
      },
      {
        type: "folder",
        name: "maps",
        fullPath: "maps/",
        children: [
          {
            type: "file",
            name: "내국인 관광객 3위.png",
            fullPath: "maps/내국인 관광객 3위.png"
          }
        ]
      }
    ]
  },
  {
    items: [
      { path: "outputs/", type: "folder" },
      { path: "outputs/test/", type: "folder" },
      { path: "outputs/test/내국인_업종별_방문.png", type: "file" }
    ],
    expectValue: [
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
    ]
  }
];

test("JsZip like data convert to Tree objects", () => {
  for (let { items, expectValue } of cases.slice(1)) {
    expect(mapper(items)).toEqual(expectValue);
  }
});
