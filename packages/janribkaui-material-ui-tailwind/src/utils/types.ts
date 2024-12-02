import { SlotComponentProps } from '@janribkaui/utils';

export type {
  EventHandlers,
  WithOptionalOwnerState,
  SlotComponentProps,
  SlotComponentPropsWithSlotState,
} from '@janribkaui/utils';

export type SlotCommonProps = {
  component?: React.ElementType;
};

export type SlotProps<
  TSlotComponent extends React.ElementType,
  TOverrides,
  TOwnerState,
> = SlotComponentProps<TSlotComponent, SlotCommonProps & TOverrides, TOwnerState>;

/**
 * Use the keys of `Slots` to make sure that K contains all of the keys
 *
 * @example CreateSlotsAndSlotProps<{ root: React.ElementType, decorator: React.ElementType }, { root: ..., decorator: ... }>
 */
export type CreateSlotsAndSlotProps<Slots, K extends Record<keyof Slots, any>> = {
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots?: Partial<Slots>;
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps?: {
    [P in keyof K]?: K[P];
  };
};
