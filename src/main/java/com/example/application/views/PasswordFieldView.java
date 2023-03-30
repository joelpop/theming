package com.example.application.views;

import com.vaadin.flow.component.textfield.PasswordField;
import com.vaadin.flow.component.textfield.TextFieldVariant;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;

@PageTitle("PasswordField")
@Route(value = "passwordField", layout = MainLayout.class)
public class PasswordFieldView extends ViewThemeVariantComponent<PasswordField, TextFieldVariant> {

    public PasswordFieldView() {
        var passwordField = new PasswordField();
        setComponent(passwordField, TextFieldVariant.values());
    }

}
