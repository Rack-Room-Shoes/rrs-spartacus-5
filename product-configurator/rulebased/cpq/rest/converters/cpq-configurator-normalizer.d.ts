import { Converter, TranslationService } from '@spartacus/core';
import { Configurator } from '@spartacus/product-configurator/rulebased';
import { Cpq } from '../cpq.models';
import { CpqConfiguratorNormalizerUtilsService } from './cpq-configurator-normalizer-utils.service';
import * as i0 from "@angular/core";
export declare class CpqConfiguratorNormalizer implements Converter<Cpq.Configuration, Configurator.Configuration> {
    protected cpqConfiguratorNormalizerUtilsService: CpqConfiguratorNormalizerUtilsService;
    protected translation: TranslationService;
    constructor(cpqConfiguratorNormalizerUtilsService: CpqConfiguratorNormalizerUtilsService, translation: TranslationService);
    convert(source: Cpq.Configuration, target?: Configurator.Configuration): Configurator.Configuration;
    protected generateTotalNumberOfIssues(source: Cpq.Configuration): number;
    protected generateWarningMessages(source: Cpq.Configuration): string[];
    protected generateErrorMessages(source: Cpq.Configuration): string[];
    protected convertGroup(source: Cpq.Tab, sourceAttributes: Cpq.Attribute[], currency: string, groupList: Configurator.Group[], flatGroupList: Configurator.Group[]): void;
    protected convertGenericGroup(sourceAttributes: Cpq.Attribute[], incompleteAttributes: string[], currency: string, groupList: Configurator.Group[], flatGroupList: Configurator.Group[]): void;
    protected convertAttribute(sourceAttribute: Cpq.Attribute, groupId: number, currency: string, attributeList: Configurator.Attribute[]): void;
    protected setSelectedSingleValue(attribute: Configurator.Attribute): void;
    protected convertValueDisplay(sourceValue: Cpq.Value, sourceAttribute: Cpq.Attribute, value: Configurator.Value): void;
    protected convertValue(sourceValue: Cpq.Value, sourceAttribute: Cpq.Attribute, currency: string, values: Configurator.Value[]): void;
    protected convertAttributeTypeOld(displayAs: Cpq.DisplayAs, displayAsProduct?: boolean): Configurator.UiType;
    protected convertAttributeType(sourceAttribute: Cpq.Attribute): Configurator.UiType;
    protected compileAttributeIncomplete(attribute: Configurator.Attribute): void;
    protected hasValueToBeIgnored(attribute: Cpq.Attribute, value: Cpq.Value): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<CpqConfiguratorNormalizer, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CpqConfiguratorNormalizer>;
}
