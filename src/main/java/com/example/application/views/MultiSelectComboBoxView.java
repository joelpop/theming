package com.example.application.views;

import com.vaadin.flow.component.combobox.MultiSelectComboBox;
import com.vaadin.flow.component.combobox.MultiSelectComboBoxVariant;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;

@PageTitle("MultiSelectComboBox")
@Route(value = "multiSelectComboBox", layout = MainLayout.class)
public class MultiSelectComboBoxView extends ViewThemeVariantComponent<MultiSelectComboBox<?>, MultiSelectComboBoxVariant> {

    public MultiSelectComboBoxView() {
        var multiSelectComboBox = new MultiSelectComboBox<String>();
        setItemsFor(multiSelectComboBox);
        setComponent(multiSelectComboBox, MultiSelectComboBoxVariant.values());
    }

}
