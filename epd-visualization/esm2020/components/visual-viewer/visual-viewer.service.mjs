/// <reference types="@sapui5/ts-types-esm" />
/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
// '@sapui5/ts-types-esm' package contains types for sap modules, e.g. 'sap/ui/core/Core'
/// <reference types="@sapui5/ts-types-esm" />
import { EventEmitter, Injectable, } from '@angular/core';
import { ContentType, } from '@spartacus/epd-visualization/root';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, filter, first, mergeMap, shareReplay, } from 'rxjs/operators';
import { NavigationMode } from './models/navigation-mode';
import { NodeContentType } from './models/node-content-type';
import { SceneLoadState } from './models/scene-load-state';
import { SelectionMode } from './models/selection-mode';
import { VisualizationLoadStatus, VisualizationLookupResult, } from './models/visualization-load-info';
import { ZoomTo } from './models/zoom-to';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/epd-visualization/root";
import * as i2 from "@spartacus/epd-visualization/core";
import * as i3 from "@spartacus/core";
export class VisualViewerService {
    constructor(epdVisualizationConfig, _sceneNodeToProductLookupService, visualizationLookupService, elementRef, changeDetectorRef, windowRef) {
        this.epdVisualizationConfig = epdVisualizationConfig;
        this._sceneNodeToProductLookupService = _sceneNodeToProductLookupService;
        this.visualizationLookupService = visualizationLookupService;
        this.elementRef = elementRef;
        this.changeDetectorRef = changeDetectorRef;
        this.windowRef = windowRef;
        this._selectedNodeIds$ = new BehaviorSubject([]);
        this._sceneLoadInfo$ = new BehaviorSubject({
            sceneLoadState: SceneLoadState.NotStarted,
        });
        this.DEFAULT_BACKGROUND_TOP_COLOR = '--cx-color-inverse';
        this.DEFAULT_BACKGROUND_BOTTOM_COLOR = '--cx-color-inverse';
        this.DEFAULT_HOTSPOT_SELECTION_HIGHLIGHT_COLOR = 'rgba(255, 0, 0, 0.6)';
        this.DEFAULT_SHOW_ALL_HOTSPOTS_COLOR = 'rgba(255, 255, 0, 0.3)';
        this.DEFAULT_OUTLINE_COLOR = 'red';
        this.DEFAULT_OUTLINE_WIDTH = 5;
        this.DEFAULT_SELECTION_MODE = SelectionMode.Exclusive;
        this.DEFAULT_SHOW_ALL_HOTSPOTS_ENABLED = false;
        this.DEFAULT_EXCLUDED_OPACITY = 0.2;
        this.DEFAULT_ZOOM_TO_MARGIN = 0.2;
        this.DEFAULT_FLY_TO_DURATION = 1;
        this._flyToDurationInSeconds = this.DEFAULT_FLY_TO_DURATION;
        this._zoomToMargin = this.DEFAULT_ZOOM_TO_MARGIN;
        this.selectedProductCodesChange = new EventEmitter();
        this._excludedOpacity = this.DEFAULT_EXCLUDED_OPACITY;
        this.animationTimeChange = new EventEmitter();
        this._animationPosition = 0;
        this.animationPositionChange = new EventEmitter();
        this._animationPlaying = false;
        this.animationPlayingChange = new EventEmitter();
        this._isolateModeEnabled = false;
        this.isolateModeEnabledChange = new EventEmitter();
        this._viewportReady = false;
        this.viewportReadyChange = new EventEmitter();
        this.contentChangesFinished = new EventEmitter();
        this.contentLoadFinished = new EventEmitter();
        this.visualizationLoadInfoChange = new EventEmitter();
        if (!this.windowRef.isBrowser()) {
            return;
        }
        const ui5BootStrapped$ = this.bootstrapUi5('ui5bootstrap');
        const ui5Initialized$ = ui5BootStrapped$.pipe(mergeMap(this.initializeUi5.bind(this)));
        this.viewportAdded$ = ui5Initialized$.pipe(mergeMap(this.addViewport.bind(this)), shareReplay());
        this.executeWhenSceneLoaded(this.setInitialPropertyValues.bind(this));
    }
    ngOnDestroy() {
        this.selectedNodeIdsSubscription?.unsubscribe();
    }
    get sceneNodeToProductLookupService() {
        return this._sceneNodeToProductLookupService;
    }
    set sceneNodeToProductLookupService(value) {
        this._sceneNodeToProductLookupService = value;
    }
    get scene() {
        return this._scene;
    }
    set scene(value) {
        this._scene = value;
    }
    get nodeHierarchy() {
        return this._nodeHierarchy;
    }
    set nodeHierarchy(value) {
        this._nodeHierarchy = value;
    }
    get contentConnector() {
        return this._contentConnector;
    }
    set contentConnector(value) {
        this._contentConnector = value;
    }
    get viewport() {
        return this._viewport;
    }
    set viewport(value) {
        this._viewport = value;
    }
    get viewStateManager() {
        return this._viewStateManager;
    }
    set viewStateManager(value) {
        this._viewStateManager = value;
    }
    get animationPlayer() {
        return this._animationPlayer;
    }
    set animationPlayer(value) {
        this._animationPlayer = value;
    }
    get viewManager() {
        return this._viewManager;
    }
    set viewManager(value) {
        this._viewManager = value;
    }
    get drawerToolbar() {
        return this._drawerToolbar;
    }
    set drawerToolbar(value) {
        this._drawerToolbar = value;
    }
    get sceneId() {
        return this._sceneId;
    }
    set sceneId(value) {
        this._sceneId = value;
    }
    get contentType() {
        return this._contentType;
    }
    set contentType(value) {
        this._contentType = value;
    }
    get initialViewInfo() {
        return this._initialViewInfo;
    }
    set initialViewInfo(value) {
        this._initialViewInfo = value;
    }
    get leafNodeRefs() {
        return this._leafNodeRefs;
    }
    set leafNodeRefs(value) {
        this._leafNodeRefs = value;
    }
    get viewPriorToIsolateViewInfo() {
        return this._viewPriorToIsolateViewInfo;
    }
    set viewPriorToIsolateViewInfo(value) {
        this._viewPriorToIsolateViewInfo = value;
    }
    get viewportAdded$() {
        return this._viewportAdded$;
    }
    set viewportAdded$(value) {
        this._viewportAdded$ = value;
    }
    get selectedNodeIds$() {
        return this._selectedNodeIds$;
    }
    set selectedNodeIds$(value) {
        this._selectedNodeIds$ = value;
    }
    get sceneLoadInfo$() {
        return this._sceneLoadInfo$;
    }
    get flyToDurationInSeconds() {
        return this._flyToDurationInSeconds;
    }
    set flyToDurationInSeconds(value) {
        this._flyToDurationInSeconds = value;
    }
    get zoomToMargin() {
        return this._zoomToMargin;
    }
    set zoomToMargin(value) {
        this._zoomToMargin = value;
    }
    /**
     * The top colour of the background gradient.
     * Can be passed in the CSS color format or as a Spartacus theme color i.e. '--cx-color-background' with the quotes.
     */
    set backgroundTopColor(backgroundTopColor) {
        if (!this.windowRef.isBrowser()) {
            return;
        }
        if (this._backgroundTopColor === backgroundTopColor) {
            return;
        }
        this._backgroundTopColor = backgroundTopColor;
        this.executeWhenSceneLoaded(() => {
            this.viewport.setBackgroundColorTop(this.getCSSColor(backgroundTopColor));
        });
    }
    get backgroundTopColor() {
        return this._backgroundTopColor;
    }
    /**
     * The bottom colour of the background gradient.
     * Can be passed in the CSS color format or as a Spartacus theme color i.e. '--cx-color-background' with the quotes.
     */
    set backgroundBottomColor(backgroundBottomColor) {
        if (!this.windowRef.isBrowser()) {
            return;
        }
        if (this._backgroundBottomColor === backgroundBottomColor) {
            return;
        }
        this._backgroundBottomColor = backgroundBottomColor;
        this.executeWhenSceneLoaded(() => {
            this.viewport.setBackgroundColorBottom(this.getCSSColor(backgroundBottomColor));
        });
    }
    get backgroundBottomColor() {
        return this._backgroundBottomColor;
    }
    /**
     * The colour applied to selected 2D hotspots in 2D content.
     * Can be passed in the CSS color format or as a Spartacus theme color i.e. '--cx-color-primary' with the quotes.
     */
    set hotspotSelectionColor(hotspotSelectionColor) {
        if (!this.windowRef.isBrowser()) {
            return;
        }
        if (this._hotspotSelectionColor === hotspotSelectionColor) {
            return;
        }
        this._hotspotSelectionColor = hotspotSelectionColor;
        this.executeWhenSceneLoaded(() => {
            this.viewStateManager.setHighlightColor(this.getCSSColor(hotspotSelectionColor));
        });
    }
    get hotspotSelectionColor() {
        return this._hotspotSelectionColor;
    }
    /**
     * Highlights all hotspots in 2D content that are included in the includedProductCodes property using the colour specified by the showAllHotspotsColor property.
     */
    set showAllHotspotsEnabled(showAllHotspotsEnabled) {
        if (!this.windowRef.isBrowser()) {
            return;
        }
        if (this._showAllHotspotsEnabled === showAllHotspotsEnabled) {
            return;
        }
        this._showAllHotspotsEnabled = showAllHotspotsEnabled;
        this.executeWhenSceneLoaded(() => {
            this.applyInclusionStyle(this._includedProductCodes);
        });
    }
    get showAllHotspotsEnabled() {
        return this._showAllHotspotsEnabled;
    }
    /**
     * The colour used to highlight hotspots in 2D content when the showAllHotspotsEnabled property has a value of true.
     * Can be passed in the CSS color format or as a Spartacus theme color i.e. '--cx-color-primary' with the quotes.
     */
    set showAllHotspotsColor(showAllHotspotsColor) {
        if (!this.windowRef.isBrowser()) {
            return;
        }
        if (this._showAllHotspotsColor === showAllHotspotsColor) {
            return;
        }
        this._showAllHotspotsColor = showAllHotspotsColor;
        this.executeWhenSceneLoaded(() => {
            const cssColor = this.getCSSColor(showAllHotspotsColor);
            this.viewport.setShowAllHotspotsTintColor(cssColor);
        });
    }
    get showAllHotspotsColor() {
        return this._showAllHotspotsColor;
    }
    /**
     * The outline colour used to indicate selected objects in 3D content.
     * Can be passed in the CSS color format or as a Spartacus theme color i.e. '--cx-color-primary' with the quotes.
     */
    set outlineColor(outlineColor) {
        if (!this.windowRef.isBrowser()) {
            return;
        }
        if (this._outlineColor === outlineColor) {
            return;
        }
        this._outlineColor = outlineColor;
        this.executeWhenSceneLoaded(() => {
            this.viewStateManager.setOutlineColor(this.getCSSColor(outlineColor));
        });
    }
    get outlineColor() {
        return this._outlineColor;
    }
    /**
     * The width of the outline used to indicate selected objects in 3D content.
     */
    set outlineWidth(outlineWidth) {
        if (!this.windowRef.isBrowser()) {
            return;
        }
        if (this._outlineWidth === outlineWidth) {
            return;
        }
        this._outlineWidth = outlineWidth;
        this.executeWhenSceneLoaded(() => {
            this.viewStateManager.setOutlineWidth(outlineWidth);
        });
    }
    get outlineWidth() {
        return this._outlineWidth;
    }
    /**
     * The selection mode.
     * None - Selection is disabled.
     * Exclusive - When selecting objects in the viewport, at most one object can be selected at a time. Clicking/tapping to select a new object will deselect any previously selected objects.
     * Sticky - A multiple selection mode in which clicking/tapping on an object that is not part of the current selection will toggle its selection state without modifying the selection state of the currently selected objects.
     */
    set selectionMode(selectionMode) {
        if (!this.windowRef.isBrowser()) {
            return;
        }
        if (this._selectionMode === selectionMode) {
            return;
        }
        this._selectionMode = selectionMode;
        this.executeWhenSceneLoaded(() => {
            this.viewport.setSelectionMode(selectionMode);
        });
    }
    get selectionMode() {
        return this._selectionMode;
    }
    /**
     * Gets/sets the selection in terms of product codes.
     * Gets the set of product codes applied to the selected scene nodes.
     * Sets the selection set based on the set of supplied product codes.
     */
    set selectedProductCodes(selectedProductCodes) {
        if (!this.windowRef.isBrowser()) {
            return;
        }
        this._selectedProductCodes = selectedProductCodes;
        this.sceneNodeToProductLookupService
            .lookupNodeIds(selectedProductCodes)
            .pipe(first())
            .subscribe((selectedNodeIds) => {
            this.selectedNodeIds$.next(selectedNodeIds);
        });
    }
    get selectedProductCodes() {
        return this._selectedProductCodes;
    }
    /**
     * Gets/sets which objects should be selectable (in terms of product codes).
     * For 3D content:
     * - objects that are included will be selectable and opaque
     * - objects that are not included will not be selectable and will have an opacity specified by the excludedOpacity property.
     *
     * For 2D content:
     * - hotspots that are included will be selectable and can be made visible
     * - hotspots that are not included will not be selectable or visible
     */
    set includedProductCodes(includedProductCodes) {
        if (!this.windowRef.isBrowser()) {
            return;
        }
        this._includedProductCodes = includedProductCodes;
        this.executeWhenSceneLoaded(() => {
            this.applyInclusionStyle(includedProductCodes);
        });
    }
    get includedProductCodes() {
        return this._includedProductCodes;
    }
    /**
     * Gets/sets the opacity to apply to 3D objects that are not in the set specified by the includedProductCodes property.
     */
    set excludedOpacity(excludedOpacity) {
        if (!this.windowRef.isBrowser()) {
            return;
        }
        this._excludedOpacity = excludedOpacity;
    }
    get excludedOpacity() {
        return this._excludedOpacity;
    }
    /**
     * The current time position in seconds in the animation (if there is one).
     */
    set animationTime(animationTime) {
        if (!this.windowRef.isBrowser()) {
            return;
        }
        this._animationTime = animationTime;
    }
    get animationTime() {
        return this._animationTime;
    }
    /**
     * The total duration of the animation in seconds.
     * Returns 0 when there is no animation present (or when a scene has not been loaded).
     */
    get animationTotalDuration() {
        if (this.animationPlayer) {
            return this.animationPlayer.getTotalDuration();
        }
        return 0;
    }
    /**
     * The animation playback position as a fractional value between 0 (start) and 1 (end).
     */
    set animationPosition(position) {
        if (!this.windowRef.isBrowser()) {
            return;
        }
        if (this._animationPosition === position) {
            return;
        }
        this._animationPosition = position;
        this.executeWhenSceneLoaded(() => {
            const time = position * this.animationPlayer.getTotalDuration();
            this.animationPlayerSetTime(time, false);
        });
    }
    get animationPosition() {
        return this._animationPosition;
    }
    /**
     * Gets/sets whether the animation (if there is one) is currently playing.
     */
    set animationPlaying(animationPlaying) {
        if (!this.windowRef.isBrowser()) {
            return;
        }
        if (this._animationPlaying === animationPlaying) {
            return;
        }
        this._animationPlaying = animationPlaying;
        this.executeWhenSceneLoaded(() => {
            if (animationPlaying) {
                if (this.animationPosition >= 1) {
                    this.animationPlayerSetTime(0, false);
                }
                this.animationPlayer.play();
            }
            else {
                this.animationPlayer.stop();
            }
            this.animationPlayingChange.emit(animationPlaying);
        });
    }
    get animationPlaying() {
        return this._animationPlaying;
    }
    /**
     * Controls the behaviour when a left mouse button drag is initiated in the viewport.
     * Turntable: A left mouse drag performs a turntable mode rotation.
     * Pan: A left mouse drag pans the camera in the viewport.
     * Zoom: A left mouse drag zooms the camera in the viewport in or out
     */
    set navigationMode(navigationMode) {
        if (!this.windowRef.isBrowser()) {
            return;
        }
        if (this._navigationMode === navigationMode) {
            return;
        }
        this._navigationMode = navigationMode;
        this.executeWhenSceneLoaded(() => {
            if (this.drawerToolbar && this.viewport) {
                // sap.ui.vk library will have a public API to set the navigation mode in a future UI5 version
                this.drawerToolbar._activateGesture(this.viewport.getImplementation(), navigationMode);
            }
        });
    }
    get navigationMode() {
        return this._navigationMode;
    }
    /**
     * Isolate mode allows a single object to be viewed in isolation.
     */
    set isolateModeEnabled(isolateModeEnabled) {
        if (!this.windowRef.isBrowser()) {
            return;
        }
        if (this._isolateModeEnabled === isolateModeEnabled) {
            return;
        }
        this.executeWhenSceneLoaded(() => {
            this._isolateModeEnabled = isolateModeEnabled;
            if (isolateModeEnabled) {
                this.viewPriorToIsolateViewInfo = this.viewport.getViewInfo({
                    camera: true,
                    visibility: true,
                });
                const selectedNodeRefs = [];
                if (this.is2D) {
                    this.viewStateManager.enumerateSelection((nodeRef) => selectedNodeRefs.push(nodeRef));
                }
                else {
                    this.viewStateManager.enumerateOutlinedNodes((nodeRef) => selectedNodeRefs.push(nodeRef));
                }
                this.isolateNodes(selectedNodeRefs);
            }
            else {
                this.viewport.setViewInfo(this.viewPriorToIsolateViewInfo, this.flyToDurationInSeconds);
            }
            this.isolateModeEnabledChange.emit(this.isolateModeEnabled);
        });
    }
    get isolateModeEnabled() {
        return this._isolateModeEnabled;
    }
    /**
     * Gets whether the viewport is displaying 2D content.
     */
    get is2D() {
        return this._is2D;
    }
    setIs2D(is2D) {
        this._is2D = is2D;
    }
    /**
     * Indicates that a scene has been loaded and the viewport is ready for interaction.
     */
    get viewportReady() {
        return this._viewportReady;
    }
    setViewportReady(viewportReady) {
        if (this._viewportReady === viewportReady) {
            return;
        }
        this._viewportReady = viewportReady;
        this.viewportReadyChange.emit(viewportReady);
    }
    /**
     * Returns the user to the initial camera position used when a scene was first loaded.
     */
    activateHomeView() {
        if (!this.windowRef.isBrowser()) {
            return;
        }
        if (this.is2D) {
            this.viewport.zoomTo(ZoomTo.All, null, this.flyToDurationInSeconds, this.zoomToMargin);
        }
        else {
            this.viewport.setViewInfo(this.initialViewInfo, this.flyToDurationInSeconds);
        }
        if (this.isolateModeEnabled) {
            // Exit out of the isolate mode but don't restore the view that was
            // saved before entering isolate mode
            this._isolateModeEnabled = false;
            this.isolateModeEnabledChange.emit(false);
        }
    }
    /**
     * Plays the animation (if one exists).
     */
    playAnimation() {
        if (!this.windowRef.isBrowser()) {
            return;
        }
        this.animationPlaying = true;
    }
    /**
     * Pauses animation playback.
     */
    pauseAnimation() {
        if (!this.windowRef.isBrowser()) {
            return;
        }
        this.animationPlaying = false;
    }
    setInitialPropertyValues() {
        if (this.backgroundTopColor === undefined) {
            this.backgroundTopColor = this.DEFAULT_BACKGROUND_TOP_COLOR;
        }
        if (this.backgroundBottomColor === undefined) {
            this.backgroundBottomColor = this.DEFAULT_BACKGROUND_BOTTOM_COLOR;
        }
        if (this.hotspotSelectionColor === undefined) {
            this.hotspotSelectionColor =
                this.DEFAULT_HOTSPOT_SELECTION_HIGHLIGHT_COLOR;
        }
        if (this.showAllHotspotsColor === undefined) {
            this.showAllHotspotsColor = this.DEFAULT_SHOW_ALL_HOTSPOTS_COLOR;
        }
        if (this.outlineColor === undefined) {
            this.outlineColor = this.DEFAULT_OUTLINE_COLOR;
        }
        if (this.outlineWidth === undefined) {
            this.outlineWidth = this.DEFAULT_OUTLINE_WIDTH;
        }
        if (this.selectionMode === undefined) {
            this.selectionMode = this.DEFAULT_SELECTION_MODE;
        }
        if (this.showAllHotspotsEnabled === undefined) {
            this.showAllHotspotsEnabled = this.DEFAULT_SHOW_ALL_HOTSPOTS_ENABLED;
        }
        if (this.is2D) {
            if (this.navigationMode === undefined ||
                this.navigationMode === NavigationMode.Turntable) {
                this.navigationMode = NavigationMode.Pan;
            }
        }
        else if (this.navigationMode === undefined) {
            this.navigationMode = NavigationMode.Turntable;
        }
        if (this.selectedProductCodes === undefined) {
            this.selectedProductCodes = this.selectedNodeIds$.getValue();
        }
    }
    executeWhenSceneLoaded(callback) {
        this.sceneLoadInfo$
            .pipe(filter((sceneLoadInfo) => sceneLoadInfo.sceneLoadState === SceneLoadState.Loaded ||
            sceneLoadInfo.sceneLoadState === SceneLoadState.Failed), first())
            .subscribe((sceneLoadInfo) => {
            if (sceneLoadInfo.sceneLoadState === SceneLoadState.Loaded) {
                callback(sceneLoadInfo.loadedSceneInfo);
            }
        });
    }
    applyInclusionStyle(productCodes) {
        if (productCodes === undefined) {
            return;
        }
        this.sceneNodeToProductLookupService
            .lookupNodeIds(productCodes)
            .pipe(first())
            .subscribe((sceneNodeIds) => {
            if (this.is2D) {
                this.applyInclusionStyle2D(sceneNodeIds);
            }
            else {
                this.applyInclusionStyle3D(sceneNodeIds);
            }
        });
    }
    applyInclusionStyle2D(sceneNodeIds) {
        const nodeRefsToInclude = this.persistentIdToNodeRef(sceneNodeIds, true);
        const hotspotNodeRefs = this.nodeHierarchy.getHotspotNodeIds();
        const hotspotNodeRefsSet = new Set(hotspotNodeRefs);
        // Hotspot nodes can have descendants that are also Hotspot nodes.
        // Ignore the descendant nodes and apply modifications at the highest level only.
        const topLevelHotspotNodeRefs = hotspotNodeRefs.filter((hotspotNodeRef) => this.isTopLevelHotspotNode(hotspotNodeRef, hotspotNodeRefsSet));
        if (this._showAllHotspotsEnabled) {
            const nodeRefsToIncludeSet = new Set(nodeRefsToInclude);
            const nodeRefsToExclude = topLevelHotspotNodeRefs.filter((nodeRef) => !nodeRefsToIncludeSet.has(nodeRef));
            this.viewport.showHotspots(nodeRefsToExclude, false, 0);
            this.viewport.showHotspots(nodeRefsToInclude, true, this.getCSSColor(this._showAllHotspotsColor));
        }
        else {
            this.viewport.showHotspots(topLevelHotspotNodeRefs, false, 0);
        }
    }
    applyInclusionStyle3D(sceneNodeIds) {
        const nodeRefsToInclude = this.persistentIdToNodeRef(sceneNodeIds, true);
        if (!this.leafNodeRefs) {
            this.leafNodeRefs = this.getAllLeafNodeRefs();
        }
        const leafNodeRefsToInclude = nodeRefsToInclude.flatMap((nodeRef) => this.getLeafDescendants(nodeRef, []));
        const leafNodeRefsToIncludeSet = new Set(leafNodeRefsToInclude);
        const leafNodeRefsToExclude = this.leafNodeRefs.filter((leafNodeRef) => !leafNodeRefsToIncludeSet.has(leafNodeRef));
        this.viewStateManager.setOpacity(leafNodeRefsToExclude, this.excludedOpacity);
        leafNodeRefsToInclude.forEach((nodeRef) => this.viewStateManager.setOpacity(nodeRef, this.viewStateManager.getRestOpacity(nodeRef)));
    }
    isTopLevelHotspotNode(hotspotNodeRef, hotspotNodeRefs) {
        return !this.nodeHierarchy
            .getAncestors(hotspotNodeRef)
            .some((ancestor) => hotspotNodeRefs.has(ancestor));
    }
    isReferenceNode(nodeRef) {
        return (this.nodeHierarchy.getNodeContentType(nodeRef) ===
            NodeContentType.Reference);
    }
    getLeafDescendants(nodeRef, leafNodeRefs) {
        if (!this.isReferenceNode(nodeRef)) {
            const children = this.nodeHierarchy
                .getChildren(nodeRef, false)
                .filter((childNodeRef) => !this.isReferenceNode(childNodeRef));
            if (children.length === 0) {
                leafNodeRefs.push(nodeRef);
            }
            else {
                children.forEach((childNodeRef) => this.getLeafDescendants(childNodeRef, leafNodeRefs));
            }
        }
        return leafNodeRefs;
    }
    getAllLeafNodeRefs() {
        return this.nodeHierarchy
            .getChildren(undefined)
            .flatMap((nodeRef) => this.getLeafDescendants(nodeRef, []));
    }
    isolateNodes(nodeRefsToIsolate) {
        // isolate just the first selected node
        nodeRefsToIsolate = nodeRefsToIsolate.slice(0, 1);
        this.viewport.zoomTo(ZoomTo.Node, nodeRefsToIsolate, this.flyToDurationInSeconds, this.zoomToMargin);
        const currentVisibleSids = this.viewPriorToIsolateViewInfo.visibility.visible || [];
        const currentVisibleNodeRefs = this.persistentIdToNodeRef(currentVisibleSids, true);
        this.viewStateManager.setVisibilityState(currentVisibleNodeRefs, false, true, false);
        this.viewStateManager.setVisibilityState(nodeRefsToIsolate, true, true, true);
    }
    animationPlayerSetTime(time, blockEvents) {
        // bug workaround
        // the overload with no sequence number parameter blows up
        this.animationPlayer.setTime(time, undefined, blockEvents);
    }
    onViewActivated() {
        this.initialViewInfo = this.viewport.getViewInfo({
            camera: true,
            visibility: true,
        });
    }
    onTimeChanged(oEvent) {
        let changes = false;
        const time = oEvent.getParameters().time;
        if (this.animationTime !== time) {
            this.animationTime = time;
            this.animationTimeChange.emit(time);
            changes = true;
        }
        const position = this.animationTotalDuration
            ? this.animationTime / this.animationTotalDuration
            : 0;
        if (this.animationPosition !== position) {
            this.animationPosition = position;
            this.animationPositionChange.emit(position);
            changes = true;
        }
        if (this.animationPlaying) {
            if (this.animationPosition >= 1) {
                this._animationPlaying = false;
                this.animationPlayingChange.emit(this._animationPlaying);
            }
        }
        if (changes) {
            // This is needed for the animation slider handle position to get updated
            // while an animation is playing.
            // Otherwise it typically only moves once the animation playback has paused.
            this.changeDetectorRef.detectChanges();
        }
    }
    setVisualizationLoadInfo(visualizationLoadInfo) {
        this._visualizationLoadInfo = visualizationLoadInfo;
        this.visualizationLoadInfoChange.emit(visualizationLoadInfo);
        this.changeDetectorRef.detectChanges();
    }
    get visualizationLoadInfo() {
        return this._visualizationLoadInfo;
    }
    loadVisualization(productCode) {
        if (!this.windowRef.isBrowser()) {
            return of({
                lookupResult: VisualizationLookupResult.UnexpectedError,
                loadStatus: VisualizationLoadStatus.UnexpectedError,
                errorMessage: 'Should not call loadVisualization in server side code',
            });
        }
        this.selectedNodeIdsSubscription?.unsubscribe();
        return this.viewportAdded$.pipe(mergeMap(() => this.resolveVisualization(productCode).pipe(mergeMap((visualizationLoadInfo) => {
            if (visualizationLoadInfo.lookupResult ===
                VisualizationLookupResult.UniqueMatchFound) {
                this.sceneNodeToProductLookupService.populateMapsForScene(this.sceneId);
                let mergedVisualizationLoadInfo = {
                    ...visualizationLoadInfo,
                    loadStatus: VisualizationLoadStatus.Loading,
                };
                this.setVisualizationLoadInfo(mergedVisualizationLoadInfo);
                return this.loadScene(this.sceneId, this.contentType).pipe(mergeMap((sceneLoadInfo) => {
                    if (sceneLoadInfo.sceneLoadState === SceneLoadState.Failed) {
                        mergedVisualizationLoadInfo = {
                            ...visualizationLoadInfo,
                            loadStatus: VisualizationLoadStatus.UnexpectedError,
                            errorMessage: sceneLoadInfo.errorMessage,
                        };
                    }
                    else {
                        this.selectedNodeIdsSubscription =
                            this.selectedNodeIds$.subscribe(this.handleSelectedNodeIds.bind(this));
                        mergedVisualizationLoadInfo = {
                            ...visualizationLoadInfo,
                            loadStatus: VisualizationLoadStatus.Loaded,
                        };
                    }
                    this.setVisualizationLoadInfo(mergedVisualizationLoadInfo);
                    return of(mergedVisualizationLoadInfo);
                }));
            }
            else {
                return of(visualizationLoadInfo);
            }
        }))));
    }
    isUi5BootStrapped() {
        return (!!this.windowRef.nativeWindow &&
            !!this.windowRef.nativeWindow.sap);
    }
    getCore() {
        return sap.ui.getCore();
    }
    bootstrapUi5(scriptElementId) {
        const epdVisualization = this.epdVisualizationConfig
            .epdVisualization;
        const ui5Config = epdVisualization.ui5;
        return new Observable((subscriber) => {
            if (this.isUi5BootStrapped()) {
                subscriber.next();
                subscriber.complete();
                return;
            }
            const script = this.windowRef.document.createElement('script');
            script.setAttribute('id', scriptElementId);
            this.windowRef.document
                .getElementsByTagName('head')[0]
                .appendChild(script);
            script.onload = () => {
                subscriber.next();
                subscriber.complete();
            };
            script.onerror = (error) => {
                subscriber.error(error);
                subscriber.complete();
            };
            script.id = 'sap-ui-bootstrap';
            script.type = 'text/javascript';
            script.setAttribute('data-sap-ui-compatVersion', 'edge');
            script.src = ui5Config.bootstrapUrl;
        });
    }
    initializeUi5() {
        return new Observable((subscriber) => {
            const core = this.getCore();
            core.attachInit(() => {
                const loadLibraryOptions = { async: true };
                Promise.all([
                    core.loadLibrary('sap.m', loadLibraryOptions),
                    core.loadLibrary('sap.ui.layout', loadLibraryOptions),
                    core.loadLibrary('sap.ui.vk', loadLibraryOptions),
                    core.loadLibrary('sap.ui.richtexteditor', loadLibraryOptions),
                ]).then(() => {
                    subscriber.next();
                    subscriber.complete();
                });
            });
        });
    }
    destroyViewportAssociations(viewport) {
        const core = this.getCore();
        if (!core) {
            return;
        }
        const contentConnectorId = viewport.getContentConnector();
        if (contentConnectorId) {
            const contentConnector = core.byId(contentConnectorId);
            if (contentConnector) {
                contentConnector.destroy();
            }
        }
        const viewStateManagerId = viewport.getViewStateManager();
        if (viewStateManagerId && core.byId(viewStateManagerId)) {
            const viewStateManager = core.byId(viewStateManagerId);
            if (viewStateManager) {
                const animationPlayer = viewStateManager.getAnimationPlayer();
                if (animationPlayer) {
                    animationPlayer.destroy();
                }
                const viewManagerId = viewStateManager.getViewManager();
                if (viewManagerId) {
                    const viewManager = core.byId(viewManagerId);
                    if (viewManager) {
                        viewManager.destroy();
                    }
                }
                viewStateManager.destroy();
            }
        }
    }
    onContentChangesStarted() {
        this.viewport.detachNodesPicked(this.onNodesPicked);
    }
    onContentChangesFinished(event) {
        const content = event.getParameter('content');
        const failureReason = event.getParameter('failureReason');
        if (!!content && !failureReason) {
            this.scene = content;
            this.nodeHierarchy = this.scene.getDefaultNodeHierarchy();
            this.viewport.attachNodesPicked(this.onNodesPicked, this);
            if (content.loaders) {
                content.loaders.forEach((contentLoader) => {
                    if (contentLoader &&
                        contentLoader.attachLoadingFinished !== undefined) {
                        contentLoader.attachLoadingFinished(this.onContentLoadingFinished, this);
                    }
                });
            }
        }
        this.contentChangesFinished.emit({
            content,
            failureReason,
        });
    }
    onContentLoadingFinished(_event) {
        this.contentLoadFinished.emit({});
    }
    onNodesPicked(event) {
        if (this.is2D) {
            this.onNodesPicked2D(event);
        }
        else {
            this.onNodesPicked3D(event);
        }
    }
    isNodeIncluded(nodeRef) {
        const sids = this.nodeRefToPersistentId([nodeRef], true);
        const productCodes = this.sceneNodeToProductLookupService.syncLookupProductCodes(sids);
        return (!!productCodes &&
            productCodes.some((productCode) => this.includedProductCodes.includes(productCode)));
    }
    onNodesPicked2D(event) {
        const pickedNodes = event.getParameter('picked');
        if (pickedNodes.length === 0) {
            return;
        }
        const hotSpots = pickedNodes.filter((node) => node.nodeContentType && node.nodeContentType === NodeContentType.Hotspot);
        if (hotSpots.length === 0) {
            return;
        }
        const includedHotSpots = hotSpots.filter((nodeRef) => this.isNodeIncluded(nodeRef));
        pickedNodes.splice(0);
        includedHotSpots.forEach((includedHotSpot) => pickedNodes.push(includedHotSpot));
    }
    onNodesPicked3D(event) {
        const picked = event.getParameter('picked');
        const src = picked.splice(0, picked.length);
        src.forEach((node) => {
            while (!this.isNodeIncluded(node)) {
                node = node.parent;
                if (!node) {
                    break;
                }
            }
            if (node) {
                picked.push(node);
            }
        });
    }
    addViewport() {
        return new Observable((subscriber) => {
            sap.ui.require([
                'sap/ui/vk/ViewManager',
                'sap/ui/vk/Viewport',
                'sap/ui/vk/ViewStateManager',
                'sap/ui/vk/AnimationPlayer',
                'sap/ui/vk/ContentConnector',
                'sap/ui/vk/DrawerToolbar',
            ], (sap_ui_vk_ViewManager, sap_ui_vk_Viewport, sap_ui_vk_ViewStateManager, sap_ui_vk_AnimationPlayer, sap_ui_vk_ContentConnector, sap_ui_vk_DrawerToolbar) => {
                const core = this.getCore();
                const uiArea = core.getUIArea(this.elementRef.nativeElement);
                if (uiArea) {
                    const oldViewport = uiArea.getContent()[0];
                    this.destroyViewportAssociations(oldViewport);
                    uiArea.destroyContent();
                }
                this.viewport = new sap_ui_vk_Viewport({ visible: false });
                this.viewport.placeAt(this.elementRef.nativeElement);
                this.contentConnector = new sap_ui_vk_ContentConnector();
                this.contentConnector.attachContentChangesStarted(this.onContentChangesStarted, this);
                this.contentConnector.attachContentChangesFinished(this.onContentChangesFinished, this);
                this.contentConnector.attachContentLoadingFinished(this.onContentLoadingFinished, this);
                this.viewStateManager = new sap_ui_vk_ViewStateManager({
                    contentConnector: this.contentConnector,
                });
                this.viewport.setContentConnector(this.contentConnector);
                this.viewport.setViewStateManager(this.viewStateManager);
                this.animationPlayer = new sap_ui_vk_AnimationPlayer();
                this.animationPlayer.setViewStateManager(this.viewStateManager);
                this.animationPlayer.attachViewActivated(this.onViewActivated, this);
                this.animationPlayer.attachTimeChanged(this.onTimeChanged, this);
                this.viewManager = new sap_ui_vk_ViewManager({
                    contentConnector: this.contentConnector,
                    animationPlayer: this.animationPlayer,
                });
                this.viewStateManager.setViewManager(this.viewManager);
                this.viewStateManager.attachSelectionChanged(this.onSelectionChanged, this);
                this.viewStateManager.attachOutliningChanged(this.onOutliningChanged, this);
                this.drawerToolbar = new sap_ui_vk_DrawerToolbar({
                    viewport: this.viewport,
                    visible: false,
                });
                this.viewport.addDependent(this.drawerToolbar);
                subscriber.next();
                subscriber.complete();
            });
        });
    }
    getCSSPropertyValue(cssPropertyName) {
        const storefrontElement = document.getElementsByTagName('cx-storefront')[0];
        return getComputedStyle(storefrontElement).getPropertyValue(cssPropertyName);
    }
    getCSSColor(color) {
        return (this.getCSSPropertyValue(color) || color).trim();
    }
    resolveVisualization(productCode) {
        return this.visualizationLookupService
            .findMatchingVisualizations(productCode)
            .pipe(mergeMap((matches) => {
            let visualizationLoadInfo;
            switch (matches.length) {
                case 0:
                    visualizationLoadInfo = {
                        lookupResult: VisualizationLookupResult.NoMatchFound,
                        loadStatus: VisualizationLoadStatus.NotStarted,
                        matches,
                    };
                    break;
                case 1:
                    const matchingVisualization = matches[0];
                    this.sceneId = matchingVisualization.sceneId;
                    this.contentType = matchingVisualization.contentType;
                    visualizationLoadInfo = {
                        lookupResult: VisualizationLookupResult.UniqueMatchFound,
                        loadStatus: VisualizationLoadStatus.NotStarted,
                        matches,
                        visualization: matchingVisualization,
                    };
                    break;
                default:
                    visualizationLoadInfo = {
                        lookupResult: VisualizationLookupResult.MultipleMatchesFound,
                        loadStatus: VisualizationLoadStatus.NotStarted,
                        matches,
                    };
                    break;
            }
            this.setVisualizationLoadInfo(visualizationLoadInfo);
            return of(visualizationLoadInfo);
        }), catchError(() => {
            let visualizationLoadInfo = {
                lookupResult: VisualizationLookupResult.UnexpectedError,
                loadStatus: VisualizationLoadStatus.NotStarted,
            };
            this.setVisualizationLoadInfo(visualizationLoadInfo);
            return of(visualizationLoadInfo);
        }));
    }
    persistentIdToNodeRef(nodeIds, filterUnresolvedValues) {
        const nodeRefs = this.scene.persistentIdToNodeRef(nodeIds);
        return filterUnresolvedValues
            ? nodeRefs.filter((nodeRef) => !!nodeRef)
            : nodeRefs;
    }
    nodeRefToPersistentId(nodeRefs, filterUnresolvedValues) {
        const sids = this.scene.nodeRefToPersistentId(nodeRefs);
        return filterUnresolvedValues ? sids.filter((sid) => !!sid) : sids;
    }
    getViewStateManagerImplementation() {
        return this.viewStateManager.getImplementation();
    }
    handleSelectedNodeIds(nodeIds) {
        const nodeRefs = this.persistentIdToNodeRef(nodeIds, true);
        if (this.is2D) {
            this.handleSelectedNodes2D(nodeRefs);
        }
        else {
            this.handleSelectedNodes3D(nodeRefs);
        }
        if (this.isolateModeEnabled && nodeRefs.length > 0) {
            this.isolateNodes(nodeRefs);
        }
        // Need to ensure a frame render occurs since we are blocking events
        // when changing selection/outlining
        this.setShouldRenderFrame();
    }
    handleSelectedNodes2D(selectedNodes) {
        const existingSelection = [];
        this.viewStateManager.enumerateSelection((nodeRef) => existingSelection.push(nodeRef));
        this.viewStateManager.setSelectionStates([], existingSelection, false, true);
        this.viewStateManager.setSelectionStates(selectedNodes, [], false, true);
    }
    handleSelectedNodes3D(selectedNodes) {
        const existingOutlinedNodeRefs = [];
        this.viewStateManager.enumerateOutlinedNodes((nodeRef) => existingOutlinedNodeRefs.push(nodeRef));
        this.getViewStateManagerImplementation().setOutliningStates([], existingOutlinedNodeRefs, false, true);
        this.getViewStateManagerImplementation().setOutliningStates(selectedNodes, [], false, true);
    }
    setShouldRenderFrame() {
        this.viewport.setShouldRenderFrame();
    }
    is2DContentType(contentType) {
        return contentType === ContentType.Drawing2D;
    }
    loadScene(sceneId, contentType) {
        const epdVisualization = this.epdVisualizationConfig
            .epdVisualization;
        const visualizationApiConfig = epdVisualization.apis;
        if (this.viewportReady) {
            this.setViewportReady(false);
        }
        this.setIs2D(this.is2DContentType(contentType));
        return new Observable((subscriber) => {
            sap.ui.require(['sap/ui/vk/ContentResource'], (ContentResource) => {
                this.sceneLoadInfo$.next({
                    sceneLoadState: SceneLoadState.Loading,
                });
                this.viewport.setSelectionDisplayMode(this.is2D ? 'Highlight' : 'Outline');
                const baseUrl = visualizationApiConfig.baseUrl;
                const contentResource = new ContentResource({
                    useSecureConnection: false,
                    sourceType: this.is2D ? 'stream2d' : 'stream',
                    source: `${baseUrl}/vis/public/storage/v1`,
                    veid: sceneId,
                });
                this.contentChangesFinished
                    .pipe(first())
                    .subscribe((visualContentLoadFinished) => {
                    const succeeded = !!visualContentLoadFinished.content;
                    const sceneLoadInfo = succeeded
                        ? {
                            sceneLoadState: SceneLoadState.Loaded,
                            loadedSceneInfo: {
                                sceneId,
                                contentType,
                            },
                        }
                        : {
                            sceneLoadState: SceneLoadState.Failed,
                            errorMessage: visualContentLoadFinished.failureReason,
                        };
                    this.sceneLoadInfo$.next(sceneLoadInfo);
                    subscriber.next(sceneLoadInfo);
                    subscriber.complete();
                });
                this.contentLoadFinished.pipe(first()).subscribe(() => {
                    const sceneLoadInfo = this.sceneLoadInfo$.value;
                    if (sceneLoadInfo.sceneLoadState === SceneLoadState.Loaded) {
                        this.setViewportReady(true);
                        // Ensure that the spinner is hidden before the viewport becomes visible.
                        // Otherwise the position of the spinner changes
                        this.changeDetectorRef.detectChanges();
                        this.viewport.setVisible(true);
                    }
                });
                this.contentConnector.addContentResource(contentResource);
            });
        });
    }
    onSelectionChanged() {
        const nodeRefs = [];
        this.viewStateManager.enumerateSelection((nodeRef) => nodeRefs.push(nodeRef));
        const nodeIds = this.nodeRefToPersistentId(nodeRefs, true);
        this.sceneNodeToProductLookupService
            .lookupProductCodes(nodeIds)
            .pipe(first())
            .subscribe((productCodes) => {
            this.selectedProductCodesChange.emit(productCodes);
        });
    }
    onOutliningChanged() {
        const nodeRefs = [];
        this.viewStateManager.enumerateOutlinedNodes((nodeRef) => nodeRefs.push(nodeRef));
        const nodeIds = this.nodeRefToPersistentId(nodeRefs, true);
        this.sceneNodeToProductLookupService
            .lookupProductCodes(nodeIds)
            .pipe(first())
            .subscribe((productCodes) => {
            this.selectedProductCodesChange.emit(productCodes);
        });
    }
}
VisualViewerService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: VisualViewerService, deps: [{ token: i1.EpdVisualizationConfig }, { token: i2.SceneNodeToProductLookupService }, { token: i2.VisualizationLookupService }, { token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: i3.WindowRef }], target: i0.ɵɵFactoryTarget.Injectable });
VisualViewerService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: VisualViewerService, providedIn: 'any' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: VisualViewerService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'any',
                }]
        }], ctorParameters: function () { return [{ type: i1.EpdVisualizationConfig }, { type: i2.SceneNodeToProductLookupService }, { type: i2.VisualizationLookupService }, { type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: i3.WindowRef }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzdWFsLXZpZXdlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vaW50ZWdyYXRpb24tbGlicy9lcGQtdmlzdWFsaXphdGlvbi9jb21wb25lbnRzL3Zpc3VhbC12aWV3ZXIvdmlzdWFsLXZpZXdlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU9BLDhDQUE4QztBQVA5Qzs7OztHQUlHO0FBRUgseUZBQXlGO0FBQ3pGLDhDQUE4QztBQUM5QyxPQUFPLEVBR0wsWUFBWSxFQUNaLFVBQVUsR0FFWCxNQUFNLGVBQWUsQ0FBQztBQU12QixPQUFPLEVBQ0wsV0FBVyxHQU1aLE1BQU0sbUNBQW1DLENBQUM7QUFDM0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQUNyRSxPQUFPLEVBQ0wsVUFBVSxFQUNWLE1BQU0sRUFDTixLQUFLLEVBQ0wsUUFBUSxFQUNSLFdBQVcsR0FDWixNQUFNLGdCQUFnQixDQUFDO0FBWXhCLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFFN0QsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzNELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN4RCxPQUFPLEVBRUwsdUJBQXVCLEVBQ3ZCLHlCQUF5QixHQUMxQixNQUFNLGtDQUFrQyxDQUFDO0FBQzFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQzs7Ozs7QUFnQjFDLE1BQU0sT0FBTyxtQkFBbUI7SUFDOUIsWUFDWSxzQkFBOEMsRUFDOUMsZ0NBQWlFLEVBQ2pFLDBCQUFzRCxFQUN0RCxVQUFzQixFQUN0QixpQkFBb0MsRUFDcEMsU0FBb0I7UUFMcEIsMkJBQXNCLEdBQXRCLHNCQUFzQixD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Q0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQ3ZCLENBQUM7UUFFRixNQUFNLE9BQU8sR0FBYSxJQUFJLENBQUMscUJBQXFCLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3JFLElBQUksQ0FBQywrQkFBK0I7YUFDakMsa0JBQWtCLENBQUMsT0FBTyxDQUFDO2FBQzNCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQzthQUNiLFNBQVMsQ0FBQyxDQUFDLFlBQXNCLEVBQUUsRUFBRTtZQUNwQyxJQUFJLENBQUMsMEJBQTBCLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3JELENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVPLGtCQUFrQjtRQUN4QixNQUFNLFFBQVEsR0FBYyxFQUFFLENBQUM7UUFDL0IsSUFBSSxDQUFDLGdCQUFnQixDQUFDLHNCQUFzQixDQUFDLENBQUMsT0FBZ0IsRUFBRSxFQUFFLENBQ2hFLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQ3ZCLENBQUM7UUFFRixNQUFNLE9BQU8sR0FBYSxJQUFJLENBQUMscUJBQXFCLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3JFLElBQUksQ0FBQywrQkFBK0I7YUFDakMsa0JBQWtCLENBQUMsT0FBTyxDQUFDO2FBQzNCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQzthQUNiLFNBQVMsQ0FBQyxDQUFDLFlBQXNCLEVBQUUsRUFBRTtZQUNwQyxJQUFJLENBQUMsMEJBQTBCLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3JELENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQzs7Z0hBamdEVSxtQkFBbUI7b0hBQW5CLG1CQUFtQixjQUZsQixLQUFLOzJGQUVOLG1CQUFtQjtrQkFIL0IsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsS0FBSztpQkFDbEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG4vLyAnQHNhcHVpNS90cy10eXBlcy1lc20nIHBhY2thZ2UgY29udGFpbnMgdHlwZXMgZm9yIHNhcCBtb2R1bGVzLCBlLmcuICdzYXAvdWkvY29yZS9Db3JlJ1xuLy8vIDxyZWZlcmVuY2UgdHlwZXM9XCJAc2FwdWk1L3RzLXR5cGVzLWVzbVwiIC8+XG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBJbmplY3RhYmxlLFxuICBPbkRlc3Ryb3ksXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgV2luZG93UmVmIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7XG4gIFNjZW5lTm9kZVRvUHJvZHVjdExvb2t1cFNlcnZpY2UsXG4gIFZpc3VhbGl6YXRpb25Mb29rdXBTZXJ2aWNlLFxufSBmcm9tICdAc3BhcnRhY3VzL2VwZC12aXN1YWxpemF0aW9uL2NvcmUnO1xuaW1wb3J0IHtcbiAgQ29udGVudFR5cGUsXG4gIEVwZFZpc3VhbGl6YXRpb25Db25maWcsXG4gIEVwZFZpc3VhbGl6YXRpb25Jbm5lckNvbmZpZyxcbiAgVWk1Q29uZmlnLFxuICBWaXN1YWxpemF0aW9uQXBpQ29uZmlnLFxuICBWaXN1YWxpemF0aW9uSW5mbyxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9lcGQtdmlzdWFsaXphdGlvbi9yb290JztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgT2JzZXJ2YWJsZSwgb2YsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtcbiAgY2F0Y2hFcnJvcixcbiAgZmlsdGVyLFxuICBmaXJzdCxcbiAgbWVyZ2VNYXAsXG4gIHNoYXJlUmVwbGF5LFxufSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgdHlwZSBDb3JlIGZyb20gJ3NhcC91aS9jb3JlL0NvcmUnO1xuaW1wb3J0IHR5cGUgeyBDU1NDb2xvciB9IGZyb20gJ3NhcC91aS9jb3JlL2xpYnJhcnknO1xuaW1wb3J0IHR5cGUgVUlBcmVhIGZyb20gJ3NhcC91aS9jb3JlL1VJQXJlYSc7XG5pbXBvcnQgdHlwZSBBbmltYXRpb25QbGF5ZXIgZnJvbSAnc2FwL3VpL3ZrL0FuaW1hdGlvblBsYXllcic7XG5pbXBvcnQgdHlwZSBDb250ZW50Q29ubmVjdG9yIGZyb20gJ3NhcC91aS92ay9Db250ZW50Q29ubmVjdG9yJztcbmltcG9ydCB0eXBlIENvbnRlbnRSZXNvdXJjZSBmcm9tICdzYXAvdWkvdmsvQ29udGVudFJlc291cmNlJztcbmltcG9ydCB0eXBlIERyYXdlclRvb2xiYXIgZnJvbSAnc2FwL3VpL3ZrL0RyYXdlclRvb2xiYXInO1xuaW1wb3J0IE5vZGVIaWVyYXJjaHkgZnJvbSAnc2FwL3VpL3ZrL05vZGVIaWVyYXJjaHknO1xuaW1wb3J0IHR5cGUgU2NlbmUgZnJvbSAnc2FwL3VpL3ZrL1NjZW5lJztcbmltcG9ydCB0eXBlIFZpZXdwb3J0IGZyb20gJ3NhcC91aS92ay9WaWV3cG9ydCc7XG5pbXBvcnQgdHlwZSBWaWV3U3RhdGVNYW5hZ2VyIGZyb20gJ3NhcC91aS92ay9WaWV3U3RhdGVNYW5hZ2VyJztcbmltcG9ydCB7IE5hdmlnYXRpb25Nb2RlIH0gZnJvbSAnLi9tb2RlbHMvbmF2aWdhdGlvbi1tb2RlJztcbmltcG9ydCB7IE5vZGVDb250ZW50VHlwZSB9IGZyb20gJy4vbW9kZWxzL25vZGUtY29udGVudC10eXBlJztcbmltcG9ydCB7IExvYWRlZFNjZW5lSW5mbywgU2NlbmVMb2FkSW5mbyB9IGZyb20gJy4vbW9kZWxzL3NjZW5lLWxvYWQtaW5mbyc7XG5pbXBvcnQgeyBTY2VuZUxvYWRTdGF0ZSB9IGZyb20gJy4vbW9kZWxzL3NjZW5lLWxvYWQtc3RhdGUnO1xuaW1wb3J0IHsgU2VsZWN0aW9uTW9kZSB9IGZyb20gJy4vbW9kZWxzL3NlbGVjdGlvbi1tb2RlJztcbmltcG9ydCB7XG4gIFZpc3VhbGl6YXRpb25Mb2FkSW5mbyxcbiAgVmlzdWFsaXphdGlvbkxvYWRTdGF0dXMsXG4gIFZpc3VhbGl6YXRpb25Mb29rdXBSZXN1bHQsXG59IGZyb20gJy4vbW9kZWxzL3Zpc3VhbGl6YXRpb24tbG9hZC1pbmZvJztcbmltcG9ydCB7IFpvb21UbyB9IGZyb20gJy4vbW9kZWxzL3pvb20tdG8nO1xuXG50eXBlIFZpZXdNYW5hZ2VyID0gYW55O1xudHlwZSBOb2RlUmVmID0gYW55O1xudHlwZSBWaWV3SW5mbyA9IGFueTtcblxuaW50ZXJmYWNlIFZpc3VhbENvbnRlbnRDaGFuZ2VzRmluaXNoZWRFdmVudCB7XG4gIGNvbnRlbnQ6IGFueTtcbiAgZmFpbHVyZVJlYXNvbjogYW55O1xufVxuXG5pbnRlcmZhY2UgVmlzdWFsQ29udGVudExvYWRGaW5pc2hlZEV2ZW50IHt9XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ2FueScsXG59KVxuZXhwb3J0IGNsYXNzIFZpc3VhbFZpZXdlclNlcnZpY2UgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgZXBkVmlzdWFsaXphdGlvbkNvbmZpZzogRXBkVmlzdWFsaXphdGlvbkNvbmZpZyxcbiAgICBwcm90ZWN0ZWQgX3NjZW5lTm9kZVRvUHJvZHVjdExvb2t1cFNlcnZpY2U6IFNjZW5lTm9kZVRvUHJvZHVjdExvb2t1cFNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHZpc3VhbGl6YXRpb25Mb29rdXBTZXJ2aWNlOiBWaXN1YWxpemF0aW9uTG9va3VwU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBwcm90ZWN0ZWQgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByb3RlY3RlZCB3aW5kb3dSZWY6IFdpbmRvd1JlZlxuICApIHtcbiAgICBpZiAoIXRoaXMud2luZG93UmVmLmlzQnJvd3NlcigpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHVpNUJvb3RTdHJhcHBlZCQ6IE9ic2VydmFibGU8dm9pZD4gPVxuICAgICAgdGhpcy5ib290c3RyYXBVaTUoJ3VpNWJvb3RzdHJhcCcpO1xuICAgIGNvbnN0IHVpNUluaXRpYWxpemVkJDogT2JzZXJ2YWJsZTx2b2lkPiA9IHVpNUJvb3RTdHJhcHBlZCQucGlwZShcbiAgICAgIG1lcmdlTWFwKHRoaXMuaW5pdGlhbGl6ZVVpNS5iaW5kKHRoaXMpKVxuICAgICk7XG4gICAgdGhpcy52aWV3cG9ydEFkZGVkJCA9IHVpNUluaXRpYWxpemVkJC5waXBlKFxuICAgICAgbWVyZ2VNYXAodGhpcy5hZGRWaWV3cG9ydC5iaW5kKHRoaXMpKSxcbiAgICAgIHNoYXJlUmVwbGF5KClcbiAgICApO1xuICAgIHRoaXMuZXhlY3V0ZVdoZW5TY2VuZUxvYWRlZCh0aGlzLnNldEluaXRpYWxQcm9wZXJ0eVZhbHVlcy5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuc2VsZWN0ZWROb2RlSWRzU3Vic2NyaXB0aW9uPy51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZWxlY3RlZE5vZGVJZHNTdWJzY3JpcHRpb24/OiBTdWJzY3JpcHRpb247XG5cbiAgcHJpdmF0ZSBnZXQgc2NlbmVOb2RlVG9Qcm9kdWN0TG9va3VwU2VydmljZSgpOiBTY2VuZU5vZGVUb1Byb2R1Y3RMb29rdXBTZXJ2aWNlIHtcbiAgICByZXR1cm4gdGhpcy5fc2NlbmVOb2RlVG9Qcm9kdWN0TG9va3VwU2VydmljZTtcbiAgfVxuICBwcml2YXRlIHNldCBzY2VuZU5vZGVUb1Byb2R1Y3RMb29rdXBTZXJ2aWNlKFxuICAgIHZhbHVlOiBTY2VuZU5vZGVUb1Byb2R1Y3RMb29rdXBTZXJ2aWNlXG4gICkge1xuICAgIHRoaXMuX3NjZW5lTm9kZVRvUHJvZHVjdExvb2t1cFNlcnZpY2UgPSB2YWx1ZTtcbiAgfVxuXG4gIHByaXZhdGUgX3NjZW5lOiBTY2VuZTtcbiAgcHJpdmF0ZSBnZXQgc2NlbmUoKTogU2NlbmUge1xuICAgIHJldHVybiB0aGlzLl9zY2VuZTtcbiAgfVxuICBwcml2YXRlIHNldCBzY2VuZSh2YWx1ZTogU2NlbmUpIHtcbiAgICB0aGlzLl9zY2VuZSA9IHZhbHVlO1xuICB9XG5cbiAgcHJpdmF0ZSBfbm9kZUhpZXJhcmNoeTogTm9kZUhpZXJhcmNoeTtcbiAgcHJpdmF0ZSBnZXQgbm9kZUhpZXJhcmNoeSgpOiBOb2RlSGllcmFyY2h5IHtcbiAgICByZXR1cm4gdGhpcy5fbm9kZUhpZXJhcmNoeTtcbiAgfVxuICBwcml2YXRlIHNldCBub2RlSGllcmFyY2h5KHZhbHVlOiBOb2RlSGllcmFyY2h5KSB7XG4gICAgdGhpcy5fbm9kZUhpZXJhcmNoeSA9IHZhbHVlO1xuICB9XG5cbiAgcHJpdmF0ZSBfY29udGVudENvbm5lY3RvcjogQ29udGVudENvbm5lY3RvcjtcbiAgcHJpdmF0ZSBnZXQgY29udGVudENvbm5lY3RvcigpOiBDb250ZW50Q29ubmVjdG9yIHtcbiAgICByZXR1cm4gdGhpcy5fY29udGVudENvbm5lY3RvcjtcbiAgfVxuICBwcml2YXRlIHNldCBjb250ZW50Q29ubmVjdG9yKHZhbHVlOiBDb250ZW50Q29ubmVjdG9yKSB7XG4gICAgdGhpcy5fY29udGVudENvbm5lY3RvciA9IHZhbHVlO1xuICB9XG5cbiAgcHJpdmF0ZSBfdmlld3BvcnQ6IFZpZXdwb3J0O1xuICBwcml2YXRlIGdldCB2aWV3cG9ydCgpOiBWaWV3cG9ydCB7XG4gICAgcmV0dXJuIHRoaXMuX3ZpZXdwb3J0O1xuICB9XG4gIHByaXZhdGUgc2V0IHZpZXdwb3J0KHZhbHVlOiBWaWV3cG9ydCkge1xuICAgIHRoaXMuX3ZpZXdwb3J0ID0gdmFsdWU7XG4gIH1cblxuICBwcml2YXRlIF92aWV3U3RhdGVNYW5hZ2VyOiBWaWV3U3RhdGVNYW5hZ2VyO1xuICBwcml2YXRlIGdldCB2aWV3U3RhdGVNYW5hZ2VyKCk6IFZpZXdTdGF0ZU1hbmFnZXIge1xuICAgIHJldHVybiB0aGlzLl92aWV3U3RhdGVNYW5hZ2VyO1xuICB9XG4gIHByaXZhdGUgc2V0IHZpZXdTdGF0ZU1hbmFnZXIodmFsdWU6IFZpZXdTdGF0ZU1hbmFnZXIpIHtcbiAgICB0aGlzLl92aWV3U3RhdGVNYW5hZ2VyID0gdmFsdWU7XG4gIH1cblxuICBwcml2YXRlIF9hbmltYXRpb25QbGF5ZXI6IEFuaW1hdGlvblBsYXllcjtcbiAgcHJpdmF0ZSBnZXQgYW5pbWF0aW9uUGxheWVyKCk6IEFuaW1hdGlvblBsYXllciB7XG4gICAgcmV0dXJuIHRoaXMuX2FuaW1hdGlvblBsYXllcjtcbiAgfVxuICBwcml2YXRlIHNldCBhbmltYXRpb25QbGF5ZXIodmFsdWU6IEFuaW1hdGlvblBsYXllcikge1xuICAgIHRoaXMuX2FuaW1hdGlvblBsYXllciA9IHZhbHVlO1xuICB9XG5cbiAgcHJpdmF0ZSBfdmlld01hbmFnZXI6IFZpZXdNYW5hZ2VyO1xuICBwcml2YXRlIGdldCB2aWV3TWFuYWdlcigpOiBWaWV3TWFuYWdlciB7XG4gICAgcmV0dXJuIHRoaXMuX3ZpZXdNYW5hZ2VyO1xuICB9XG4gIHByaXZhdGUgc2V0IHZpZXdNYW5hZ2VyKHZhbHVlOiBWaWV3TWFuYWdlcikge1xuICAgIHRoaXMuX3ZpZXdNYW5hZ2VyID0gdmFsdWU7XG4gIH1cblxuICBwcml2YXRlIF9kcmF3ZXJUb29sYmFyOiBEcmF3ZXJUb29sYmFyO1xuICBwcml2YXRlIGdldCBkcmF3ZXJUb29sYmFyKCk6IERyYXdlclRvb2xiYXIge1xuICAgIHJldHVybiB0aGlzLl9kcmF3ZXJUb29sYmFyO1xuICB9XG4gIHByaXZhdGUgc2V0IGRyYXdlclRvb2xiYXIodmFsdWU6IERyYXdlclRvb2xiYXIpIHtcbiAgICB0aGlzLl9kcmF3ZXJUb29sYmFyID0gdmFsdWU7XG4gIH1cblxuICBwcml2YXRlIF9zY2VuZUlkOiBzdHJpbmc7XG4gIHByaXZhdGUgZ2V0IHNjZW5lSWQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fc2NlbmVJZDtcbiAgfVxuICBwcml2YXRlIHNldCBzY2VuZUlkKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9zY2VuZUlkID0gdmFsdWU7XG4gIH1cblxuICBwcml2YXRlIF9jb250ZW50VHlwZTogQ29udGVudFR5cGU7XG4gIHByaXZhdGUgZ2V0IGNvbnRlbnRUeXBlKCk6IENvbnRlbnRUeXBlIHtcbiAgICByZXR1cm4gdGhpcy5fY29udGVudFR5cGU7XG4gIH1cbiAgcHJpdmF0ZSBzZXQgY29udGVudFR5cGUodmFsdWU6IENvbnRlbnRUeXBlKSB7XG4gICAgdGhpcy5fY29udGVudFR5cGUgPSB2YWx1ZTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRpYWxWaWV3SW5mbzogVmlld0luZm87XG4gIHByaXZhdGUgZ2V0IGluaXRpYWxWaWV3SW5mbygpOiBWaWV3SW5mbyB7XG4gICAgcmV0dXJuIHRoaXMuX2luaXRpYWxWaWV3SW5mbztcbiAgfVxuICBwcml2YXRlIHNldCBpbml0aWFsVmlld0luZm8odmFsdWU6IFZpZXdJbmZvKSB7XG4gICAgdGhpcy5faW5pdGlhbFZpZXdJbmZvID0gdmFsdWU7XG4gIH1cblxuICBwcml2YXRlIF9sZWFmTm9kZVJlZnM6IE5vZGVSZWZbXTtcbiAgcHJpdmF0ZSBnZXQgbGVhZk5vZGVSZWZzKCk6IE5vZGVSZWZbXSB7XG4gICAgcmV0dXJuIHRoaXMuX2xlYWZOb2RlUmVmcztcbiAgfVxuICBwcml2YXRlIHNldCBsZWFmTm9kZVJlZnModmFsdWU6IE5vZGVSZWZbXSkge1xuICAgIHRoaXMuX2xlYWZOb2RlUmVmcyA9IHZhbHVlO1xuICB9XG5cbiAgcHJpdmF0ZSBfdmlld1ByaW9yVG9Jc29sYXRlVmlld0luZm86IGFueTtcbiAgcHJpdmF0ZSBnZXQgdmlld1ByaW9yVG9Jc29sYXRlVmlld0luZm8oKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5fdmlld1ByaW9yVG9Jc29sYXRlVmlld0luZm87XG4gIH1cbiAgcHJpdmF0ZSBzZXQgdmlld1ByaW9yVG9Jc29sYXRlVmlld0luZm8odmFsdWU6IGFueSkge1xuICAgIHRoaXMuX3ZpZXdQcmlvclRvSXNvbGF0ZVZpZXdJbmZvID0gdmFsdWU7XG4gIH1cblxuICBwcml2YXRlIF92aWV3cG9ydEFkZGVkJDogT2JzZXJ2YWJsZTx2b2lkPjtcbiAgcHJpdmF0ZSBnZXQgdmlld3BvcnRBZGRlZCQoKTogT2JzZXJ2YWJsZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuX3ZpZXdwb3J0QWRkZWQkO1xuICB9XG4gIHByaXZhdGUgc2V0IHZpZXdwb3J0QWRkZWQkKHZhbHVlOiBPYnNlcnZhYmxlPHZvaWQ+KSB7XG4gICAgdGhpcy5fdmlld3BvcnRBZGRlZCQgPSB2YWx1ZTtcbiAgfVxuXG4gIHByaXZhdGUgX3NlbGVjdGVkTm9kZUlkcyQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZ1tdPihbXSk7XG4gIHByaXZhdGUgZ2V0IHNlbGVjdGVkTm9kZUlkcyQoKTogQmVoYXZpb3JTdWJqZWN0PHN0cmluZ1tdPiB7XG4gICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkTm9kZUlkcyQ7XG4gIH1cbiAgcHJpdmF0ZSBzZXQgc2VsZWN0ZWROb2RlSWRzJCh2YWx1ZTogQmVoYXZpb3JTdWJqZWN0PHN0cmluZ1tdPikge1xuICAgIHRoaXMuX3NlbGVjdGVkTm9kZUlkcyQgPSB2YWx1ZTtcbiAgfVxuXG4gIHByaXZhdGUgX3NjZW5lTG9hZEluZm8kID0gbmV3IEJlaGF2aW9yU3ViamVjdDxTY2VuZUxvYWRJbmZvPih7XG4gICAgc2NlbmVMb2FkU3RhdGU6IFNjZW5lTG9hZFN0YXRlLk5vdFN0YXJ0ZWQsXG4gIH0pO1xuICBwdWJsaWMgZ2V0IHNjZW5lTG9hZEluZm8kKCk6IEJlaGF2aW9yU3ViamVjdDxTY2VuZUxvYWRJbmZvPiB7XG4gICAgcmV0dXJuIHRoaXMuX3NjZW5lTG9hZEluZm8kO1xuICB9XG5cbiAgcHJvdGVjdGVkIHJlYWRvbmx5IERFRkFVTFRfQkFDS0dST1VORF9UT1BfQ09MT1IgPSAnLS1jeC1jb2xvci1pbnZlcnNlJztcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IERFRkFVTFRfQkFDS0dST1VORF9CT1RUT01fQ09MT1IgPSAnLS1jeC1jb2xvci1pbnZlcnNlJztcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IERFRkFVTFRfSE9UU1BPVF9TRUxFQ1RJT05fSElHSExJR0hUX0NPTE9SID1cbiAgICAncmdiYSgyNTUsIDAsIDAsIDAuNiknO1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgREVGQVVMVF9TSE9XX0FMTF9IT1RTUE9UU19DT0xPUiA9ICdyZ2JhKDI1NSwgMjU1LCAwLCAwLjMpJztcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IERFRkFVTFRfT1VUTElORV9DT0xPUiA9ICdyZWQnO1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgREVGQVVMVF9PVVRMSU5FX1dJRFRIID0gNTtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IERFRkFVTFRfU0VMRUNUSU9OX01PREUgPSBTZWxlY3Rpb25Nb2RlLkV4Y2x1c2l2ZTtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IERFRkFVTFRfU0hPV19BTExfSE9UU1BPVFNfRU5BQkxFRCA9IGZhbHNlO1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgREVGQVVMVF9FWENMVURFRF9PUEFDSVRZID0gMC4yO1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgREVGQVVMVF9aT09NX1RPX01BUkdJTiA9IDAuMjtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IERFRkFVTFRfRkxZX1RPX0RVUkFUSU9OID0gMTtcblxuICBwcml2YXRlIF9mbHlUb0R1cmF0aW9uSW5TZWNvbmRzID0gdGhpcy5ERUZBVUxUX0ZMWV9UT19EVVJBVElPTjtcbiAgcHJpdmF0ZSBnZXQgZmx5VG9EdXJhdGlvbkluU2Vjb25kcygpIHtcbiAgICByZXR1cm4gdGhpcy5fZmx5VG9EdXJhdGlvbkluU2Vjb25kcztcbiAgfVxuICBwcml2YXRlIHNldCBmbHlUb0R1cmF0aW9uSW5TZWNvbmRzKHZhbHVlKSB7XG4gICAgdGhpcy5fZmx5VG9EdXJhdGlvbkluU2Vjb25kcyA9IHZhbHVlO1xuICB9XG4gIHByaXZhdGUgX3pvb21Ub01hcmdpbiA9IHRoaXMuREVGQVVMVF9aT09NX1RPX01BUkdJTjtcbiAgcHJpdmF0ZSBnZXQgem9vbVRvTWFyZ2luKCkge1xuICAgIHJldHVybiB0aGlzLl96b29tVG9NYXJnaW47XG4gIH1cbiAgcHJpdmF0ZSBzZXQgem9vbVRvTWFyZ2luKHZhbHVlKSB7XG4gICAgdGhpcy5fem9vbVRvTWFyZ2luID0gdmFsdWU7XG4gIH1cblxuICAvKipcbiAgICogVGhlIHRvcCBjb2xvdXIgb2YgdGhlIGJhY2tncm91bmQgZ3JhZGllbnQuXG4gICAqIENhbiBiZSBwYXNzZWQgaW4gdGhlIENTUyBjb2xvciBmb3JtYXQgb3IgYXMgYSBTcGFydGFjdXMgdGhlbWUgY29sb3IgaS5lLiAnLS1jeC1jb2xvci1iYWNrZ3JvdW5kJyB3aXRoIHRoZSBxdW90ZXMuXG4gICAqL1xuICBwdWJsaWMgc2V0IGJhY2tncm91bmRUb3BDb2xvcihiYWNrZ3JvdW5kVG9wQ29sb3I6IHN0cmluZykge1xuICAgIGlmICghdGhpcy53aW5kb3dSZWYuaXNCcm93c2VyKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMuX2JhY2tncm91bmRUb3BDb2xvciA9PT0gYmFja2dyb3VuZFRvcENvbG9yKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX2JhY2tncm91bmRUb3BDb2xvciA9IGJhY2tncm91bmRUb3BDb2xvcjtcbiAgICB0aGlzLmV4ZWN1dGVXaGVuU2NlbmVMb2FkZWQoKCkgPT4ge1xuICAgICAgdGhpcy52aWV3cG9ydC5zZXRCYWNrZ3JvdW5kQ29sb3JUb3AodGhpcy5nZXRDU1NDb2xvcihiYWNrZ3JvdW5kVG9wQ29sb3IpKTtcbiAgICB9KTtcbiAgfVxuICBwdWJsaWMgZ2V0IGJhY2tncm91bmRUb3BDb2xvcigpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9iYWNrZ3JvdW5kVG9wQ29sb3I7XG4gIH1cbiAgcHJpdmF0ZSBfYmFja2dyb3VuZFRvcENvbG9yOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSBib3R0b20gY29sb3VyIG9mIHRoZSBiYWNrZ3JvdW5kIGdyYWRpZW50LlxuICAgKiBDYW4gYmUgcGFzc2VkIGluIHRoZSBDU1MgY29sb3IgZm9ybWF0IG9yIGFzIGEgU3BhcnRhY3VzIHRoZW1lIGNvbG9yIGkuZS4gJy0tY3gtY29sb3ItYmFja2dyb3VuZCcgd2l0aCB0aGUgcXVvdGVzLlxuICAgKi9cbiAgcHVibGljIHNldCBiYWNrZ3JvdW5kQm90dG9tQ29sb3IoYmFja2dyb3VuZEJvdHRvbUNvbG9yOiBzdHJpbmcpIHtcbiAgICBpZiAoIXRoaXMud2luZG93UmVmLmlzQnJvd3NlcigpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLl9iYWNrZ3JvdW5kQm90dG9tQ29sb3IgPT09IGJhY2tncm91bmRCb3R0b21Db2xvcikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9iYWNrZ3JvdW5kQm90dG9tQ29sb3IgPSBiYWNrZ3JvdW5kQm90dG9tQ29sb3I7XG4gICAgdGhpcy5leGVjdXRlV2hlblNjZW5lTG9hZGVkKCgpID0+IHtcbiAgICAgIHRoaXMudmlld3BvcnQuc2V0QmFja2dyb3VuZENvbG9yQm90dG9tKFxuICAgICAgICB0aGlzLmdldENTU0NvbG9yKGJhY2tncm91bmRCb3R0b21Db2xvcilcbiAgICAgICk7XG4gICAgfSk7XG4gIH1cbiAgcHVibGljIGdldCBiYWNrZ3JvdW5kQm90dG9tQ29sb3IoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fYmFja2dyb3VuZEJvdHRvbUNvbG9yO1xuICB9XG4gIHByaXZhdGUgX2JhY2tncm91bmRCb3R0b21Db2xvcjogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgY29sb3VyIGFwcGxpZWQgdG8gc2VsZWN0ZWQgMkQgaG90c3BvdHMgaW4gMkQgY29udGVudC5cbiAgICogQ2FuIGJlIHBhc3NlZCBpbiB0aGUgQ1NTIGNvbG9yIGZvcm1hdCBvciBhcyBhIFNwYXJ0YWN1cyB0aGVtZSBjb2xvciBpLmUuICctLWN4LWNvbG9yLXByaW1hcnknIHdpdGggdGhlIHF1b3Rlcy5cbiAgICovXG4gIHB1YmxpYyBzZXQgaG90c3BvdFNlbGVjdGlvbkNvbG9yKGhvdHNwb3RTZWxlY3Rpb25Db2xvcjogc3RyaW5nKSB7XG4gICAgaWYgKCF0aGlzLndpbmRvd1JlZi5pc0Jyb3dzZXIoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5faG90c3BvdFNlbGVjdGlvbkNvbG9yID09PSBob3RzcG90U2VsZWN0aW9uQ29sb3IpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5faG90c3BvdFNlbGVjdGlvbkNvbG9yID0gaG90c3BvdFNlbGVjdGlvbkNvbG9yO1xuICAgIHRoaXMuZXhlY3V0ZVdoZW5TY2VuZUxvYWRlZCgoKSA9PiB7XG4gICAgICB0aGlzLnZpZXdTdGF0ZU1hbmFnZXIuc2V0SGlnaGxpZ2h0Q29sb3IoXG4gICAgICAgIHRoaXMuZ2V0Q1NTQ29sb3IoaG90c3BvdFNlbGVjdGlvbkNvbG9yKVxuICAgICAgKTtcbiAgICB9KTtcbiAgfVxuICBwdWJsaWMgZ2V0IGhvdHNwb3RTZWxlY3Rpb25Db2xvcigpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9ob3RzcG90U2VsZWN0aW9uQ29sb3I7XG4gIH1cbiAgcHJpdmF0ZSBfaG90c3BvdFNlbGVjdGlvbkNvbG9yOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIEhpZ2hsaWdodHMgYWxsIGhvdHNwb3RzIGluIDJEIGNvbnRlbnQgdGhhdCBhcmUgaW5jbHVkZWQgaW4gdGhlIGluY2x1ZGVkUHJvZHVjdENvZGVzIHByb3BlcnR5IHVzaW5nIHRoZSBjb2xvdXIgc3BlY2lmaWVkIGJ5IHRoZSBzaG93QWxsSG90c3BvdHNDb2xvciBwcm9wZXJ0eS5cbiAgICovXG4gIHB1YmxpYyBzZXQgc2hvd0FsbEhvdHNwb3RzRW5hYmxlZChzaG93QWxsSG90c3BvdHNFbmFibGVkOiBib29sZWFuKSB7XG4gICAgaWYgKCF0aGlzLndpbmRvd1JlZi5pc0Jyb3dzZXIoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5fc2hvd0FsbEhvdHNwb3RzRW5hYmxlZCA9PT0gc2hvd0FsbEhvdHNwb3RzRW5hYmxlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9zaG93QWxsSG90c3BvdHNFbmFibGVkID0gc2hvd0FsbEhvdHNwb3RzRW5hYmxlZDtcbiAgICB0aGlzLmV4ZWN1dGVXaGVuU2NlbmVMb2FkZWQoKCkgPT4ge1xuICAgICAgdGhpcy5hcHBseUluY2x1c2lvblN0eWxlKHRoaXMuX2luY2x1ZGVkUHJvZHVjdENvZGVzKTtcbiAgICB9KTtcbiAgfVxuICBwdWJsaWMgZ2V0IHNob3dBbGxIb3RzcG90c0VuYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3Nob3dBbGxIb3RzcG90c0VuYWJsZWQ7XG4gIH1cbiAgcHJpdmF0ZSBfc2hvd0FsbEhvdHNwb3RzRW5hYmxlZDogYm9vbGVhbjtcblxuICAvKipcbiAgICogVGhlIGNvbG91ciB1c2VkIHRvIGhpZ2hsaWdodCBob3RzcG90cyBpbiAyRCBjb250ZW50IHdoZW4gdGhlIHNob3dBbGxIb3RzcG90c0VuYWJsZWQgcHJvcGVydHkgaGFzIGEgdmFsdWUgb2YgdHJ1ZS5cbiAgICogQ2FuIGJlIHBhc3NlZCBpbiB0aGUgQ1NTIGNvbG9yIGZvcm1hdCBvciBhcyBhIFNwYXJ0YWN1cyB0aGVtZSBjb2xvciBpLmUuICctLWN4LWNvbG9yLXByaW1hcnknIHdpdGggdGhlIHF1b3Rlcy5cbiAgICovXG4gIHB1YmxpYyBzZXQgc2hvd0FsbEhvdHNwb3RzQ29sb3Ioc2hvd0FsbEhvdHNwb3RzQ29sb3I6IHN0cmluZykge1xuICAgIGlmICghdGhpcy53aW5kb3dSZWYuaXNCcm93c2VyKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMuX3Nob3dBbGxIb3RzcG90c0NvbG9yID09PSBzaG93QWxsSG90c3BvdHNDb2xvcikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9zaG93QWxsSG90c3BvdHNDb2xvciA9IHNob3dBbGxIb3RzcG90c0NvbG9yO1xuICAgIHRoaXMuZXhlY3V0ZVdoZW5TY2VuZUxvYWRlZCgoKSA9PiB7XG4gICAgICBjb25zdCBjc3NDb2xvciA9IHRoaXMuZ2V0Q1NTQ29sb3Ioc2hvd0FsbEhvdHNwb3RzQ29sb3IpO1xuICAgICAgdGhpcy52aWV3cG9ydC5zZXRTaG93QWxsSG90c3BvdHNUaW50Q29sb3IoY3NzQ29sb3IpO1xuICAgIH0pO1xuICB9XG4gIHB1YmxpYyBnZXQgc2hvd0FsbEhvdHNwb3RzQ29sb3IoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fc2hvd0FsbEhvdHNwb3RzQ29sb3I7XG4gIH1cbiAgcHJpdmF0ZSBfc2hvd0FsbEhvdHNwb3RzQ29sb3I6IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIG91dGxpbmUgY29sb3VyIHVzZWQgdG8gaW5kaWNhdGUgc2VsZWN0ZWQgb2JqZWN0cyBpbiAzRCBjb250ZW50LlxuICAgKiBDYW4gYmUgcGFzc2VkIGluIHRoZSBDU1MgY29sb3IgZm9ybWF0IG9yIGFzIGEgU3BhcnRhY3VzIHRoZW1lIGNvbG9yIGkuZS4gJy0tY3gtY29sb3ItcHJpbWFyeScgd2l0aCB0aGUgcXVvdGVzLlxuICAgKi9cbiAgcHVibGljIHNldCBvdXRsaW5lQ29sb3Iob3V0bGluZUNvbG9yOiBzdHJpbmcpIHtcbiAgICBpZiAoIXRoaXMud2luZG93UmVmLmlzQnJvd3NlcigpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLl9vdXRsaW5lQ29sb3IgPT09IG91dGxpbmVDb2xvcikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9vdXRsaW5lQ29sb3IgPSBvdXRsaW5lQ29sb3I7XG4gICAgdGhpcy5leGVjdXRlV2hlblNjZW5lTG9hZGVkKCgpID0+IHtcbiAgICAgIHRoaXMudmlld1N0YXRlTWFuYWdlci5zZXRPdXRsaW5lQ29sb3IodGhpcy5nZXRDU1NDb2xvcihvdXRsaW5lQ29sb3IpKTtcbiAgICB9KTtcbiAgfVxuICBwdWJsaWMgZ2V0IG91dGxpbmVDb2xvcigpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9vdXRsaW5lQ29sb3I7XG4gIH1cbiAgcHJpdmF0ZSBfb3V0bGluZUNvbG9yOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSB3aWR0aCBvZiB0aGUgb3V0bGluZSB1c2VkIHRvIGluZGljYXRlIHNlbGVjdGVkIG9iamVjdHMgaW4gM0QgY29udGVudC5cbiAgICovXG4gIHB1YmxpYyBzZXQgb3V0bGluZVdpZHRoKG91dGxpbmVXaWR0aDogbnVtYmVyKSB7XG4gICAgaWYgKCF0aGlzLndpbmRvd1JlZi5pc0Jyb3dzZXIoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5fb3V0bGluZVdpZHRoID09PSBvdXRsaW5lV2lkdGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fb3V0bGluZVdpZHRoID0gb3V0bGluZVdpZHRoO1xuICAgIHRoaXMuZXhlY3V0ZVdoZW5TY2VuZUxvYWRlZCgoKSA9PiB7XG4gICAgICB0aGlzLnZpZXdTdGF0ZU1hbmFnZXIuc2V0T3V0bGluZVdpZHRoKG91dGxpbmVXaWR0aCk7XG4gICAgfSk7XG4gIH1cbiAgcHVibGljIGdldCBvdXRsaW5lV2lkdGgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fb3V0bGluZVdpZHRoO1xuICB9XG4gIHByaXZhdGUgX291dGxpbmVXaWR0aDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUaGUgc2VsZWN0aW9uIG1vZGUuXG4gICAqIE5vbmUgLSBTZWxlY3Rpb24gaXMgZGlzYWJsZWQuXG4gICAqIEV4Y2x1c2l2ZSAtIFdoZW4gc2VsZWN0aW5nIG9iamVjdHMgaW4gdGhlIHZpZXdwb3J0LCBhdCBtb3N0IG9uZSBvYmplY3QgY2FuIGJlIHNlbGVjdGVkIGF0IGEgdGltZS4gQ2xpY2tpbmcvdGFwcGluZyB0byBzZWxlY3QgYSBuZXcgb2JqZWN0IHdpbGwgZGVzZWxlY3QgYW55IHByZXZpb3VzbHkgc2VsZWN0ZWQgb2JqZWN0cy5cbiAgICogU3RpY2t5IC0gQSBtdWx0aXBsZSBzZWxlY3Rpb24gbW9kZSBpbiB3aGljaCBjbGlja2luZy90YXBwaW5nIG9uIGFuIG9iamVjdCB0aGF0IGlzIG5vdCBwYXJ0IG9mIHRoZSBjdXJyZW50IHNlbGVjdGlvbiB3aWxsIHRvZ2dsZSBpdHMgc2VsZWN0aW9uIHN0YXRlIHdpdGhvdXQgbW9kaWZ5aW5nIHRoZSBzZWxlY3Rpb24gc3RhdGUgb2YgdGhlIGN1cnJlbnRseSBzZWxlY3RlZCBvYmplY3RzLlxuICAgKi9cbiAgcHVibGljIHNldCBzZWxlY3Rpb25Nb2RlKHNlbGVjdGlvbk1vZGU6IFNlbGVjdGlvbk1vZGUpIHtcbiAgICBpZiAoIXRoaXMud2luZG93UmVmLmlzQnJvd3NlcigpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLl9zZWxlY3Rpb25Nb2RlID09PSBzZWxlY3Rpb25Nb2RlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX3NlbGVjdGlvbk1vZGUgPSBzZWxlY3Rpb25Nb2RlO1xuICAgIHRoaXMuZXhlY3V0ZVdoZW5TY2VuZUxvYWRlZCgoKSA9PiB7XG4gICAgICB0aGlzLnZpZXdwb3J0LnNldFNlbGVjdGlvbk1vZGUoc2VsZWN0aW9uTW9kZSk7XG4gICAgfSk7XG4gIH1cbiAgcHVibGljIGdldCBzZWxlY3Rpb25Nb2RlKCk6IFNlbGVjdGlvbk1vZGUge1xuICAgIHJldHVybiB0aGlzLl9zZWxlY3Rpb25Nb2RlO1xuICB9XG4gIHByaXZhdGUgX3NlbGVjdGlvbk1vZGU6IFNlbGVjdGlvbk1vZGU7XG5cbiAgLyoqXG4gICAqIEdldHMvc2V0cyB0aGUgc2VsZWN0aW9uIGluIHRlcm1zIG9mIHByb2R1Y3QgY29kZXMuXG4gICAqIEdldHMgdGhlIHNldCBvZiBwcm9kdWN0IGNvZGVzIGFwcGxpZWQgdG8gdGhlIHNlbGVjdGVkIHNjZW5lIG5vZGVzLlxuICAgKiBTZXRzIHRoZSBzZWxlY3Rpb24gc2V0IGJhc2VkIG9uIHRoZSBzZXQgb2Ygc3VwcGxpZWQgcHJvZHVjdCBjb2Rlcy5cbiAgICovXG4gIHB1YmxpYyBzZXQgc2VsZWN0ZWRQcm9kdWN0Q29kZXMoc2VsZWN0ZWRQcm9kdWN0Q29kZXM6IHN0cmluZ1tdKSB7XG4gICAgaWYgKCF0aGlzLndpbmRvd1JlZi5pc0Jyb3dzZXIoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9zZWxlY3RlZFByb2R1Y3RDb2RlcyA9IHNlbGVjdGVkUHJvZHVjdENvZGVzO1xuICAgIHRoaXMuc2NlbmVOb2RlVG9Qcm9kdWN0TG9va3VwU2VydmljZVxuICAgICAgLmxvb2t1cE5vZGVJZHMoc2VsZWN0ZWRQcm9kdWN0Q29kZXMpXG4gICAgICAucGlwZShmaXJzdCgpKVxuICAgICAgLnN1YnNjcmliZSgoc2VsZWN0ZWROb2RlSWRzOiBzdHJpbmdbXSkgPT4ge1xuICAgICAgICB0aGlzLnNlbGVjdGVkTm9kZUlkcyQubmV4dChzZWxlY3RlZE5vZGVJZHMpO1xuICAgICAgfSk7XG4gIH1cbiAgcHVibGljIGdldCBzZWxlY3RlZFByb2R1Y3RDb2RlcygpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkUHJvZHVjdENvZGVzO1xuICB9XG4gIHByaXZhdGUgX3NlbGVjdGVkUHJvZHVjdENvZGVzOiBzdHJpbmdbXTtcbiAgc2VsZWN0ZWRQcm9kdWN0Q29kZXNDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZ1tdPigpO1xuXG4gIC8qKlxuICAgKiBHZXRzL3NldHMgd2hpY2ggb2JqZWN0cyBzaG91bGQgYmUgc2VsZWN0YWJsZSAoaW4gdGVybXMgb2YgcHJvZHVjdCBjb2RlcykuXG4gICAqIEZvciAzRCBjb250ZW50OlxuICAgKiAtIG9iamVjdHMgdGhhdCBhcmUgaW5jbHVkZWQgd2lsbCBiZSBzZWxlY3RhYmxlIGFuZCBvcGFxdWVcbiAgICogLSBvYmplY3RzIHRoYXQgYXJlIG5vdCBpbmNsdWRlZCB3aWxsIG5vdCBiZSBzZWxlY3RhYmxlIGFuZCB3aWxsIGhhdmUgYW4gb3BhY2l0eSBzcGVjaWZpZWQgYnkgdGhlIGV4Y2x1ZGVkT3BhY2l0eSBwcm9wZXJ0eS5cbiAgICpcbiAgICogRm9yIDJEIGNvbnRlbnQ6XG4gICAqIC0gaG90c3BvdHMgdGhhdCBhcmUgaW5jbHVkZWQgd2lsbCBiZSBzZWxlY3RhYmxlIGFuZCBjYW4gYmUgbWFkZSB2aXNpYmxlXG4gICAqIC0gaG90c3BvdHMgdGhhdCBhcmUgbm90IGluY2x1ZGVkIHdpbGwgbm90IGJlIHNlbGVjdGFibGUgb3IgdmlzaWJsZVxuICAgKi9cbiAgcHVibGljIHNldCBpbmNsdWRlZFByb2R1Y3RDb2RlcyhpbmNsdWRlZFByb2R1Y3RDb2Rlczogc3RyaW5nW10pIHtcbiAgICBpZiAoIXRoaXMud2luZG93UmVmLmlzQnJvd3NlcigpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX2luY2x1ZGVkUHJvZHVjdENvZGVzID0gaW5jbHVkZWRQcm9kdWN0Q29kZXM7XG4gICAgdGhpcy5leGVjdXRlV2hlblNjZW5lTG9hZGVkKCgpID0+IHtcbiAgICAgIHRoaXMuYXBwbHlJbmNsdXNpb25TdHlsZShpbmNsdWRlZFByb2R1Y3RDb2Rlcyk7XG4gICAgfSk7XG4gIH1cbiAgcHVibGljIGdldCBpbmNsdWRlZFByb2R1Y3RDb2RlcygpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIHRoaXMuX2luY2x1ZGVkUHJvZHVjdENvZGVzO1xuICB9XG4gIHByaXZhdGUgX2luY2x1ZGVkUHJvZHVjdENvZGVzOiBzdHJpbmdbXTtcblxuICAvKipcbiAgICogR2V0cy9zZXRzIHRoZSBvcGFjaXR5IHRvIGFwcGx5IHRvIDNEIG9iamVjdHMgdGhhdCBhcmUgbm90IGluIHRoZSBzZXQgc3BlY2lmaWVkIGJ5IHRoZSBpbmNsdWRlZFByb2R1Y3RDb2RlcyBwcm9wZXJ0eS5cbiAgICovXG4gIHB1YmxpYyBzZXQgZXhjbHVkZWRPcGFjaXR5KGV4Y2x1ZGVkT3BhY2l0eTogbnVtYmVyKSB7XG4gICAgaWYgKCF0aGlzLndpbmRvd1JlZi5pc0Jyb3dzZXIoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9leGNsdWRlZE9wYWNpdHkgPSBleGNsdWRlZE9wYWNpdHk7XG4gIH1cbiAgcHVibGljIGdldCBleGNsdWRlZE9wYWNpdHkoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fZXhjbHVkZWRPcGFjaXR5O1xuICB9XG4gIHByaXZhdGUgX2V4Y2x1ZGVkT3BhY2l0eTogbnVtYmVyID0gdGhpcy5ERUZBVUxUX0VYQ0xVREVEX09QQUNJVFk7XG5cbiAgLyoqXG4gICAqIFRoZSBjdXJyZW50IHRpbWUgcG9zaXRpb24gaW4gc2Vjb25kcyBpbiB0aGUgYW5pbWF0aW9uIChpZiB0aGVyZSBpcyBvbmUpLlxuICAgKi9cbiAgcHVibGljIHNldCBhbmltYXRpb25UaW1lKGFuaW1hdGlvblRpbWU6IG51bWJlcikge1xuICAgIGlmICghdGhpcy53aW5kb3dSZWYuaXNCcm93c2VyKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fYW5pbWF0aW9uVGltZSA9IGFuaW1hdGlvblRpbWU7XG4gIH1cbiAgcHVibGljIGdldCBhbmltYXRpb25UaW1lKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2FuaW1hdGlvblRpbWU7XG4gIH1cbiAgcHJpdmF0ZSBfYW5pbWF0aW9uVGltZTogbnVtYmVyO1xuICBhbmltYXRpb25UaW1lQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG5cbiAgLyoqXG4gICAqIFRoZSB0b3RhbCBkdXJhdGlvbiBvZiB0aGUgYW5pbWF0aW9uIGluIHNlY29uZHMuXG4gICAqIFJldHVybnMgMCB3aGVuIHRoZXJlIGlzIG5vIGFuaW1hdGlvbiBwcmVzZW50IChvciB3aGVuIGEgc2NlbmUgaGFzIG5vdCBiZWVuIGxvYWRlZCkuXG4gICAqL1xuICBwdWJsaWMgZ2V0IGFuaW1hdGlvblRvdGFsRHVyYXRpb24oKTogbnVtYmVyIHtcbiAgICBpZiAodGhpcy5hbmltYXRpb25QbGF5ZXIpIHtcbiAgICAgIHJldHVybiB0aGlzLmFuaW1hdGlvblBsYXllci5nZXRUb3RhbER1cmF0aW9uKCk7XG4gICAgfVxuICAgIHJldHVybiAwO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBhbmltYXRpb24gcGxheWJhY2sgcG9zaXRpb24gYXMgYSBmcmFjdGlvbmFsIHZhbHVlIGJldHdlZW4gMCAoc3RhcnQpIGFuZCAxIChlbmQpLlxuICAgKi9cbiAgcHVibGljIHNldCBhbmltYXRpb25Qb3NpdGlvbihwb3NpdGlvbjogbnVtYmVyKSB7XG4gICAgaWYgKCF0aGlzLndpbmRvd1JlZi5pc0Jyb3dzZXIoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5fYW5pbWF0aW9uUG9zaXRpb24gPT09IHBvc2l0aW9uKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX2FuaW1hdGlvblBvc2l0aW9uID0gcG9zaXRpb247XG4gICAgdGhpcy5leGVjdXRlV2hlblNjZW5lTG9hZGVkKCgpID0+IHtcbiAgICAgIGNvbnN0IHRpbWUgPSBwb3NpdGlvbiAqIHRoaXMuYW5pbWF0aW9uUGxheWVyLmdldFRvdGFsRHVyYXRpb24oKTtcbiAgICAgIHRoaXMuYW5pbWF0aW9uUGxheWVyU2V0VGltZSh0aW1lLCBmYWxzZSk7XG4gICAgfSk7XG4gIH1cbiAgcHVibGljIGdldCBhbmltYXRpb25Qb3NpdGlvbigpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9hbmltYXRpb25Qb3NpdGlvbjtcbiAgfVxuICBwcml2YXRlIF9hbmltYXRpb25Qb3NpdGlvbjogbnVtYmVyID0gMDtcbiAgYW5pbWF0aW9uUG9zaXRpb25DaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcblxuICAvKipcbiAgICogR2V0cy9zZXRzIHdoZXRoZXIgdGhlIGFuaW1hdGlvbiAoaWYgdGhlcmUgaXMgb25lKSBpcyBjdXJyZW50bHkgcGxheWluZy5cbiAgICovXG4gIHB1YmxpYyBzZXQgYW5pbWF0aW9uUGxheWluZyhhbmltYXRpb25QbGF5aW5nOiBib29sZWFuKSB7XG4gICAgaWYgKCF0aGlzLndpbmRvd1JlZi5pc0Jyb3dzZXIoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5fYW5pbWF0aW9uUGxheWluZyA9PT0gYW5pbWF0aW9uUGxheWluZykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9hbmltYXRpb25QbGF5aW5nID0gYW5pbWF0aW9uUGxheWluZztcbiAgICB0aGlzLmV4ZWN1dGVXaGVuU2NlbmVMb2FkZWQoKCkgPT4ge1xuICAgICAgaWYgKGFuaW1hdGlvblBsYXlpbmcpIHtcbiAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uUG9zaXRpb24gPj0gMSkge1xuICAgICAgICAgIHRoaXMuYW5pbWF0aW9uUGxheWVyU2V0VGltZSgwLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5hbmltYXRpb25QbGF5ZXIucGxheSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5hbmltYXRpb25QbGF5ZXIuc3RvcCgpO1xuICAgICAgfVxuICAgICAgdGhpcy5hbmltYXRpb25QbGF5aW5nQ2hhbmdlLmVtaXQoYW5pbWF0aW9uUGxheWluZyk7XG4gICAgfSk7XG4gIH1cbiAgcHVibGljIGdldCBhbmltYXRpb25QbGF5aW5nKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9hbmltYXRpb25QbGF5aW5nO1xuICB9XG4gIHByaXZhdGUgX2FuaW1hdGlvblBsYXlpbmc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgYW5pbWF0aW9uUGxheWluZ0NoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuICAvKipcbiAgICogQ29udHJvbHMgdGhlIGJlaGF2aW91ciB3aGVuIGEgbGVmdCBtb3VzZSBidXR0b24gZHJhZyBpcyBpbml0aWF0ZWQgaW4gdGhlIHZpZXdwb3J0LlxuICAgKiBUdXJudGFibGU6IEEgbGVmdCBtb3VzZSBkcmFnIHBlcmZvcm1zIGEgdHVybnRhYmxlIG1vZGUgcm90YXRpb24uXG4gICAqIFBhbjogQSBsZWZ0IG1vdXNlIGRyYWcgcGFucyB0aGUgY2FtZXJhIGluIHRoZSB2aWV3cG9ydC5cbiAgICogWm9vbTogQSBsZWZ0IG1vdXNlIGRyYWcgem9vbXMgdGhlIGNhbWVyYSBpbiB0aGUgdmlld3BvcnQgaW4gb3Igb3V0XG4gICAqL1xuICBwdWJsaWMgc2V0IG5hdmlnYXRpb25Nb2RlKG5hdmlnYXRpb25Nb2RlOiBOYXZpZ2F0aW9uTW9kZSkge1xuICAgIGlmICghdGhpcy53aW5kb3dSZWYuaXNCcm93c2VyKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMuX25hdmlnYXRpb25Nb2RlID09PSBuYXZpZ2F0aW9uTW9kZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX25hdmlnYXRpb25Nb2RlID0gbmF2aWdhdGlvbk1vZGU7XG4gICAgdGhpcy5leGVjdXRlV2hlblNjZW5lTG9hZGVkKCgpID0+IHtcbiAgICAgIGlmICh0aGlzLmRyYXdlclRvb2xiYXIgJiYgdGhpcy52aWV3cG9ydCkge1xuICAgICAgICAvLyBzYXAudWkudmsgbGlicmFyeSB3aWxsIGhhdmUgYSBwdWJsaWMgQVBJIHRvIHNldCB0aGUgbmF2aWdhdGlvbiBtb2RlIGluIGEgZnV0dXJlIFVJNSB2ZXJzaW9uXG4gICAgICAgICh0aGlzLmRyYXdlclRvb2xiYXIgYXMgYW55KS5fYWN0aXZhdGVHZXN0dXJlKFxuICAgICAgICAgICh0aGlzLnZpZXdwb3J0IGFzIGFueSkuZ2V0SW1wbGVtZW50YXRpb24oKSxcbiAgICAgICAgICBuYXZpZ2F0aW9uTW9kZVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIHB1YmxpYyBnZXQgbmF2aWdhdGlvbk1vZGUoKTogTmF2aWdhdGlvbk1vZGUge1xuICAgIHJldHVybiB0aGlzLl9uYXZpZ2F0aW9uTW9kZTtcbiAgfVxuICBwcml2YXRlIF9uYXZpZ2F0aW9uTW9kZTogTmF2aWdhdGlvbk1vZGU7XG5cbiAgLyoqXG4gICAqIElzb2xhdGUgbW9kZSBhbGxvd3MgYSBzaW5nbGUgb2JqZWN0IHRvIGJlIHZpZXdlZCBpbiBpc29sYXRpb24uXG4gICAqL1xuICBwdWJsaWMgc2V0IGlzb2xhdGVNb2RlRW5hYmxlZChpc29sYXRlTW9kZUVuYWJsZWQ6IGJvb2xlYW4pIHtcbiAgICBpZiAoIXRoaXMud2luZG93UmVmLmlzQnJvd3NlcigpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLl9pc29sYXRlTW9kZUVuYWJsZWQgPT09IGlzb2xhdGVNb2RlRW5hYmxlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuZXhlY3V0ZVdoZW5TY2VuZUxvYWRlZCgoKSA9PiB7XG4gICAgICB0aGlzLl9pc29sYXRlTW9kZUVuYWJsZWQgPSBpc29sYXRlTW9kZUVuYWJsZWQ7XG4gICAgICBpZiAoaXNvbGF0ZU1vZGVFbmFibGVkKSB7XG4gICAgICAgIHRoaXMudmlld1ByaW9yVG9Jc29sYXRlVmlld0luZm8gPSB0aGlzLnZpZXdwb3J0LmdldFZpZXdJbmZvKHtcbiAgICAgICAgICBjYW1lcmE6IHRydWUsXG4gICAgICAgICAgdmlzaWJpbGl0eTogdHJ1ZSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3Qgc2VsZWN0ZWROb2RlUmVmczogTm9kZVJlZltdID0gW107XG4gICAgICAgIGlmICh0aGlzLmlzMkQpIHtcbiAgICAgICAgICB0aGlzLnZpZXdTdGF0ZU1hbmFnZXIuZW51bWVyYXRlU2VsZWN0aW9uKChub2RlUmVmOiBOb2RlUmVmKSA9PlxuICAgICAgICAgICAgc2VsZWN0ZWROb2RlUmVmcy5wdXNoKG5vZGVSZWYpXG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnZpZXdTdGF0ZU1hbmFnZXIuZW51bWVyYXRlT3V0bGluZWROb2Rlcygobm9kZVJlZjogTm9kZVJlZikgPT5cbiAgICAgICAgICAgIHNlbGVjdGVkTm9kZVJlZnMucHVzaChub2RlUmVmKVxuICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmlzb2xhdGVOb2RlcyhzZWxlY3RlZE5vZGVSZWZzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMudmlld3BvcnQuc2V0Vmlld0luZm8oXG4gICAgICAgICAgdGhpcy52aWV3UHJpb3JUb0lzb2xhdGVWaWV3SW5mbyxcbiAgICAgICAgICB0aGlzLmZseVRvRHVyYXRpb25JblNlY29uZHNcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5pc29sYXRlTW9kZUVuYWJsZWRDaGFuZ2UuZW1pdCh0aGlzLmlzb2xhdGVNb2RlRW5hYmxlZCk7XG4gICAgfSk7XG4gIH1cbiAgcHVibGljIGdldCBpc29sYXRlTW9kZUVuYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2lzb2xhdGVNb2RlRW5hYmxlZDtcbiAgfVxuICBwcml2YXRlIF9pc29sYXRlTW9kZUVuYWJsZWQgPSBmYWxzZTtcbiAgaXNvbGF0ZU1vZGVFbmFibGVkQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gIC8qKlxuICAgKiBHZXRzIHdoZXRoZXIgdGhlIHZpZXdwb3J0IGlzIGRpc3BsYXlpbmcgMkQgY29udGVudC5cbiAgICovXG4gIHB1YmxpYyBnZXQgaXMyRCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5faXMyRDtcbiAgfVxuICBwcml2YXRlIHNldElzMkQoaXMyRDogYm9vbGVhbikge1xuICAgIHRoaXMuX2lzMkQgPSBpczJEO1xuICB9XG4gIHByaXZhdGUgX2lzMkQ6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEluZGljYXRlcyB0aGF0IGEgc2NlbmUgaGFzIGJlZW4gbG9hZGVkIGFuZCB0aGUgdmlld3BvcnQgaXMgcmVhZHkgZm9yIGludGVyYWN0aW9uLlxuICAgKi9cbiAgcHVibGljIGdldCB2aWV3cG9ydFJlYWR5KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl92aWV3cG9ydFJlYWR5O1xuICB9XG4gIHByaXZhdGUgc2V0Vmlld3BvcnRSZWFkeSh2aWV3cG9ydFJlYWR5OiBib29sZWFuKSB7XG4gICAgaWYgKHRoaXMuX3ZpZXdwb3J0UmVhZHkgPT09IHZpZXdwb3J0UmVhZHkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fdmlld3BvcnRSZWFkeSA9IHZpZXdwb3J0UmVhZHk7XG4gICAgdGhpcy52aWV3cG9ydFJlYWR5Q2hhbmdlLmVtaXQodmlld3BvcnRSZWFkeSk7XG4gIH1cbiAgcHJpdmF0ZSBfdmlld3BvcnRSZWFkeSA9IGZhbHNlO1xuICB2aWV3cG9ydFJlYWR5Q2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSB1c2VyIHRvIHRoZSBpbml0aWFsIGNhbWVyYSBwb3NpdGlvbiB1c2VkIHdoZW4gYSBzY2VuZSB3YXMgZmlyc3QgbG9hZGVkLlxuICAgKi9cbiAgcHVibGljIGFjdGl2YXRlSG9tZVZpZXcoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLndpbmRvd1JlZi5pc0Jyb3dzZXIoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5pczJEKSB7XG4gICAgICB0aGlzLnZpZXdwb3J0Lnpvb21UbyhcbiAgICAgICAgWm9vbVRvLkFsbCxcbiAgICAgICAgbnVsbCxcbiAgICAgICAgdGhpcy5mbHlUb0R1cmF0aW9uSW5TZWNvbmRzLFxuICAgICAgICB0aGlzLnpvb21Ub01hcmdpblxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy52aWV3cG9ydC5zZXRWaWV3SW5mbyhcbiAgICAgICAgdGhpcy5pbml0aWFsVmlld0luZm8sXG4gICAgICAgIHRoaXMuZmx5VG9EdXJhdGlvbkluU2Vjb25kc1xuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5pc29sYXRlTW9kZUVuYWJsZWQpIHtcbiAgICAgIC8vIEV4aXQgb3V0IG9mIHRoZSBpc29sYXRlIG1vZGUgYnV0IGRvbid0IHJlc3RvcmUgdGhlIHZpZXcgdGhhdCB3YXNcbiAgICAgIC8vIHNhdmVkIGJlZm9yZSBlbnRlcmluZyBpc29sYXRlIG1vZGVcbiAgICAgIHRoaXMuX2lzb2xhdGVNb2RlRW5hYmxlZCA9IGZhbHNlO1xuICAgICAgdGhpcy5pc29sYXRlTW9kZUVuYWJsZWRDaGFuZ2UuZW1pdChmYWxzZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFBsYXlzIHRoZSBhbmltYXRpb24gKGlmIG9uZSBleGlzdHMpLlxuICAgKi9cbiAgcHVibGljIHBsYXlBbmltYXRpb24oKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLndpbmRvd1JlZi5pc0Jyb3dzZXIoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmFuaW1hdGlvblBsYXlpbmcgPSB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIFBhdXNlcyBhbmltYXRpb24gcGxheWJhY2suXG4gICAqL1xuICBwdWJsaWMgcGF1c2VBbmltYXRpb24oKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLndpbmRvd1JlZi5pc0Jyb3dzZXIoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmFuaW1hdGlvblBsYXlpbmcgPSBmYWxzZTtcbiAgfVxuXG4gIHByaXZhdGUgY29udGVudENoYW5nZXNGaW5pc2hlZCA9XG4gICAgbmV3IEV2ZW50RW1pdHRlcjxWaXN1YWxDb250ZW50Q2hhbmdlc0ZpbmlzaGVkRXZlbnQ+KCk7XG5cbiAgcHJpdmF0ZSBjb250ZW50TG9hZEZpbmlzaGVkID1cbiAgICBuZXcgRXZlbnRFbWl0dGVyPFZpc3VhbENvbnRlbnRMb2FkRmluaXNoZWRFdmVudD4oKTtcblxuICBwcml2YXRlIHNldEluaXRpYWxQcm9wZXJ0eVZhbHVlcygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5iYWNrZ3JvdW5kVG9wQ29sb3IgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5iYWNrZ3JvdW5kVG9wQ29sb3IgPSB0aGlzLkRFRkFVTFRfQkFDS0dST1VORF9UT1BfQ09MT1I7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuYmFja2dyb3VuZEJvdHRvbUNvbG9yID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuYmFja2dyb3VuZEJvdHRvbUNvbG9yID0gdGhpcy5ERUZBVUxUX0JBQ0tHUk9VTkRfQk9UVE9NX0NPTE9SO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmhvdHNwb3RTZWxlY3Rpb25Db2xvciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLmhvdHNwb3RTZWxlY3Rpb25Db2xvciA9XG4gICAgICAgIHRoaXMuREVGQVVMVF9IT1RTUE9UX1NFTEVDVElPTl9ISUdITElHSFRfQ09MT1I7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuc2hvd0FsbEhvdHNwb3RzQ29sb3IgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5zaG93QWxsSG90c3BvdHNDb2xvciA9IHRoaXMuREVGQVVMVF9TSE9XX0FMTF9IT1RTUE9UU19DT0xPUjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vdXRsaW5lQ29sb3IgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5vdXRsaW5lQ29sb3IgPSB0aGlzLkRFRkFVTFRfT1VUTElORV9DT0xPUjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vdXRsaW5lV2lkdGggPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5vdXRsaW5lV2lkdGggPSB0aGlzLkRFRkFVTFRfT1VUTElORV9XSURUSDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5zZWxlY3Rpb25Nb2RlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuc2VsZWN0aW9uTW9kZSA9IHRoaXMuREVGQVVMVF9TRUxFQ1RJT05fTU9ERTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5zaG93QWxsSG90c3BvdHNFbmFibGVkID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuc2hvd0FsbEhvdHNwb3RzRW5hYmxlZCA9IHRoaXMuREVGQVVMVF9TSE9XX0FMTF9IT1RTUE9UU19FTkFCTEVEO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmlzMkQpIHtcbiAgICAgIGlmIChcbiAgICAgICAgdGhpcy5uYXZpZ2F0aW9uTW9kZSA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgIHRoaXMubmF2aWdhdGlvbk1vZGUgPT09IE5hdmlnYXRpb25Nb2RlLlR1cm50YWJsZVxuICAgICAgKSB7XG4gICAgICAgIHRoaXMubmF2aWdhdGlvbk1vZGUgPSBOYXZpZ2F0aW9uTW9kZS5QYW47XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0aGlzLm5hdmlnYXRpb25Nb2RlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMubmF2aWdhdGlvbk1vZGUgPSBOYXZpZ2F0aW9uTW9kZS5UdXJudGFibGU7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuc2VsZWN0ZWRQcm9kdWN0Q29kZXMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5zZWxlY3RlZFByb2R1Y3RDb2RlcyA9IHRoaXMuc2VsZWN0ZWROb2RlSWRzJC5nZXRWYWx1ZSgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZXhlY3V0ZVdoZW5TY2VuZUxvYWRlZChcbiAgICBjYWxsYmFjazogKGxvYWRlZFNjZW5lSW5mbzogTG9hZGVkU2NlbmVJbmZvKSA9PiB2b2lkXG4gICk6IHZvaWQge1xuICAgIHRoaXMuc2NlbmVMb2FkSW5mbyRcbiAgICAgIC5waXBlKFxuICAgICAgICBmaWx0ZXIoXG4gICAgICAgICAgKHNjZW5lTG9hZEluZm86IHsgc2NlbmVMb2FkU3RhdGU6IFNjZW5lTG9hZFN0YXRlIH0pID0+XG4gICAgICAgICAgICBzY2VuZUxvYWRJbmZvLnNjZW5lTG9hZFN0YXRlID09PSBTY2VuZUxvYWRTdGF0ZS5Mb2FkZWQgfHxcbiAgICAgICAgICAgIHNjZW5lTG9hZEluZm8uc2NlbmVMb2FkU3RhdGUgPT09IFNjZW5lTG9hZFN0YXRlLkZhaWxlZFxuICAgICAgICApLFxuICAgICAgICBmaXJzdCgpXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKChzY2VuZUxvYWRJbmZvOiBTY2VuZUxvYWRJbmZvKSA9PiB7XG4gICAgICAgIGlmIChzY2VuZUxvYWRJbmZvLnNjZW5lTG9hZFN0YXRlID09PSBTY2VuZUxvYWRTdGF0ZS5Mb2FkZWQpIHtcbiAgICAgICAgICBjYWxsYmFjayhzY2VuZUxvYWRJbmZvLmxvYWRlZFNjZW5lSW5mbyBhcyBMb2FkZWRTY2VuZUluZm8pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgYXBwbHlJbmNsdXNpb25TdHlsZShwcm9kdWN0Q29kZXM6IHN0cmluZ1tdKTogdm9pZCB7XG4gICAgaWYgKHByb2R1Y3RDb2RlcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5zY2VuZU5vZGVUb1Byb2R1Y3RMb29rdXBTZXJ2aWNlXG4gICAgICAubG9va3VwTm9kZUlkcyhwcm9kdWN0Q29kZXMpXG4gICAgICAucGlwZShmaXJzdCgpKVxuICAgICAgLnN1YnNjcmliZSgoc2NlbmVOb2RlSWRzOiBzdHJpbmdbXSkgPT4ge1xuICAgICAgICBpZiAodGhpcy5pczJEKSB7XG4gICAgICAgICAgdGhpcy5hcHBseUluY2x1c2lvblN0eWxlMkQoc2NlbmVOb2RlSWRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmFwcGx5SW5jbHVzaW9uU3R5bGUzRChzY2VuZU5vZGVJZHMpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgYXBwbHlJbmNsdXNpb25TdHlsZTJEKHNjZW5lTm9kZUlkczogc3RyaW5nW10pOiB2b2lkIHtcbiAgICBjb25zdCBub2RlUmVmc1RvSW5jbHVkZTogTm9kZVJlZltdID0gdGhpcy5wZXJzaXN0ZW50SWRUb05vZGVSZWYoXG4gICAgICBzY2VuZU5vZGVJZHMsXG4gICAgICB0cnVlXG4gICAgKTtcbiAgICBjb25zdCBob3RzcG90Tm9kZVJlZnM6IE5vZGVSZWZbXSA9IHRoaXMubm9kZUhpZXJhcmNoeS5nZXRIb3RzcG90Tm9kZUlkcygpO1xuICAgIGNvbnN0IGhvdHNwb3ROb2RlUmVmc1NldDogU2V0PE5vZGVSZWY+ID0gbmV3IFNldChob3RzcG90Tm9kZVJlZnMpO1xuICAgIC8vIEhvdHNwb3Qgbm9kZXMgY2FuIGhhdmUgZGVzY2VuZGFudHMgdGhhdCBhcmUgYWxzbyBIb3RzcG90IG5vZGVzLlxuICAgIC8vIElnbm9yZSB0aGUgZGVzY2VuZGFudCBub2RlcyBhbmQgYXBwbHkgbW9kaWZpY2F0aW9ucyBhdCB0aGUgaGlnaGVzdCBsZXZlbCBvbmx5LlxuICAgIGNvbnN0IHRvcExldmVsSG90c3BvdE5vZGVSZWZzOiBOb2RlUmVmW10gPSBob3RzcG90Tm9kZVJlZnMuZmlsdGVyKFxuICAgICAgKGhvdHNwb3ROb2RlUmVmOiBOb2RlUmVmKSA9PlxuICAgICAgICB0aGlzLmlzVG9wTGV2ZWxIb3RzcG90Tm9kZShob3RzcG90Tm9kZVJlZiwgaG90c3BvdE5vZGVSZWZzU2V0KVxuICAgICk7XG4gICAgaWYgKHRoaXMuX3Nob3dBbGxIb3RzcG90c0VuYWJsZWQpIHtcbiAgICAgIGNvbnN0IG5vZGVSZWZzVG9JbmNsdWRlU2V0ID0gbmV3IFNldChub2RlUmVmc1RvSW5jbHVkZSk7XG4gICAgICBjb25zdCBub2RlUmVmc1RvRXhjbHVkZTogTm9kZVJlZltdID0gdG9wTGV2ZWxIb3RzcG90Tm9kZVJlZnMuZmlsdGVyKFxuICAgICAgICAobm9kZVJlZjogTm9kZVJlZikgPT4gIW5vZGVSZWZzVG9JbmNsdWRlU2V0Lmhhcyhub2RlUmVmKVxuICAgICAgKTtcbiAgICAgIHRoaXMudmlld3BvcnQuc2hvd0hvdHNwb3RzKG5vZGVSZWZzVG9FeGNsdWRlLCBmYWxzZSwgMCk7XG4gICAgICB0aGlzLnZpZXdwb3J0LnNob3dIb3RzcG90cyhcbiAgICAgICAgbm9kZVJlZnNUb0luY2x1ZGUsXG4gICAgICAgIHRydWUsXG4gICAgICAgIHRoaXMuZ2V0Q1NTQ29sb3IodGhpcy5fc2hvd0FsbEhvdHNwb3RzQ29sb3IpXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnZpZXdwb3J0LnNob3dIb3RzcG90cyh0b3BMZXZlbEhvdHNwb3ROb2RlUmVmcywgZmFsc2UsIDApO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYXBwbHlJbmNsdXNpb25TdHlsZTNEKHNjZW5lTm9kZUlkczogc3RyaW5nW10pOiB2b2lkIHtcbiAgICBjb25zdCBub2RlUmVmc1RvSW5jbHVkZTogTm9kZVJlZltdID0gdGhpcy5wZXJzaXN0ZW50SWRUb05vZGVSZWYoXG4gICAgICBzY2VuZU5vZGVJZHMsXG4gICAgICB0cnVlXG4gICAgKTtcblxuICAgIGlmICghdGhpcy5sZWFmTm9kZVJlZnMpIHtcbiAgICAgIHRoaXMubGVhZk5vZGVSZWZzID0gdGhpcy5nZXRBbGxMZWFmTm9kZVJlZnMoKTtcbiAgICB9XG5cbiAgICBjb25zdCBsZWFmTm9kZVJlZnNUb0luY2x1ZGUgPSBub2RlUmVmc1RvSW5jbHVkZS5mbGF0TWFwKFxuICAgICAgKG5vZGVSZWY6IE5vZGVSZWYpID0+IHRoaXMuZ2V0TGVhZkRlc2NlbmRhbnRzKG5vZGVSZWYsIFtdKVxuICAgICk7XG4gICAgY29uc3QgbGVhZk5vZGVSZWZzVG9JbmNsdWRlU2V0ID0gbmV3IFNldChsZWFmTm9kZVJlZnNUb0luY2x1ZGUpO1xuICAgIGNvbnN0IGxlYWZOb2RlUmVmc1RvRXhjbHVkZSA9IHRoaXMubGVhZk5vZGVSZWZzLmZpbHRlcihcbiAgICAgIChsZWFmTm9kZVJlZjogTm9kZVJlZikgPT4gIWxlYWZOb2RlUmVmc1RvSW5jbHVkZVNldC5oYXMobGVhZk5vZGVSZWYpXG4gICAgKTtcblxuICAgIHRoaXMudmlld1N0YXRlTWFuYWdlci5zZXRPcGFjaXR5KFxuICAgICAgbGVhZk5vZGVSZWZzVG9FeGNsdWRlLFxuICAgICAgdGhpcy5leGNsdWRlZE9wYWNpdHlcbiAgICApO1xuICAgIGxlYWZOb2RlUmVmc1RvSW5jbHVkZS5mb3JFYWNoKChub2RlUmVmOiBOb2RlUmVmKSA9PlxuICAgICAgdGhpcy52aWV3U3RhdGVNYW5hZ2VyLnNldE9wYWNpdHkoXG4gICAgICAgIG5vZGVSZWYsXG4gICAgICAgIHRoaXMudmlld1N0YXRlTWFuYWdlci5nZXRSZXN0T3BhY2l0eShub2RlUmVmKVxuICAgICAgKVxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIGlzVG9wTGV2ZWxIb3RzcG90Tm9kZShcbiAgICBob3RzcG90Tm9kZVJlZjogTm9kZVJlZixcbiAgICBob3RzcG90Tm9kZVJlZnM6IFNldDxOb2RlUmVmPlxuICApOiBib29sZWFuIHtcbiAgICByZXR1cm4gIXRoaXMubm9kZUhpZXJhcmNoeVxuICAgICAgLmdldEFuY2VzdG9ycyhob3RzcG90Tm9kZVJlZilcbiAgICAgIC5zb21lKChhbmNlc3RvcjogTm9kZVJlZikgPT4gaG90c3BvdE5vZGVSZWZzLmhhcyhhbmNlc3RvcikpO1xuICB9XG5cbiAgcHJpdmF0ZSBpc1JlZmVyZW5jZU5vZGUobm9kZVJlZjogTm9kZVJlZik6IGJvb2xlYW4ge1xuICAgIHJldHVybiAoXG4gICAgICB0aGlzLm5vZGVIaWVyYXJjaHkuZ2V0Tm9kZUNvbnRlbnRUeXBlKG5vZGVSZWYpID09PVxuICAgICAgTm9kZUNvbnRlbnRUeXBlLlJlZmVyZW5jZVxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIGdldExlYWZEZXNjZW5kYW50cyhcbiAgICBub2RlUmVmOiBOb2RlUmVmLFxuICAgIGxlYWZOb2RlUmVmczogTm9kZVJlZltdXG4gICk6IE5vZGVSZWZbXSB7XG4gICAgaWYgKCF0aGlzLmlzUmVmZXJlbmNlTm9kZShub2RlUmVmKSkge1xuICAgICAgY29uc3QgY2hpbGRyZW4gPSB0aGlzLm5vZGVIaWVyYXJjaHlcbiAgICAgICAgLmdldENoaWxkcmVuKG5vZGVSZWYsIGZhbHNlKVxuICAgICAgICAuZmlsdGVyKChjaGlsZE5vZGVSZWY6IE5vZGVSZWYpID0+ICF0aGlzLmlzUmVmZXJlbmNlTm9kZShjaGlsZE5vZGVSZWYpKTtcblxuICAgICAgaWYgKGNoaWxkcmVuLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBsZWFmTm9kZVJlZnMucHVzaChub2RlUmVmKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNoaWxkcmVuLmZvckVhY2goKGNoaWxkTm9kZVJlZjogTm9kZVJlZikgPT5cbiAgICAgICAgICB0aGlzLmdldExlYWZEZXNjZW5kYW50cyhjaGlsZE5vZGVSZWYsIGxlYWZOb2RlUmVmcylcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGxlYWZOb2RlUmVmcztcbiAgfVxuXG4gIHByaXZhdGUgZ2V0QWxsTGVhZk5vZGVSZWZzKCk6IE5vZGVSZWZbXSB7XG4gICAgcmV0dXJuIHRoaXMubm9kZUhpZXJhcmNoeVxuICAgICAgLmdldENoaWxkcmVuKHVuZGVmaW5lZClcbiAgICAgIC5mbGF0TWFwKChub2RlUmVmOiBOb2RlUmVmKSA9PiB0aGlzLmdldExlYWZEZXNjZW5kYW50cyhub2RlUmVmLCBbXSkpO1xuICB9XG5cbiAgcHJpdmF0ZSBpc29sYXRlTm9kZXMobm9kZVJlZnNUb0lzb2xhdGU6IG9iamVjdFtdKTogdm9pZCB7XG4gICAgLy8gaXNvbGF0ZSBqdXN0IHRoZSBmaXJzdCBzZWxlY3RlZCBub2RlXG4gICAgbm9kZVJlZnNUb0lzb2xhdGUgPSBub2RlUmVmc1RvSXNvbGF0ZS5zbGljZSgwLCAxKTtcblxuICAgIHRoaXMudmlld3BvcnQuem9vbVRvKFxuICAgICAgWm9vbVRvLk5vZGUsXG4gICAgICBub2RlUmVmc1RvSXNvbGF0ZSxcbiAgICAgIHRoaXMuZmx5VG9EdXJhdGlvbkluU2Vjb25kcyxcbiAgICAgIHRoaXMuem9vbVRvTWFyZ2luXG4gICAgKTtcblxuICAgIGNvbnN0IGN1cnJlbnRWaXNpYmxlU2lkczogc3RyaW5nW10gPVxuICAgICAgdGhpcy52aWV3UHJpb3JUb0lzb2xhdGVWaWV3SW5mby52aXNpYmlsaXR5LnZpc2libGUgfHwgW107XG4gICAgY29uc3QgY3VycmVudFZpc2libGVOb2RlUmVmczogTm9kZVJlZltdID0gdGhpcy5wZXJzaXN0ZW50SWRUb05vZGVSZWYoXG4gICAgICBjdXJyZW50VmlzaWJsZVNpZHMsXG4gICAgICB0cnVlXG4gICAgKTtcbiAgICB0aGlzLnZpZXdTdGF0ZU1hbmFnZXIuc2V0VmlzaWJpbGl0eVN0YXRlKFxuICAgICAgY3VycmVudFZpc2libGVOb2RlUmVmcyxcbiAgICAgIGZhbHNlLFxuICAgICAgdHJ1ZSxcbiAgICAgIGZhbHNlXG4gICAgKTtcbiAgICB0aGlzLnZpZXdTdGF0ZU1hbmFnZXIuc2V0VmlzaWJpbGl0eVN0YXRlKFxuICAgICAgbm9kZVJlZnNUb0lzb2xhdGUsXG4gICAgICB0cnVlLFxuICAgICAgdHJ1ZSxcbiAgICAgIHRydWVcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBhbmltYXRpb25QbGF5ZXJTZXRUaW1lKHRpbWU6IG51bWJlciwgYmxvY2tFdmVudHM6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAvLyBidWcgd29ya2Fyb3VuZFxuICAgIC8vIHRoZSBvdmVybG9hZCB3aXRoIG5vIHNlcXVlbmNlIG51bWJlciBwYXJhbWV0ZXIgYmxvd3MgdXBcbiAgICAodGhpcy5hbmltYXRpb25QbGF5ZXIgYXMgYW55KS5zZXRUaW1lKHRpbWUsIHVuZGVmaW5lZCwgYmxvY2tFdmVudHMpO1xuICB9XG5cbiAgcHJpdmF0ZSBvblZpZXdBY3RpdmF0ZWQoKTogdm9pZCB7XG4gICAgdGhpcy5pbml0aWFsVmlld0luZm8gPSB0aGlzLnZpZXdwb3J0LmdldFZpZXdJbmZvKHtcbiAgICAgIGNhbWVyYTogdHJ1ZSxcbiAgICAgIHZpc2liaWxpdHk6IHRydWUsXG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIG9uVGltZUNoYW5nZWQob0V2ZW50OiBhbnkpOiB2b2lkIHtcbiAgICBsZXQgY2hhbmdlcyA9IGZhbHNlO1xuXG4gICAgY29uc3QgdGltZTogbnVtYmVyID0gb0V2ZW50LmdldFBhcmFtZXRlcnMoKS50aW1lO1xuICAgIGlmICh0aGlzLmFuaW1hdGlvblRpbWUgIT09IHRpbWUpIHtcbiAgICAgIHRoaXMuYW5pbWF0aW9uVGltZSA9IHRpbWU7XG4gICAgICB0aGlzLmFuaW1hdGlvblRpbWVDaGFuZ2UuZW1pdCh0aW1lKTtcbiAgICAgIGNoYW5nZXMgPSB0cnVlO1xuICAgIH1cblxuICAgIGNvbnN0IHBvc2l0aW9uID0gdGhpcy5hbmltYXRpb25Ub3RhbER1cmF0aW9uXG4gICAgICA/IHRoaXMuYW5pbWF0aW9uVGltZSAvIHRoaXMuYW5pbWF0aW9uVG90YWxEdXJhdGlvblxuICAgICAgOiAwO1xuICAgIGlmICh0aGlzLmFuaW1hdGlvblBvc2l0aW9uICE9PSBwb3NpdGlvbikge1xuICAgICAgdGhpcy5hbmltYXRpb25Qb3NpdGlvbiA9IHBvc2l0aW9uO1xuICAgICAgdGhpcy5hbmltYXRpb25Qb3NpdGlvbkNoYW5nZS5lbWl0KHBvc2l0aW9uKTtcbiAgICAgIGNoYW5nZXMgPSB0cnVlO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmFuaW1hdGlvblBsYXlpbmcpIHtcbiAgICAgIGlmICh0aGlzLmFuaW1hdGlvblBvc2l0aW9uID49IDEpIHtcbiAgICAgICAgdGhpcy5fYW5pbWF0aW9uUGxheWluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmFuaW1hdGlvblBsYXlpbmdDaGFuZ2UuZW1pdCh0aGlzLl9hbmltYXRpb25QbGF5aW5nKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoY2hhbmdlcykge1xuICAgICAgLy8gVGhpcyBpcyBuZWVkZWQgZm9yIHRoZSBhbmltYXRpb24gc2xpZGVyIGhhbmRsZSBwb3NpdGlvbiB0byBnZXQgdXBkYXRlZFxuICAgICAgLy8gd2hpbGUgYW4gYW5pbWF0aW9uIGlzIHBsYXlpbmcuXG4gICAgICAvLyBPdGhlcndpc2UgaXQgdHlwaWNhbGx5IG9ubHkgbW92ZXMgb25jZSB0aGUgYW5pbWF0aW9uIHBsYXliYWNrIGhhcyBwYXVzZWQuXG4gICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNldFZpc3VhbGl6YXRpb25Mb2FkSW5mbyhcbiAgICB2aXN1YWxpemF0aW9uTG9hZEluZm86IFZpc3VhbGl6YXRpb25Mb2FkSW5mb1xuICApIHtcbiAgICB0aGlzLl92aXN1YWxpemF0aW9uTG9hZEluZm8gPSB2aXN1YWxpemF0aW9uTG9hZEluZm87XG4gICAgdGhpcy52aXN1YWxpemF0aW9uTG9hZEluZm9DaGFuZ2UuZW1pdCh2aXN1YWxpemF0aW9uTG9hZEluZm8pO1xuICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG4gIHB1YmxpYyBnZXQgdmlzdWFsaXphdGlvbkxvYWRJbmZvKCk6IFZpc3VhbGl6YXRpb25Mb2FkSW5mbyB7XG4gICAgcmV0dXJuIHRoaXMuX3Zpc3VhbGl6YXRpb25Mb2FkSW5mbztcbiAgfVxuICBwcml2YXRlIF92aXN1YWxpemF0aW9uTG9hZEluZm86IFZpc3VhbGl6YXRpb25Mb2FkSW5mbztcbiAgcHVibGljIHZpc3VhbGl6YXRpb25Mb2FkSW5mb0NoYW5nZSA9XG4gICAgbmV3IEV2ZW50RW1pdHRlcjxWaXN1YWxpemF0aW9uTG9hZEluZm8+KCk7XG5cbiAgcHVibGljIGxvYWRWaXN1YWxpemF0aW9uKFxuICAgIHByb2R1Y3RDb2RlOiBzdHJpbmdcbiAgKTogT2JzZXJ2YWJsZTxWaXN1YWxpemF0aW9uTG9hZEluZm8+IHtcbiAgICBpZiAoIXRoaXMud2luZG93UmVmLmlzQnJvd3NlcigpKSB7XG4gICAgICByZXR1cm4gb2Yoe1xuICAgICAgICBsb29rdXBSZXN1bHQ6IFZpc3VhbGl6YXRpb25Mb29rdXBSZXN1bHQuVW5leHBlY3RlZEVycm9yLFxuICAgICAgICBsb2FkU3RhdHVzOiBWaXN1YWxpemF0aW9uTG9hZFN0YXR1cy5VbmV4cGVjdGVkRXJyb3IsXG4gICAgICAgIGVycm9yTWVzc2FnZTogJ1Nob3VsZCBub3QgY2FsbCBsb2FkVmlzdWFsaXphdGlvbiBpbiBzZXJ2ZXIgc2lkZSBjb2RlJyxcbiAgICAgIH0pO1xuICAgIH1cbiAgICB0aGlzLnNlbGVjdGVkTm9kZUlkc1N1YnNjcmlwdGlvbj8udW5zdWJzY3JpYmUoKTtcblxuICAgIHJldHVybiB0aGlzLnZpZXdwb3J0QWRkZWQkLnBpcGUoXG4gICAgICBtZXJnZU1hcCgoKSA9PlxuICAgICAgICB0aGlzLnJlc29sdmVWaXN1YWxpemF0aW9uKHByb2R1Y3RDb2RlKS5waXBlKFxuICAgICAgICAgIG1lcmdlTWFwKCh2aXN1YWxpemF0aW9uTG9hZEluZm86IFZpc3VhbGl6YXRpb25Mb2FkSW5mbykgPT4ge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICB2aXN1YWxpemF0aW9uTG9hZEluZm8ubG9va3VwUmVzdWx0ID09PVxuICAgICAgICAgICAgICBWaXN1YWxpemF0aW9uTG9va3VwUmVzdWx0LlVuaXF1ZU1hdGNoRm91bmRcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICB0aGlzLnNjZW5lTm9kZVRvUHJvZHVjdExvb2t1cFNlcnZpY2UucG9wdWxhdGVNYXBzRm9yU2NlbmUoXG4gICAgICAgICAgICAgICAgdGhpcy5zY2VuZUlkXG4gICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgbGV0IG1lcmdlZFZpc3VhbGl6YXRpb25Mb2FkSW5mbzogVmlzdWFsaXphdGlvbkxvYWRJbmZvID0ge1xuICAgICAgICAgICAgICAgIC4uLnZpc3VhbGl6YXRpb25Mb2FkSW5mbyxcbiAgICAgICAgICAgICAgICBsb2FkU3RhdHVzOiBWaXN1YWxpemF0aW9uTG9hZFN0YXR1cy5Mb2FkaW5nLFxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICB0aGlzLnNldFZpc3VhbGl6YXRpb25Mb2FkSW5mbyhtZXJnZWRWaXN1YWxpemF0aW9uTG9hZEluZm8pO1xuXG4gICAgICAgICAgICAgIHJldHVybiB0aGlzLmxvYWRTY2VuZSh0aGlzLnNjZW5lSWQsIHRoaXMuY29udGVudFR5cGUpLnBpcGUoXG4gICAgICAgICAgICAgICAgbWVyZ2VNYXAoKHNjZW5lTG9hZEluZm86IFNjZW5lTG9hZEluZm8pID0+IHtcbiAgICAgICAgICAgICAgICAgIGlmIChzY2VuZUxvYWRJbmZvLnNjZW5lTG9hZFN0YXRlID09PSBTY2VuZUxvYWRTdGF0ZS5GYWlsZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgbWVyZ2VkVmlzdWFsaXphdGlvbkxvYWRJbmZvID0ge1xuICAgICAgICAgICAgICAgICAgICAgIC4uLnZpc3VhbGl6YXRpb25Mb2FkSW5mbyxcbiAgICAgICAgICAgICAgICAgICAgICBsb2FkU3RhdHVzOiBWaXN1YWxpemF0aW9uTG9hZFN0YXR1cy5VbmV4cGVjdGVkRXJyb3IsXG4gICAgICAgICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiBzY2VuZUxvYWRJbmZvLmVycm9yTWVzc2FnZSxcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWROb2RlSWRzU3Vic2NyaXB0aW9uID1cbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkTm9kZUlkcyQuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVTZWxlY3RlZE5vZGVJZHMuYmluZCh0aGlzKVxuICAgICAgICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICAgICAgbWVyZ2VkVmlzdWFsaXphdGlvbkxvYWRJbmZvID0ge1xuICAgICAgICAgICAgICAgICAgICAgIC4uLnZpc3VhbGl6YXRpb25Mb2FkSW5mbyxcbiAgICAgICAgICAgICAgICAgICAgICBsb2FkU3RhdHVzOiBWaXN1YWxpemF0aW9uTG9hZFN0YXR1cy5Mb2FkZWQsXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB0aGlzLnNldFZpc3VhbGl6YXRpb25Mb2FkSW5mbyhtZXJnZWRWaXN1YWxpemF0aW9uTG9hZEluZm8pO1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIG9mKG1lcmdlZFZpc3VhbGl6YXRpb25Mb2FkSW5mbyk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJldHVybiBvZih2aXN1YWxpemF0aW9uTG9hZEluZm8pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIClcbiAgICAgIClcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBpc1VpNUJvb3RTdHJhcHBlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gKFxuICAgICAgISF0aGlzLndpbmRvd1JlZi5uYXRpdmVXaW5kb3cgJiZcbiAgICAgICEhKHRoaXMud2luZG93UmVmLm5hdGl2ZVdpbmRvdyBhcyBhbnkpLnNhcFxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIGdldENvcmUoKTogQ29yZSB7XG4gICAgcmV0dXJuIHNhcC51aS5nZXRDb3JlKCk7XG4gIH1cblxuICBwcml2YXRlIGJvb3RzdHJhcFVpNShzY3JpcHRFbGVtZW50SWQ6IHN0cmluZyk6IE9ic2VydmFibGU8dm9pZD4ge1xuICAgIGNvbnN0IGVwZFZpc3VhbGl6YXRpb24gPSB0aGlzLmVwZFZpc3VhbGl6YXRpb25Db25maWdcbiAgICAgIC5lcGRWaXN1YWxpemF0aW9uIGFzIEVwZFZpc3VhbGl6YXRpb25Jbm5lckNvbmZpZztcbiAgICBjb25zdCB1aTVDb25maWcgPSBlcGRWaXN1YWxpemF0aW9uLnVpNSBhcyBVaTVDb25maWc7XG5cbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoKHN1YnNjcmliZXIpID0+IHtcbiAgICAgIGlmICh0aGlzLmlzVWk1Qm9vdFN0cmFwcGVkKCkpIHtcbiAgICAgICAgc3Vic2NyaWJlci5uZXh0KCk7XG4gICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBzY3JpcHQgPSB0aGlzLndpbmRvd1JlZi5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICAgIHNjcmlwdC5zZXRBdHRyaWJ1dGUoJ2lkJywgc2NyaXB0RWxlbWVudElkKTtcbiAgICAgIHRoaXMud2luZG93UmVmLmRvY3VtZW50XG4gICAgICAgIC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdXG4gICAgICAgIC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuICAgICAgc2NyaXB0Lm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgc3Vic2NyaWJlci5uZXh0KCk7XG4gICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgIH07XG4gICAgICBzY3JpcHQub25lcnJvciA9IChlcnJvcjogYW55KSA9PiB7XG4gICAgICAgIHN1YnNjcmliZXIuZXJyb3IoZXJyb3IpO1xuICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICB9O1xuICAgICAgc2NyaXB0LmlkID0gJ3NhcC11aS1ib290c3RyYXAnO1xuICAgICAgc2NyaXB0LnR5cGUgPSAndGV4dC9qYXZhc2NyaXB0JztcbiAgICAgIHNjcmlwdC5zZXRBdHRyaWJ1dGUoJ2RhdGEtc2FwLXVpLWNvbXBhdFZlcnNpb24nLCAnZWRnZScpO1xuICAgICAgc2NyaXB0LnNyYyA9IHVpNUNvbmZpZy5ib290c3RyYXBVcmw7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGluaXRpYWxpemVVaTUoKTogT2JzZXJ2YWJsZTx2b2lkPiB7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKChzdWJzY3JpYmVyKSA9PiB7XG4gICAgICBjb25zdCBjb3JlOiBDb3JlID0gdGhpcy5nZXRDb3JlKCk7XG4gICAgICBjb3JlLmF0dGFjaEluaXQoKCkgPT4ge1xuICAgICAgICBjb25zdCBsb2FkTGlicmFyeU9wdGlvbnMgPSB7IGFzeW5jOiB0cnVlIH07XG4gICAgICAgIFByb21pc2UuYWxsKFtcbiAgICAgICAgICBjb3JlLmxvYWRMaWJyYXJ5KCdzYXAubScsIGxvYWRMaWJyYXJ5T3B0aW9ucyksXG4gICAgICAgICAgY29yZS5sb2FkTGlicmFyeSgnc2FwLnVpLmxheW91dCcsIGxvYWRMaWJyYXJ5T3B0aW9ucyksXG4gICAgICAgICAgY29yZS5sb2FkTGlicmFyeSgnc2FwLnVpLnZrJywgbG9hZExpYnJhcnlPcHRpb25zKSxcbiAgICAgICAgICBjb3JlLmxvYWRMaWJyYXJ5KCdzYXAudWkucmljaHRleHRlZGl0b3InLCBsb2FkTGlicmFyeU9wdGlvbnMpLFxuICAgICAgICBdKS50aGVuKCgpID0+IHtcbiAgICAgICAgICBzdWJzY3JpYmVyLm5leHQoKTtcbiAgICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGRlc3Ryb3lWaWV3cG9ydEFzc29jaWF0aW9ucyh2aWV3cG9ydDogVmlld3BvcnQpOiB2b2lkIHtcbiAgICBjb25zdCBjb3JlID0gdGhpcy5nZXRDb3JlKCk7XG4gICAgaWYgKCFjb3JlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgY29udGVudENvbm5lY3RvcklkID0gdmlld3BvcnQuZ2V0Q29udGVudENvbm5lY3RvcigpO1xuICAgIGlmIChjb250ZW50Q29ubmVjdG9ySWQpIHtcbiAgICAgIGNvbnN0IGNvbnRlbnRDb25uZWN0b3IgPSBjb3JlLmJ5SWQoY29udGVudENvbm5lY3RvcklkKTtcbiAgICAgIGlmIChjb250ZW50Q29ubmVjdG9yKSB7XG4gICAgICAgIGNvbnRlbnRDb25uZWN0b3IuZGVzdHJveSgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHZpZXdTdGF0ZU1hbmFnZXJJZCA9IHZpZXdwb3J0LmdldFZpZXdTdGF0ZU1hbmFnZXIoKTtcblxuICAgIGlmICh2aWV3U3RhdGVNYW5hZ2VySWQgJiYgY29yZS5ieUlkKHZpZXdTdGF0ZU1hbmFnZXJJZCkpIHtcbiAgICAgIGNvbnN0IHZpZXdTdGF0ZU1hbmFnZXIgPSBjb3JlLmJ5SWQoXG4gICAgICAgIHZpZXdTdGF0ZU1hbmFnZXJJZFxuICAgICAgKSBhcyBWaWV3U3RhdGVNYW5hZ2VyO1xuXG4gICAgICBpZiAodmlld1N0YXRlTWFuYWdlcikge1xuICAgICAgICBjb25zdCBhbmltYXRpb25QbGF5ZXIgPSB2aWV3U3RhdGVNYW5hZ2VyLmdldEFuaW1hdGlvblBsYXllcigpO1xuICAgICAgICBpZiAoYW5pbWF0aW9uUGxheWVyKSB7XG4gICAgICAgICAgYW5pbWF0aW9uUGxheWVyLmRlc3Ryb3koKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHZpZXdNYW5hZ2VySWQgPSB2aWV3U3RhdGVNYW5hZ2VyLmdldFZpZXdNYW5hZ2VyKCk7XG4gICAgICAgIGlmICh2aWV3TWFuYWdlcklkKSB7XG4gICAgICAgICAgY29uc3Qgdmlld01hbmFnZXIgPSBjb3JlLmJ5SWQodmlld01hbmFnZXJJZCk7XG4gICAgICAgICAgaWYgKHZpZXdNYW5hZ2VyKSB7XG4gICAgICAgICAgICB2aWV3TWFuYWdlci5kZXN0cm95KCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHZpZXdTdGF0ZU1hbmFnZXIuZGVzdHJveSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgb25Db250ZW50Q2hhbmdlc1N0YXJ0ZWQoKTogdm9pZCB7XG4gICAgdGhpcy52aWV3cG9ydC5kZXRhY2hOb2Rlc1BpY2tlZCh0aGlzLm9uTm9kZXNQaWNrZWQpO1xuICB9XG5cbiAgcHJpdmF0ZSBvbkNvbnRlbnRDaGFuZ2VzRmluaXNoZWQoZXZlbnQ6IGFueSk6IHZvaWQge1xuICAgIGNvbnN0IGNvbnRlbnQgPSBldmVudC5nZXRQYXJhbWV0ZXIoJ2NvbnRlbnQnKTtcbiAgICBjb25zdCBmYWlsdXJlUmVhc29uID0gZXZlbnQuZ2V0UGFyYW1ldGVyKCdmYWlsdXJlUmVhc29uJyk7XG4gICAgaWYgKCEhY29udGVudCAmJiAhZmFpbHVyZVJlYXNvbikge1xuICAgICAgdGhpcy5zY2VuZSA9IGNvbnRlbnQ7XG4gICAgICB0aGlzLm5vZGVIaWVyYXJjaHkgPSB0aGlzLnNjZW5lLmdldERlZmF1bHROb2RlSGllcmFyY2h5KCk7XG5cbiAgICAgIHRoaXMudmlld3BvcnQuYXR0YWNoTm9kZXNQaWNrZWQodGhpcy5vbk5vZGVzUGlja2VkLCB0aGlzKTtcblxuICAgICAgaWYgKGNvbnRlbnQubG9hZGVycykge1xuICAgICAgICBjb250ZW50LmxvYWRlcnMuZm9yRWFjaCgoY29udGVudExvYWRlcjogYW55KSA9PiB7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgY29udGVudExvYWRlciAmJlxuICAgICAgICAgICAgY29udGVudExvYWRlci5hdHRhY2hMb2FkaW5nRmluaXNoZWQgIT09IHVuZGVmaW5lZFxuICAgICAgICAgICkge1xuICAgICAgICAgICAgY29udGVudExvYWRlci5hdHRhY2hMb2FkaW5nRmluaXNoZWQoXG4gICAgICAgICAgICAgIHRoaXMub25Db250ZW50TG9hZGluZ0ZpbmlzaGVkLFxuICAgICAgICAgICAgICB0aGlzXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuY29udGVudENoYW5nZXNGaW5pc2hlZC5lbWl0KHtcbiAgICAgIGNvbnRlbnQsXG4gICAgICBmYWlsdXJlUmVhc29uLFxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBvbkNvbnRlbnRMb2FkaW5nRmluaXNoZWQoX2V2ZW50OiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLmNvbnRlbnRMb2FkRmluaXNoZWQuZW1pdCh7fSk7XG4gIH1cblxuICBwcml2YXRlIG9uTm9kZXNQaWNrZWQoZXZlbnQ6IGFueSk6IHZvaWQge1xuICAgIGlmICh0aGlzLmlzMkQpIHtcbiAgICAgIHRoaXMub25Ob2Rlc1BpY2tlZDJEKGV2ZW50KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5vbk5vZGVzUGlja2VkM0QoZXZlbnQpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgaXNOb2RlSW5jbHVkZWQobm9kZVJlZjogTm9kZVJlZik6IGJvb2xlYW4ge1xuICAgIGNvbnN0IHNpZHM6IHN0cmluZ1tdID0gdGhpcy5ub2RlUmVmVG9QZXJzaXN0ZW50SWQoW25vZGVSZWZdLCB0cnVlKTtcbiAgICBjb25zdCBwcm9kdWN0Q29kZXMgPVxuICAgICAgdGhpcy5zY2VuZU5vZGVUb1Byb2R1Y3RMb29rdXBTZXJ2aWNlLnN5bmNMb29rdXBQcm9kdWN0Q29kZXMoc2lkcyk7XG4gICAgcmV0dXJuIChcbiAgICAgICEhcHJvZHVjdENvZGVzICYmXG4gICAgICBwcm9kdWN0Q29kZXMuc29tZSgocHJvZHVjdENvZGU6IHN0cmluZykgPT5cbiAgICAgICAgdGhpcy5pbmNsdWRlZFByb2R1Y3RDb2Rlcy5pbmNsdWRlcyhwcm9kdWN0Q29kZSlcbiAgICAgIClcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBvbk5vZGVzUGlja2VkMkQoZXZlbnQ6IGFueSk6IHZvaWQge1xuICAgIGNvbnN0IHBpY2tlZE5vZGVzID0gZXZlbnQuZ2V0UGFyYW1ldGVyKCdwaWNrZWQnKTtcbiAgICBpZiAocGlja2VkTm9kZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgaG90U3BvdHMgPSBwaWNrZWROb2Rlcy5maWx0ZXIoXG4gICAgICAobm9kZTogYW55KSA9PlxuICAgICAgICBub2RlLm5vZGVDb250ZW50VHlwZSAmJiBub2RlLm5vZGVDb250ZW50VHlwZSA9PT0gTm9kZUNvbnRlbnRUeXBlLkhvdHNwb3RcbiAgICApO1xuICAgIGlmIChob3RTcG90cy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBpbmNsdWRlZEhvdFNwb3RzOiBOb2RlUmVmW10gPSBob3RTcG90cy5maWx0ZXIoKG5vZGVSZWY6IE5vZGVSZWYpID0+XG4gICAgICB0aGlzLmlzTm9kZUluY2x1ZGVkKG5vZGVSZWYpXG4gICAgKTtcblxuICAgIHBpY2tlZE5vZGVzLnNwbGljZSgwKTtcbiAgICBpbmNsdWRlZEhvdFNwb3RzLmZvckVhY2goKGluY2x1ZGVkSG90U3BvdDogYW55KSA9PlxuICAgICAgcGlja2VkTm9kZXMucHVzaChpbmNsdWRlZEhvdFNwb3QpXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgb25Ob2Rlc1BpY2tlZDNEKGV2ZW50OiBhbnkpOiB2b2lkIHtcbiAgICBjb25zdCBwaWNrZWQ6IE5vZGVSZWZbXSA9IGV2ZW50LmdldFBhcmFtZXRlcigncGlja2VkJyk7XG4gICAgY29uc3Qgc3JjOiBOb2RlUmVmW10gPSBwaWNrZWQuc3BsaWNlKDAsIHBpY2tlZC5sZW5ndGgpO1xuXG4gICAgc3JjLmZvckVhY2goKG5vZGU6IE5vZGVSZWYpID0+IHtcbiAgICAgIHdoaWxlICghdGhpcy5pc05vZGVJbmNsdWRlZChub2RlKSkge1xuICAgICAgICBub2RlID0gbm9kZS5wYXJlbnQ7XG4gICAgICAgIGlmICghbm9kZSkge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobm9kZSkge1xuICAgICAgICBwaWNrZWQucHVzaChub2RlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgYWRkVmlld3BvcnQoKTogT2JzZXJ2YWJsZTx2b2lkPiB7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKChzdWJzY3JpYmVyKSA9PiB7XG4gICAgICBzYXAudWkucmVxdWlyZShcbiAgICAgICAgW1xuICAgICAgICAgICdzYXAvdWkvdmsvVmlld01hbmFnZXInLFxuICAgICAgICAgICdzYXAvdWkvdmsvVmlld3BvcnQnLFxuICAgICAgICAgICdzYXAvdWkvdmsvVmlld1N0YXRlTWFuYWdlcicsXG4gICAgICAgICAgJ3NhcC91aS92ay9BbmltYXRpb25QbGF5ZXInLFxuICAgICAgICAgICdzYXAvdWkvdmsvQ29udGVudENvbm5lY3RvcicsXG4gICAgICAgICAgJ3NhcC91aS92ay9EcmF3ZXJUb29sYmFyJyxcbiAgICAgICAgXSxcbiAgICAgICAgKFxuICAgICAgICAgIHNhcF91aV92a19WaWV3TWFuYWdlcjogYW55LFxuICAgICAgICAgIHNhcF91aV92a19WaWV3cG9ydDogYW55LFxuICAgICAgICAgIHNhcF91aV92a19WaWV3U3RhdGVNYW5hZ2VyOiBhbnksXG4gICAgICAgICAgc2FwX3VpX3ZrX0FuaW1hdGlvblBsYXllcjogYW55LFxuICAgICAgICAgIHNhcF91aV92a19Db250ZW50Q29ubmVjdG9yOiBhbnksXG4gICAgICAgICAgc2FwX3VpX3ZrX0RyYXdlclRvb2xiYXI6IGFueVxuICAgICAgICApID0+IHtcbiAgICAgICAgICBjb25zdCBjb3JlOiBDb3JlID0gdGhpcy5nZXRDb3JlKCk7XG4gICAgICAgICAgY29uc3QgdWlBcmVhOiBVSUFyZWEgfCBudWxsIHwgdW5kZWZpbmVkID0gY29yZS5nZXRVSUFyZWEoXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudFxuICAgICAgICAgICk7XG4gICAgICAgICAgaWYgKHVpQXJlYSkge1xuICAgICAgICAgICAgY29uc3Qgb2xkVmlld3BvcnQgPSB1aUFyZWEuZ2V0Q29udGVudCgpWzBdIGFzIFZpZXdwb3J0O1xuICAgICAgICAgICAgdGhpcy5kZXN0cm95Vmlld3BvcnRBc3NvY2lhdGlvbnMob2xkVmlld3BvcnQpO1xuICAgICAgICAgICAgdWlBcmVhLmRlc3Ryb3lDb250ZW50KCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy52aWV3cG9ydCA9IG5ldyBzYXBfdWlfdmtfVmlld3BvcnQoeyB2aXNpYmxlOiBmYWxzZSB9KTtcbiAgICAgICAgICB0aGlzLnZpZXdwb3J0LnBsYWNlQXQodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuXG4gICAgICAgICAgdGhpcy5jb250ZW50Q29ubmVjdG9yID0gbmV3IHNhcF91aV92a19Db250ZW50Q29ubmVjdG9yKCk7XG4gICAgICAgICAgdGhpcy5jb250ZW50Q29ubmVjdG9yLmF0dGFjaENvbnRlbnRDaGFuZ2VzU3RhcnRlZChcbiAgICAgICAgICAgIHRoaXMub25Db250ZW50Q2hhbmdlc1N0YXJ0ZWQsXG4gICAgICAgICAgICB0aGlzXG4gICAgICAgICAgKTtcbiAgICAgICAgICB0aGlzLmNvbnRlbnRDb25uZWN0b3IuYXR0YWNoQ29udGVudENoYW5nZXNGaW5pc2hlZChcbiAgICAgICAgICAgIHRoaXMub25Db250ZW50Q2hhbmdlc0ZpbmlzaGVkLFxuICAgICAgICAgICAgdGhpc1xuICAgICAgICAgICk7XG4gICAgICAgICAgdGhpcy5jb250ZW50Q29ubmVjdG9yLmF0dGFjaENvbnRlbnRMb2FkaW5nRmluaXNoZWQoXG4gICAgICAgICAgICB0aGlzLm9uQ29udGVudExvYWRpbmdGaW5pc2hlZCxcbiAgICAgICAgICAgIHRoaXNcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgdGhpcy52aWV3U3RhdGVNYW5hZ2VyID0gbmV3IHNhcF91aV92a19WaWV3U3RhdGVNYW5hZ2VyKHtcbiAgICAgICAgICAgIGNvbnRlbnRDb25uZWN0b3I6IHRoaXMuY29udGVudENvbm5lY3RvcixcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHRoaXMudmlld3BvcnQuc2V0Q29udGVudENvbm5lY3Rvcih0aGlzLmNvbnRlbnRDb25uZWN0b3IpO1xuICAgICAgICAgIHRoaXMudmlld3BvcnQuc2V0Vmlld1N0YXRlTWFuYWdlcih0aGlzLnZpZXdTdGF0ZU1hbmFnZXIpO1xuXG4gICAgICAgICAgdGhpcy5hbmltYXRpb25QbGF5ZXIgPSBuZXcgc2FwX3VpX3ZrX0FuaW1hdGlvblBsYXllcigpO1xuICAgICAgICAgIHRoaXMuYW5pbWF0aW9uUGxheWVyLnNldFZpZXdTdGF0ZU1hbmFnZXIodGhpcy52aWV3U3RhdGVNYW5hZ2VyKTtcblxuICAgICAgICAgIHRoaXMuYW5pbWF0aW9uUGxheWVyLmF0dGFjaFZpZXdBY3RpdmF0ZWQodGhpcy5vblZpZXdBY3RpdmF0ZWQsIHRoaXMpO1xuICAgICAgICAgIHRoaXMuYW5pbWF0aW9uUGxheWVyLmF0dGFjaFRpbWVDaGFuZ2VkKHRoaXMub25UaW1lQ2hhbmdlZCwgdGhpcyk7XG5cbiAgICAgICAgICB0aGlzLnZpZXdNYW5hZ2VyID0gbmV3IHNhcF91aV92a19WaWV3TWFuYWdlcih7XG4gICAgICAgICAgICBjb250ZW50Q29ubmVjdG9yOiB0aGlzLmNvbnRlbnRDb25uZWN0b3IsXG4gICAgICAgICAgICBhbmltYXRpb25QbGF5ZXI6IHRoaXMuYW5pbWF0aW9uUGxheWVyLFxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgdGhpcy52aWV3U3RhdGVNYW5hZ2VyLnNldFZpZXdNYW5hZ2VyKHRoaXMudmlld01hbmFnZXIpO1xuICAgICAgICAgIHRoaXMudmlld1N0YXRlTWFuYWdlci5hdHRhY2hTZWxlY3Rpb25DaGFuZ2VkKFxuICAgICAgICAgICAgdGhpcy5vblNlbGVjdGlvbkNoYW5nZWQsXG4gICAgICAgICAgICB0aGlzXG4gICAgICAgICAgKTtcbiAgICAgICAgICB0aGlzLnZpZXdTdGF0ZU1hbmFnZXIuYXR0YWNoT3V0bGluaW5nQ2hhbmdlZChcbiAgICAgICAgICAgIHRoaXMub25PdXRsaW5pbmdDaGFuZ2VkLFxuICAgICAgICAgICAgdGhpc1xuICAgICAgICAgICk7XG5cbiAgICAgICAgICB0aGlzLmRyYXdlclRvb2xiYXIgPSBuZXcgc2FwX3VpX3ZrX0RyYXdlclRvb2xiYXIoe1xuICAgICAgICAgICAgdmlld3BvcnQ6IHRoaXMudmlld3BvcnQsXG4gICAgICAgICAgICB2aXNpYmxlOiBmYWxzZSxcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHRoaXMudmlld3BvcnQuYWRkRGVwZW5kZW50KHRoaXMuZHJhd2VyVG9vbGJhcik7XG4gICAgICAgICAgc3Vic2NyaWJlci5uZXh0KCk7XG4gICAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICB9XG4gICAgICApO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRDU1NQcm9wZXJ0eVZhbHVlKGNzc1Byb3BlcnR5TmFtZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBjb25zdCBzdG9yZWZyb250RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdjeC1zdG9yZWZyb250JylbMF07XG4gICAgcmV0dXJuIGdldENvbXB1dGVkU3R5bGUoc3RvcmVmcm9udEVsZW1lbnQpLmdldFByb3BlcnR5VmFsdWUoXG4gICAgICBjc3NQcm9wZXJ0eU5hbWVcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRDU1NDb2xvcihjb2xvcjogc3RyaW5nKTogQ1NTQ29sb3Ige1xuICAgIHJldHVybiAodGhpcy5nZXRDU1NQcm9wZXJ0eVZhbHVlKGNvbG9yKSB8fCBjb2xvcikudHJpbSgpIGFzIENTU0NvbG9yO1xuICB9XG5cbiAgcHJpdmF0ZSByZXNvbHZlVmlzdWFsaXphdGlvbihcbiAgICBwcm9kdWN0Q29kZTogc3RyaW5nXG4gICk6IE9ic2VydmFibGU8VmlzdWFsaXphdGlvbkxvYWRJbmZvPiB7XG4gICAgcmV0dXJuIHRoaXMudmlzdWFsaXphdGlvbkxvb2t1cFNlcnZpY2VcbiAgICAgIC5maW5kTWF0Y2hpbmdWaXN1YWxpemF0aW9ucyhwcm9kdWN0Q29kZSlcbiAgICAgIC5waXBlKFxuICAgICAgICBtZXJnZU1hcCgobWF0Y2hlczogVmlzdWFsaXphdGlvbkluZm9bXSkgPT4ge1xuICAgICAgICAgIGxldCB2aXN1YWxpemF0aW9uTG9hZEluZm86IFZpc3VhbGl6YXRpb25Mb2FkSW5mbztcbiAgICAgICAgICBzd2l0Y2ggKG1hdGNoZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgIHZpc3VhbGl6YXRpb25Mb2FkSW5mbyA9IHtcbiAgICAgICAgICAgICAgICBsb29rdXBSZXN1bHQ6IFZpc3VhbGl6YXRpb25Mb29rdXBSZXN1bHQuTm9NYXRjaEZvdW5kLFxuICAgICAgICAgICAgICAgIGxvYWRTdGF0dXM6IFZpc3VhbGl6YXRpb25Mb2FkU3RhdHVzLk5vdFN0YXJ0ZWQsXG4gICAgICAgICAgICAgICAgbWF0Y2hlcyxcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgIGNvbnN0IG1hdGNoaW5nVmlzdWFsaXphdGlvbiA9IG1hdGNoZXNbMF07XG4gICAgICAgICAgICAgIHRoaXMuc2NlbmVJZCA9IG1hdGNoaW5nVmlzdWFsaXphdGlvbi5zY2VuZUlkO1xuICAgICAgICAgICAgICB0aGlzLmNvbnRlbnRUeXBlID0gbWF0Y2hpbmdWaXN1YWxpemF0aW9uLmNvbnRlbnRUeXBlO1xuICAgICAgICAgICAgICB2aXN1YWxpemF0aW9uTG9hZEluZm8gPSB7XG4gICAgICAgICAgICAgICAgbG9va3VwUmVzdWx0OiBWaXN1YWxpemF0aW9uTG9va3VwUmVzdWx0LlVuaXF1ZU1hdGNoRm91bmQsXG4gICAgICAgICAgICAgICAgbG9hZFN0YXR1czogVmlzdWFsaXphdGlvbkxvYWRTdGF0dXMuTm90U3RhcnRlZCxcbiAgICAgICAgICAgICAgICBtYXRjaGVzLFxuICAgICAgICAgICAgICAgIHZpc3VhbGl6YXRpb246IG1hdGNoaW5nVmlzdWFsaXphdGlvbixcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICB2aXN1YWxpemF0aW9uTG9hZEluZm8gPSB7XG4gICAgICAgICAgICAgICAgbG9va3VwUmVzdWx0OiBWaXN1YWxpemF0aW9uTG9va3VwUmVzdWx0Lk11bHRpcGxlTWF0Y2hlc0ZvdW5kLFxuICAgICAgICAgICAgICAgIGxvYWRTdGF0dXM6IFZpc3VhbGl6YXRpb25Mb2FkU3RhdHVzLk5vdFN0YXJ0ZWQsXG4gICAgICAgICAgICAgICAgbWF0Y2hlcyxcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuc2V0VmlzdWFsaXphdGlvbkxvYWRJbmZvKHZpc3VhbGl6YXRpb25Mb2FkSW5mbyk7XG4gICAgICAgICAgcmV0dXJuIG9mKHZpc3VhbGl6YXRpb25Mb2FkSW5mbyk7XG4gICAgICAgIH0pLFxuICAgICAgICBjYXRjaEVycm9yKCgpID0+IHtcbiAgICAgICAgICBsZXQgdmlzdWFsaXphdGlvbkxvYWRJbmZvID0ge1xuICAgICAgICAgICAgbG9va3VwUmVzdWx0OiBWaXN1YWxpemF0aW9uTG9va3VwUmVzdWx0LlVuZXhwZWN0ZWRFcnJvcixcbiAgICAgICAgICAgIGxvYWRTdGF0dXM6IFZpc3VhbGl6YXRpb25Mb2FkU3RhdHVzLk5vdFN0YXJ0ZWQsXG4gICAgICAgICAgfTtcbiAgICAgICAgICB0aGlzLnNldFZpc3VhbGl6YXRpb25Mb2FkSW5mbyh2aXN1YWxpemF0aW9uTG9hZEluZm8pO1xuICAgICAgICAgIHJldHVybiBvZih2aXN1YWxpemF0aW9uTG9hZEluZm8pO1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgcGVyc2lzdGVudElkVG9Ob2RlUmVmKFxuICAgIG5vZGVJZHM6IHN0cmluZ1tdLFxuICAgIGZpbHRlclVucmVzb2x2ZWRWYWx1ZXM6IGJvb2xlYW5cbiAgKTogTm9kZVJlZltdIHtcbiAgICBjb25zdCBub2RlUmVmczogTm9kZVJlZltdID0gKHRoaXMuc2NlbmUgYXMgYW55KS5wZXJzaXN0ZW50SWRUb05vZGVSZWYoXG4gICAgICBub2RlSWRzXG4gICAgKTtcbiAgICByZXR1cm4gZmlsdGVyVW5yZXNvbHZlZFZhbHVlc1xuICAgICAgPyBub2RlUmVmcy5maWx0ZXIoKG5vZGVSZWYpID0+ICEhbm9kZVJlZilcbiAgICAgIDogbm9kZVJlZnM7XG4gIH1cblxuICBwcml2YXRlIG5vZGVSZWZUb1BlcnNpc3RlbnRJZChcbiAgICBub2RlUmVmczogb2JqZWN0W10sXG4gICAgZmlsdGVyVW5yZXNvbHZlZFZhbHVlczogYm9vbGVhblxuICApOiBzdHJpbmdbXSB7XG4gICAgY29uc3Qgc2lkczogc3RyaW5nW10gPSAodGhpcy5zY2VuZSBhcyBhbnkpLm5vZGVSZWZUb1BlcnNpc3RlbnRJZChub2RlUmVmcyk7XG4gICAgcmV0dXJuIGZpbHRlclVucmVzb2x2ZWRWYWx1ZXMgPyBzaWRzLmZpbHRlcigoc2lkKSA9PiAhIXNpZCkgOiBzaWRzO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRWaWV3U3RhdGVNYW5hZ2VySW1wbGVtZW50YXRpb24oKTogYW55IHtcbiAgICByZXR1cm4gKHRoaXMudmlld1N0YXRlTWFuYWdlciBhcyBhbnkpLmdldEltcGxlbWVudGF0aW9uKCk7XG4gIH1cblxuICBwcml2YXRlIGhhbmRsZVNlbGVjdGVkTm9kZUlkcyhub2RlSWRzOiBzdHJpbmdbXSk6IHZvaWQge1xuICAgIGNvbnN0IG5vZGVSZWZzID0gdGhpcy5wZXJzaXN0ZW50SWRUb05vZGVSZWYobm9kZUlkcywgdHJ1ZSk7XG5cbiAgICBpZiAodGhpcy5pczJEKSB7XG4gICAgICB0aGlzLmhhbmRsZVNlbGVjdGVkTm9kZXMyRChub2RlUmVmcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaGFuZGxlU2VsZWN0ZWROb2RlczNEKG5vZGVSZWZzKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5pc29sYXRlTW9kZUVuYWJsZWQgJiYgbm9kZVJlZnMubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5pc29sYXRlTm9kZXMobm9kZVJlZnMpO1xuICAgIH1cbiAgICAvLyBOZWVkIHRvIGVuc3VyZSBhIGZyYW1lIHJlbmRlciBvY2N1cnMgc2luY2Ugd2UgYXJlIGJsb2NraW5nIGV2ZW50c1xuICAgIC8vIHdoZW4gY2hhbmdpbmcgc2VsZWN0aW9uL291dGxpbmluZ1xuICAgIHRoaXMuc2V0U2hvdWxkUmVuZGVyRnJhbWUoKTtcbiAgfVxuXG4gIHByaXZhdGUgaGFuZGxlU2VsZWN0ZWROb2RlczJEKHNlbGVjdGVkTm9kZXM6IE5vZGVSZWZbXSk6IHZvaWQge1xuICAgIGNvbnN0IGV4aXN0aW5nU2VsZWN0aW9uOiBOb2RlUmVmW10gPSBbXTtcbiAgICB0aGlzLnZpZXdTdGF0ZU1hbmFnZXIuZW51bWVyYXRlU2VsZWN0aW9uKChub2RlUmVmOiBOb2RlUmVmKSA9PlxuICAgICAgZXhpc3RpbmdTZWxlY3Rpb24ucHVzaChub2RlUmVmKVxuICAgICk7XG4gICAgdGhpcy52aWV3U3RhdGVNYW5hZ2VyLnNldFNlbGVjdGlvblN0YXRlcyhcbiAgICAgIFtdLFxuICAgICAgZXhpc3RpbmdTZWxlY3Rpb24sXG4gICAgICBmYWxzZSxcbiAgICAgIHRydWVcbiAgICApO1xuICAgIHRoaXMudmlld1N0YXRlTWFuYWdlci5zZXRTZWxlY3Rpb25TdGF0ZXMoc2VsZWN0ZWROb2RlcywgW10sIGZhbHNlLCB0cnVlKTtcbiAgfVxuXG4gIHByaXZhdGUgaGFuZGxlU2VsZWN0ZWROb2RlczNEKHNlbGVjdGVkTm9kZXM6IE5vZGVSZWZbXSk6IHZvaWQge1xuICAgIGNvbnN0IGV4aXN0aW5nT3V0bGluZWROb2RlUmVmczogTm9kZVJlZltdID0gW107XG4gICAgdGhpcy52aWV3U3RhdGVNYW5hZ2VyLmVudW1lcmF0ZU91dGxpbmVkTm9kZXMoKG5vZGVSZWY6IE5vZGVSZWYpID0+XG4gICAgICBleGlzdGluZ091dGxpbmVkTm9kZVJlZnMucHVzaChub2RlUmVmKVxuICAgICk7XG4gICAgdGhpcy5nZXRWaWV3U3RhdGVNYW5hZ2VySW1wbGVtZW50YXRpb24oKS5zZXRPdXRsaW5pbmdTdGF0ZXMoXG4gICAgICBbXSxcbiAgICAgIGV4aXN0aW5nT3V0bGluZWROb2RlUmVmcyxcbiAgICAgIGZhbHNlLFxuICAgICAgdHJ1ZVxuICAgICk7XG4gICAgdGhpcy5nZXRWaWV3U3RhdGVNYW5hZ2VySW1wbGVtZW50YXRpb24oKS5zZXRPdXRsaW5pbmdTdGF0ZXMoXG4gICAgICBzZWxlY3RlZE5vZGVzLFxuICAgICAgW10sXG4gICAgICBmYWxzZSxcbiAgICAgIHRydWVcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRTaG91bGRSZW5kZXJGcmFtZSgpOiB2b2lkIHtcbiAgICAodGhpcy52aWV3cG9ydCBhcyBhbnkpLnNldFNob3VsZFJlbmRlckZyYW1lKCk7XG4gIH1cblxuICBwcml2YXRlIGlzMkRDb250ZW50VHlwZShjb250ZW50VHlwZTogQ29udGVudFR5cGUpOiBib29sZWFuIHtcbiAgICByZXR1cm4gY29udGVudFR5cGUgPT09IENvbnRlbnRUeXBlLkRyYXdpbmcyRDtcbiAgfVxuXG4gIHByaXZhdGUgbG9hZFNjZW5lKFxuICAgIHNjZW5lSWQ6IHN0cmluZyxcbiAgICBjb250ZW50VHlwZTogQ29udGVudFR5cGVcbiAgKTogT2JzZXJ2YWJsZTxTY2VuZUxvYWRJbmZvPiB7XG4gICAgY29uc3QgZXBkVmlzdWFsaXphdGlvbiA9IHRoaXMuZXBkVmlzdWFsaXphdGlvbkNvbmZpZ1xuICAgICAgLmVwZFZpc3VhbGl6YXRpb24gYXMgRXBkVmlzdWFsaXphdGlvbklubmVyQ29uZmlnO1xuICAgIGNvbnN0IHZpc3VhbGl6YXRpb25BcGlDb25maWcgPVxuICAgICAgZXBkVmlzdWFsaXphdGlvbi5hcGlzIGFzIFZpc3VhbGl6YXRpb25BcGlDb25maWc7XG5cbiAgICBpZiAodGhpcy52aWV3cG9ydFJlYWR5KSB7XG4gICAgICB0aGlzLnNldFZpZXdwb3J0UmVhZHkoZmFsc2UpO1xuICAgIH1cblxuICAgIHRoaXMuc2V0SXMyRCh0aGlzLmlzMkRDb250ZW50VHlwZShjb250ZW50VHlwZSkpO1xuXG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKChzdWJzY3JpYmVyKSA9PiB7XG4gICAgICBzYXAudWkucmVxdWlyZShbJ3NhcC91aS92ay9Db250ZW50UmVzb3VyY2UnXSwgKENvbnRlbnRSZXNvdXJjZTogYW55KSA9PiB7XG4gICAgICAgIHRoaXMuc2NlbmVMb2FkSW5mbyQubmV4dCh7XG4gICAgICAgICAgc2NlbmVMb2FkU3RhdGU6IFNjZW5lTG9hZFN0YXRlLkxvYWRpbmcsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMudmlld3BvcnQuc2V0U2VsZWN0aW9uRGlzcGxheU1vZGUoXG4gICAgICAgICAgdGhpcy5pczJEID8gJ0hpZ2hsaWdodCcgOiAnT3V0bGluZSdcbiAgICAgICAgKTtcblxuICAgICAgICBjb25zdCBiYXNlVXJsOiBzdHJpbmcgPSB2aXN1YWxpemF0aW9uQXBpQ29uZmlnLmJhc2VVcmw7XG5cbiAgICAgICAgY29uc3QgY29udGVudFJlc291cmNlOiBDb250ZW50UmVzb3VyY2UgPSBuZXcgQ29udGVudFJlc291cmNlKHtcbiAgICAgICAgICB1c2VTZWN1cmVDb25uZWN0aW9uOiBmYWxzZSxcbiAgICAgICAgICBzb3VyY2VUeXBlOiB0aGlzLmlzMkQgPyAnc3RyZWFtMmQnIDogJ3N0cmVhbScsXG4gICAgICAgICAgc291cmNlOiBgJHtiYXNlVXJsfS92aXMvcHVibGljL3N0b3JhZ2UvdjFgLFxuICAgICAgICAgIHZlaWQ6IHNjZW5lSWQsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuY29udGVudENoYW5nZXNGaW5pc2hlZFxuICAgICAgICAgIC5waXBlKGZpcnN0KCkpXG4gICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICh2aXN1YWxDb250ZW50TG9hZEZpbmlzaGVkOiB7XG4gICAgICAgICAgICAgIGNvbnRlbnQ6IGFueTtcbiAgICAgICAgICAgICAgZmFpbHVyZVJlYXNvbjogYW55O1xuICAgICAgICAgICAgfSkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBzdWNjZWVkZWQgPSAhIXZpc3VhbENvbnRlbnRMb2FkRmluaXNoZWQuY29udGVudDtcbiAgICAgICAgICAgICAgY29uc3Qgc2NlbmVMb2FkSW5mbzogU2NlbmVMb2FkSW5mbyA9IHN1Y2NlZWRlZFxuICAgICAgICAgICAgICAgID8ge1xuICAgICAgICAgICAgICAgICAgICBzY2VuZUxvYWRTdGF0ZTogU2NlbmVMb2FkU3RhdGUuTG9hZGVkLFxuICAgICAgICAgICAgICAgICAgICBsb2FkZWRTY2VuZUluZm86IHtcbiAgICAgICAgICAgICAgICAgICAgICBzY2VuZUlkLFxuICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnRUeXBlLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIDoge1xuICAgICAgICAgICAgICAgICAgICBzY2VuZUxvYWRTdGF0ZTogU2NlbmVMb2FkU3RhdGUuRmFpbGVkLFxuICAgICAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IHZpc3VhbENvbnRlbnRMb2FkRmluaXNoZWQuZmFpbHVyZVJlYXNvbixcbiAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgdGhpcy5zY2VuZUxvYWRJbmZvJC5uZXh0KHNjZW5lTG9hZEluZm8pO1xuICAgICAgICAgICAgICBzdWJzY3JpYmVyLm5leHQoc2NlbmVMb2FkSW5mbyk7XG4gICAgICAgICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICApO1xuXG4gICAgICAgIHRoaXMuY29udGVudExvYWRGaW5pc2hlZC5waXBlKGZpcnN0KCkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgY29uc3Qgc2NlbmVMb2FkSW5mbyA9IHRoaXMuc2NlbmVMb2FkSW5mbyQudmFsdWU7XG4gICAgICAgICAgaWYgKHNjZW5lTG9hZEluZm8uc2NlbmVMb2FkU3RhdGUgPT09IFNjZW5lTG9hZFN0YXRlLkxvYWRlZCkge1xuICAgICAgICAgICAgdGhpcy5zZXRWaWV3cG9ydFJlYWR5KHRydWUpO1xuICAgICAgICAgICAgLy8gRW5zdXJlIHRoYXQgdGhlIHNwaW5uZXIgaXMgaGlkZGVuIGJlZm9yZSB0aGUgdmlld3BvcnQgYmVjb21lcyB2aXNpYmxlLlxuICAgICAgICAgICAgLy8gT3RoZXJ3aXNlIHRoZSBwb3NpdGlvbiBvZiB0aGUgc3Bpbm5lciBjaGFuZ2VzXG4gICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgICAgIHRoaXMudmlld3BvcnQuc2V0VmlzaWJsZSh0cnVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuY29udGVudENvbm5lY3Rvci5hZGRDb250ZW50UmVzb3VyY2UoY29udGVudFJlc291cmNlKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBvblNlbGVjdGlvbkNoYW5nZWQoKTogdm9pZCB7XG4gICAgY29uc3Qgbm9kZVJlZnM6IE5vZGVSZWZbXSA9IFtdO1xuICAgIHRoaXMudmlld1N0YXRlTWFuYWdlci5lbnVtZXJhdGVTZWxlY3Rpb24oKG5vZGVSZWY6IE5vZGVSZWYpID0+XG4gICAgICBub2RlUmVmcy5wdXNoKG5vZGVSZWYpXG4gICAgKTtcblxuICAgIGNvbnN0IG5vZGVJZHM6IHN0cmluZ1tdID0gdGhpcy5ub2RlUmVmVG9QZXJzaXN0ZW50SWQobm9kZVJlZnMsIHRydWUpO1xuICAgIHRoaXMuc2NlbmVOb2RlVG9Qcm9kdWN0TG9va3VwU2VydmljZVxuICAgICAgLmxvb2t1cFByb2R1Y3RDb2Rlcyhub2RlSWRzKVxuICAgICAgLnBpcGUoZmlyc3QoKSlcbiAgICAgIC5zdWJzY3JpYmUoKHByb2R1Y3RDb2Rlczogc3RyaW5nW10pID0+IHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZFByb2R1Y3RDb2Rlc0NoYW5nZS5lbWl0KHByb2R1Y3RDb2Rlcyk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgb25PdXRsaW5pbmdDaGFuZ2VkKCk6IHZvaWQge1xuICAgIGNvbnN0IG5vZGVSZWZzOiBOb2RlUmVmW10gPSBbXTtcbiAgICB0aGlzLnZpZXdTdGF0ZU1hbmFnZXIuZW51bWVyYXRlT3V0bGluZWROb2Rlcygobm9kZVJlZjogTm9kZVJlZikgPT5cbiAgICAgIG5vZGVSZWZzLnB1c2gobm9kZVJlZilcbiAgICApO1xuXG4gICAgY29uc3Qgbm9kZUlkczogc3RyaW5nW10gPSB0aGlzLm5vZGVSZWZUb1BlcnNpc3RlbnRJZChub2RlUmVmcywgdHJ1ZSk7XG4gICAgdGhpcy5zY2VuZU5vZGVUb1Byb2R1Y3RMb29rdXBTZXJ2aWNlXG4gICAgICAubG9va3VwUHJvZHVjdENvZGVzKG5vZGVJZHMpXG4gICAgICAucGlwZShmaXJzdCgpKVxuICAgICAgLnN1YnNjcmliZSgocHJvZHVjdENvZGVzOiBzdHJpbmdbXSkgPT4ge1xuICAgICAgICB0aGlzLnNlbGVjdGVkUHJvZHVjdENvZGVzQ2hhbmdlLmVtaXQocHJvZHVjdENvZGVzKTtcbiAgICAgIH0pO1xuICB9XG59XG4iXX0=