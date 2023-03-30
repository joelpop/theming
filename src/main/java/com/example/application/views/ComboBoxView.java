package com.example.application.views;

import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.combobox.ComboBoxVariant;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;

@PageTitle("ComboBox")
@Route(value = "comboBox", layout = MainLayout.class)
public class ComboBoxView extends ViewThemeVariantComponent<ComboBox<?>, ComboBoxVariant> {

    public ComboBoxView() {
        var comboBox = new ComboBox<String>();
        setItemsFor(comboBox);
        setComponent(comboBox, ComboBoxVariant.values());
    }

}
