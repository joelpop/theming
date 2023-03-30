package com.example.application.views;

import com.vaadin.flow.component.checkbox.CheckboxGroup;
import com.vaadin.flow.component.checkbox.CheckboxGroupVariant;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;

@PageTitle("CheckboxGroup")
@Route(value = "checkboxGroup", layout = MainLayout.class)
public class CheckboxGroupView extends ViewThemeVariantComponent<CheckboxGroup<?>, CheckboxGroupVariant> {

    public CheckboxGroupView() {
        var checkboxGroup = new CheckboxGroup<String>();
        setItemsFor(checkboxGroup);
        setComponent(checkboxGroup, CheckboxGroupVariant.values());
    }

}
