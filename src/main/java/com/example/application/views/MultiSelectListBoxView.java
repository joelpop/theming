package com.example.application.views;

import com.vaadin.flow.component.listbox.MultiSelectListBox;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;

@PageTitle("MultiSelectListBox")
@Route(value = "multiSelectListBox", layout = MainLayout.class)
public class MultiSelectListBoxView extends ViewComponent<MultiSelectListBox<?>> {

    public MultiSelectListBoxView() {
        var multiSelectListBox = new MultiSelectListBox<String>();
        setItemsFor(multiSelectListBox);
        setComponent(multiSelectListBox);
    }

}
