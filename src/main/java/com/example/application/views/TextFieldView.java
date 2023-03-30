package com.example.application.views;

import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.component.textfield.TextFieldVariant;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;

@PageTitle("TextField")
@Route(value = "textField", layout = MainLayout.class)
public class TextFieldView extends ViewThemeVariantComponent<TextField, TextFieldVariant> {

    public TextFieldView() {
        var textField = new TextField();
        setComponent(textField, TextFieldVariant.values());
    }

}
