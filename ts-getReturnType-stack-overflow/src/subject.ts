// A generic function type whose call signature returns the same type,
// instantiated with an accumulated type argument.
type Recursive<T> = <U>() => Recursive<T & U>;

export declare const subject: Recursive<unknown>;
