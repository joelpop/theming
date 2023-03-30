package com.example.application.views;

import com.vaadin.flow.component.select.Select;
import com.vaadin.flow.component.select.SelectVariant;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;

@PageTitle("Select")
@Route(value = "select", layout = MainLayout.class)
public class SelectView extends ViewThemeVariantComponent<Select<?>, SelectVariant> {

    public SelectView() {
        var select = new Select<String>();
        setItemsFor(select);
        setComponent(select, SelectVariant.values());
    }

}
