package com.example.application.views;

import com.vaadin.flow.component.textfield.NumberField;
import com.vaadin.flow.component.textfield.TextFieldVariant;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;

@PageTitle("NumberField")
@Route(value = "numberField", layout = MainLayout.class)
public class NumberFieldView extends ViewThemeVariantComponent<NumberField, TextFieldVariant> {

    public NumberFieldView() {
        var numberField = new NumberField();
        setComponent(numberField, TextFieldVariant.values());
    }

}
