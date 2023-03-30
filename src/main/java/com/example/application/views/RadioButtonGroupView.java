package com.example.application.views;

import com.vaadin.flow.component.radiobutton.RadioButtonGroup;
import com.vaadin.flow.component.radiobutton.RadioGroupVariant;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;

@PageTitle("RadioButtonGroup")
@Route(value = "radioButtonGroup", layout = MainLayout.class)
public class RadioButtonGroupView extends ViewThemeVariantComponent<RadioButtonGroup<?>, RadioGroupVariant> {

    public RadioButtonGroupView() {
        var radioButtonGroup = new RadioButtonGroup<String>();
        setItemsFor(radioButtonGroup);
        setComponent(radioButtonGroup, RadioGroupVariant.values());
    }

}
