import { Configurator } from '../../model/configurator.model';
import * as i0 from "@angular/core";
/**
 * Service that provides helper methods for the basic configurator effects,
 * in order to enhance them without the need to introduce new effects
 */
export declare class ConfiguratorBasicEffectService {
    /**
     * Finds first group with attributes for a configuration. Throws error if such a group does not exist,
     * as this is an illegal state
     * @param configuration
     * @returns Group id
     */
    getFirstGroupWithAttributes(configuration: Configurator.Configuration): string;
    /**
     * Finds first group with attributes in a list of groups
     * @param groups
     * @returns Group or undefined if such a group does not exist
     */
    protected getFirstGroupWithAttributesForList(groups: Configurator.Group[]): string | undefined;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfiguratorBasicEffectService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ConfiguratorBasicEffectService>;
}
