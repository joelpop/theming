package com.example.application.views;

import com.vaadin.flow.component.textfield.IntegerField;
import com.vaadin.flow.component.textfield.TextFieldVariant;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;

@PageTitle("IntegerField")
@Route(value = "integerField", layout = MainLayout.class)
public class IntegerFieldView extends ViewThemeVariantComponent<IntegerField, TextFieldVariant> {

    public IntegerFieldView() {
        var integerField = new IntegerField();
        setComponent(integerField, TextFieldVariant.values());
    }

}
