package com.example.application.views;

import com.example.application.util.StringUtil;
import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.checkbox.CheckboxGroup;
import com.vaadin.flow.component.checkbox.CheckboxGroupVariant;
import com.vaadin.flow.component.shared.HasThemeVariant;
import com.vaadin.flow.component.shared.ThemeVariant;
import com.vaadin.flow.theme.lumo.LumoUtility;

/**
 *
 * <pre>
 * +-content(HorizontalLayout)-------------------------------------------+
 * | +-propertyBlock(VerticalLayout)----+ +-componentBlock(FlexLayout)-+ |
 * | | +-editStateBlock(FlexLayout)---+ | |                            | |
 * | | |                              | | |                            | |
 * | | +------------------------------+ | |                            | |
 * | | +-optionBlock(VerticalLayout)--+ | |                            | |
 * | | |                              | | |                            | |
 * | | +------------------------------+ | |                            | |
 * | | +-variantBlock(VerticalLayout)-+ | |                            | |
 * | | |                              | | |                            | |
 * | | +------------------------------+ | |                            | |
 * | +----------------------------------+ +----------------------------+ |
 * +---------------------------------------------------------------------+
 * </pre>
 */
public class ViewThemeVariantComponent<C extends Component & HasThemeVariant<V>, V extends ThemeVariant> extends ViewComponent<C> {

    public ViewThemeVariantComponent() {
        //
    }

    public void setComponent(C component, V[] themeVariants) {
        setComponent(component);

        addPropertyComponent(createVariantsBlock(component, themeVariants));
    }

    @SuppressWarnings("unchecked")
    private Component createVariantsBlock(C hasThemeVariant, V[] themeVariants) {
        var themeVariantCheckboxGroup = new CheckboxGroup<V>("Theme Variants");
        themeVariantCheckboxGroup.addClassNames(LumoUtility.FontSize.SMALL);
        themeVariantCheckboxGroup.addThemeVariants(CheckboxGroupVariant.LUMO_VERTICAL);
        themeVariantCheckboxGroup.setItemLabelGenerator(ViewThemeVariantComponent::itemLabelGenerator);
        themeVariantCheckboxGroup.addSelectionListener(event -> {
            event.getRemovedSelection().forEach(hasThemeVariant::removeThemeVariants);
            event.getAddedSelection().forEach(hasThemeVariant::addThemeVariants);
        });
        themeVariantCheckboxGroup.setItems(themeVariants);

        return themeVariantCheckboxGroup;
    }

    private static <V extends ThemeVariant> String itemLabelGenerator(V themeVariant) {
        return StringUtil.constToTitleCase(themeVariant.toString());
    }
}
