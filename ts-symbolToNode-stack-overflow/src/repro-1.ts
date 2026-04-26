import { createNode } from "./node";

function wrapNode<T>(fn: () => T) {
  // ...
  // Wrapping logic here
  // ...

  return fn;
}

wrapNode<typeof createNode>(() => {
  const node = createNode();

  return {
    ...node,
    getNextNode: wrapNode<typeof node.getNextNode<any>>(() => node.getNextNode),
  };
});
