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
import com.vaadin.flow.component.shared.*;
import com.vaadin.flow.component.tabs.Tab;
import com.vaadin.flow.component.tabs.Tabs;
import com.vaadin.flow.component.textfield.PasswordField;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.component.textfield.TextFieldBase;
import com.vaadin.flow.component.textfield.TextFieldVariant;
import com.vaadin.flow.data.provider.HasListDataView;
import com.vaadin.flow.data.provider.ListDataView;
import com.vaadin.flow.data.value.ValueChangeMode;
import com.vaadin.flow.theme.lumo.LumoUtility;

import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

/**
 *
 * <pre>
 * +-content(HorizontalLayout)----------------------------------------------------------------------------------+
 * | +-optionBlock(VerticalLayout)--------+ +-propertySlot(FlexLayout)----------+ +-componentSlot(FlexLayout)-+ |
 * | | +-editStateBlock(VerticalLayout)-+ | | +-propertyBlock(VerticalLayout)-+ | |                           | |
 * | | |                                | | | |                               | | |                           | |
 * | | +--------------------------------+ | | |                               | | |                           | |
 * | | +-variantBlock(VerticalLayout)---+ | | |                               | | |                           | |
 * | | |                                | | | |                               | | |                           | |
 * | | +--------------------------------+ | | +-------------------------------+ | |                           | |
 * | +------------------------------------+ +-----------------------------------+ +---------------------------+ |
 * +------------------------------------------------------------------------------------------------------------+
 * </pre>
 */
public class ViewComponent<C extends Component> extends Composite<HorizontalLayout> {
    private static final String[] VALUES = { "One", "Two", "Three" };
    public static final String READ_ONLY = "Read Only";
    public static final String DISABLE = "Disable";
    public static final String LABEL = "Label";
    public static final String REQUIRED = "Required";
    public static final String INPUT_ELEMENT = "inputElement";
    public static final String PREFIX = "Prefix";
    public static final String PLACEHOLDER = "Placeholder";
    public static final String TEXT = "Text";
    public static final String SUFFIX = "Suffix";
    public static final String SHOW_CLEAR_BUTTON = "Show Clear Button";
    public static final String HELPER_TEXT = "Helper Text";
    public static final String ERROR_MESSAGE = "Error Message";
    public static final String TOOLTIP = "Tooltip";
    public static final String PASSWORD_FIELD_BUTTON = "password-field-button";

    private final Map<String, Boolean> capabilities;

    private final VerticalLayout optionBlock;
    private final FlexLayout propertySlot;
    private final FlexLayout componentSlot;
    private C component;

    public ViewComponent() {
        capabilities = new LinkedHashMap<>();

        optionBlock = new VerticalLayout();
        optionBlock.addClassNames(LumoUtility.Border.ALL, LumoUtility.BorderRadius.MEDIUM);
        optionBlock.setWidth(null);

        propertySlot = new FlexLayout();

        componentSlot = new FlexLayout();
        componentSlot.setHeight("fit-content");
        componentSlot.setWidth("300px");

        var content = getContent();
        content.setPadding(true);
        content.add(optionBlock);
        content.add(propertySlot);
        content.add(componentSlot);
    }

    public void setComponent(C component) {
        this.component = component;

        if (component instanceof HasSize hasSize) {
            hasSize.setWidthFull();
        }

        addOptionComponent(createEditStateBlock());
        propertySlot.add(createPropertyBlock());

        componentSlot.add(component);
    }

    protected void addOptionComponent(Component component) {
        optionBlock.add(component);
    }

    private Component createEditStateBlock() {
        var editStateBlock = new VerticalLayout();
        editStateBlock.setVisible(false);

        hasntCapability(READ_ONLY);
        if (component instanceof HasValueAndElement<?,?> hasValueAndElement) {
            hasCapability(READ_ONLY);
            editStateBlock.add(createBooleanOption(READ_ONLY,
                    event -> hasValueAndElement.setReadOnly(event.getValue())));
        }

        hasntCapability(DISABLE);
        if (component instanceof HasEnabled hasEnabled) {
            hasCapability(DISABLE);
            editStateBlock.add(createBooleanOption(DISABLE,
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

    @SuppressWarnings("java:S3776")
    private Component createPropertyBlock() {
        var propertyBlock = new VerticalLayout();
        propertyBlock.setVisible(false);

        hasntCapability(LABEL);
        if (component instanceof HasLabel hasLabel) {
            hasCapability(LABEL);
            propertyBlock.add(createDefaultTextOption(LABEL,
                    event -> hasLabel.setLabel(event.getValue())));
        }

        hasntCapability(REQUIRED);
        if (component instanceof HasValueAndElement<?,?> hasValueAndElement &&
                !(component instanceof ListBoxBase<?,?,?>)) {
            hasCapability(REQUIRED);
            propertyBlock.add(createDefaultBooleanOption(REQUIRED,
                    event -> hasValueAndElement.setRequiredIndicatorVisible(event.getValue())));
        }

        addCapability(INPUT_ELEMENT);
        component.getElement()
                .executeJs("return (this.inputElement != null);")
                .then(jsonValue -> {
                    if (Boolean.parseBoolean(jsonValue.asString())) {
                        hasDelayedCapability(INPUT_ELEMENT);
                    }
                    else {
                        hasntDelayedCapability(INPUT_ELEMENT);
                    }
                });

        hasntCapability(PREFIX);
        if (component instanceof HasPrefix hasPrefix) {
            hasCapability(PREFIX);
            propertyBlock.add(createDefaultTextOption(PREFIX,
                    event -> hasPrefix.setPrefixComponent(new Span(event.getValue()))));
        }

        hasntCapability(PLACEHOLDER);
        if (component instanceof TextFieldBase<?,?> textFieldBase) {
            hasCapability(PLACEHOLDER);
            propertyBlock.add(createDefaultTextOption(PLACEHOLDER,
                    event -> textFieldBase.setPlaceholder(event.getValue())));
        }

        hasntCapability(TEXT);
        if (component instanceof HasText hasText) {
            hasCapability(TEXT);
            propertyBlock.add(createDefaultTextOption(TEXT,
                    event -> hasText.setText(event.getValue())));
        }

        hasntCapability(SUFFIX);
        if (component instanceof HasSuffix hasSuffix) {
            hasCapability(SUFFIX);
            propertyBlock.add(createDefaultTextOption(SUFFIX,
                    event -> hasSuffix.setSuffixComponent(new Span(event.getValue()))));
        }

        hasntCapability(SHOW_CLEAR_BUTTON);
        if (component instanceof HasClearButton hasClearButton) {
            hasCapability(SHOW_CLEAR_BUTTON);
            propertyBlock.add(createDefaultBooleanOption(SHOW_CLEAR_BUTTON,
                    event -> hasClearButton.setClearButtonVisible(event.getValue())));
        }

        hasntCapability(HELPER_TEXT);
        if (component instanceof HasHelper hasHelper) {
            hasCapability(HELPER_TEXT);
            propertyBlock.add(createDefaultTextOption(HELPER_TEXT,
                    event -> hasHelper.setHelperText(event.getValue())));
        }

        hasntCapability(ERROR_MESSAGE);
        if (component instanceof HasValidationProperties hasValidationProperties) {
            hasCapability(ERROR_MESSAGE);
            propertyBlock.add(createDefaultTextOption(ERROR_MESSAGE,
                    event -> hasValidationProperties.setErrorMessage(event.getValue())));
        }

        hasntCapability(TOOLTIP);
        if (component instanceof HasTooltip hasTooltip) {
            hasCapability(TOOLTIP);
            propertyBlock.add(createDefaultTextOption(TOOLTIP,
                    event -> hasTooltip.setTooltipText(event.getValue())));
        }

        hasntCapability(PASSWORD_FIELD_BUTTON);
        if (component instanceof PasswordField) {
            hasCapability(PASSWORD_FIELD_BUTTON);
        }

        if (propertyBlock.getChildren().findAny().isPresent()) {
            var propertiesLabel = new Label("Properties");
            propertiesLabel.addClassNames(LumoUtility.FontSize.SMALL, LumoUtility.TextColor.BODY);

            propertyBlock.addClassNames(LumoUtility.Border.ALL, LumoUtility.BorderRadius.MEDIUM);
            propertyBlock.setVisible(true);
            propertyBlock.setSpacing(false);
            propertyBlock.addComponentAsFirst(propertiesLabel);
        }

        return propertyBlock;
    }

    private TextField createTextOption(String label, ValueChangeListener<? super ComponentValueChangeEvent<TextField, String>> listener) {
        var textField = new TextField(label);
        textField.addThemeVariants(TextFieldVariant.LUMO_SMALL);
        textField.setClearButtonVisible(true);
        textField.setValueChangeMode(ValueChangeMode.LAZY);
        textField.addValueChangeListener(listener);
        return textField;
    }

    private Component createDefaultTextOption(String label, ValueChangeListener<? super ComponentValueChangeEvent<TextField, String>> listener) {
        var textField = createTextOption(label, listener);
        textField.setValue(label);

        return textField;
    }

    private Checkbox createBooleanOption(String label, ValueChangeListener<? super ComponentValueChangeEvent<Checkbox, Boolean>> listener) {
        var checkbox = new Checkbox(label);
        checkbox.addClassNames(LumoUtility.FontSize.SMALL);
        checkbox.addValueChangeListener(listener);
        return checkbox;
    }

    private Component createDefaultBooleanOption(String label, ValueChangeListener<? super ComponentValueChangeEvent<Checkbox, Boolean>> listener) {
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

    private void addCapability(String key) {
        capabilities.put(key, null);
    }

    private void hasntCapability(String key) {
        capabilities.put(key, false);
    }

    private void hasCapability(String key) {
        capabilities.put(key, true);
    }

    private void hasntDelayedCapability(String key) {
        hasntCapability(key);
        logCapabilitiesIfAllPresent();
    }

    private void hasDelayedCapability(String key) {
        hasCapability(key);
        logCapabilitiesIfAllPresent();
    }

    private void logCapabilitiesIfAllPresent() {
        if (capabilities.values().stream()
                .noneMatch(Objects::isNull)) {
            System.out.printf("%s\t%s%n",
                    component.getClass().getSimpleName(),
                    capabilities.values().stream()
                            .map(Object::toString)
                            .collect(Collectors.joining("\t")));
        }
    }

    @Override
    protected void onAttach(AttachEvent attachEvent) {
        super.onAttach(attachEvent);
        logCapabilitiesIfAllPresent();
    }
}
