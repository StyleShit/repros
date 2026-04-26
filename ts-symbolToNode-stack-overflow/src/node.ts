export interface CustomNode<P> {
  getNextNode: () => CustomNode<P>;
}

export declare const createNode: () => {
  getNextNode: <T>() => CustomNode<T>;
};
