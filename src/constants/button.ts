import { colors } from "./colors";

export const BUTTONS = {
    PRIMARY: "Primary",
    SECONDARY: "Secondary",
    OUTLINE: "Outline",
    SUCCESS: "Success",
    WARNING: "Warning",
    ERROR: "Error",
}

export const BUTTONS_STYLES = {
    [BUTTONS.PRIMARY]: {
        background: colors.button.primary,
        text: colors.button.primaryText,
        border: colors.button.primary,
        hover: colors.button.primaryDark,
        hoverText: colors.button.primaryText,
        active: colors.button.primaryExtraDark,
        activeText: colors.button.primaryText,
    },
    [BUTTONS.SECONDARY]: {
        background: colors.button.secondary,
        text: colors.button.secondaryText,
        border: colors.button.secondary,
        hover: colors.button.secondaryDark,
        hoverText: colors.button.secondaryText,
        active: colors.button.secondaryExtraDark,
        activeText: colors.button.secondaryText,
    },
    [BUTTONS.OUTLINE]: {
        background: colors.button.outline,
        text: colors.button.outlineText,
        border: colors.button.outline,
        hover: colors.button.outlineDark,
        hoverText: colors.button.outlineText,
        active: colors.button.outlineExtraDark,
        activeText: colors.button.outlineText,
    },
    [BUTTONS.SUCCESS]: {
        background: colors.button.success,
        text: colors.button.successText,
        border: colors.button.success,
        hover: colors.button.successDark,
        hoverText: colors.button.successText,
        active: colors.button.successExtraDark,
        activeText: colors.button.successText,
    },
    [BUTTONS.WARNING]: {
        background: colors.button.warning,
        text: colors.button.warningText,
        border: colors.button.warning,
        hover: colors.button.warningDark,
        hoverText: colors.button.warningText,
        active: colors.button.warningExtraDark,
        activeText: colors.button.warningText,
    },
    [BUTTONS.ERROR]: {
        background: colors.button.error,
        text: colors.button.errorText,
        border: colors.button.error,
        hover: colors.button.errorDark,
        hoverText: colors.button.errorText,
        active: colors.button.errorExtraDark,
        activeText: colors.button.errorText,
    },
};



