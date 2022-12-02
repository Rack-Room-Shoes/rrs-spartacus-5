/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
export const exportEntries = {
    exportToCsv: 'Export to CSV',
    exportMessage: 'CSV file will download automatically to your device, if it does not please check your browser settings',
    columnNames: {
        code: 'Code',
        quantity: 'Quantity',
        name: 'Name',
        price: 'Price',
    },
};
export const importEntries = {
    importProducts: 'Import Products',
};
export const importEntriesDialog = {
    importProducts: 'Import Products',
    importProductsSubtitle: 'Add products by importing a .CSV file.',
    importProductsNewSavedCartSubtitle: 'Add products by importing a .CSV file and creating a new saved cart.',
    importProductFileDetails: 'Text file should contain list of products with required columns separated by comma: SKU and quantity.',
    selectFile: 'Select File',
    savedCartName: 'Saved Cart Name',
    savedCartDescription: 'Saved Cart Description',
    optional: 'optional',
    charactersLeft: 'characters left: {{count}}',
    cancel: 'Cancel',
    upload: 'Upload',
    close: 'Close',
    summary: {
        info: 'Do not close or refresh this window while products are being imported.',
        loadedToCart: 'Products has been loaded to cart {{ cartName }}',
        loaded: 'Products has been loaded',
        loading: 'Products are being processed... ({{ count }}/{{ total }})',
        successes: '{{ successesCount }} out of {{ total }} products have been imported successfully.',
        warning: '{{ count }} product was not imported totally.',
        warning_other: '{{ count }} products were not imported totally.',
        error: '{{ count }} product was not imported.',
        error_other: '{{ count }} products were not imported.',
        messages: {
            unknownIdentifier: 'Product SKU "{{ productCode}}" does not exist.',
            lowStock: 'Quantity for {{ productName }}: {{ quantity }} has been reduced to {{ quantityAdded }}.',
            noStock: '{{ productName }} is currently out of stock.',
            unknownError: 'Unrecognized problem with "{{ productCode }}".',
            limitExceeded: 'Can not add "{{ productCode }}". Limit exceeded.',
        },
        show: 'Show',
        hide: 'Hide',
    },
};
export const importExport = {
    exportEntries,
    importEntries,
    importEntriesDialog,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1wb3J0LWV4cG9ydC5pMThuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2NhcnQvaW1wb3J0LWV4cG9ydC9hc3NldHMvdHJhbnNsYXRpb25zL2VuL2ltcG9ydC1leHBvcnQuaTE4bi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsTUFBTSxDQUFDLE1BQU0sYUFBYSxHQUFHO0lBQzNCLFdBQVcsRUFBRSxlQUFlO0lBQzVCLGFBQWEsRUFDWCx3R0FBd0c7SUFDMUcsV0FBVyxFQUFFO1FBQ1gsSUFBSSxFQUFFLE1BQU07UUFDWixRQUFRLEVBQUUsVUFBVTtRQUNwQixJQUFJLEVBQUUsTUFBTTtRQUNaLEtBQUssRUFBRSxPQUFPO0tBQ2Y7Q0FDRixDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sYUFBYSxHQUFHO0lBQzNCLGNBQWMsRUFBRSxpQkFBaUI7Q0FDbEMsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLG1CQUFtQixHQUFHO0lBQ2pDLGNBQWMsRUFBRSxpQkFBaUI7SUFDakMsc0JBQXNCLEVBQUUsd0NBQXdDO0lBQ2hFLGtDQUFrQyxFQUNoQyxzRUFBc0U7SUFDeEUsd0JBQXdCLEVBQ3RCLHVHQUF1RztJQUN6RyxVQUFVLEVBQUUsYUFBYTtJQUN6QixhQUFhLEVBQUUsaUJBQWlCO0lBQ2hDLG9CQUFvQixFQUFFLHdCQUF3QjtJQUM5QyxRQUFRLEVBQUUsVUFBVTtJQUNwQixjQUFjLEVBQUUsNEJBQTRCO0lBQzVDLE1BQU0sRUFBRSxRQUFRO0lBQ2hCLE1BQU0sRUFBRSxRQUFRO0lBQ2hCLEtBQUssRUFBRSxPQUFPO0lBQ2QsT0FBTyxFQUFFO1FBQ1AsSUFBSSxFQUFFLHdFQUF3RTtRQUM5RSxZQUFZLEVBQUUsaURBQWlEO1FBQy9ELE1BQU0sRUFBRSwwQkFBMEI7UUFDbEMsT0FBTyxFQUFFLDJEQUEyRDtRQUNwRSxTQUFTLEVBQ1AsbUZBQW1GO1FBQ3JGLE9BQU8sRUFBRSwrQ0FBK0M7UUFDeEQsYUFBYSxFQUFFLGlEQUFpRDtRQUNoRSxLQUFLLEVBQUUsdUNBQXVDO1FBQzlDLFdBQVcsRUFBRSx5Q0FBeUM7UUFDdEQsUUFBUSxFQUFFO1lBQ1IsaUJBQWlCLEVBQUUsZ0RBQWdEO1lBQ25FLFFBQVEsRUFDTix5RkFBeUY7WUFDM0YsT0FBTyxFQUFFLDhDQUE4QztZQUN2RCxZQUFZLEVBQUUsZ0RBQWdEO1lBQzlELGFBQWEsRUFBRSxrREFBa0Q7U0FDbEU7UUFDRCxJQUFJLEVBQUUsTUFBTTtRQUNaLElBQUksRUFBRSxNQUFNO0tBQ2I7Q0FDRixDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sWUFBWSxHQUFHO0lBQzFCLGFBQWE7SUFDYixhQUFhO0lBQ2IsbUJBQW1CO0NBQ3BCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5leHBvcnQgY29uc3QgZXhwb3J0RW50cmllcyA9IHtcbiAgZXhwb3J0VG9Dc3Y6ICdFeHBvcnQgdG8gQ1NWJyxcbiAgZXhwb3J0TWVzc2FnZTpcbiAgICAnQ1NWIGZpbGUgd2lsbCBkb3dubG9hZCBhdXRvbWF0aWNhbGx5IHRvIHlvdXIgZGV2aWNlLCBpZiBpdCBkb2VzIG5vdCBwbGVhc2UgY2hlY2sgeW91ciBicm93c2VyIHNldHRpbmdzJyxcbiAgY29sdW1uTmFtZXM6IHtcbiAgICBjb2RlOiAnQ29kZScsXG4gICAgcXVhbnRpdHk6ICdRdWFudGl0eScsXG4gICAgbmFtZTogJ05hbWUnLFxuICAgIHByaWNlOiAnUHJpY2UnLFxuICB9LFxufTtcblxuZXhwb3J0IGNvbnN0IGltcG9ydEVudHJpZXMgPSB7XG4gIGltcG9ydFByb2R1Y3RzOiAnSW1wb3J0IFByb2R1Y3RzJyxcbn07XG5cbmV4cG9ydCBjb25zdCBpbXBvcnRFbnRyaWVzRGlhbG9nID0ge1xuICBpbXBvcnRQcm9kdWN0czogJ0ltcG9ydCBQcm9kdWN0cycsXG4gIGltcG9ydFByb2R1Y3RzU3VidGl0bGU6ICdBZGQgcHJvZHVjdHMgYnkgaW1wb3J0aW5nIGEgLkNTViBmaWxlLicsXG4gIGltcG9ydFByb2R1Y3RzTmV3U2F2ZWRDYXJ0U3VidGl0bGU6XG4gICAgJ0FkZCBwcm9kdWN0cyBieSBpbXBvcnRpbmcgYSAuQ1NWIGZpbGUgYW5kIGNyZWF0aW5nIGEgbmV3IHNhdmVkIGNhcnQuJyxcbiAgaW1wb3J0UHJvZHVjdEZpbGVEZXRhaWxzOlxuICAgICdUZXh0IGZpbGUgc2hvdWxkIGNvbnRhaW4gbGlzdCBvZiBwcm9kdWN0cyB3aXRoIHJlcXVpcmVkIGNvbHVtbnMgc2VwYXJhdGVkIGJ5IGNvbW1hOiBTS1UgYW5kIHF1YW50aXR5LicsXG4gIHNlbGVjdEZpbGU6ICdTZWxlY3QgRmlsZScsXG4gIHNhdmVkQ2FydE5hbWU6ICdTYXZlZCBDYXJ0IE5hbWUnLFxuICBzYXZlZENhcnREZXNjcmlwdGlvbjogJ1NhdmVkIENhcnQgRGVzY3JpcHRpb24nLFxuICBvcHRpb25hbDogJ29wdGlvbmFsJyxcbiAgY2hhcmFjdGVyc0xlZnQ6ICdjaGFyYWN0ZXJzIGxlZnQ6IHt7Y291bnR9fScsXG4gIGNhbmNlbDogJ0NhbmNlbCcsXG4gIHVwbG9hZDogJ1VwbG9hZCcsXG4gIGNsb3NlOiAnQ2xvc2UnLFxuICBzdW1tYXJ5OiB7XG4gICAgaW5mbzogJ0RvIG5vdCBjbG9zZSBvciByZWZyZXNoIHRoaXMgd2luZG93IHdoaWxlIHByb2R1Y3RzIGFyZSBiZWluZyBpbXBvcnRlZC4nLFxuICAgIGxvYWRlZFRvQ2FydDogJ1Byb2R1Y3RzIGhhcyBiZWVuIGxvYWRlZCB0byBjYXJ0IHt7IGNhcnROYW1lIH19JyxcbiAgICBsb2FkZWQ6ICdQcm9kdWN0cyBoYXMgYmVlbiBsb2FkZWQnLFxuICAgIGxvYWRpbmc6ICdQcm9kdWN0cyBhcmUgYmVpbmcgcHJvY2Vzc2VkLi4uICh7eyBjb3VudCB9fS97eyB0b3RhbCB9fSknLFxuICAgIHN1Y2Nlc3NlczpcbiAgICAgICd7eyBzdWNjZXNzZXNDb3VudCB9fSBvdXQgb2Yge3sgdG90YWwgfX0gcHJvZHVjdHMgaGF2ZSBiZWVuIGltcG9ydGVkIHN1Y2Nlc3NmdWxseS4nLFxuICAgIHdhcm5pbmc6ICd7eyBjb3VudCB9fSBwcm9kdWN0IHdhcyBub3QgaW1wb3J0ZWQgdG90YWxseS4nLFxuICAgIHdhcm5pbmdfb3RoZXI6ICd7eyBjb3VudCB9fSBwcm9kdWN0cyB3ZXJlIG5vdCBpbXBvcnRlZCB0b3RhbGx5LicsXG4gICAgZXJyb3I6ICd7eyBjb3VudCB9fSBwcm9kdWN0IHdhcyBub3QgaW1wb3J0ZWQuJyxcbiAgICBlcnJvcl9vdGhlcjogJ3t7IGNvdW50IH19IHByb2R1Y3RzIHdlcmUgbm90IGltcG9ydGVkLicsXG4gICAgbWVzc2FnZXM6IHtcbiAgICAgIHVua25vd25JZGVudGlmaWVyOiAnUHJvZHVjdCBTS1UgXCJ7eyBwcm9kdWN0Q29kZX19XCIgZG9lcyBub3QgZXhpc3QuJyxcbiAgICAgIGxvd1N0b2NrOlxuICAgICAgICAnUXVhbnRpdHkgZm9yIHt7IHByb2R1Y3ROYW1lIH19OiB7eyBxdWFudGl0eSB9fSBoYXMgYmVlbiByZWR1Y2VkIHRvIHt7IHF1YW50aXR5QWRkZWQgfX0uJyxcbiAgICAgIG5vU3RvY2s6ICd7eyBwcm9kdWN0TmFtZSB9fSBpcyBjdXJyZW50bHkgb3V0IG9mIHN0b2NrLicsXG4gICAgICB1bmtub3duRXJyb3I6ICdVbnJlY29nbml6ZWQgcHJvYmxlbSB3aXRoIFwie3sgcHJvZHVjdENvZGUgfX1cIi4nLFxuICAgICAgbGltaXRFeGNlZWRlZDogJ0NhbiBub3QgYWRkIFwie3sgcHJvZHVjdENvZGUgfX1cIi4gTGltaXQgZXhjZWVkZWQuJyxcbiAgICB9LFxuICAgIHNob3c6ICdTaG93JyxcbiAgICBoaWRlOiAnSGlkZScsXG4gIH0sXG59O1xuXG5leHBvcnQgY29uc3QgaW1wb3J0RXhwb3J0ID0ge1xuICBleHBvcnRFbnRyaWVzLFxuICBpbXBvcnRFbnRyaWVzLFxuICBpbXBvcnRFbnRyaWVzRGlhbG9nLFxufTtcbiJdfQ==