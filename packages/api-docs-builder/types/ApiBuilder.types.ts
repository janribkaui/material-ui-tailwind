import { ReactDocgenApi } from 'react-docgen';
import { JSDocTagInfo } from 'typescript';

import { ComponentClassDefinition } from '@janribkaui/internal-docs-utils';

import { ComponentInfo, HookInfo, SeeMore, Slot } from './utils.types';

export type AdditionalPropsInfo = {
  cssApi?: boolean;
  sx?: boolean;
  slotsApi?: boolean;
  'joy-size'?: boolean;
  'joy-color'?: boolean;
  'joy-variant'?: boolean;
};

/**
 * Common interface for both Component and Hook API builders.
 */
interface CommonReactApi extends ReactDocgenApi {
  demos: ReturnType<HookInfo['getDemos']>;
  EOL: string;
  filename: string;
  apiPathname: string;
  description: string;
  /**
   * Different ways to import components
   */
  imports: string[];
  /**
   * result of path.readFileSync from the `filename` in utf-8
   */
  src: string;
  /**
   * The folder used to store the API translation.
   */
  apiDocsTranslationFolder?: string;
  deprecated: true | undefined;
}

export interface PropsTableItem {
  default: string | undefined;
  required: boolean | undefined;
  type: { name: string; description: string | undefined };
  deprecated: true | undefined;
  deprecationInfo: string | undefined;
  signature: undefined | { type: string; describedArgs?: string[]; returned?: string };
  additionalInfo?: AdditionalPropsInfo;
  seeMoreLink?: SeeMore['link'];
}

export interface PropsTranslations {
  componentDescription: string;
  deprecationInfo: string | undefined;
  propDescriptions: {
    [key: string]: {
      description: string;
      requiresRef?: boolean;
      deprecated?: string;
      typeDescriptions?: { [t: string]: string };
      seeMoreText?: string;
    };
  };
  classDescriptions: {
    [key: string]: {
      description: string;
      conditions?: string;
      nodeName?: string;
      deprecationInfo?: string;
    };
  };
  slotDescriptions?: { [key: string]: string };
}

export interface ComponentReactApi extends CommonReactApi {
  forwardsRefTo: string | undefined;
  inheritance: ReturnType<ComponentInfo['getInheritance']>;
  /**
   * react component name
   * @example 'Accordion'
   */
  name: string;
  muiName: string;
  spread: boolean | undefined;
  /**
   * If `true`, the component supports theme default props customization.
   * If `null`, we couldn't infer this information.
   * If `undefined`, it's not applicable in this context, for example Base UI components.
   */
  themeDefaultProps: boolean | undefined | null;
  classes: ComponentClassDefinition[];
  slots: Slot[];
  propsTable: _.Dictionary<PropsTableItem>;
  translations: PropsTranslations;
}

export interface ComponentApiContent {
  props: { [name: string]: PropsTableItem };
  name: string;
  imports: string[];
  slots?: Slot[];
  classes: ComponentClassDefinition[];
  spread: boolean | undefined;
  themeDefaultProps: boolean | null | undefined;
  muiName: string;
  forwardsRefTo: string | undefined;
  filename: string;
  inheritance: null | { component: string; pathname: string };
  demos: string;
  cssComponent: boolean;
  deprecated: true | undefined;
}

export interface ParsedProperty {
  name: string;
  description: string;
  tags: { [tagName: string]: JSDocTagInfo };
  required: boolean;
  typeStr: string;
}

export interface HooksTranslations {
  hookDescription: string;
  deprecationInfo: string | undefined;
  parametersDescriptions: {
    [key: string]: {
      description: string;
      deprecated?: string;
    };
  };
  returnValueDescriptions: {
    [key: string]: {
      description: string;
      deprecated?: string;
    };
  };
}

interface AttributeDefinition {
  default: string | undefined;
  required: boolean | undefined;
  type: { name: string; description: string | undefined };
  deprecated: true | undefined;
  deprecationInfo: string | undefined;
}

export interface HookReactApi extends CommonReactApi {
  parameters?: ParsedProperty[];
  returnValue?: ParsedProperty[];
  /**
   * hook name
   * @example 'useButton'
   */
  name: string;
  parametersTable: _.Dictionary<AttributeDefinition>;
  returnValueTable: _.Dictionary<AttributeDefinition>;
  translations: HooksTranslations;
}

export interface HookApiContent {
  parameters: Record<string, AttributeDefinition>;
  returnValue: Record<string, AttributeDefinition>;
  name: string;
  filename: string;
  imports: string[];
  demos: string;
  deprecated: boolean | undefined;
}
