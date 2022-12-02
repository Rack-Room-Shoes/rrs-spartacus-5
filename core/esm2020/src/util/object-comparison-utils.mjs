/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
export class ObjectComparisonUtils {
    static shallowEqualObjects(objA, objB) {
        if (objA === objB) {
            return true;
        }
        if (!objA || !objB) {
            return false;
        }
        const aKeys = Object.keys(objA);
        const bKeys = Object.keys(objB);
        const aKeysLen = aKeys.length;
        const bKeysLen = bKeys.length;
        if (aKeysLen !== bKeysLen) {
            return false;
        }
        for (let i = 0; i < aKeysLen; i++) {
            const key = aKeys[i];
            if (objA[key] !== objB[key]) {
                return false;
            }
        }
        return true;
    }
    static deepEqualObjects(objA, objB) {
        if (objA === objB) {
            return true; // if both objA and objB are null or undefined and exactly the same
        }
        else if (!(objA instanceof Object) || !(objB instanceof Object)) {
            return false; // if they are not strictly equal, they both need to be Objects
        }
        else if (objA.constructor !== objB.constructor) {
            // they must have the exact same prototype chain, the closest we can do is
            // test their constructor.
            return false;
        }
        else {
            for (const key in objA) {
                if (!objA.hasOwnProperty(key)) {
                    continue; // other properties were tested using objA.constructor === y.constructor
                }
                if (!objB.hasOwnProperty(key)) {
                    return false; // allows to compare objA[ key ] and objB[ key ] when set to undefined
                }
                if (objA[key] === objB[key]) {
                    continue; // if they have the same strict value or identity then they are equal
                }
                if (typeof objA[key] !== 'object') {
                    return false; // Numbers, Strings, Functions, Booleans must be strictly equal
                }
                if (!this.deepEqualObjects(objA[key], objB[key])) {
                    return false;
                }
            }
            for (const key in objB) {
                if (objB.hasOwnProperty(key) && !objA.hasOwnProperty(key)) {
                    return false;
                }
            }
            return true;
        }
    }
    static countOfDeepEqualObjects(obj, arr) {
        return arr.reduce((acc, curr) => {
            if (this.deepEqualObjects(obj, curr)) {
                acc++;
            }
            return acc;
        }, 0);
    }
    static indexOfFirstOccurrence(obj, arr) {
        for (let index = 0; index < arr.length; index++) {
            if (this.deepEqualObjects(arr[index], obj)) {
                return index;
            }
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JqZWN0LWNvbXBhcmlzb24tdXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL3NyYy91dGlsL29iamVjdC1jb21wYXJpc29uLXV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxNQUFNLE9BQU8scUJBQXFCO0lBQ2hDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxJQUFZLEVBQUUsSUFBWTtRQUNuRCxJQUFJLElBQUksS0FBSyxJQUFJLEVBQUU7WUFDakIsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUNELElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDbEIsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUNELE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEMsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoQyxNQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDO1FBQzlCLE1BQU0sUUFBUSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7UUFFOUIsSUFBSSxRQUFRLEtBQUssUUFBUSxFQUFFO1lBQ3pCLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFDRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ2pDLE1BQU0sR0FBRyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyQixJQUFJLElBQUksQ0FBQyxHQUFtQixDQUFDLEtBQUssSUFBSSxDQUFDLEdBQW1CLENBQUMsRUFBRTtnQkFDM0QsT0FBTyxLQUFLLENBQUM7YUFDZDtTQUNGO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQsTUFBTSxDQUFDLGdCQUFnQixDQUFDLElBQVksRUFBRSxJQUFZO1FBQ2hELElBQUksSUFBSSxLQUFLLElBQUksRUFBRTtZQUNqQixPQUFPLElBQUksQ0FBQyxDQUFDLG1FQUFtRTtTQUNqRjthQUFNLElBQUksQ0FBQyxDQUFDLElBQUksWUFBWSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxZQUFZLE1BQU0sQ0FBQyxFQUFFO1lBQ2pFLE9BQU8sS0FBSyxDQUFDLENBQUMsK0RBQStEO1NBQzlFO2FBQU0sSUFBSSxJQUFJLENBQUMsV0FBVyxLQUFLLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDaEQsMEVBQTBFO1lBQzFFLDBCQUEwQjtZQUMxQixPQUFPLEtBQUssQ0FBQztTQUNkO2FBQU07WUFDTCxLQUFLLE1BQU0sR0FBRyxJQUFJLElBQUksRUFBRTtnQkFDdEIsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUU7b0JBQzdCLFNBQVMsQ0FBQyx3RUFBd0U7aUJBQ25GO2dCQUNELElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFO29CQUM3QixPQUFPLEtBQUssQ0FBQyxDQUFDLHNFQUFzRTtpQkFDckY7Z0JBQ0QsSUFBSSxJQUFJLENBQUMsR0FBbUIsQ0FBQyxLQUFLLElBQUksQ0FBQyxHQUFtQixDQUFDLEVBQUU7b0JBQzNELFNBQVMsQ0FBQyxxRUFBcUU7aUJBQ2hGO2dCQUNELElBQUksT0FBTyxJQUFJLENBQUMsR0FBbUIsQ0FBQyxLQUFLLFFBQVEsRUFBRTtvQkFDakQsT0FBTyxLQUFLLENBQUMsQ0FBQywrREFBK0Q7aUJBQzlFO2dCQUNELElBQ0UsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQ3BCLElBQUksQ0FBQyxHQUFtQixDQUFDLEVBQ3pCLElBQUksQ0FBQyxHQUFtQixDQUFDLENBQzFCLEVBQ0Q7b0JBQ0EsT0FBTyxLQUFLLENBQUM7aUJBQ2Q7YUFDRjtZQUNELEtBQUssTUFBTSxHQUFHLElBQUksSUFBSSxFQUFFO2dCQUN0QixJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFO29CQUN6RCxPQUFPLEtBQUssQ0FBQztpQkFDZDthQUNGO1lBQ0QsT0FBTyxJQUFJLENBQUM7U0FDYjtJQUNILENBQUM7SUFFRCxNQUFNLENBQUMsdUJBQXVCLENBQUMsR0FBUSxFQUFFLEdBQWU7UUFDdEQsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFO1lBQzlCLElBQUksSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsRUFBRTtnQkFDcEMsR0FBRyxFQUFFLENBQUM7YUFDUDtZQUNELE9BQU8sR0FBRyxDQUFDO1FBQ2IsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ1IsQ0FBQztJQUVELE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxHQUFRLEVBQUUsR0FBZTtRQUNyRCxLQUFLLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRSxLQUFLLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsRUFBRTtZQUMvQyxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUU7Z0JBQzFDLE9BQU8sS0FBSyxDQUFDO2FBQ2Q7U0FDRjtJQUNILENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIyIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmV4cG9ydCBjbGFzcyBPYmplY3RDb21wYXJpc29uVXRpbHMge1xuICBzdGF0aWMgc2hhbGxvd0VxdWFsT2JqZWN0cyhvYmpBOiBvYmplY3QsIG9iakI6IG9iamVjdCk6IGJvb2xlYW4ge1xuICAgIGlmIChvYmpBID09PSBvYmpCKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKCFvYmpBIHx8ICFvYmpCKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IGFLZXlzID0gT2JqZWN0LmtleXMob2JqQSk7XG4gICAgY29uc3QgYktleXMgPSBPYmplY3Qua2V5cyhvYmpCKTtcbiAgICBjb25zdCBhS2V5c0xlbiA9IGFLZXlzLmxlbmd0aDtcbiAgICBjb25zdCBiS2V5c0xlbiA9IGJLZXlzLmxlbmd0aDtcblxuICAgIGlmIChhS2V5c0xlbiAhPT0gYktleXNMZW4pIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhS2V5c0xlbjsgaSsrKSB7XG4gICAgICBjb25zdCBrZXkgPSBhS2V5c1tpXTtcbiAgICAgIGlmIChvYmpBW2tleSBhcyBrZXlvZiBPYmplY3RdICE9PSBvYmpCW2tleSBhcyBrZXlvZiBPYmplY3RdKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBzdGF0aWMgZGVlcEVxdWFsT2JqZWN0cyhvYmpBOiBvYmplY3QsIG9iakI6IG9iamVjdCk6IGJvb2xlYW4ge1xuICAgIGlmIChvYmpBID09PSBvYmpCKSB7XG4gICAgICByZXR1cm4gdHJ1ZTsgLy8gaWYgYm90aCBvYmpBIGFuZCBvYmpCIGFyZSBudWxsIG9yIHVuZGVmaW5lZCBhbmQgZXhhY3RseSB0aGUgc2FtZVxuICAgIH0gZWxzZSBpZiAoIShvYmpBIGluc3RhbmNlb2YgT2JqZWN0KSB8fCAhKG9iakIgaW5zdGFuY2VvZiBPYmplY3QpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7IC8vIGlmIHRoZXkgYXJlIG5vdCBzdHJpY3RseSBlcXVhbCwgdGhleSBib3RoIG5lZWQgdG8gYmUgT2JqZWN0c1xuICAgIH0gZWxzZSBpZiAob2JqQS5jb25zdHJ1Y3RvciAhPT0gb2JqQi5jb25zdHJ1Y3Rvcikge1xuICAgICAgLy8gdGhleSBtdXN0IGhhdmUgdGhlIGV4YWN0IHNhbWUgcHJvdG90eXBlIGNoYWluLCB0aGUgY2xvc2VzdCB3ZSBjYW4gZG8gaXNcbiAgICAgIC8vIHRlc3QgdGhlaXIgY29uc3RydWN0b3IuXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAoY29uc3Qga2V5IGluIG9iakEpIHtcbiAgICAgICAgaWYgKCFvYmpBLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICBjb250aW51ZTsgLy8gb3RoZXIgcHJvcGVydGllcyB3ZXJlIHRlc3RlZCB1c2luZyBvYmpBLmNvbnN0cnVjdG9yID09PSB5LmNvbnN0cnVjdG9yXG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFvYmpCLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7IC8vIGFsbG93cyB0byBjb21wYXJlIG9iakFbIGtleSBdIGFuZCBvYmpCWyBrZXkgXSB3aGVuIHNldCB0byB1bmRlZmluZWRcbiAgICAgICAgfVxuICAgICAgICBpZiAob2JqQVtrZXkgYXMga2V5b2YgT2JqZWN0XSA9PT0gb2JqQltrZXkgYXMga2V5b2YgT2JqZWN0XSkge1xuICAgICAgICAgIGNvbnRpbnVlOyAvLyBpZiB0aGV5IGhhdmUgdGhlIHNhbWUgc3RyaWN0IHZhbHVlIG9yIGlkZW50aXR5IHRoZW4gdGhleSBhcmUgZXF1YWxcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIG9iakFba2V5IGFzIGtleW9mIE9iamVjdF0gIT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlOyAvLyBOdW1iZXJzLCBTdHJpbmdzLCBGdW5jdGlvbnMsIEJvb2xlYW5zIG11c3QgYmUgc3RyaWN0bHkgZXF1YWxcbiAgICAgICAgfVxuICAgICAgICBpZiAoXG4gICAgICAgICAgIXRoaXMuZGVlcEVxdWFsT2JqZWN0cyhcbiAgICAgICAgICAgIG9iakFba2V5IGFzIGtleW9mIE9iamVjdF0sXG4gICAgICAgICAgICBvYmpCW2tleSBhcyBrZXlvZiBPYmplY3RdXG4gICAgICAgICAgKVxuICAgICAgICApIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGZvciAoY29uc3Qga2V5IGluIG9iakIpIHtcbiAgICAgICAgaWYgKG9iakIuaGFzT3duUHJvcGVydHkoa2V5KSAmJiAhb2JqQS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgY291bnRPZkRlZXBFcXVhbE9iamVjdHMob2JqOiBhbnksIGFycjogQXJyYXk8YW55Pik6IG51bWJlciB7XG4gICAgcmV0dXJuIGFyci5yZWR1Y2UoKGFjYywgY3VycikgPT4ge1xuICAgICAgaWYgKHRoaXMuZGVlcEVxdWFsT2JqZWN0cyhvYmosIGN1cnIpKSB7XG4gICAgICAgIGFjYysrO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCAwKTtcbiAgfVxuXG4gIHN0YXRpYyBpbmRleE9mRmlyc3RPY2N1cnJlbmNlKG9iajogYW55LCBhcnI6IEFycmF5PGFueT4pOiBudW1iZXIgfCB1bmRlZmluZWQge1xuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBhcnIubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICBpZiAodGhpcy5kZWVwRXF1YWxPYmplY3RzKGFycltpbmRleF0sIG9iaikpIHtcbiAgICAgICAgcmV0dXJuIGluZGV4O1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19