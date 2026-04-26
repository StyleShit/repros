import { type CustomNode, createNode } from "./node";

function wrapNode<T>(getNode: () => CustomNode<T>) {
  // ...
  // Wrapping logic here
  // ...

  return getNode;
}

wrapNode(() => {
  const node = createNode();

  return wrapNode<typeof node.getNextNode<any>>(node.getNextNode);
});
