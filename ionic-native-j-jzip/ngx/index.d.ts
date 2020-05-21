import { IonicNativePlugin } from '@ionic-native/core';
/**
 * @name @ionic-native/ J Jzip
 * @description
 * This plugin does something
 *
 * @usage
 * ```typescript
 * import { @ionic-native/JJzip } from '@ionic-native/ionic-native-j-jzip';
 *
 *
 * constructor(private @ionic-native/JJzip: @ionic-native/JJzip) { }
 *
 * ...
 *
 *
 * this.@ionic-native/JJzip.functionName('Hello', 123)
 *   .then((res: any) => console.log(res))
 *   .catch((error: any) => console.error(error));
 *
 * ```
 */
export declare class JJzip extends IonicNativePlugin {
    /**
     * This function does something
     * @param arg1 {string} Some param to configure something
     * @param arg2 {number} Another param to configure something
     * @return {Promise<any>} Returns a promise that resolves when something happens
     */
    zip(file: string, options: {
        target: string;
        name: string;
    }): Promise<any>;
}
