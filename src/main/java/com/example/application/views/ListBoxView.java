package com.example.application.views;

import com.vaadin.flow.component.listbox.ListBox;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;

@PageTitle("ListBox")
@Route(value = "listBox", layout = MainLayout.class)
public class ListBoxView extends ViewComponent<ListBox<?>> {

    public ListBoxView() {
        var listBox = new ListBox<String>();
        setItemsFor(listBox);
        setComponent(listBox);
    }

}
