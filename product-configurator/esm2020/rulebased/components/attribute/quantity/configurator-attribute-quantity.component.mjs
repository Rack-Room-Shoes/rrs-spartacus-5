/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { Subscription, timer } from 'rxjs';
import { debounce, distinct, take } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "../../config/configurator-ui-settings.config";
import * as i2 from "@spartacus/storefront";
import * as i3 from "@spartacus/core";
export class ConfiguratorAttributeQuantityComponent {
    constructor(config) {
        this.config = config;
        this.quantity = new UntypedFormControl(1);
        this.optionsChangeSub = new Subscription();
        this.quantityChangeSub = new Subscription();
        this.changeQuantity = new EventEmitter();
    }
    ngOnInit() {
        this.quantity.setValue(this.quantityOptions?.initialQuantity);
        this.optionsChangeSub.add(this.quantityOptions.disableQuantityActions$
            ?.pipe(distinct())
            .subscribe((disable) => {
            // stepper always emits an value when it gets enabled regardless, if the original value was changed.
            // so we subscribe to quantity change when stepper gets enabled and unsubscribe when it gets disabled
            // this way we will not get the unwanted emission on enabling the stepper.
            if (disable) {
                this.quantity.disable();
                this.quantityChangeSub.unsubscribe();
            }
            else {
                this.quantity.enable();
                this.quantityChangeSub.add(this.subscribeToQuantityChange());
            }
        }));
    }
    subscribeToQuantityChange() {
        return this.quantity.valueChanges
            .pipe(debounce(() => timer(this.config.productConfigurator?.updateDebounceTime?.quantity)), take(1))
            .subscribe(() => this.onChangeQuantity());
    }
    ngOnDestroy() {
        this.optionsChangeSub.unsubscribe();
        this.quantityChangeSub.unsubscribe();
    }
    onChangeQuantity() {
        this.changeQuantity.emit(this.quantity?.value);
    }
}
ConfiguratorAttributeQuantityComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeQuantityComponent, deps: [{ token: i1.ConfiguratorUISettingsConfig }], target: i0.ɵɵFactoryTarget.Component });
ConfiguratorAttributeQuantityComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: ConfiguratorAttributeQuantityComponent, selector: "cx-configurator-attribute-quantity", inputs: { quantityOptions: "quantityOptions" }, outputs: { changeQuantity: "changeQuantity" }, ngImport: i0, template: "<div class=\"cx-quantity\">\n  <label>{{ 'configurator.attribute.quantity' | cxTranslate }}</label>\n  <cx-item-counter\n    [allowZero]=\"quantityOptions?.allowZero\"\n    [control]=\"quantity\"\n    [min]=\"quantityOptions?.allowZero ? 0 : 1\"\n  ></cx-item-counter>\n</div>\n", dependencies: [{ kind: "component", type: i2.ItemCounterComponent, selector: "cx-item-counter", inputs: ["control", "min", "max", "step", "allowZero", "readonly"] }, { kind: "pipe", type: i3.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeQuantityComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-attribute-quantity', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"cx-quantity\">\n  <label>{{ 'configurator.attribute.quantity' | cxTranslate }}</label>\n  <cx-item-counter\n    [allowZero]=\"quantityOptions?.allowZero\"\n    [control]=\"quantity\"\n    [min]=\"quantityOptions?.allowZero ? 0 : 1\"\n  ></cx-item-counter>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i1.ConfiguratorUISettingsConfig }]; }, propDecorators: { quantityOptions: [{
                type: Input
            }], changeQuantity: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLWF0dHJpYnV0ZS1xdWFudGl0eS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvcHJvZHVjdC1jb25maWd1cmF0b3IvcnVsZWJhc2VkL2NvbXBvbmVudHMvYXR0cmlidXRlL3F1YW50aXR5L2NvbmZpZ3VyYXRvci1hdHRyaWJ1dGUtcXVhbnRpdHkuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QtY29uZmlndXJhdG9yL3J1bGViYXNlZC9jb21wb25lbnRzL2F0dHJpYnV0ZS9xdWFudGl0eS9jb25maWd1cmF0b3ItYXR0cmlidXRlLXF1YW50aXR5LmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxZQUFZLEVBQ1osS0FBSyxFQUdMLE1BQU0sR0FDUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNwRCxPQUFPLEVBQWMsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN2RCxPQUFPLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7QUFjMUQsTUFBTSxPQUFPLHNDQUFzQztJQVNqRCxZQUFzQixNQUFvQztRQUFwQyxXQUFNLEdBQU4sTUFBTSxDQUE4QjtRQU4xRCxhQUFRLEdBQUcsSUFBSSxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyQyxxQkFBZ0IsR0FBaUIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNwRCxzQkFBaUIsR0FBaUIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUUzQyxtQkFBYyxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7SUFFTyxDQUFDO0lBRTlELFFBQVE7UUFDTixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBQzlELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQ3ZCLElBQUksQ0FBQyxlQUFlLENBQUMsdUJBQXVCO1lBQzFDLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO2FBQ2pCLFNBQVMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ3JCLG9HQUFvRztZQUNwRyxxR0FBcUc7WUFDckcsMEVBQTBFO1lBQzFFLElBQUksT0FBTyxFQUFFO2dCQUNYLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQ3hCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQzthQUN0QztpQkFBTTtnQkFDTCxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUN2QixJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyx5QkFBeUIsRUFBRSxDQUFDLENBQUM7YUFDOUQ7UUFDSCxDQUFDLENBQUMsQ0FDTCxDQUFDO0lBQ0osQ0FBQztJQUVTLHlCQUF5QjtRQUNqQyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWTthQUM5QixJQUFJLENBQ0gsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUNaLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLG1CQUFtQixFQUFFLGtCQUFrQixFQUFFLFFBQVEsQ0FBQyxDQUNyRSxFQUNELElBQUksQ0FBQyxDQUFDLENBQUMsQ0FDUjthQUNBLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3BDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN2QyxDQUFDO0lBRUQsZ0JBQWdCO1FBQ2QsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNqRCxDQUFDOzttSUFqRFUsc0NBQXNDO3VIQUF0QyxzQ0FBc0MseUtDL0JuRCx3UkFRQTsyRkR1QmEsc0NBQXNDO2tCQUxsRCxTQUFTOytCQUNFLG9DQUFvQyxtQkFFN0IsdUJBQXVCLENBQUMsTUFBTTttSEFRdEMsZUFBZTtzQkFBdkIsS0FBSztnQkFDSSxjQUFjO3NCQUF2QixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBVbnR5cGVkRm9ybUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb24sIHRpbWVyIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkZWJvdW5jZSwgZGlzdGluY3QsIHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3JVSVNldHRpbmdzQ29uZmlnIH0gZnJvbSAnLi4vLi4vY29uZmlnL2NvbmZpZ3VyYXRvci11aS1zZXR0aW5ncy5jb25maWcnO1xuXG5leHBvcnQgaW50ZXJmYWNlIENvbmZpZ3VyYXRvckF0dHJpYnV0ZVF1YW50aXR5Q29tcG9uZW50T3B0aW9ucyB7XG4gIGFsbG93WmVybz86IGJvb2xlYW47XG4gIGluaXRpYWxRdWFudGl0eT86IG51bWJlcjtcbiAgZGlzYWJsZVF1YW50aXR5QWN0aW9ucyQ/OiBPYnNlcnZhYmxlPGJvb2xlYW4+O1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjeC1jb25maWd1cmF0b3ItYXR0cmlidXRlLXF1YW50aXR5JyxcbiAgdGVtcGxhdGVVcmw6ICcuL2NvbmZpZ3VyYXRvci1hdHRyaWJ1dGUtcXVhbnRpdHkuY29tcG9uZW50Lmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgQ29uZmlndXJhdG9yQXR0cmlidXRlUXVhbnRpdHlDb21wb25lbnRcbiAgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIE9uSW5pdFxue1xuICBxdWFudGl0eSA9IG5ldyBVbnR5cGVkRm9ybUNvbnRyb2woMSk7XG4gIG9wdGlvbnNDaGFuZ2VTdWI6IFN1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcbiAgcXVhbnRpdHlDaGFuZ2VTdWI6IFN1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcbiAgQElucHV0KCkgcXVhbnRpdHlPcHRpb25zOiBDb25maWd1cmF0b3JBdHRyaWJ1dGVRdWFudGl0eUNvbXBvbmVudE9wdGlvbnM7XG4gIEBPdXRwdXQoKSBjaGFuZ2VRdWFudGl0eSA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBjb25maWc6IENvbmZpZ3VyYXRvclVJU2V0dGluZ3NDb25maWcpIHt9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5xdWFudGl0eS5zZXRWYWx1ZSh0aGlzLnF1YW50aXR5T3B0aW9ucz8uaW5pdGlhbFF1YW50aXR5KTtcbiAgICB0aGlzLm9wdGlvbnNDaGFuZ2VTdWIuYWRkKFxuICAgICAgdGhpcy5xdWFudGl0eU9wdGlvbnMuZGlzYWJsZVF1YW50aXR5QWN0aW9ucyRcbiAgICAgICAgPy5waXBlKGRpc3RpbmN0KCkpXG4gICAgICAgIC5zdWJzY3JpYmUoKGRpc2FibGUpID0+IHtcbiAgICAgICAgICAvLyBzdGVwcGVyIGFsd2F5cyBlbWl0cyBhbiB2YWx1ZSB3aGVuIGl0IGdldHMgZW5hYmxlZCByZWdhcmRsZXNzLCBpZiB0aGUgb3JpZ2luYWwgdmFsdWUgd2FzIGNoYW5nZWQuXG4gICAgICAgICAgLy8gc28gd2Ugc3Vic2NyaWJlIHRvIHF1YW50aXR5IGNoYW5nZSB3aGVuIHN0ZXBwZXIgZ2V0cyBlbmFibGVkIGFuZCB1bnN1YnNjcmliZSB3aGVuIGl0IGdldHMgZGlzYWJsZWRcbiAgICAgICAgICAvLyB0aGlzIHdheSB3ZSB3aWxsIG5vdCBnZXQgdGhlIHVud2FudGVkIGVtaXNzaW9uIG9uIGVuYWJsaW5nIHRoZSBzdGVwcGVyLlxuICAgICAgICAgIGlmIChkaXNhYmxlKSB7XG4gICAgICAgICAgICB0aGlzLnF1YW50aXR5LmRpc2FibGUoKTtcbiAgICAgICAgICAgIHRoaXMucXVhbnRpdHlDaGFuZ2VTdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5xdWFudGl0eS5lbmFibGUoKTtcbiAgICAgICAgICAgIHRoaXMucXVhbnRpdHlDaGFuZ2VTdWIuYWRkKHRoaXMuc3Vic2NyaWJlVG9RdWFudGl0eUNoYW5nZSgpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBzdWJzY3JpYmVUb1F1YW50aXR5Q2hhbmdlKCk6IFN1YnNjcmlwdGlvbiB7XG4gICAgcmV0dXJuIHRoaXMucXVhbnRpdHkudmFsdWVDaGFuZ2VzXG4gICAgICAucGlwZShcbiAgICAgICAgZGVib3VuY2UoKCkgPT5cbiAgICAgICAgICB0aW1lcih0aGlzLmNvbmZpZy5wcm9kdWN0Q29uZmlndXJhdG9yPy51cGRhdGVEZWJvdW5jZVRpbWU/LnF1YW50aXR5KVxuICAgICAgICApLFxuICAgICAgICB0YWtlKDEpXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMub25DaGFuZ2VRdWFudGl0eSgpKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMub3B0aW9uc0NoYW5nZVN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMucXVhbnRpdHlDaGFuZ2VTdWIudW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIG9uQ2hhbmdlUXVhbnRpdHkoKTogdm9pZCB7XG4gICAgdGhpcy5jaGFuZ2VRdWFudGl0eS5lbWl0KHRoaXMucXVhbnRpdHk/LnZhbHVlKTtcbiAgfVxufVxuIiwiPGRpdiBjbGFzcz1cImN4LXF1YW50aXR5XCI+XG4gIDxsYWJlbD57eyAnY29uZmlndXJhdG9yLmF0dHJpYnV0ZS5xdWFudGl0eScgfCBjeFRyYW5zbGF0ZSB9fTwvbGFiZWw+XG4gIDxjeC1pdGVtLWNvdW50ZXJcbiAgICBbYWxsb3daZXJvXT1cInF1YW50aXR5T3B0aW9ucz8uYWxsb3daZXJvXCJcbiAgICBbY29udHJvbF09XCJxdWFudGl0eVwiXG4gICAgW21pbl09XCJxdWFudGl0eU9wdGlvbnM/LmFsbG93WmVybyA/IDAgOiAxXCJcbiAgPjwvY3gtaXRlbS1jb3VudGVyPlxuPC9kaXY+XG4iXX0=