package com.example.application.views;

import com.vaadin.flow.component.textfield.TextArea;
import com.vaadin.flow.component.textfield.TextAreaVariant;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;

@PageTitle("TextArea")
@Route(value = "textArea", layout = MainLayout.class)
public class TextAreaView extends ViewThemeVariantComponent<TextArea, TextAreaVariant> {

    public TextAreaView() {
        var textArea = new TextArea();
        setComponent(textArea, TextAreaVariant.values());
    }

}
