package com.example.application.views;

import com.vaadin.flow.component.tabs.Tabs;
import com.vaadin.flow.component.tabs.TabsVariant;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;

@PageTitle("Tabs")
@Route(value = "tabs", layout = MainLayout.class)
public class TabsView extends ViewThemeVariantComponent<Tabs, TabsVariant> {

    public TabsView() {
        var tabs = new Tabs();
        setTabsFor(tabs);
        setComponent(tabs, TabsVariant.values());
    }

}
