/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Pipe } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
/*
 * Supplements the anchor links that contain only the hash fragment in the `href` attribute,
 * (e.g. `<a href="#someId">`), by prepending the current location (path and query params),
 * so it becomes a link to a full url
 * e.g. `<a href="https://domain.com/current/path?and=query-params#someId">`.
 *
 * This helps to avoid the undesirable navigation to the homepage URL (`/#someId`)
 * when clicking the original link.
 *
 * It's useful for example for cms-provided content passed to the [innerHTML] directive.
 */
export class SupplementHashAnchorsPipe {
    constructor(renderer, winRef) {
        this.renderer = renderer;
        this.winRef = winRef;
    }
    getPath(anchorId) {
        const currentUrlWithoutFragment = this.winRef.location.href?.replace(/#.*$/, '');
        return `${currentUrlWithoutFragment}${anchorId}`;
    }
    transform(html) {
        const template = this.renderer.createElement('template');
        template.innerHTML = html.trim();
        const linkNodes = template.content.querySelectorAll('a');
        Array.from(linkNodes).forEach((link) => {
            const href = link.getAttribute('href');
            if (href?.indexOf('#') === 0) {
                this.renderer.setProperty(link, 'href', this.getPath(href));
            }
        });
        return template.innerHTML;
    }
}
SupplementHashAnchorsPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: SupplementHashAnchorsPipe, deps: [{ token: i0.Renderer2 }, { token: i1.WindowRef }], target: i0.ɵɵFactoryTarget.Pipe });
SupplementHashAnchorsPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: SupplementHashAnchorsPipe, name: "cxSupplementHashAnchors" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: SupplementHashAnchorsPipe, decorators: [{
            type: Pipe,
            args: [{ name: 'cxSupplementHashAnchors' }]
        }], ctorParameters: function () { return [{ type: i0.Renderer2 }, { type: i1.WindowRef }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VwcGxlbWVudC1oYXNoLWFuY2hvcnMucGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvc2hhcmVkL3BpcGVzL3N1cGxlbWVudC1oYXNoLWFuY2hvcnMvc3VwcGxlbWVudC1oYXNoLWFuY2hvcnMucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLElBQUksRUFBNEIsTUFBTSxlQUFlLENBQUM7OztBQUcvRDs7Ozs7Ozs7OztHQVVHO0FBRUgsTUFBTSxPQUFPLHlCQUF5QjtJQUNwQyxZQUFzQixRQUFtQixFQUFZLE1BQWlCO1FBQWhELGFBQVEsR0FBUixRQUFRLENBQVc7UUFBWSxXQUFNLEdBQU4sTUFBTSxDQUFXO0lBQUcsQ0FBQztJQUVoRSxPQUFPLENBQUMsUUFBZ0I7UUFDaEMsTUFBTSx5QkFBeUIsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUNsRSxNQUFNLEVBQ04sRUFBRSxDQUNILENBQUM7UUFDRixPQUFPLEdBQUcseUJBQXlCLEdBQUcsUUFBUSxFQUFFLENBQUM7SUFDbkQsQ0FBQztJQUVNLFNBQVMsQ0FBQyxJQUFZO1FBQzNCLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3pELFFBQVEsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2pDLE1BQU0sU0FBUyxHQUNiLFFBQVEsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFekMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUF1QixFQUFFLEVBQUU7WUFDeEQsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN2QyxJQUFJLElBQUksRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUM1QixJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzthQUM3RDtRQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxRQUFRLENBQUMsU0FBUyxDQUFDO0lBQzVCLENBQUM7O3NIQXhCVSx5QkFBeUI7b0hBQXpCLHlCQUF5QjsyRkFBekIseUJBQXlCO2tCQURyQyxJQUFJO21CQUFDLEVBQUUsSUFBSSxFQUFFLHlCQUF5QixFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSwgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBXaW5kb3dSZWYgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuXG4vKlxuICogU3VwcGxlbWVudHMgdGhlIGFuY2hvciBsaW5rcyB0aGF0IGNvbnRhaW4gb25seSB0aGUgaGFzaCBmcmFnbWVudCBpbiB0aGUgYGhyZWZgIGF0dHJpYnV0ZSxcbiAqIChlLmcuIGA8YSBocmVmPVwiI3NvbWVJZFwiPmApLCBieSBwcmVwZW5kaW5nIHRoZSBjdXJyZW50IGxvY2F0aW9uIChwYXRoIGFuZCBxdWVyeSBwYXJhbXMpLFxuICogc28gaXQgYmVjb21lcyBhIGxpbmsgdG8gYSBmdWxsIHVybFxuICogZS5nLiBgPGEgaHJlZj1cImh0dHBzOi8vZG9tYWluLmNvbS9jdXJyZW50L3BhdGg/YW5kPXF1ZXJ5LXBhcmFtcyNzb21lSWRcIj5gLlxuICpcbiAqIFRoaXMgaGVscHMgdG8gYXZvaWQgdGhlIHVuZGVzaXJhYmxlIG5hdmlnYXRpb24gdG8gdGhlIGhvbWVwYWdlIFVSTCAoYC8jc29tZUlkYClcbiAqIHdoZW4gY2xpY2tpbmcgdGhlIG9yaWdpbmFsIGxpbmsuXG4gKlxuICogSXQncyB1c2VmdWwgZm9yIGV4YW1wbGUgZm9yIGNtcy1wcm92aWRlZCBjb250ZW50IHBhc3NlZCB0byB0aGUgW2lubmVySFRNTF0gZGlyZWN0aXZlLlxuICovXG5AUGlwZSh7IG5hbWU6ICdjeFN1cHBsZW1lbnRIYXNoQW5jaG9ycycgfSlcbmV4cG9ydCBjbGFzcyBTdXBwbGVtZW50SGFzaEFuY2hvcnNQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCByZW5kZXJlcjogUmVuZGVyZXIyLCBwcm90ZWN0ZWQgd2luUmVmOiBXaW5kb3dSZWYpIHt9XG5cbiAgcHJvdGVjdGVkIGdldFBhdGgoYW5jaG9ySWQ6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgY29uc3QgY3VycmVudFVybFdpdGhvdXRGcmFnbWVudCA9IHRoaXMud2luUmVmLmxvY2F0aW9uLmhyZWY/LnJlcGxhY2UoXG4gICAgICAvIy4qJC8sXG4gICAgICAnJ1xuICAgICk7XG4gICAgcmV0dXJuIGAke2N1cnJlbnRVcmxXaXRob3V0RnJhZ21lbnR9JHthbmNob3JJZH1gO1xuICB9XG5cbiAgcHVibGljIHRyYW5zZm9ybShodG1sOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGNvbnN0IHRlbXBsYXRlID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KCd0ZW1wbGF0ZScpO1xuICAgIHRlbXBsYXRlLmlubmVySFRNTCA9IGh0bWwudHJpbSgpO1xuICAgIGNvbnN0IGxpbmtOb2RlczogTm9kZUxpc3RPZjxIVE1MQW5jaG9yRWxlbWVudD4gPVxuICAgICAgdGVtcGxhdGUuY29udGVudC5xdWVyeVNlbGVjdG9yQWxsKCdhJyk7XG5cbiAgICBBcnJheS5mcm9tKGxpbmtOb2RlcykuZm9yRWFjaCgobGluazogSFRNTEFuY2hvckVsZW1lbnQpID0+IHtcbiAgICAgIGNvbnN0IGhyZWYgPSBsaW5rLmdldEF0dHJpYnV0ZSgnaHJlZicpO1xuICAgICAgaWYgKGhyZWY/LmluZGV4T2YoJyMnKSA9PT0gMCkge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KGxpbmssICdocmVmJywgdGhpcy5nZXRQYXRoKGhyZWYpKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gdGVtcGxhdGUuaW5uZXJIVE1MO1xuICB9XG59XG4iXX0=