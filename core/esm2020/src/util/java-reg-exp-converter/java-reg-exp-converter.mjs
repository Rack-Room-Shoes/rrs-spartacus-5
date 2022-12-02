/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable, isDevMode } from '@angular/core';
import * as i0 from "@angular/core";
export class JavaRegExpConverter {
    constructor() {
        /**
         * Pattern that extracts modifiers from the Java regexp.
         *
         * Java regexps MAY start with ONE or MANY modifiers like `(?MODIFIERS)PATTERN`. Examples:
         * - `(?i)` for Case Insensitive Mode: `(?i)PATTERN`
         * - `(?u)` for Unicode-Aware Case Folding; `(?u)PATTERN`
         * - or multiple combined:  `(?iu)PATTERN`
         * - (more modifiers in the official Java docs https://docs.oracle.com/javase/8/docs/api/java/util/regex/Pattern.html)
         *
         * This pattern extracts 3 parts from the input string, i.e. for `(?iu)PATTERN`:
         *    1. original modifiers syntax, i.e. `(?iu)` (or undefined if no modifiers present)
         *    2. extracted modifiers, i.e. `iu` (or undefined if no modifiers present)
         *    3. the rest of the regexp, i.e. `PATTERN`
         */
        this.EXTRACT_JAVA_REGEXP_MODIFIERS = /^(\(\?([a-z]+)\))?(.*)/;
    }
    /**
     * Converts RegExp from Java syntax to Javascript, by recognizing Java regexp modifiers
     * and converting them to the Javascript ones (i.e. case insensitive mode: `(?i)PATTERN` -> `/pattern/i`)
     *
     * **CAUTION!** Not all features and modifiers of Java regexps are valid in Javascript!
     * If unsupported feature or modifier is used, then `null` will be returned instead of Javascript RegExp.
     *
     * See differences between Java and Javascript regexps:
     * - https://stackoverflow.com/questions/8754444/convert-javascript-regular-expression-to-java-syntax
     * - https://en.wikipedia.org/wiki/Comparison_of_regular_expression_engines#Language_features
     */
    toJsRegExp(javaSyntax) {
        const parts = javaSyntax.match(this.EXTRACT_JAVA_REGEXP_MODIFIERS);
        if (!parts) {
            return null;
        }
        const [, , modifiers, jsSyntax] = parts;
        try {
            return new RegExp(jsSyntax, modifiers);
        }
        catch (error) {
            if (isDevMode()) {
                console.warn(`WARNING: Could not convert Java regexp into Javascript. Original regexp: ${javaSyntax} \nMessage: ${error}`);
            }
            return null;
        }
    }
}
JavaRegExpConverter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: JavaRegExpConverter, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
JavaRegExpConverter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: JavaRegExpConverter, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: JavaRegExpConverter, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiamF2YS1yZWctZXhwLWNvbnZlcnRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvc3JjL3V0aWwvamF2YS1yZWctZXhwLWNvbnZlcnRlci9qYXZhLXJlZy1leHAtY29udmVydGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFHdEQsTUFBTSxPQUFPLG1CQUFtQjtJQURoQztRQUVFOzs7Ozs7Ozs7Ozs7O1dBYUc7UUFDYyxrQ0FBNkIsR0FDNUMsd0JBQXdCLENBQUM7S0E4QjVCO0lBNUJDOzs7Ozs7Ozs7O09BVUc7SUFDSCxVQUFVLENBQUMsVUFBa0I7UUFDM0IsTUFBTSxLQUFLLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsNkJBQTZCLENBQUMsQ0FBQztRQUNuRSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1YsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUNELE1BQU0sQ0FBQyxFQUFFLEFBQUQsRUFBRyxTQUFTLEVBQUUsUUFBUSxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBQ3hDLElBQUk7WUFDRixPQUFPLElBQUksTUFBTSxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQztTQUN4QztRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2QsSUFBSSxTQUFTLEVBQUUsRUFBRTtnQkFDZixPQUFPLENBQUMsSUFBSSxDQUNWLDRFQUE0RSxVQUFVLGVBQWUsS0FBSyxFQUFFLENBQzdHLENBQUM7YUFDSDtZQUNELE9BQU8sSUFBSSxDQUFDO1NBQ2I7SUFDSCxDQUFDOztnSEE3Q1UsbUJBQW1CO29IQUFuQixtQkFBbUIsY0FETixNQUFNOzJGQUNuQixtQkFBbUI7a0JBRC9CLFVBQVU7bUJBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgaXNEZXZNb2RlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgSmF2YVJlZ0V4cENvbnZlcnRlciB7XG4gIC8qKlxuICAgKiBQYXR0ZXJuIHRoYXQgZXh0cmFjdHMgbW9kaWZpZXJzIGZyb20gdGhlIEphdmEgcmVnZXhwLlxuICAgKlxuICAgKiBKYXZhIHJlZ2V4cHMgTUFZIHN0YXJ0IHdpdGggT05FIG9yIE1BTlkgbW9kaWZpZXJzIGxpa2UgYCg/TU9ESUZJRVJTKVBBVFRFUk5gLiBFeGFtcGxlczpcbiAgICogLSBgKD9pKWAgZm9yIENhc2UgSW5zZW5zaXRpdmUgTW9kZTogYCg/aSlQQVRURVJOYFxuICAgKiAtIGAoP3UpYCBmb3IgVW5pY29kZS1Bd2FyZSBDYXNlIEZvbGRpbmc7IGAoP3UpUEFUVEVSTmBcbiAgICogLSBvciBtdWx0aXBsZSBjb21iaW5lZDogIGAoP2l1KVBBVFRFUk5gXG4gICAqIC0gKG1vcmUgbW9kaWZpZXJzIGluIHRoZSBvZmZpY2lhbCBKYXZhIGRvY3MgaHR0cHM6Ly9kb2NzLm9yYWNsZS5jb20vamF2YXNlLzgvZG9jcy9hcGkvamF2YS91dGlsL3JlZ2V4L1BhdHRlcm4uaHRtbClcbiAgICpcbiAgICogVGhpcyBwYXR0ZXJuIGV4dHJhY3RzIDMgcGFydHMgZnJvbSB0aGUgaW5wdXQgc3RyaW5nLCBpLmUuIGZvciBgKD9pdSlQQVRURVJOYDpcbiAgICogICAgMS4gb3JpZ2luYWwgbW9kaWZpZXJzIHN5bnRheCwgaS5lLiBgKD9pdSlgIChvciB1bmRlZmluZWQgaWYgbm8gbW9kaWZpZXJzIHByZXNlbnQpXG4gICAqICAgIDIuIGV4dHJhY3RlZCBtb2RpZmllcnMsIGkuZS4gYGl1YCAob3IgdW5kZWZpbmVkIGlmIG5vIG1vZGlmaWVycyBwcmVzZW50KVxuICAgKiAgICAzLiB0aGUgcmVzdCBvZiB0aGUgcmVnZXhwLCBpLmUuIGBQQVRURVJOYFxuICAgKi9cbiAgcHJpdmF0ZSByZWFkb25seSBFWFRSQUNUX0pBVkFfUkVHRVhQX01PRElGSUVSUzogUmVnRXhwID1cbiAgICAvXihcXChcXD8oW2Etel0rKVxcKSk/KC4qKS87XG5cbiAgLyoqXG4gICAqIENvbnZlcnRzIFJlZ0V4cCBmcm9tIEphdmEgc3ludGF4IHRvIEphdmFzY3JpcHQsIGJ5IHJlY29nbml6aW5nIEphdmEgcmVnZXhwIG1vZGlmaWVyc1xuICAgKiBhbmQgY29udmVydGluZyB0aGVtIHRvIHRoZSBKYXZhc2NyaXB0IG9uZXMgKGkuZS4gY2FzZSBpbnNlbnNpdGl2ZSBtb2RlOiBgKD9pKVBBVFRFUk5gIC0+IGAvcGF0dGVybi9pYClcbiAgICpcbiAgICogKipDQVVUSU9OISoqIE5vdCBhbGwgZmVhdHVyZXMgYW5kIG1vZGlmaWVycyBvZiBKYXZhIHJlZ2V4cHMgYXJlIHZhbGlkIGluIEphdmFzY3JpcHQhXG4gICAqIElmIHVuc3VwcG9ydGVkIGZlYXR1cmUgb3IgbW9kaWZpZXIgaXMgdXNlZCwgdGhlbiBgbnVsbGAgd2lsbCBiZSByZXR1cm5lZCBpbnN0ZWFkIG9mIEphdmFzY3JpcHQgUmVnRXhwLlxuICAgKlxuICAgKiBTZWUgZGlmZmVyZW5jZXMgYmV0d2VlbiBKYXZhIGFuZCBKYXZhc2NyaXB0IHJlZ2V4cHM6XG4gICAqIC0gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvODc1NDQ0NC9jb252ZXJ0LWphdmFzY3JpcHQtcmVndWxhci1leHByZXNzaW9uLXRvLWphdmEtc3ludGF4XG4gICAqIC0gaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvQ29tcGFyaXNvbl9vZl9yZWd1bGFyX2V4cHJlc3Npb25fZW5naW5lcyNMYW5ndWFnZV9mZWF0dXJlc1xuICAgKi9cbiAgdG9Kc1JlZ0V4cChqYXZhU3ludGF4OiBzdHJpbmcpOiBSZWdFeHAgfCBudWxsIHtcbiAgICBjb25zdCBwYXJ0cyA9IGphdmFTeW50YXgubWF0Y2godGhpcy5FWFRSQUNUX0pBVkFfUkVHRVhQX01PRElGSUVSUyk7XG4gICAgaWYgKCFwYXJ0cykge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGNvbnN0IFssICwgbW9kaWZpZXJzLCBqc1N5bnRheF0gPSBwYXJ0cztcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIG5ldyBSZWdFeHAoanNTeW50YXgsIG1vZGlmaWVycyk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGlmIChpc0Rldk1vZGUoKSkge1xuICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgYFdBUk5JTkc6IENvdWxkIG5vdCBjb252ZXJ0IEphdmEgcmVnZXhwIGludG8gSmF2YXNjcmlwdC4gT3JpZ2luYWwgcmVnZXhwOiAke2phdmFTeW50YXh9IFxcbk1lc3NhZ2U6ICR7ZXJyb3J9YFxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG59XG4iXX0=