package com.example.application.views;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;

@PageTitle("Button")
@Route(value = "button", layout = MainLayout.class)
public class ButtonView extends ViewThemeVariantComponent<Button, ButtonVariant> {

    public ButtonView() {
        var button = new Button();
        setComponent(button, ButtonVariant.values());
    }

}
