import { ElementRef, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { AsmConfig, AsmService, CustomerSearchPage } from '@spartacus/asm/core';
import { User } from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import * as i0 from "@angular/core";
export declare class CustomerSelectionComponent implements OnInit, OnDestroy {
    protected fb: UntypedFormBuilder;
    protected asmService: AsmService;
    protected config: AsmConfig;
    customerSelectionForm: UntypedFormGroup;
    protected subscription: Subscription;
    searchResultsLoading$: Observable<boolean>;
    searchResults: Observable<CustomerSearchPage>;
    selectedCustomer: User | undefined;
    submitEvent: EventEmitter<{
        customerId?: string | undefined;
    }>;
    resultList: ElementRef;
    searchTerm: ElementRef;
    constructor(fb: UntypedFormBuilder, asmService: AsmService, config: AsmConfig);
    ngOnInit(): void;
    protected handleSearchTerm(searchTermValue: string): void;
    selectCustomerFromList(customer: User): void;
    onSubmit(): void;
    onDocumentClick(event: Event): void;
    closeResults(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomerSelectionComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CustomerSelectionComponent, "cx-customer-selection", never, {}, { "submitEvent": "submitEvent"; }, never, never, false>;
}
