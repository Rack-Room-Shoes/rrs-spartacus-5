import { OnInit } from '@angular/core';
import { LanguageService } from '@spartacus/core';
import { ConfiguratorRouterExtractorService } from '@spartacus/product-configurator/common';
import { Observable } from 'rxjs';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { ConfiguratorGroupsService } from '../../core/facade/configurator-groups.service';
import { Configurator } from '../../core/model/configurator.model';
import { ConfiguratorStorefrontUtilsService } from '../service/configurator-storefront-utils.service';
import { ConfigFormUpdateEvent } from './configurator-form.event';
import * as i0 from "@angular/core";
export declare class ConfiguratorFormComponent implements OnInit {
    protected configuratorCommonsService: ConfiguratorCommonsService;
    protected configuratorGroupsService: ConfiguratorGroupsService;
    protected configRouterExtractorService: ConfiguratorRouterExtractorService;
    protected languageService: LanguageService;
    protected configUtils: ConfiguratorStorefrontUtilsService;
    configuration$: Observable<Configurator.Configuration>;
    currentGroup$: Observable<Configurator.Group>;
    activeLanguage$: Observable<string>;
    uiType: typeof Configurator.UiType;
    constructor(configuratorCommonsService: ConfiguratorCommonsService, configuratorGroupsService: ConfiguratorGroupsService, configRouterExtractorService: ConfiguratorRouterExtractorService, languageService: LanguageService, configUtils: ConfiguratorStorefrontUtilsService);
    ngOnInit(): void;
    updateConfiguration(event: ConfigFormUpdateEvent): void;
    isConflictGroupType(groupType: Configurator.GroupType): boolean;
    /**
     * Generates a group ID.
     *
     * @param {string} groupId - group ID
     * @returns {string | undefined} - generated group ID
     */
    createGroupId(groupId?: string): string | undefined;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfiguratorFormComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ConfiguratorFormComponent, "cx-configurator-form", never, {}, {}, never, never, false>;
}
