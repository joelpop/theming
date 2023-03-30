package com.example.application.views;

import com.vaadin.flow.component.AbstractField.ComponentValueChangeEvent;
import com.vaadin.flow.component.*;
import com.vaadin.flow.component.HasValue.ValueChangeListener;
import com.vaadin.flow.component.checkbox.Checkbox;
import com.vaadin.flow.component.html.Label;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.listbox.ListBoxBase;
import com.vaadin.flow.component.orderedlayout.FlexLayout;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.shared.HasClearButton;
import com.vaadin.flow.component.shared.HasPrefix;
import com.vaadin.flow.component.shared.HasSuffix;
import com.vaadin.flow.component.shared.HasTooltip;
import com.vaadin.flow.component.tabs.Tab;
import com.vaadin.flow.component.tabs.Tabs;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.component.textfield.TextFieldBase;
import com.vaadin.flow.component.textfield.TextFieldVariant;
import com.vaadin.flow.data.provider.HasListDataView;
import com.vaadin.flow.data.provider.ListDataView;
import com.vaadin.flow.data.value.ValueChangeMode;
import com.vaadin.flow.theme.lumo.LumoUtility;

import java.util.Arrays;

/**
 *
 * <pre>
 * +-content(HorizontalLayout)---------------------------------------------+
 * | +-propertyBlock(VerticalLayout)------+ +-componentBlock(FlexLayout)-+ |
 * | | +-editStateBlock(VerticalLayout)-+ | |                            | |
 * | | |                                | | |                            | |
 * | | +--------------------------------+ | |                            | |
 * | | +-optionBlock(VerticalLayout)----+ | |                            | |
 * | | |                                | | |                            | |
 * | | +--------------------------------+ | |                            | |
 * | | +-variantBlock(VerticalLayout)---+ | |                            | |
 * | | |                                | | |                            | |
 * | | +--------------------------------+ | |                            | |
 * | +------------------------------------+ +----------------------------+ |
 * +-----------------------------------------------------------------------+
 * </pre>
 */
public class ViewComponent<C extends Component> extends Composite<HorizontalLayout> {
    private static final String[] VALUES = { "One", "Two", "Three" };

    private final VerticalLayout propertyBlock;
    private final FlexLayout componentBlock;
    private C component;

    public ViewComponent() {
        propertyBlock = new VerticalLayout();
        propertyBlock.addClassNames(LumoUtility.Border.ALL, LumoUtility.BorderRadius.MEDIUM);
        propertyBlock.setWidth(null);
        propertyBlock.setPadding(true);

        componentBlock = new FlexLayout();
        componentBlock.setHeight("fit-content");
        componentBlock.setWidth("300px");

        var content = getContent();
        content.setPadding(true);
        content.add(propertyBlock);
        content.add(componentBlock);
    }

    public void setComponent(C component) {
        this.component = component;

        if (component instanceof HasSize hasSize) {
            hasSize.setWidthFull();
        }

        addPropertyComponent(createEditStateBlock());
        addPropertyComponent(createOptionsBlock());

        componentBlock.add(component);
    }

    void addPropertyComponent(Component component) {
        propertyBlock.add(component);
    }

    private Component createEditStateBlock() {
        var editStateBlock = new VerticalLayout();
        editStateBlock.setVisible(false);

        if (component instanceof HasValueAndElement<?,?> hasValueAndElement) {
            editStateBlock.add(createBooleanOption("Read Only",
                    event -> hasValueAndElement.setReadOnly(event.getValue())));
        }

        if (component instanceof HasEnabled hasEnabled) {
            editStateBlock.add(createBooleanOption("Disable",
                    event -> hasEnabled.setEnabled(!event.getValue())));
        }

        if (editStateBlock.getChildren().findAny().isPresent()) {
            var editStateLabel = new Label("Edit State");
            editStateLabel.addClassNames(LumoUtility.FontSize.SMALL, LumoUtility.TextColor.BODY);

            editStateBlock.setVisible(true);
            editStateBlock.setPadding(false);
            editStateBlock.setSpacing(false);
            editStateBlock.addComponentAsFirst(editStateLabel);
        }

        return editStateBlock;
    }

    private Component createOptionsBlock() {
        var optionsBlock = new VerticalLayout();
        optionsBlock.setVisible(false);

        if (component instanceof HasLabel hasLabel) {
            optionsBlock.add(createDefaultTextOption("Label",
                    event -> hasLabel.setLabel(event.getValue())));
        }

        if (component instanceof HasValueAndElement<?,?> hasValueAndElement &&
                !(component instanceof ListBoxBase<?,?,?>)) {
            optionsBlock.add(createDefaultBooleanOption("Required",
                    event -> hasValueAndElement.setRequiredIndicatorVisible(event.getValue())));
        }

        if (component instanceof HasPrefix hasPrefix) {
            optionsBlock.add(createDefaultTextOption("Prefix",
                    event -> hasPrefix.setPrefixComponent(new Span(event.getValue()))));
        }

        if (component instanceof TextFieldBase<?,?> textFieldBase) {
            optionsBlock.add(createDefaultTextOption("Placeholder",
                    event -> textFieldBase.setPlaceholder(event.getValue())));
        }

        if (component instanceof HasText hasText) {
            optionsBlock.add(createDefaultTextOption("Text",
                    event -> hasText.setText(event.getValue())));
        }

        if (component instanceof HasSuffix hasSuffix) {
            optionsBlock.add(createDefaultTextOption("Suffix",
                    event -> hasSuffix.setSuffixComponent(new Span(event.getValue()))));
        }

        if (component instanceof HasClearButton hasClearButton) {
            optionsBlock.add(createDefaultBooleanOption("Show Clear Button",
                    event -> hasClearButton.setClearButtonVisible(event.getValue())));
        }

        if (component instanceof HasHelper hasHelper) {
            optionsBlock.add(createDefaultTextOption("Helper Text",
                    event -> hasHelper.setHelperText(event.getValue())));
        }

        if (component instanceof HasTooltip hasTooltip) {
            optionsBlock.add(createDefaultTextOption("Tooltip",
                    event -> hasTooltip.setTooltipText(event.getValue())));
        }

        if (optionsBlock.getChildren().findAny().isPresent()) {
            var optionsLabel = new Label("Properties");
            optionsLabel.addClassNames(LumoUtility.FontSize.SMALL, LumoUtility.TextColor.BODY);

            optionsBlock.setVisible(true);
            optionsBlock.setPadding(false);
            optionsBlock.setSpacing(false);
            optionsBlock.addComponentAsFirst(optionsLabel);
        }

        return optionsBlock;
    }

    private static TextField createTextOption(String label, ValueChangeListener<? super ComponentValueChangeEvent<TextField, String>> listener) {
        var textField = new TextField(label);
        textField.addThemeVariants(TextFieldVariant.LUMO_SMALL);
        textField.setClearButtonVisible(true);
        textField.setValueChangeMode(ValueChangeMode.LAZY);
        textField.addValueChangeListener(listener);
        return textField;
    }

    private static Component createDefaultTextOption(String label, ValueChangeListener<? super ComponentValueChangeEvent<TextField, String>> listener) {
        var textField = createTextOption(label, listener);
        textField.setValue(label);

        return textField;
    }

    private static Checkbox createBooleanOption(String label, ValueChangeListener<? super ComponentValueChangeEvent<Checkbox, Boolean>> listener) {
        var checkbox = new Checkbox(label);
        checkbox.addClassNames(LumoUtility.FontSize.SMALL);
        checkbox.addValueChangeListener(listener);
        return checkbox;
    }

    private static Component createDefaultBooleanOption(String label, ValueChangeListener<? super ComponentValueChangeEvent<Checkbox, Boolean>> listener) {
        var checkbox = createBooleanOption(label, listener);
        checkbox.setValue(true);

        return checkbox;
    }

    public static <V extends HasListDataView<String, ? extends ListDataView<String,?>>>
            void setItemsFor(V listDataView) {
        listDataView.setItems(VALUES);
    }

    public static <H extends HasComponents> void setComponentsFor(H hasComponents) {
        Arrays.stream(VALUES)
                .map(Span::new)
                .forEach(hasComponents::add);
    }

    public static <T extends Tabs> void setTabsFor(T hasTabs) {
        Arrays.stream(VALUES)
                .map(Tab::new)
                .forEach(hasTabs::add);
    }
}
