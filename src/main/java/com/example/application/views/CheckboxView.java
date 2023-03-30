package com.example.application.views;

import com.vaadin.flow.component.checkbox.Checkbox;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;

@PageTitle("Checkbox")
@Route(value = "checkbox", layout = MainLayout.class)
public class CheckboxView extends ViewComponent<Checkbox> {

    public CheckboxView() {
        var checkbox = new Checkbox();
        setComponent(checkbox);
    }

}
