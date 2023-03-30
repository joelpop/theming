package com.example.application.views;

import com.vaadin.flow.component.textfield.BigDecimalField;
import com.vaadin.flow.component.textfield.TextFieldVariant;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;

@PageTitle("BigDecimalField")
@Route(value = "bigDecimalField", layout = MainLayout.class)
public class BigDecimalFieldView extends ViewThemeVariantComponent<BigDecimalField, TextFieldVariant> {

    public BigDecimalFieldView() {
        var bigDecimalField = new BigDecimalField();
//        bigDecimalField.setWidth("192px");  TODO report BigDecimalField not having the same default width as its peers
        setComponent(bigDecimalField, TextFieldVariant.values());
    }

}
