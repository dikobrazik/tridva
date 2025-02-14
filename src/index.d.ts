/* eslint-disable no-unused-vars */
interface Array<T> {
    /**
     * Determines whether an array includes a certain element, returning true or false as appropriate.
     * @param searchElement The element to search for.
     * @param fromIndex The position in this array at which to begin searching for searchElement.
     */
    includes(searchElement: T | string, fromIndex?: number): searchElement is T;
}

type Entries<T> = {
    [K in keyof T]: [K, T[K]];
}[keyof T][];

interface ObjectConstructor {
    /**
     * Returns an array of key/values of the enumerable properties of an object
     * @param o Object that contains the properties and methods. This can be an object that you created or an existing Document Object Model (DOM) object.
     */
    entries<T extends object>(o: T): Entries<T>;
    /**
     * Returns an array of key/values of the enumerable properties of an object
     * @param o Object that contains the properties and methods. This can be an object that you created or an existing Document Object Model (DOM) object.
     */
    entries<T>(o: ArrayLike<T>): [keyof T, T][];
    /**
     * Returns an array of key/values of the enumerable properties of an object
     * @param o Object that contains the properties and methods. This can be an object that you created or an existing Document Object Model (DOM) object.
     */
    keys<T extends object>(o: T): keyof T[];
}

type Values<T extends object> = T[keyof T];

declare module '*.svg' {
    import React from 'react';
    const SVG: React.VFC<React.SVGProps<SVGSVGElement>>;
    export default SVG;
}

declare module '*.svg?url' {
    const svg: string;
    export default SVG;
}
