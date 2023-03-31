package com.example.application.views;

import com.vaadin.flow.component.textfield.EmailField;
import com.vaadin.flow.component.textfield.TextFieldVariant;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;

@PageTitle("EmailField")
@Route(value = "emailField", layout = MainLayout.class)
public class EmailFieldView extends ViewThemeVariantComponent<EmailField, TextFieldVariant> {

    public EmailFieldView() {
        var emailField = new EmailField();
        setComponent(emailField, TextFieldVariant.values());
    }

}
