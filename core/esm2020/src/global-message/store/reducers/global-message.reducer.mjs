/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { GlobalMessageActions } from '../actions/index';
export const initialState = {
    entities: {},
};
export function reducer(state = initialState, action) {
    switch (action.type) {
        case GlobalMessageActions.ADD_MESSAGE: {
            const message = action.payload;
            if (state.entities[message.type] === undefined) {
                return {
                    ...state,
                    entities: {
                        ...state.entities,
                        [message.type]: [message.text],
                    },
                };
            }
            else {
                const currentMessages = state.entities[message.type];
                return {
                    ...state,
                    entities: {
                        ...state.entities,
                        [message.type]: [...currentMessages, message.text],
                    },
                };
            }
        }
        case GlobalMessageActions.REMOVE_MESSAGE: {
            const msgType = action.payload.type;
            const msgIndex = action.payload.index;
            if (Object.keys(state.entities).length === 0 ||
                !state.entities[msgType]) {
                return state;
            }
            const messages = [...state.entities[msgType]];
            messages.splice(msgIndex, 1);
            return {
                ...state,
                entities: {
                    ...state.entities,
                    [msgType]: messages,
                },
            };
        }
        case GlobalMessageActions.REMOVE_MESSAGES_BY_TYPE: {
            const entities = {
                ...state.entities,
                [action.payload]: [],
            };
            return {
                ...state,
                entities,
            };
        }
    }
    return state;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xvYmFsLW1lc3NhZ2UucmVkdWNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvc3JjL2dsb2JhbC1tZXNzYWdlL3N0b3JlL3JlZHVjZXJzL2dsb2JhbC1tZXNzYWdlLnJlZHVjZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQU9ILE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBR3hELE1BQU0sQ0FBQyxNQUFNLFlBQVksR0FBdUI7SUFDOUMsUUFBUSxFQUFFLEVBQUU7Q0FDYixDQUFDO0FBRUYsTUFBTSxVQUFVLE9BQU8sQ0FDckIsS0FBSyxHQUFHLFlBQVksRUFDcEIsTUFBZ0Q7SUFFaEQsUUFBUSxNQUFNLENBQUMsSUFBSSxFQUFFO1FBQ25CLEtBQUssb0JBQW9CLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDckMsTUFBTSxPQUFPLEdBQWtCLE1BQU0sQ0FBQyxPQUFPLENBQUM7WUFFOUMsSUFBSSxLQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxTQUFTLEVBQUU7Z0JBQzlDLE9BQU87b0JBQ0wsR0FBRyxLQUFLO29CQUNSLFFBQVEsRUFBRTt3QkFDUixHQUFHLEtBQUssQ0FBQyxRQUFRO3dCQUNqQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7cUJBQy9CO2lCQUNGLENBQUM7YUFDSDtpQkFBTTtnQkFDTCxNQUFNLGVBQWUsR0FBbUIsS0FBSyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3JFLE9BQU87b0JBQ0wsR0FBRyxLQUFLO29CQUNSLFFBQVEsRUFBRTt3QkFDUixHQUFHLEtBQUssQ0FBQyxRQUFRO3dCQUNqQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsZUFBZSxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUM7cUJBQ25EO2lCQUNGLENBQUM7YUFDSDtTQUNGO1FBRUQsS0FBSyxvQkFBb0IsQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUN4QyxNQUFNLE9BQU8sR0FBc0IsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7WUFDdkQsTUFBTSxRQUFRLEdBQVcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7WUFDOUMsSUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQztnQkFDeEMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUN4QjtnQkFDQSxPQUFPLEtBQUssQ0FBQzthQUNkO1lBRUQsTUFBTSxRQUFRLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUM5QyxRQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUU3QixPQUFPO2dCQUNMLEdBQUcsS0FBSztnQkFDUixRQUFRLEVBQUU7b0JBQ1IsR0FBRyxLQUFLLENBQUMsUUFBUTtvQkFDakIsQ0FBQyxPQUFPLENBQUMsRUFBRSxRQUFRO2lCQUNwQjthQUNGLENBQUM7U0FDSDtRQUVELEtBQUssb0JBQW9CLENBQUMsdUJBQXVCLENBQUMsQ0FBQztZQUNqRCxNQUFNLFFBQVEsR0FBRztnQkFDZixHQUFHLEtBQUssQ0FBQyxRQUFRO2dCQUNqQixDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFO2FBQ3JCLENBQUM7WUFDRixPQUFPO2dCQUNMLEdBQUcsS0FBSztnQkFDUixRQUFRO2FBQ1QsQ0FBQztTQUNIO0tBQ0Y7SUFFRCxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBUcmFuc2xhdGFibGUgfSBmcm9tICcuLi8uLi8uLi9pMThuL3RyYW5zbGF0YWJsZSc7XG5pbXBvcnQge1xuICBHbG9iYWxNZXNzYWdlLFxuICBHbG9iYWxNZXNzYWdlVHlwZSxcbn0gZnJvbSAnLi4vLi4vbW9kZWxzL2dsb2JhbC1tZXNzYWdlLm1vZGVsJztcbmltcG9ydCB7IEdsb2JhbE1lc3NhZ2VBY3Rpb25zIH0gZnJvbSAnLi4vYWN0aW9ucy9pbmRleCc7XG5pbXBvcnQgeyBHbG9iYWxNZXNzYWdlU3RhdGUgfSBmcm9tICcuLi9nbG9iYWwtbWVzc2FnZS1zdGF0ZSc7XG5cbmV4cG9ydCBjb25zdCBpbml0aWFsU3RhdGU6IEdsb2JhbE1lc3NhZ2VTdGF0ZSA9IHtcbiAgZW50aXRpZXM6IHt9LFxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHJlZHVjZXIoXG4gIHN0YXRlID0gaW5pdGlhbFN0YXRlLFxuICBhY3Rpb246IEdsb2JhbE1lc3NhZ2VBY3Rpb25zLkdsb2JhbE1lc3NhZ2VBY3Rpb25cbik6IEdsb2JhbE1lc3NhZ2VTdGF0ZSB7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICBjYXNlIEdsb2JhbE1lc3NhZ2VBY3Rpb25zLkFERF9NRVNTQUdFOiB7XG4gICAgICBjb25zdCBtZXNzYWdlOiBHbG9iYWxNZXNzYWdlID0gYWN0aW9uLnBheWxvYWQ7XG5cbiAgICAgIGlmIChzdGF0ZS5lbnRpdGllc1ttZXNzYWdlLnR5cGVdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgICBlbnRpdGllczoge1xuICAgICAgICAgICAgLi4uc3RhdGUuZW50aXRpZXMsXG4gICAgICAgICAgICBbbWVzc2FnZS50eXBlXTogW21lc3NhZ2UudGV4dF0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRNZXNzYWdlczogVHJhbnNsYXRhYmxlW10gPSBzdGF0ZS5lbnRpdGllc1ttZXNzYWdlLnR5cGVdO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgIGVudGl0aWVzOiB7XG4gICAgICAgICAgICAuLi5zdGF0ZS5lbnRpdGllcyxcbiAgICAgICAgICAgIFttZXNzYWdlLnR5cGVdOiBbLi4uY3VycmVudE1lc3NhZ2VzLCBtZXNzYWdlLnRleHRdLFxuICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfVxuXG4gICAgY2FzZSBHbG9iYWxNZXNzYWdlQWN0aW9ucy5SRU1PVkVfTUVTU0FHRToge1xuICAgICAgY29uc3QgbXNnVHlwZTogR2xvYmFsTWVzc2FnZVR5cGUgPSBhY3Rpb24ucGF5bG9hZC50eXBlO1xuICAgICAgY29uc3QgbXNnSW5kZXg6IG51bWJlciA9IGFjdGlvbi5wYXlsb2FkLmluZGV4O1xuICAgICAgaWYgKFxuICAgICAgICBPYmplY3Qua2V5cyhzdGF0ZS5lbnRpdGllcykubGVuZ3RoID09PSAwIHx8XG4gICAgICAgICFzdGF0ZS5lbnRpdGllc1ttc2dUeXBlXVxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgbWVzc2FnZXMgPSBbLi4uc3RhdGUuZW50aXRpZXNbbXNnVHlwZV1dO1xuICAgICAgbWVzc2FnZXMuc3BsaWNlKG1zZ0luZGV4LCAxKTtcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGVudGl0aWVzOiB7XG4gICAgICAgICAgLi4uc3RhdGUuZW50aXRpZXMsXG4gICAgICAgICAgW21zZ1R5cGVdOiBtZXNzYWdlcyxcbiAgICAgICAgfSxcbiAgICAgIH07XG4gICAgfVxuXG4gICAgY2FzZSBHbG9iYWxNZXNzYWdlQWN0aW9ucy5SRU1PVkVfTUVTU0FHRVNfQllfVFlQRToge1xuICAgICAgY29uc3QgZW50aXRpZXMgPSB7XG4gICAgICAgIC4uLnN0YXRlLmVudGl0aWVzLFxuICAgICAgICBbYWN0aW9uLnBheWxvYWRdOiBbXSxcbiAgICAgIH07XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgZW50aXRpZXMsXG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBzdGF0ZTtcbn1cbiJdfQ==