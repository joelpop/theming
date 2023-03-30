package com.example.application.views;

import com.vaadin.flow.component.Composite;
import com.vaadin.flow.component.Text;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;

@PageTitle("Theming")
@Route(value = "", layout = MainLayout.class)
public class MainView extends Composite<VerticalLayout> {

    public MainView() {
        getContent().add(new Text("Select a component from the list to the left."));
    }

}
